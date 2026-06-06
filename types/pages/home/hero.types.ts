export interface HeroMessage {
	badge: string;
	title: string;
	subtitle: string;
	button: string;
}

export interface HeroMessages {
	slides: HeroMessage[];
}

export interface HeroSlide {
	href: string;
	imageSrc: string;
}

export type HeroData = HeroSlide[];
