import type { ReactElement } from 'react'
import { eventsData } from '@/data/events.data'
import EventsGrid from '@/components/website/events/eventsGrid'
import HeroSlider from '@/components/website/home/heroSlider'
import EventsCarousel from '@/components/website/events/eventsCarousel'

const Page = (): ReactElement => {
	return (
		<main className="bg-background mt-[-11.5vh]">
			<HeroSlider data={eventsData.hero} />
			<EventsCarousel items={eventsData.carouselItems} />
			<EventsGrid data={eventsData} />
		</main>
	)
}

export default Page