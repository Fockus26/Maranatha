'use client'

import { type ReactElement, useEffect, useRef } from 'react'
import type { EvangelismoData } from '@/data/about.data'

interface Props {
	data: EvangelismoData
}

export default function EvangelismoBanner({ data }: Props): ReactElement {
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('active')
						observer.unobserve(entry.target)
					}
				})
			},
			{ threshold: 0.15 },
		)

		const content = ref.current?.querySelector('.evangelismo-content')
		if (content) observer.observe(content)

		return () => observer.disconnect()
	}, [data])

	return (
		<section
			ref={ref}
			className="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden bg-cover bg-center"
			style={{
				backgroundImage: `url(${data.image})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			<div className="absolute inset-0 bg-black/40 z-0" />

			<div className="evangelismo-content relative z-10 max-w-[800px] mx-auto px-6 text-center space-y-8">
				<h2 className="text-white text-3xl md:text-5xl font-bold tracking-tight">
					{data.title}
				</h2>
				<p className="text-white/70 text-lg md:text-xl font-light leading-relaxed">
					{data.description}
				</p>

				<div className="flex flex-wrap justify-center gap-8 pt-4">
					{data.lideres.map((lider, idx) => (
						<div key={idx} className="text-center">
							<p className="text-white font-semibold text-base">
								{lider.name}
							</p>
							<p className="text-white/60 text-sm">{lider.role}</p>
						</div>
					))}
				</div>

				{data.buttonOne && (
					<div className="pt-4">
						<a
							href={data.buttonOneUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-[#012650] font-semibold hover:bg-white/90 transition-all shadow-lg"
						>
							{data.buttonOne}
						</a>
					</div>
				)}
			</div>
		</section>
	)
}
