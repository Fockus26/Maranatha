import type { ContactMessages } from "@/types/pages/home/contact.types";
import type { EventsMessages } from "@/types/pages/home/events.types";
import type { HeroMessages } from "@/types/pages/home/hero.types";
import type { LeadersMessages } from "@/types/pages/home/leaders.types";
import type { SermonsMessages } from "@/types/pages/home/sermons.types";
import type { SocialMediaMessages } from "@/types/pages/home/socialMedia.types";
import type { ValuesMessages } from "@/types/pages/home/values.types";

export interface HomeMessages {
	hero: HeroMessages;
	values: ValuesMessages;
	leaders: LeadersMessages;
	sermons: SermonsMessages;
	events: EventsMessages;
	socialMedia: SocialMediaMessages;
	contact: ContactMessages;
}

export interface NotFoundMessages {
	title: string;
	description: string;
}
