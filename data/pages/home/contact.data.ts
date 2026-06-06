import type { ContactData } from "@/types/pages/home/contact.types";

export const contactData: ContactData = {
	image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200&h=300",
	info: [
		{ icon: "mail", value: "hola@maranatha.com" },
		{ icon: "call", value: "+1 (000) 000-0000" },
		{ icon: "location_on", value: "Calle de la Luz 123" },
		{ icon: "schedule", value: "Lun-Vie: 9h - 17h" },
	],
};
