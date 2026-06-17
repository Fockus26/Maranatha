import { getMessages } from "next-intl/server";
import { Contact } from "@/components/home/contact";
import { Events } from "@/components/home/events";
import { Hero } from "@/components/home/hero";
import { Leaders } from "@/components/home/leaders";
import { Sermons } from "@/components/home/sermons";
import { SocialMedia } from "@/components/home/socialMedia";
import { Values } from "@/components/home/values";
import { getLatestSermons } from "@/lib/api/youtube";

export default async function HomePage() {
	const videos = await getLatestSermons(4);
	const messages = (await getMessages()).home;

	return (
		<>
			<Hero messages={messages.hero} />
			<Values messages={messages.values} />
			<Leaders messages={messages.leaders} />
			<Sermons messages={messages.sermons} videos={videos} />
			<Events messages={messages.events} />
			<SocialMedia messages={messages.socialMedia} />
			<Contact messages={messages.contact} />
		</>
	);
}
