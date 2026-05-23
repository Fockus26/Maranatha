'use client'

import { type ReactElement, useEffect, useRef } from 'react'
import type { InstagramData } from '@/data/home.data'

interface Props {
	data: InstagramData
}

export default function InstagramSection({ data }: Props): ReactElement {
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
		<section ref={containerRef} className="py-24 bg-tertiary-fixed/20 w-full overflow-hidden">
			<div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
				
				{/* Header Section (2 columns) */}
				<div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8 reveal">
					
					{/* Left: Instagram SVG, Handle, Subtitle */}
					<div className="flex items-center gap-5">
						{/* SVG Instagram box */}
						<div className="flex items-center justify-center w-16 h-16 rounded-[20px] bg-white shadow-md flex-shrink-0">
							<svg
								width="36"
								height="36"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<defs>
									<linearGradient id="instagram-gradient-2" x1="0%" y1="100%" x2="100%" y2="0%">
										<stop offset="0%" stopColor="#F09433" />
										<stop offset="30%" stopColor="#E6683C" />
										<stop offset="50%" stopColor="#DC2743" />
										<stop offset="70%" stopColor="#CC2366" />
										<stop offset="100%" stopColor="#BC1888" />
									</linearGradient>
								</defs>
								<path
									d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
									fill="url(#instagram-gradient-2)"
								/>
							</svg>
						</div>
						
						{/* Handle and Title */}
						<div className="space-y-1">
							<h3 className="text-primary-container text-xl md:text-2xl font-bold tracking-tight">
								{data.handle}
							</h3>
							<p className="text-on-surface-variant text-sm font-light">
								{data.subtitle}
							</p>
						</div>
					</div>

					{/* Right: Button "Síguenos en Instagram" */}
					<div className="flex-shrink-0">
						<button
							className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-bold rounded-full group cursor-pointer transition-all duration-300 transform active:scale-95 shadow-md hover:shadow-lg"
							style={{
								background: 'linear-gradient(45deg, #F09433 0%, #DC2743 50%, #BC1888 100%)',
							}}
						>
							<span className="relative px-6 py-3 transition-all ease-in duration-75 bg-white rounded-full group-hover:bg-opacity-0 transition-colors duration-300">
								<span className="bg-gradient-to-r from-[#F09433] via-[#DC2743] to-[#BC1888] bg-clip-text text-transparent font-bold transition-all duration-300 group-hover:text-white">
									{data.followText}
								</span>
							</span>
						</button>
					</div>

				</div>

				{/* Grid of 4 Columns */}
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
					{data.posts.map((post, idx) => (
						<div
							key={idx}
							className="reveal aspect-square w-full rounded-2xl overflow-hidden shadow-md relative group cursor-pointer border border-white/40"
						>
							{/* Square Image */}
							<img
								src={post.image}
								alt={post.alt}
								className="w-full h-full object-cover transition-transform duration-700 ease-in-out transform group-hover:scale-110"
							/>

							{/* Overlay */}
							<div className="absolute inset-0 bg-[#121b30]/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
								<span className="material-symbols-outlined text-4xl text-white animate-bounce select-none">
									favorite
								</span>
								<span className="text-white text-xs font-semibold tracking-wide mt-2">
									Me Gusta
								</span>
							</div>
						</div>
					))}
				</div>

			</div>
		</section>
	)
}
