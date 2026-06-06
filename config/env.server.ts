import { z } from "zod";

const schema = z.object({
	CHANNEL_ID: z.string(),
	YOUTUBE_API_KEY: z.string(),
});

export const envServer = schema.parse({
	CHANNEL_ID: process.env.CHANNEL_ID,
	YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
});
