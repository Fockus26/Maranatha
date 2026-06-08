import type { StaticImageData } from "next/image";
import type { ComponentType, SVGProps } from "react";

export type Networks = "instagram" | "facebook";

export interface SocialMediaMessagesItem {
	imageAlt: string;
}

export interface SocialMediaMessagesNetwork {
	follow: string;
	items: SocialMediaMessagesItem[];
}

export interface SocialMediaMessages {
	title: string;
	networks: Record<Networks, SocialMediaMessagesNetwork>;
}

export interface SocialMediaItem {
	image: StaticImageData;
	url: string;
}

export interface SocialMediaNetwork {
	label: string;
	account: string;
	url: string;
	color: string;
	gradient: string;
	icon: ComponentType<SVGProps<SVGSVGElement>>;
	items: SocialMediaItem[];
}

export type SocialMediaData = Record<Networks, SocialMediaNetwork>;
