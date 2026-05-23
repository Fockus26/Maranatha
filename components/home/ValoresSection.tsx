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
					} else {
						entry.target.classList.remove('active')
					}
				})
			},
			{ threshold: 0.3, rootMargin: '0px 0px -40px 0px' }
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
					<div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full" />
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{data.items.map((val, idx) => (
						<div
							key={idx}
							className="valor-card flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm border border-border hover:shadow-md hover:-translate-y-1"
							style={{ transitionDelay: `${idx * 100}ms` }}
						>
							<div className="flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-6">
								<span className="material-symbols-outlined text-3xl font-light">
									{val.icon}
								</span>
							</div>

							<h3 className="text-primary-container font-semibold tracking-wide text-lg mb-3">
								{val.title}
							</h3>

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