export type Modalities = "online" | "inPerson";

export interface ContactMessagesModality {
	label: string;
	schedule: string;
}

export type ContactMessagesModalities = Record<Modalities, ContactMessagesModality>;

export interface ContactMessages {
	title: string;
	modalities: ContactMessagesModalities;
	address: string;
	imageAlt: string;
	info: Pick<ContactInfo, "title">[];
}

export interface ContactInfo {
	icon: string;
	value: string;
	title: string;
}

export interface ContactData {
	image: string;
	info: Omit<ContactInfo, "title">[];
}
