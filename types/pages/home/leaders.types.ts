export interface LeadersMessageItem {
	name: string;
	role: string;
	description: string;
	imageAlt: string;
}

export interface LeadersMessages {
	label: string;
	title: string;
	items: LeadersMessageItem[];
}

export interface LeaderItem {
	image: string;
}

export type LeadersData = LeaderItem[];
