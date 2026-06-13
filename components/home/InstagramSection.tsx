'use client'

import { type ReactElement, useEffect, useRef, useState } from 'react'
import type { InstagramData } from '@/data/home.data'

interface Props {
	data: InstagramData
}

const iconMap: Record<string, ReactElement> = {
	instagram: (
		<svg width="22" height="22" viewBox="0 0 24 24" fill="none">
			<defs>
				<linearGradient
					id="ig-grad"
					x1="0%"
					y1="100%"
					x2="100%"
					y2="0%"
				>
					<stop offset="0%" stopColor="#F09433" />
					<stop offset="50%" stopColor="#DC2743" />
					<stop offset="100%" stopColor="#BC1888" />
				</linearGradient>
			</defs>
			<path
				d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
				fill="url(#ig-grad)"
			/>
		</svg>
	),
	facebook: (
		<svg width="22" height="22" viewBox="0 0 24 24" fill="#1877F2">
			<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
		</svg>
	),
}

export default function InstagramSection({ data }: Props): ReactElement {
	const [activeRed, setActiveRed] = useState(data.redes[0]?.id ?? '')
	const containerRef = useRef<HTMLDivElement>(null)

	const redActiva =
		data.redes.find((r) => r.id === activeRed) ?? data.redes[0]!

	if (!redActiva) return <></>

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
			{ threshold: 0.05 },
		)

		const cards = containerRef.current?.querySelectorAll('.social-card')
		cards?.forEach((el) => observer.observe(el))

		return () => observer.disconnect()
	}, [data, activeRed])

	const postsActivos =
		activeRed === data.redes[0]?.id ? data.posts : data.facebookPosts

	return (
		<section ref={containerRef} className="py-24 bg-surface w-full">
			<div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
				{/* Header */}
				<div className="flex flex-col mb-12 gap-6">
					{/* Fila 1 — título izquierda, toggle centro, espacio derecha */}
					<div className="flex items-center justify-between">
						<div>
							<p className="text-primary-container font-bold text-[2rem]">
								{redActiva?.handle}{' '}
							</p>
							<p className="text-on-surface-variant text-sm">
								{data.subtitle}
							</p>
						</div>

						{/* Toggle centro */}
						<div className="flex items-center gap-2 bg-white rounded-2xl p-2 shadow-sm border border-border">
							{data.redes.map((red) => (
								<button
									key={red.id}
									onClick={() => setActiveRed(red.id)}
									className={`flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-base font-semibold transition-all duration-300 ${
										activeRed === red.id
											? 'bg-primary text-on-surface shadow-sm'
											: 'text-gray-400'
									}`}
								>
									{iconMap[red.id]}
									<span>{red.label}</span>
								</button>
							))}
						</div>
					</div>
				</div>

				{/* Grid de posts */}
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
					{postsActivos.map((post, idx) => (
						<a
							key={`${activeRed}-${idx}`}
							href={post.url}
							target="_blank"
							rel="noopener noreferrer"
							className="social-card w-full rounded-lg overflow-hidden relative group cursor-pointer"
							style={{
								aspectRatio: '4/5',
								transitionDelay: `${idx * 80}ms`,
							}}
						>
							<img
								src={post.image}
								alt={post.alt}
								className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
							/>
							<div className="absolute inset-0 bg-primary-container/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								<span className="material-symbols-outlined text-4xl text-white select-none">
									favorite
								</span>
							</div>
						</a>
					))}
				</div>

				{/* Fila 2 — botón síguenos alineado a la derecha */}
				<div className="flex justify-end mt-8">
					<a
						href={redActiva.url}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 shadow-sm hover:shadow-md"
						style={{
							background: `linear-gradient(white, white) padding-box, ${redActiva.gradient} border-box`,
							border: '2px solid transparent',
						}}
					>
						<span
							className="font-bold bg-clip-text text-transparent"
							style={{ backgroundImage: redActiva.gradient }}
						>
							{redActiva.followText}
						</span>
						<span
							className="material-symbols-outlined text-sm"
							style={{
								color:
									activeRed === data.redes[0]?.id
										? '#DC2743'
										: '#1877F2',
							}}
						>
							open_in_new
						</span>
					</a>
				</div>
			</div>
		</section>
	)
}
