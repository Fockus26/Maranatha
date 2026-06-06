import {
	CATEGORY_KEYS,
	PROJECT_CATEGORIES,
	type ProjectCategory,
	type ProjectStatus,
	STATUS_KEYS,
} from "@/types/project.types";

export const getProjectCategoryBySlug = (value: string): ProjectCategory | null => {
	const normalized = value.toLowerCase();

	const entry = (
		Object.entries(PROJECT_CATEGORIES) as [
			ProjectCategory,
			(typeof PROJECT_CATEGORIES)[ProjectCategory],
		][]
	).find(([key, cat]) => {
		return key.toLowerCase() === normalized || cat.slug === normalized;
	});

	return entry?.[0] ?? null;
};

export const normalizeCategory = (value: string): ProjectCategory | null => {
	const normalized = value.toLowerCase();

	return CATEGORY_KEYS.find((key) => key.toLowerCase() === normalized) ?? null;
};

export const normalizeStatus = (value: string): ProjectStatus | null => {
	const normalized = value.toUpperCase();

	return STATUS_KEYS.find((key) => key.toUpperCase() === normalized) ?? null;
};
