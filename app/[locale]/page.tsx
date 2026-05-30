import { homeData } from '@/data/home.data'
import HeroSlider from '@/components/home/HeroSlider'
import ValoresSection from '@/components/home/ValoresSection'
import PastoresSlider from '@/components/home/PastoresSlider'
import SermonesSection from '@/components/home/SermonesSection'
import EventosSection from '@/components/home/EventosSection'
import InstagramSection from '@/components/home/InstagramSection'
import ContactoSection from '@/components/home/ContactoSection'

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
	)
}
