export interface YoutubeSearchResponse {
	items: YoutubeSearchItem[];
}

export interface YoutubeSearchItem {
	id: {
		videoId: string;
	};

	snippet: {
		title: string;
		description: string;
		publishedAt: string;

		thumbnails: {
			high: {
				url: string;
			};
			maxres?: {
				url: string;
			};
		};
	};
}

export interface YoutubeVideo {
	title: string;
	date: string;
	thumbnail: string;
	youtubeId: string;
	series: string;
}
