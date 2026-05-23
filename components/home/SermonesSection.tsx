'use client'

import { type ReactElement, useEffect, useRef, useState } from 'react'
import type { SermonesData } from '@/data/home.data'

interface Props {
	data: SermonesData
}

export default function SermonesSection({ data }: Props): ReactElement {
	const [activeVideo, setActiveVideo] = useState<string | null>(null)
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
		<section ref={containerRef} className="py-24 bg-primary-container w-full text-white">
			<div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
				
				{/* Section Header */}
				<div className="text-center mb-16 reveal">
					<h2 className="text-white text-3xl md:text-4xl font-bold tracking-wider uppercase">
						{data.sectionTitle}
					</h2>
					<div className="w-16 h-1 bg-secondary mx-auto mt-4 rounded-full" />
				</div>

				{/* Main Featured Video Card */}
				<div className="mb-16 reveal">
					<div
						className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 group cursor-pointer"
						onClick={() => setActiveVideo(`https://www.youtube.com/embed/${data.featured.youtubeId}`)}
					>
						{/* Thumbnail image with 60% opacity */}
						<img
							src={data.featured.thumbnail}
							alt={data.featured.title}
							className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 ease-in-out group-hover:scale-105"
						/>

						{/* Dark bottom gradient overlay */}
						<div className="absolute inset-0 bg-gradient-to-t from-brand via-transparent to-transparent opacity-80" />

						{/* Play Button */}
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="w-20 h-20 rounded-full bg-secondary/90 flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:bg-secondary group-hover:shadow-secondary/30">
								<span className="material-symbols-outlined text-4xl text-white pl-1 select-none">
									play_arrow
								</span>
							</div>
						</div>

						{/* Content Overlay */}
						<div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 space-y-2 z-10">
							<span className="inline-block text-secondary-fixed-dim text-xs font-semibold tracking-wider uppercase bg-secondary/20 px-3 py-1 rounded-full">
								SERIE: {data.featured.series}
							</span>
							<h3 className="text-xl md:text-3xl font-bold leading-tight group-hover:text-secondary-fixed-dim transition-colors duration-300">
								{data.featured.title}
							</h3>
							<p className="text-white/70 text-xs md:text-sm font-light flex items-center gap-2">
								<span className="material-symbols-outlined text-sm">calendar_today</span>
								{data.featured.date}
							</p>
						</div>
					</div>
				</div>

				{/* Grid of Secondary Videos */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{data.secundarios.map((sermon, idx) => (
						<div
							key={idx}
							className="reveal flex flex-col group cursor-pointer"
							onClick={() => setActiveVideo(`https://www.youtube.com/embed/${sermon.youtubeId}`)}
						>
							{/* Thumbnail with hover overlays */}
							<div className="relative aspect-video w-full rounded-xl overflow-hidden bg-brand shadow-md border border-white/5 mb-4">
								<img
									src={sermon.thumbnail}
									alt={sermon.title}
									className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-all duration-500 ease-in-out group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-brand/60 to-transparent" />
								
								{/* play_circle appears on hover */}
								<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-brand/20">
									<span className="material-symbols-outlined text-5xl text-white transform scale-90 group-hover:scale-100 transition-transform duration-300 select-none">
										play_circle
									</span>
								</div>
							</div>

							{/* Title */}
							<h4 className="text-base font-semibold line-clamp-2 leading-snug text-white group-hover:text-secondary-fixed-dim transition-colors duration-300">
								{sermon.title}
							</h4>

							{/* Series & Date */}
							<div className="flex items-center justify-between mt-2 text-white/50 text-xs font-light">
								<span className="uppercase tracking-wider font-medium text-[10px] text-secondary-fixed-dim">
									{sermon.series}
								</span>
								<span>{sermon.date}</span>
							</div>
						</div>
					))}
				</div>

			</div>

			{/* Video Modal Player */}
			{activeVideo && (
				<div className="fixed inset-0 bg-brand/90 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all duration-300">
					<div className="relative w-full max-w-4xl bg-brand rounded-2xl overflow-hidden shadow-2xl border border-white/10">
						{/* Close button */}
						<button
							onClick={() => setActiveVideo(null)}
							aria-label="Cerrar reproductor"
							className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-20"
						>
							<span className="material-symbols-outlined text-2xl">close</span>
						</button>

						{/* Iframe */}
						<div className="aspect-video w-full bg-black">
							<iframe
								src={activeVideo}
								title="Sermón Video"
								className="w-full h-full border-none"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							/>
						</div>
					</div>
				</div>
			)}
		</section>
	)
}
