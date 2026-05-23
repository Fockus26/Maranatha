'use client'

import { type ReactElement, useEffect, useRef, useState } from 'react'
import type { PastoresData, PastorItem } from '@/data/home.data'

interface Props {
	data: PastoresData
}

export default function PastoresSlider({ data }: Props): ReactElement {
	const [currentIndex, setCurrentIndex] = useState(0)
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
	}, [currentIndex, data])

	const nextPastor = (): void => {
		setCurrentIndex((prev) => (prev === data.items.length - 1 ? 0 : prev + 1))
	}

	const prevPastor = (): void => {
		setCurrentIndex((prev) => (prev === 0 ? data.items.length - 1 : prev - 1))
	}

	const current = (data.items[currentIndex] ?? data.items[0]) as PastorItem

	return (
		<section ref={containerRef} className="py-24 bg-surface-container-low w-full overflow-hidden">
			<div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
					
					{/* Left Column: Picture and decorative background */}
					{current && (
						<div className="lg:col-span-5 flex justify-center relative reveal">
							<div className="relative w-full max-w-[360px] md:max-w-[400px] z-10">
								{/* Triangulo decorativo using clip-path */}
								<div
									className="absolute -bottom-8 -left-8 w-48 h-48 bg-complementary/10 -z-10 pointer-events-none"
									style={{
										clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
									}}
								/>
								
								{/* Photo with shadow and border-radius */}
								<div className="aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
									<img
										src={current.image}
										alt={current.name}
										className="w-full h-full object-cover transition-all duration-700 ease-in-out transform hover:scale-105"
									/>
								</div>
							</div>
						</div>
					)}

					{/* Right Column: Information */}
					{current && (
						<div className="lg:col-span-7 space-y-6 flex flex-col justify-center reveal">
							{/* Label superior */}
							<span className="text-secondary font-bold tracking-[0.2em] text-xs md:text-sm uppercase block">
								{data.sectionLabel}
							</span>

							{/* Large title */}
							<h2 className="text-primary-container text-4xl md:text-5xl font-bold tracking-tight leading-none">
								{data.sectionTitle}
							</h2>

							{/* Nombre del pastor */}
							<h3 className="text-complementary text-xl md:text-2xl font-bold">
								{current.name} — <span className="text-sm font-medium text-on-surface-variant/80">{current.role}</span>
							</h3>

							{/* Paragraph descriptive */}
							<p className="text-on-surface-variant text-base md:text-lg font-normal leading-relaxed min-h-[140px]">
								{current.description}
							</p>

							{/* Two circular buttons (visible only if there is more than 1 pastor) */}
							{data.items.length > 1 && (
								<div className="flex items-center gap-4 pt-4">
									<button
										onClick={prevPastor}
										aria-label="Pastor anterior"
										className="flex items-center justify-center w-12 h-12 rounded-full border border-secondary text-secondary hover:bg-secondary hover:text-white transition-all duration-300 transform active:scale-90"
									>
										<span className="material-symbols-outlined text-2xl">
											chevron_left
										</span>
									</button>

									<button
										onClick={nextPastor}
										aria-label="Siguiente pastor"
										className="flex items-center justify-center w-12 h-12 rounded-full border border-secondary text-secondary hover:bg-secondary hover:text-white transition-all duration-300 transform active:scale-90"
									>
										<span className="material-symbols-outlined text-2xl">
											chevron_right
										</span>
									</button>
								</div>
							)}
						</div>
					)}

				</div>
			</div>
		</section>
	)
}
