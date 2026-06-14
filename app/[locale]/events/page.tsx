import type { ReactElement } from 'react'
import { eventsData } from '@/data/events.data'
import EventsGrid from '@/components/events/EventsGrid'
import HeroSlider from '@/components/home/HeroSlider'
import EventsCarousel from '@/components/events/EventsCarousel'

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
