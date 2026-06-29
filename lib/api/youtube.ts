const CHANNEL_ID = 'UCT2A5hFBhTJ5T0CykeCKX7w'
const API_KEY = process.env.YOUTUBE_API_KEY

export interface YoutubeVideo {
    title: string
    date: string
    thumbnail: string
    youtubeId: string
    series: string
}

export async function getLatestSermons(maxResults = 4): Promise<YoutubeVideo[]> {
    const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=${maxResults}&type=video&eventType=completed`,
        { next: { revalidate: 3600 } }
    )

    if (!res.ok) return []

    const data = await res.json()

    return data.items.map((item: any) => ({
        title: item.snippet.title,
        date: new Date(item.snippet.publishedAt).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }),
        thumbnail: item.snippet.thumbnails.maxres?.url ?? item.snippet.thumbnails.high.url,
        youtubeId: item.id.videoId,
        series: item.snippet.description?.split('\n')[0]?.slice(0, 40) ?? 'Mensaje',
    }))
}