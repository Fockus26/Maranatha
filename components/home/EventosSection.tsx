'use client'

import { type ReactElement, useEffect, useRef } from 'react'
import type { EventosData } from '@/data/home.data'

interface Props {
	data: EventosData
}

const cellStyles = [
	{ bg: 'bg-primary-container', text: 'text-white', muted: 'text-white/60', tag: 'bg-accent/20 text-accent' },
	{ bg: 'bg-surface', text: 'text-primary-container', muted: 'text-on-surface-variant', tag: 'bg-accent/10 text-accent' },
	{ bg: 'bg-accent/10', text: 'text-primary-container', muted: 'text-on-surface-variant', tag: 'bg-primary-container/10 text-primary-container' },
	{ bg: 'bg-complementary/10', text: 'text-primary-container', muted: 'text-on-surface-variant', tag: 'bg-complementary/20 text-complementary' },
]

export default function EventosSection({ data }: Props): ReactElement {
	const containerRef = useRef<HTMLDivElement>(null)

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
			{ threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
		)

		const cards = containerRef.current?.querySelectorAll('.evento-card')
		cards?.forEach((el) => observer.observe(el))

		return () => observer.disconnect()
	}, [data])

	return (
		<section ref={containerRef} className="py-24 bg-background w-full">
			<div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">

				{/* Header */}
				<div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
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
						<button className="flex items-center gap-2 group text-accent font-semibold text-sm transition-all duration-300 hover:text-accent/85">
							Ver Calendario Completo
							<span className="material-symbols-outlined text-xl transition-transform duration-300 group-hover:translate-x-1">
								arrow_right_alt
							</span>
						</button>
					</div>
				</div>

				{/* Grid 2x2 estilo Apple */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{data.items.map((ev, idx) => {
						return (
							<div
								key={idx}
								className={`evento-card group relative min-h-[480px] rounded-3xl overflow-hidden flex flex-col items-center justify-between text-center px-10 py-12 cursor-pointer transition-all duration-500 hover:scale-[1.01] ${ev.bg}`}
								style={{ transitionDelay: `${idx * 120}ms` }}
							>
								{/* Top content */}
								<div className="space-y-3 z-10">
									<span className={`inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full ${ev.tag}`}>
										{ev.category}
									</span>
									<h3 className={`text-3xl font-bold leading-tight ${ev.text}`}>
										{ev.title}
									</h3>
									<p className={`text-base font-light leading-relaxed max-w-xs mx-auto ${ev.muted}`}>
										{ev.description}
									</p>
									<div className={`flex items-center justify-center gap-2 text-sm font-medium pt-1 ${ev.muted}`}>
										<span className="material-symbols-outlined text-sm">calendar_today</span>
										{ev.date}
									</div>

									{/* Botones estilo Apple */}
									<div className="flex items-center justify-center gap-3 pt-2">
										<button className="bg-accent text-white rounded-full px-6 py-2 text-sm font-semibold hover:bg-accent/85 transition-all duration-300">
											Más info
										</button>
										<button className="border border-accent text-accent rounded-full px-6 py-2 text-sm font-semibold hover:bg-accent/10 transition-all duration-300">
											Registrarse
										</button>
									</div>
								</div>

								{/* Imagen centrada abajo */}
								<div className="w-full flex items-end justify-center mt-8 z-10">
									<img
										src={ev.image}
										alt={ev.title}
										className="max-h-[220px] w-auto object-contain transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-2 drop-shadow-2xl"
									/>
								</div>
							</div>
						)
					})}
				</div>

				{/* Mobile button */}
				<div className="mt-8 text-center md:hidden">
					<button className="inline-flex items-center gap-2 text-accent font-semibold text-sm">
						Ver Calendario Completo
						<span className="material-symbols-outlined text-xl">arrow_right_alt</span>
					</button>
				</div>

			</div>
		</section>
	)
}