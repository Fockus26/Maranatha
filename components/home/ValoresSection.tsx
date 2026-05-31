'use client'

import { type ReactElement, useEffect, useRef } from 'react'
import type { ValoresData } from '@/data/home.data'

interface Props {
	data: ValoresData
}

export default function ValoresSection({ data }: Props): ReactElement {
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
			{ threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
		)

		const cards = containerRef.current?.querySelectorAll('.valor-card')
		cards?.forEach((el) => observer.observe(el))

		return () => observer.disconnect()
	}, [data])

	return (
		<section ref={containerRef} className="py-24 bg-background w-full">
			<div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">

				<div className="text-center mb-16">
					<h2 className="text-primary-container text-3xl md:text-4xl font-bold tracking-wider uppercase">
						{data.sectionTitle}
					</h2>
					<div className="w-16 h-1 bg-[#e8603a] mx-auto mt-4 rounded-full" />
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{data.items.map((val, idx) => (
						<div
							key={idx}
							className="valor-card group relative min-h-[420px] rounded-2xl overflow-hidden cursor-default hover:scale-[1.02] transition-all duration-500"
							style={{ transitionDelay: `${idx * 150}ms` }}
						>
							{/* Imagen de fondo */}
							<div
								className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
								style={{ backgroundImage: `url(${val.image})` }}
							/>

							{/* Overlay */}
							<div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/50 to-transparent" />

							{/* Contenido */}
							<div className="absolute bottom-0 left-0 right-0 p-8 space-y-3">
								{/* Icono */}
								<div className="flex items-center justify-center w-11 h-11 rounded-full bg-[#e8603a] text-white mb-2">
									{val.icon.startsWith('/') ? (
										<img src={val.icon} alt={val.title} className="w-6 h-6 object-contain" />
									) : (
										<span className="material-symbols-outlined text-2xl">
											{val.icon}
										</span>
									)}
								</div>
								<h3 className="text-white text-xl font-bold tracking-wide">
									{val.title}
								</h3>
								<p className="text-white/75 text-sm leading-relaxed max-w-sm">
									{val.description}
								</p>
							</div>
						</div>
					))}
				</div>

			</div>
		</section>
	)
}