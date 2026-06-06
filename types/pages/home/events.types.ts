export interface EventsMessagesButton {
	viewCalendar: string;
	moreInfo: string;
	register: string;
}

export interface EventsMessagesItem {
	category: string;
	title: string;
	description: string;
	date: string;
}

export interface EventsMessages {
	label: string;
	title: string;
	description: string;
	buttons: EventsMessagesButton;
	items: EventsMessagesItem[];
}

export interface EventItem {
	image: string;
	delay: number;
	bg: string;
	text: string;
	muted: string;
	tag: string;
}

export type EventsData = EventItem[];
