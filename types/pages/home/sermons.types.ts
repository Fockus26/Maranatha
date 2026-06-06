export interface SermonsMessagesInfo {
	title: string;
	series: string;
	date: string;
}

export interface SermonsMessages {
	title: string;
	featured: SermonsMessagesInfo;
	secondary: SermonsMessagesInfo[];
}

export interface SermonsInfo {
	thumbnail: string;
	youtubeId: string;
}

export interface SermonsData {
	featured: SermonsInfo;
	secondary: SermonsInfo[];
}
