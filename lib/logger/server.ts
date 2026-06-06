import pino from "pino";

export const logger = pino({
	level: process.env.NODE_ENV === "development" ? "debug" : "info",

	transport: {
		target: "pino-pretty",

		options: {
			colorize: true,
			levelFirst: true,
			translateTime: "HH:MM:ss",
			ignore: "pid,hostname",
		},
	},
});
