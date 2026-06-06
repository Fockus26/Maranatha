export interface ValuesMessage {
	title: string;
	description: string;
	imageAlt: string;
}

export interface ValuesMessages {
	title: string;
	items: ValuesMessage[];
}

export interface ValuesItem {
	icon: string;
	image: string;
	delay: number;
}

export type ValuesData = ValuesItem[];
