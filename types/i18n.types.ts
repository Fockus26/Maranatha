export type JsonValue = string | number | boolean | null | JsonObject | JsonValue[];

export interface JsonObject {
	[key: string]: JsonValue;
}

export interface PendingTranslation {
	path: string[];
	text: string;
}
