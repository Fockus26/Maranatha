'use client'

import { type ReactElement, useState, useRef, useEffect } from 'react'
import type { CarouselItem } from '@/data/events.data'

interface Props {
	items: CarouselItem[]
}

export default function EventsCarousel({ items }: Props): ReactElement {
	const [activeIndex, setActiveIndex] = useState(0)
	const carouselRef = useRef<HTMLDivElement>(null)

	// Estados para controlar la visibilidad de las flechas al inicio y al final
	const [showLeftArrow, setShowLeftArrow] = useState(false)
	const [showRightArrow, setShowRightArrow] = useState(items.length > 1)

	const updateArrowVisibility = (scrollLeft: number, maxScroll: number) => {
		// Tolerancia de 2px para evitar fallos de redondeo en pantallas con zoom o decimales
		setShowLeftArrow(scrollLeft > 2)
		setShowRightArrow(scrollLeft < maxScroll - 2)
	}

	const handleScroll = () => {
		if (!carouselRef.current) return
		const { scrollLeft, clientWidth, scrollWidth } = carouselRef.current

		// 1. Detectar el índice activo actual
		const newIndex = Math.round(scrollLeft / clientWidth)
		if (
			newIndex !== activeIndex &&
			newIndex >= 0 &&
			newIndex < items.length
		) {
			setActiveIndex(newIndex)
		}

		// 2. Evaluar visibilidad de las flechas según límites físicos de scroll
		const maxScroll = scrollWidth - clientWidth
		updateArrowVisibility(scrollLeft, maxScroll)
	}

	const scrollToSlide = (index: number) => {
		if (!carouselRef.current) return
		const width = carouselRef.current.clientWidth
		carouselRef.current.scrollTo({
			left: width * index,
			behavior: 'smooth',
		})
		setActiveIndex(index)
	}

	const nextSlide = () => {
		if (activeIndex < items.length - 1) {
			scrollToSlide(activeIndex + 1)
		}
	}

	const prevSlide = () => {
		if (activeIndex > 0) {
			scrollToSlide(activeIndex - 1)
		}
	}

	// Efecto inicial para validar si el contenido inicial desborda o no
	useEffect(() => {
		if (carouselRef.current) {
			const { scrollLeft, clientWidth, scrollWidth } = carouselRef.current
			updateArrowVisibility(scrollLeft, scrollWidth - clientWidth)
		}
	}, [items])

	return (
		<section className="w-full bg-background pt-20">
			<div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 relative group/container">
				{/* Contenedor relativo del Carrusel para posicionar las flechas absolutas */}
				<div className="relative w-full">
					{/* Flecha Izquierda (Oculta en el primer slide) */}
					{showLeftArrow && (
						<button
							onClick={prevSlide}
							className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-[#e8603a] text-white backdrop-blur-sm rounded-full shadow-md flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
							aria-label="Slide anterior"
						>
							<ChevronLeftIcon />
						</button>
					)}

					{/* Flecha Derecha (Oculta en el último slide) */}
					{showRightArrow && (
						<button
							onClick={nextSlide}
							className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-[#e8603a] text-white backdrop-blur-sm rounded-full shadow-md flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
							aria-label="Siguiente slide"
						>
							<ChevronRightIcon />
						</button>
					)}

					{/* Contenedor del Carrusel Scrollable */}
					<div
						ref={carouselRef}
						onScroll={handleScroll}
						className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-6 pb-4"
						style={{ scrollbarWidth: 'none' }}
					>
						{items.map((item, idx) => (
							<div
								key={idx}
								className="min-w-full md:min-w-[calc(100%-48px)] lg:min-w-[1024px] aspect-[16/10] md:aspect-[16/9] lg:h-[580px] snap-center relative rounded-2xl overflow-hidden group cursor-pointer border border-zinc-200/50"
							>
								{/* Renderizado de Imágenes Adaptativo (Tesla Style) */}
								<picture className="absolute inset-0 w-full h-full">
									<source
										srcSet={item.imageMobile}
										media="(max-width: 767px)"
									/>
									<img
										src={item.imageDesktop}
										alt={item.title}
										className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
									/>
								</picture>

								{/* Scrim Oscuro Inferior para asegurar legibilidad */}
								<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:via-black/30" />

								{/* Contenido Textual y CTAs (Posicionados abajo a la izquierda) */}
								<div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 lg:p-16 text-white z-10">
									<h2 className="text-3xl md:text-4xl lg:text-[48px] font-bold tracking-tight leading-tight mb-2">
										{item.title}
									</h2>
									<p className="text-sm md:text-base lg:text-lg text-zinc-200 max-w-xl font-normal">
										{item.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Indicadores de Pagina / Dots inferiores */}
				<div className="flex justify-center items-center gap-3 mt-4">
					{items.map((_, idx) => (
						<button
							key={idx}
							onClick={() => scrollToSlide(idx)}
							className={`h-1.5 rounded-full transition-all duration-300 ${
								activeIndex === idx
									? 'w-8 bg-[#e8603a]'
									: 'w-2 bg-[#e8603a]/30 hover:bg-[#e8603a]/60'
							}`}
							aria-label={`Ir al slide ${idx + 1}`}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

// Subcomponentes de Iconos Locales para los chevrons
function ChevronLeftIcon(): ReactElement {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<polyline points="15 18 9 12 15 6" />
		</svg>
	)
}

function ChevronRightIcon(): ReactElement {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<polyline points="9 18 15 12 9 6" />
		</svg>
	)
}