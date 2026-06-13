'use client'

import { type ReactElement, useEffect, useRef } from 'react'
import type { AreaServicio } from '@/data/about.data'

interface Props {
	data: AreaServicio[]
}

export default function AreasServicioGrid({ data }: Props): ReactElement {
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
			{ threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
		)

		const cards = ref.current?.querySelectorAll('.area-card')
		cards?.forEach((el) => observer.observe(el))

		return () => observer.disconnect()
	}, [data])

	return (
		<section ref={ref} className="py-20 w-full bg-background">
			<div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
				<div className="flex flex-col items-center text-center mb-16 gap-4">
					<h2 className="text-primary-container text-3xl md:text-4xl font-bold tracking-tight">
						Áreas de Servicio
					</h2>
					<p className="text-on-surface-variant text-lg font-light max-w-[600px]">
						Cada equipo tiene un propósito. Cada capitán, un
						llamado.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{data.map((area, idx) => (
						<div
							key={idx}
							className={`area-card group relative min-h-[480px] rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.01] ${area.bg}`}
							style={{
								transitionDelay: `${idx * 120}ms`,
								backgroundImage: `url(${area.image})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
							}}
						>
							<div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95" />

							<div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col justify-end text-white pointer-events-none space-y-1">
								<h3
									className={`text-2xl md:text-3xl font-bold leading-tight text-white ${area.text}`}
								>
									{area.title}
								</h3>
								<p
									className={`text-sm md:text-base font-light text-white/80 ${area.muted}`}
								>
									{area.capitan}
								</p>

								<div className="flex items-center gap-2 pt-3 mt-2 pointer-events-auto">
									{area.buttonOne && (
										<a
											href={area.buttonOneUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-2 px-5 py-2.5 rounded-full !bg-[#012650] !text-white cursor-pointer hover:bg-[#012650]/90 transition-all shadow-lg"
										>
											{area.buttonOne}
										</a>
									)}

									{area.buttonTwo && (
										<a
											href={area.buttonTwoUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#012650] cursor-pointer hover:bg-white/95 transition-all shadow-lg"
										>
											{area.buttonTwo}
										</a>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
