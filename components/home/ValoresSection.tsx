'use client'

import { type ReactElement, useEffect, useRef } from 'react'
import type { ValoresData } from '@/data/home.data'

interface Props {
	data: ValoresData
}

export default function ValoresSection({ data }: Props): ReactElement {
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
				
				{/* Section Header */}
				<div className="text-center mb-16 reveal">
					<h2 className="text-primary-container text-3xl md:text-4xl font-bold tracking-wider uppercase">
						{data.sectionTitle}
					</h2>
					<div className="w-16 h-1 bg-secondary mx-auto mt-4 rounded-full" />
				</div>

				{/* Grid layout */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{data.items.map((val, idx) => (
						<div
							key={idx}
							className="reveal flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm border border-secondary-fixed-dim/10 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
							style={{ transitionDelay: `${val.delay}ms` }}
						>
							{/* Icon inside a circle */}
							<div className="flex items-center justify-center w-16 h-16 rounded-full bg-secondary-fixed-dim/30 text-secondary mb-6">
								<span className="material-symbols-outlined text-3xl font-light">
									{val.icon}
								</span>
							</div>

							{/* Title */}
							<h3 className="text-primary-container font-semibold tracking-wide text-lg mb-3">
								{val.title}
							</h3>

							{/* Description */}
							<p className="text-on-surface-variant text-sm leading-relaxed">
								{val.description}
							</p>
						</div>
					))}
				</div>

			</div>
		</section>
	)
}
