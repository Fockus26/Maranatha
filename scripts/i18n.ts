import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import translate from "google-translate-api-x";
import { logger } from "@/lib/logger/server";
import type { JsonObject, JsonValue, PendingTranslation } from "@/types/i18n.types";

const MESSAGES_DIR = join(process.cwd(), "messages");
const SOURCE_LOCALE = "es";

const SHOULD_TRANSLATE = Bun.argv.includes("--translate");

const LOCALE_MAP: Record<string, string> = {
	en: "en",
};

async function translateText(text: string, targetLanguage: string): Promise<string> {
	const result = await translate(text, {
		from: SOURCE_LOCALE,
		to: targetLanguage,
	});

	return result.text;
}

function collectMissingTranslations(
	source: JsonValue,
	target: JsonValue | undefined,
	path: string[] = [],
): PendingTranslation[] {
	const missing: PendingTranslation[] = [];

	if (typeof source === "string") {
		const needsTranslation =
			target === undefined || (typeof target === "string" && target.trim() === "");

		if (needsTranslation) {
			missing.push({
				path,
				text: source,
			});
		}

		return missing;
	}

	if (Array.isArray(source)) {
		source.forEach((item, index) => {
			missing.push(
				...collectMissingTranslations(
					item,
					Array.isArray(target) ? target[index] : undefined,
					[...path, String(index)],
				),
			);
		});

		return missing;
	}

	if (source && typeof source === "object") {
		for (const [key, value] of Object.entries(source)) {
			missing.push(
				...collectMissingTranslations(value, (target as JsonObject)?.[key], [...path, key]),
			);
		}
	}

	return missing;
}

function setNestedValue(object: JsonObject, path: string[], value: JsonValue): void {
	let current: JsonValue = object;

	for (let i = 0; i < path.length - 1; i++) {
		const key = path[i];
		const nextKey = path[i + 1];

		if (!key || !nextKey) {
			return;
		}

		const shouldCreateArray = /^\d+$/.test(nextKey);

		if (Array.isArray(current)) {
			const index = Number(key);

			if (current[index] === undefined) {
				current[index] = shouldCreateArray ? [] : {};
			}

			current = current[index] as JsonValue;
		} else {
			const obj = current as JsonObject;

			if (obj[key] === undefined) {
				obj[key] = shouldCreateArray ? [] : {};
			}

			current = obj[key] as JsonValue;
		}
	}

	const lastKey = path.at(-1);

	if (!lastKey) {
		return;
	}

	if (Array.isArray(current)) {
		current[Number(lastKey)] = value;
	} else {
		(current as JsonObject)[lastKey] = value;
	}
}

function mergeStructure(source: JsonObject, target: JsonObject): JsonObject {
	const result: JsonObject = {};

	for (const [key, sourceValue] of Object.entries(source)) {
		const targetValue = target[key];

		if (sourceValue && typeof sourceValue === "object" && !Array.isArray(sourceValue)) {
			result[key] = mergeStructure(
				sourceValue as JsonObject,
				targetValue && typeof targetValue === "object" && !Array.isArray(targetValue)
					? (targetValue as JsonObject)
					: {},
			);

			continue;
		}

		result[key] =
			targetValue !== undefined
				? targetValue
				: typeof sourceValue === "string"
					? ""
					: sourceValue;
	}

	return result;
}

async function translateMissingValues(
	target: JsonObject,
	missing: PendingTranslation[],
	targetLanguage: string,
): Promise<void> {
	const Concurrency = 5;

	for (let i = 0; i < missing.length; i += Concurrency) {
		const batch = missing.slice(i, i + Concurrency);

		await Promise.all(
			batch.map(async ({ path, text }) => {
				try {
					const translated = await translateText(text, targetLanguage);

					setNestedValue(target, path, translated);

					logger.info(`🌐 ${targetLanguage}: "${text}" → "${translated}"`);
				} catch (error) {
					logger.error(`❌ Failed translating "${text}"\nError: ${error}`);

					setNestedValue(target, path, "");
				}
			}),
		);
	}
}

async function syncTranslations(
	source: JsonObject,
	target: JsonObject,
	targetLanguage: string,
): Promise<JsonObject> {
	const result = structuredClone(target);

	const missing = collectMissingTranslations(source, result);
	logger.info(JSON.stringify(missing.slice(0, 20), null, 2));

	logger.info(`Found ${missing.length} missing translations for ${targetLanguage}`);

	if (SHOULD_TRANSLATE && missing.length > 0) {
		await translateMissingValues(result, missing, targetLanguage);
	}

	return mergeStructure(source, result);
}

async function main(): Promise<void> {
	const sourcePath = join(MESSAGES_DIR, `${SOURCE_LOCALE}.json`);

	const source = JSON.parse(await readFile(sourcePath, "utf8")) as JsonObject;

	const files = await readdir(MESSAGES_DIR);

	for (const file of files) {
		if (!file.endsWith(".json") || file === `${SOURCE_LOCALE}.json`) {
			continue;
		}

		const locale = file.replace(".json", "");

		const targetLanguage = LOCALE_MAP[locale];

		if (!targetLanguage) {
			logger.warn(`⚠ Locale "${locale}" not configured. Skipping.`);

			continue;
		}

		const filePath = join(MESSAGES_DIR, file);

		const target = JSON.parse(await readFile(filePath, "utf8")) as JsonObject;

		const updated = await syncTranslations(source, target, targetLanguage);

		await writeFile(filePath, `${JSON.stringify(updated, null, 4)}\n`);

		logger.info(`✓ Synced ${file}`);
	}

	logger.info("✨ Done");
}

await main();
