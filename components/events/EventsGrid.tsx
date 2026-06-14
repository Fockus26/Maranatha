'use client'

import { type ReactElement, useEffect, useRef } from 'react'
import type { EventsData } from '@/data/events.data'

interface Props {
	data: EventsData
}

export default function EventsGrid({ data }: Props): ReactElement {
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

		const cards = ref.current?.querySelectorAll('.event-card')
		cards?.forEach((el) => observer.observe(el))

		return () => observer.disconnect()
	}, [data])

	return (
		<section ref={ref} className="py-20 bg-background w-full">
			<div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-14">
				<div className="mb-16">
					<h1 className="text-primary-container text-4xl md:text-5xl font-bold tracking-tight">
						{data.sectionTitle}
					</h1>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
					{data.items.map((ev, idx) => (
						<div
							key={idx}
							className="event-card group cursor-pointer p-4 rounded-2xl border border-transparent transition-all duration-200 ease-out hover:scale-[1.02] hover:bg-[#e8603a17]"
							style={
								{
									'--hover-border': '#d4522e',
									'--hover-shadow': 'rgba(212, 82, 46, 0.15)',
								} as React.CSSProperties
							}
						>
							{/* Contenedor de la Imagen */}
							<div
								className="rounded-xl overflow-hidden mb-5 aspect-[16/10]"
								style={{ transitionDelay: `${idx * 100}ms` }}
							>
								<img
									src={ev.image}
									alt={ev.title}
									className="w-full h-full object-cover transition-transform duration-900 ease-out"
								/>
							</div>

							{/* Textos Informativos */}
							<h3 className="text-xl font-bold text-primary-container transition-colors duration-300">
								{ev.title}
							</h3>
							<p className="text-on-surface-variant text-sm mt-1 font-medium">
								{ev.location}
							</p>

							{/* Meta-datos con Iconos */}
							<div className="mt-4 space-y-2 text-sm text-on-surface-variant/80">
								<div className="flex items-center gap-2.5">
									<CalendarIcon />
									<span>{ev.date}</span>
								</div>
								<div className="flex items-center gap-2.5">
									<ClockIcon />
									<span>{ev.time}</span>
								</div>
								<div className="flex items-center gap-2.5">
									<MapPinIcon />
									<span>{ev.venue}</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Estilos CSS locales para inyectar el comportamiento del hover con tu color exacto */}
			<style jsx>{`
				.event-card:hover {
					border-color: var(--hover-border);
					box-shadow:
						0 10px 30px -10px var(--hover-shadow),
						0 1px 3px 0 rgba(0, 0, 0, 0.05);
				}
			`}</style>
		</section>
	)
}

function CalendarIcon(): ReactElement {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
			<line x1="16" y1="2" x2="16" y2="6" />
			<line x1="8" y1="2" x2="8" y2="6" />
			<line x1="3" y1="10" x2="21" y2="10" />
		</svg>
	)
}

function ClockIcon(): ReactElement {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<circle cx="12" cy="12" r="10" />
			<polyline points="12 6 12 12 16 14" />
		</svg>
	)
}

function MapPinIcon(): ReactElement {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
			<circle cx="12" cy="10" r="3" />
		</svg>
	)
}
