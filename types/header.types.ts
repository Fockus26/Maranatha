export type DropdownLinks = "eec" | "gJef" | "church";

export interface DropdownMessages {
	projects: string;
	title: string;
	subtitle: string;
	links: Record<DropdownLinks, string>;
}

export interface NavbarMessages {
	about: string;
	events: string;
	dropdown: DropdownMessages;
}

export type NavbarLinks = "about" | "events";

export interface HeaderMessages {
	button: string;
	imageAlt: string;
	navbar: NavbarMessages;
}

export type HeaderData = {
	navBarLinks: Record<NavbarLinks, string>;
	dropdownLinks: Record<DropdownLinks, string>;
};
