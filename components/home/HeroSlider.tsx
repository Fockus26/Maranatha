'use client'

import { type ReactElement, useEffect, useRef, useState } from 'react'
import type { HeroData } from '@/data/home.data'

interface Props {
	data: HeroData
}

export default function HeroSlider({ data }: Props): ReactElement {
	const [activeSlide, setActiveSlide] = useState(0)
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveSlide((prev) => (prev === data.slides.length - 1 ? 0 : prev + 1))
		}, 6000)

		return () => clearInterval(interval)
	}, [data.slides.length])

	useEffect(() => {
		const observerOptions = {
			root: null,
			rootMargin: '0px',
			threshold: 0.05,
		}

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('active')
					observer.unobserve(entry.target)
				}
			})
		}, observerOptions)

		const revealElements = containerRef.current?.querySelectorAll('.hero-slide-content')
		revealElements?.forEach((el) => observer.observe(el))

		return () => observer.disconnect()
	}, [activeSlide])

	return (
		<section ref={containerRef} className="relative h-[45vw] w-full overflow-hidden bg-brand">
			{/* Slides */}
			{data.slides.map((slide, idx) => (
				<div
					key={idx}
					className={`absolute inset-0 h-full w-full transition-opacity duration-2000 ease-in-out ${idx === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
						}`}
				>
					{/* Background Image focused to the right */}
					<div
						className="absolute inset-0 h-full w-full bg-cover bg-bottom md:bg-right-center bg-no-repeat"
						style={{ backgroundImage: `url(${slide.image})` }}
					/>

					{/* Overlay gradient from #000519 solid to transparent */}
					<div
						className="absolute inset-0 h-full w-full"
						style={{
							background: "linear-gradient(90deg, #000519 0%, #000519d9 40%, rgba(0, 5, 25, 0) 100%)",
						}}
					/>

					{/* Content Left Side */}
					<div className="absolute inset-0 flex items-center z-20">
						<div className="max-w-[95vw] !px-16 mx-auto w-full px-6 md:px-12 lg:px-24">
							<div className="max-w-[555px] space-y-3 text-left hero-slide-content">
								{/* Badge */}
								<span className="inline-block text-white font-bold tracking-[0.25em] text-xs md:text-sm uppercase">
									{slide.badge}
								</span>

								{/* Title */}
								<h1 className="text-white text-4xl md:text-[64px] font-bold leading-tight tracking-tight drop-shadow-md">
									{slide.title}
								</h1>

								{/* Subtitle */}
								<p className="text-white/60 text-base md:text-xl font-normal leading-relaxed">
									{slide.subtitle}
								</p>

								{/* Action Button */}
								<div className="pt-4 ">
									<a href={slide.buttonHref}
										className="!text-white !text-3xl inline-flex items-center gap-3 !font-medium transition-all duration-300 group"
										style={{ borderBottom: '1.5px solid #e8603a', paddingBottom: '4px' }}
									>

										{slide.buttonText}
										<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
											<path d="M5 12h14M12 5l7 7-7 7" />
										</svg>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			))
			}

			{/* Navigation Dots in Bottom Left */}
			<div className="absolute bottom-12 left-6 md:left-12 lg:left-24 z-30 flex items-center gap-3">
				{data.slides.map((_, idx) => (
					<button
						key={idx}
						onClick={() => setActiveSlide(idx)}
						aria-label={`Ir al slide ${idx + 1}`}
						className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${idx === activeSlide
							? 'bg-[#0e7ab8] w-8 active-dot'
							: 'bg-white/30 w-2.5 hover:bg-white/50'
							}`}
					/>
				))}
			</div>
		</section >
	)
}
