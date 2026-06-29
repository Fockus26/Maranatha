import type { ReactElement } from 'react'
import { aboutData } from '@/data/about.data'
import HeroSlider from '@/components/website/home/heroSlider'
import InstagramSection from '@/components/website/home/instagramSection'
import StaffGrid from '@/components/website/about/staffGrid'
import AreasServicioGrid from '@/components/website/about/areasServicioGrid'
import EvangelismoBanner from '@/components/website/about/evangelismoBanner'

const Page = (): ReactElement => {
	const { pastoresPrincipales, lideresSenior, areasServicio, evangelismo } =
		aboutData

	return (
		<main className="bg-background mt-[-11.5vh]">
			<HeroSlider data={aboutData.hero} />
			<StaffGrid
				sectionTitle={aboutData.sectionTitle}
				sectionDescription={aboutData.sectionDescription}
				items={pastoresPrincipales}
			/>
			<StaffGrid
				sectionTitle={aboutData.lideresSectionTitle}
				sectionDescription={aboutData.lideresSectionDescription}
				items={lideresSenior}
			/>
			<AreasServicioGrid data={areasServicio} />
			<EvangelismoBanner data={evangelismo} />
			<StaffGrid
				sectionTitle={aboutData.lideresSectionTitle}
				sectionDescription={aboutData.lideresSectionDescription}
				items={lideresSenior}
			/>
			<InstagramSection data={aboutData.instagram} />
		</main>
	)
}

export default Page