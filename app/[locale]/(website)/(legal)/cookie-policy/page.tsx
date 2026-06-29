import type { ReactElement } from 'react'
import { aboutData } from '@/data/about.data'
import HeroSlider from '@/components/home/HeroSlider'
import InstagramSection from '@/components/home/InstagramSection'
import StaffGrid from '@/components/about/StaffGrid'
import AreasServicioGrid from '@/components/about/AreasServicioGrid'
import EvangelismoBanner from '@/components/about/EvangelismoBanner'

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