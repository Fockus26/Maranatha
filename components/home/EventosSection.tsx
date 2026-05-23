'use client'

import { type ReactElement, useEffect, useRef } from 'react'
import type { EventosData } from '@/data/home.data'

interface Props {
	data: EventosData
}

export default function EventosSection({ data }: Props): ReactElement {
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const observerOptions = {
			root: null,
			rootMargin: '0px',
			threshold: 0.05,
		}

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('revealed')
					observer.unobserve(entry.target)
				}
			})
		}, observerOptions)

		const revealElements = containerRef.current?.querySelectorAll('.reveal')
		revealElements?.forEach((el) => observer.observe(el))

		return () => observer.disconnect()
	}, [data])

	return (
		<section ref={containerRef} className="py-24 bg-background w-full">
			<div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
				
				<div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 reveal">
					<div className="max-w-[700px] space-y-4">
						<div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-tertiary-fixed text-complementary text-xs font-semibold tracking-wide border border-complementary/10">
							<span className="w-1.5 h-1.5 rounded-full bg-complementary animate-pulse" />
							{data.sectionTag}
						</div>
						<h2 className="text-primary-container text-3xl md:text-4xl font-bold tracking-tight">
							Eventos Destacados
						</h2>
						<p className="text-on-surface-variant text-base font-light">
							{data.sectionDescription}
						</p>
					</div>

					<div className="hidden md:block">
						<button className="flex items-center gap-2 group text-secondary font-semibold text-sm transition-all duration-300 hover:text-secondary/85">
							Ver Calendario Completo
							<span className="material-symbols-outlined text-xl transition-transform duration-300 group-hover:translate-x-1">
								arrow_right_alt
							</span>
						</button>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{data.items.map((ev, idx) => (
						<div
							key={idx}
							className="reveal relative min-h-[420px] rounded-2xl overflow-hidden shadow-lg border border-secondary-fixed-dim/10 group cursor-pointer transition-all duration-500 transform hover:scale-[1.02]"
							style={{ transitionDelay: `${ev.delay}ms` }}
						>
							<img
								src={ev.image}
								alt={ev.title}
								className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
							/>

							<div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/45 to-transparent transition-opacity duration-500 group-hover:opacity-95" />

							<div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end space-y-3 z-10">
								<div>
									<span className="inline-block bg-secondary text-white text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full uppercase">
										{ev.category}
									</span>
								</div>

								<h3 className="text-white text-xl font-semibold leading-tight group-hover:text-secondary-fixed-dim transition-colors duration-300">
									{ev.title}
								</h3>

								<p className="text-white/80 text-xs md:text-sm font-light leading-relaxed line-clamp-2">
									{ev.description}
								</p>

								<div className="pt-2 border-t border-white/10 flex items-center gap-2 text-secondary-fixed-dim text-xs font-medium">
									<span className="material-symbols-outlined text-sm">
										calendar_today
									</span>
									{ev.date}
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="mt-8 text-center md:hidden reveal">
					<button className="inline-flex items-center gap-2 text-secondary font-semibold text-sm">
						Ver Calendario Completo
						<span className="material-symbols-outlined text-xl">
							arrow_right_alt
						</span>
					</button>
				</div>

			</div>
		</section>
	)
}
