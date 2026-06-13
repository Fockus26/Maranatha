'use client'

import { type ReactElement, useEffect, useRef, useState } from 'react'
import type { SermonesData } from '@/data/home.data'
import type { YoutubeVideo } from '@/lib/api/youtube'

interface Props {
	data: SermonesData
	videos: YoutubeVideo[]
}

export default function SermonesClient({ data, videos }: Props): ReactElement {
	const [activeVideo, setActiveVideo] = useState<string | null>(null)
	const containerRef = useRef<HTMLDivElement>(null)

	const featured = videos[0] || data.featured
	const secundarios = videos.length > 0 ? videos.slice(1) : data.secundarios

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
		<section
			ref={containerRef}
			className="py-24 bg-primary-container w-full text-white"
		>
			<div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
				<div className="text-center mb-16 reveal">
					<h2 className="text-white text-3xl md:text-4xl font-bold tracking-wider uppercase">
						{data.sectionTitle}
					</h2>
					<div className="w-16 h-1 bg-[#e8603a] mx-auto mt-4 rounded-full" />
				</div>

				{featured && (
					<div className="mb-16 reveal">
						<div
							className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10"
							style={{ paddingTop: '56.25%' }}
						>
							<iframe
								src={`https://www.youtube.com/embed/${featured.youtubeId}?controls=1&rel=0&modestbranding=1&enablejsapi=1`}
								title={featured.title}
								className="absolute inset-0 w-full h-full border-none"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							/>

							<div className="absolute inset-0 bg-gradient-to-t from-primary-container via-transparent to-transparent opacity-60 pointer-events-none" />

							<div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 space-y-2 z-10 pointer-events-none">
								<span className="inline-block text-[#bd401d] text-lg font-semibold tracking-wider uppercase bg-[#e8603a]/20 px-3 py-1 rounded-full">
									{featured.series}
								</span>
								<h3 className="text-xl md:text-3xl font-bold leading-tight">
									{featured.title}
								</h3>
								<p className="text-white/70 text-xs md:text-sm font-light flex items-center gap-2">
									<span className="material-symbols-outlined text-sm">
										calendar_today
									</span>
									{featured.date}
								</p>
							</div>
						</div>
					</div>
				)}

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{secundarios.map((sermon, idx) => (
						<div
							key={idx}
							className="reveal flex flex-col group cursor-pointer"
							onClick={() =>
								setActiveVideo(
									`https://www.youtube.com/embed/${sermon.youtubeId}`,
								)
							}
						>
							<div className="relative aspect-video w-full rounded-xl overflow-hidden bg-brand shadow-md border border-white/5 mb-4">
								<iframe
									src={`https://www.youtube.com/embed/${sermon.youtubeId}?controls=0&modestbranding=1&rel=0`}
									title={sermon.title}
									className="absolute inset-0 w-full h-full border-none"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
								/>
							</div>

							<h4 className="text-base font-semibold line-clamp-2 leading-snug text-white group-hover:text-secondary-fixed-dim transition-colors duration-300">
								{sermon.title}
							</h4>

							<div className="flex items-center justify-between mt-2 text-white/50 text-xs font-light">
								<span className="uppercase tracking-wider font-medium text-[10px] text-[#e8603a]">
									{sermon.series}
								</span>
								<span>{sermon.date}</span>
							</div>
						</div>
					))}
				</div>
			</div>

			{activeVideo && (
				<div className="fixed inset-0 bg-brand/90 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all duration-300">
					<div className="relative w-full max-w-4xl bg-brand rounded-2xl overflow-hidden shadow-2xl border border-white/10">
						<button
							onClick={() => setActiveVideo(null)}
							aria-label="Cerrar reproductor"
							className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-20"
						>
							<span className="material-symbols-outlined text-2xl">
								close
							</span>
						</button>

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
