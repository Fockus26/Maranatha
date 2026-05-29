import { env } from "@/config/env";
import { formatDateES } from "@/lib/utils/utils";
import type { YoutubeSearchItem, YoutubeSearchResponse, YoutubeVideo } from "@/types/youtube.types";

const CHANNEL_ID = env.CHANNEL_ID;
const API_KEY = env.YOUTUBE_API_KEY;

const baseUrl = "https://www.googleapis.com/youtube/v3/search";
const params = `?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&type=video&eventType=completed`;
const rawUrl = baseUrl + params;

export async function getLatestSermons(maxResults = 4): Promise<YoutubeVideo[]> {
    const url = `${rawUrl}&maxResults=${maxResults}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) return [];

    const data: YoutubeSearchResponse = await res.json();

    const mapYoutubeItem = (item: YoutubeSearchItem): YoutubeVideo => ({
        title: item.snippet.title,
        date: formatDateES(item.snippet.publishedAt),
        thumbnail: item.snippet.thumbnails.maxres?.url ?? item.snippet.thumbnails.high.url,
        youtubeId: item.id.videoId,
        series: item.snippet.description?.split("\n")[0]?.slice(0, 40) ?? "Mensaje",
    });

    return data.items.map(mapYoutubeItem);
}
