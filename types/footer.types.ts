export type FooterLinks = "legalNotice" | "privacyPolicy" | "cookiePolicy" | "terms";

export interface FooterMessages {
	copyright: string;
	links: Record<FooterLinks, string>;
}

export interface FooterData {
	legalLinks: Record<FooterLinks, string>;
}
