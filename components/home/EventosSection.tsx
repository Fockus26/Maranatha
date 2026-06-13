'use client'

import { type ReactElement, useEffect, useRef } from 'react'
import type { EventosData } from '@/data/home.data'

interface Props {
	data: EventosData
}

const cellStyles = [
	{
		bg: 'bg-primary-container',
		text: 'text-white',
		muted: 'text-white/60',
		tag: 'bg-accent/20 text-accent',
	},
	{
		bg: 'bg-surface',
		text: 'text-primary-container',
		muted: 'text-on-surface-variant',
		tag: 'bg-accent/10 text-accent',
	},
	{
		bg: 'bg-accent/10',
		text: 'text-primary-container',
		muted: 'text-on-surface-variant',
		tag: 'bg-primary-container/10 text-primary-container',
	},
	{
		bg: 'bg-complementary/10',
		text: 'text-primary-container',
		muted: 'text-on-surface-variant',
		tag: 'bg-complementary/20 text-complementary',
	},
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
			{ threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
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
						<h2 className="text-primary-container text-3xl md:text-4xl font-bold tracking-tight">
							Eventos Destacados
						</h2>
						<p className="text-on-surface-variant text-2xl font-light">
							{data.sectionDescription}
						</p>
					</div>
				</div>

				{/* Grid 2x2 estilo Apple */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{data.items.map((ev, idx) => {
						return (
							<div
								key={idx}
								className={`evento-card group relative min-h-[480px] rounded-3xl overflow-hidden flex flex-col items-center justify-start text-center px-10 py-12 cursor-pointer transition-all duration-500 hover:scale-[1.01] ${ev.bg}`}
								style={{
									transitionDelay: `${idx * 120}ms`,
									backgroundImage: `url(${ev.image})`,
									backgroundSize: 'cover',
									backgroundPosition: 'center',
								}}
							>
								{/* 1. Título y Subtítulo (Siempre fijos arriba) */}
								<div className="space-y-3 z-10 w-full">
									<h3
										className={`text-3xl font-bold leading-tight ${ev.text}`}
									>
										{ev.title}
									</h3>
									<p
										className={`text-base font-light leading-relaxed max-w-xs mx-auto ${ev.muted}`}
									>
										{ev.description}
									</p>
								</div>
								{/* 2. Botones (Centrados en la card y solo aparecen si tienen texto) */}
								<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center gap-3 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out">
									<div className="flex items-center justify-center gap-3">
										{ev.buttonOne && (
											<a
												href={ev.buttonOneUrl}
												target="_blank"
												rel="noopener noreferrer"
												className="flex items-center gap-2 px-5 py-2.5 rounded-full !bg-[#012650] !text-white cursor-pointer hover:bg-[#012650]/90 transition-all shadow-lg"
											>
												{ev.buttonOne}
											</a>
										)}

										{ev.buttonTwo && (
											<a
												href={ev.buttonTwoUrl}
												target="_blank"
												rel="noopener noreferrer"
												className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#012650] cursor-pointer hover:bg-white/95 transition-all shadow-lg"
											>
												{ev.buttonTwo}
											</a>
										)}
									</div>
								</div>

								{/* Overlay oscuro sutil constante para asegurar legibilidad del texto */}
								<div className="absolute inset-0 bg-black/15 z-0" />
							</div>
						)
					})}
				</div>

				{/* Mobile button */}
				<div className="mt-8 text-center md:hidden">
					<button className="inline-flex items-center gap-2 text-accent font-semibold text-sm">
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
