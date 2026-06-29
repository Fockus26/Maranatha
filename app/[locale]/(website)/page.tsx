import ContactoSection from "@/components/website/home/contactoSection";
import EventosSection from "@/components/website/home/eventosSection";
import HeroSlider from "@/components/website/home/heroSlider";
import InstagramSection from "@/components/website/home/instagramSection";
import PastoresSlider from "@/components/website/home/pastoresSlider";
import SermonesSection from "@/components/website/home/sermonesSection";
import ValoresSection from "@/components/website/home/valoresSection";
import { homeData } from "@/data/home.data";

export default function HomePage() {
	return (
		<main className="bg-background mt-[-11.5vh]">
			<HeroSlider data={homeData.hero} />
			<ValoresSection data={homeData.valores} />
			<PastoresSlider data={homeData.pastores} />
			<SermonesSection data={homeData.sermones} />
			<EventosSection data={homeData.eventos} />
			<InstagramSection data={homeData.instagram} />
			<ContactoSection data={homeData.contacto} />
		</main>
	);
}
