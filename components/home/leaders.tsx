"use client";

import { ArrowLeft, ArrowRight } from "iconoir-react";
import Image from "next/image";
import { type ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button/button";
import { leadersData } from "@/data/pages/home/leaders.data";
import type { LeadersMessages } from "@/types/pages/home/leaders.types";

interface Props {
	messages: LeadersMessages;
}

export function Leaders({ messages }: Props): ReactElement {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [visible, setVisible] = useState(true);

	const containerRef = useRef<HTMLDivElement>(null);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const goToSlide = (index: number): void => {
		if (index === currentIndex) return;

		setVisible(false);

		setTimeout(() => {
			setCurrentIndex(index);
			setVisible(true);
		}, 600);
	};

	const nextLeader = (): void => {
		stopAutoSlide();

		goToSlide(currentIndex === leadersData.length - 1 ? 0 : currentIndex + 1);

		startAutoSlide();
	};

	const prevLeader = (): void => {
		stopAutoSlide();

		goToSlide(currentIndex === 0 ? leadersData.length - 1 : currentIndex - 1);

		startAutoSlide();
	};

	const stopAutoSlide = useCallback((): void => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	}, []);

	const startAutoSlide = useCallback((): void => {
		stopAutoSlide();

		intervalRef.current = setInterval(() => {
			setVisible(false);

			setTimeout(() => {
				// Nota: leadersData.length debe ir en las dependencias si puede cambiar
				setCurrentIndex((prev) => (prev === leadersData.length - 1 ? 0 : prev + 1));
				setVisible(true);
			}, 600);
		}, 30000);
	}, [stopAutoSlide]); // Se recrea solo si leadersData cambia de tamaño

	useEffect(() => {
		startAutoSlide();

		return () => stopAutoSlide();
	}, [startAutoSlide, stopAutoSlide]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("active");
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.2, rootMargin: "0px 0px -80px 0px" },
		);

		const left = containerRef.current?.querySelector(".slide-left");
		const right = containerRef.current?.querySelector(".slide-right");

		if (left) observer.observe(left);
		if (right) observer.observe(right);

		return () => observer.disconnect();
	}, []);

	const displayOpacity = visible ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]";

	const current = leadersData[currentIndex] ?? leadersData[0];

	return (
		<section ref={containerRef} className="pt-16 pb-40 w-full">
			<div className="max-w-360 mx-auto px-6 md:px-12 lg:px-24">
				<div
					className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center transition-all duration-700 ease-in-out ${displayOpacity}`}
				>
					{current && (
						<>
							<div className="lg:col-span-5 relative slide-left flex items-end">
								{/* Cuadro fondo — más atrás y desplazado */}
								<div className="absolute bottom-0 left-4 w-[85%] h-[85%] bg-accent/15 rounded-2xl -z-20 pointer-events-none" />

								{/* Cuadro medio — desplazado un poco */}
								<div className="absolute bottom-4 left-8 w-[85%] h-[85%] bg-accent/25 rounded-2xl -z-10 pointer-events-none" />

								{/* Imagen grande suelta */}
								<Image
									height={500}
									width={500}
									src={current.image}
									alt={messages.items[currentIndex]?.imageAlt ?? ""}
									className="relative w-250 h-auto object-contain object-bottom z-10"
									style={{
										filter: "drop-shadow(0 20px 40px rgba(14, 122, 184, 0.25))",
									}}
								/>
							</div>

							<div className="lg:col-span-7 space-y-6 flex flex-col justify-center slide-right">
								<span className="text-secondary font-bold tracking-[0.2em] text-xs md:text-sm uppercase block">
									{messages.label}
								</span>

								<h2 className="text-primary-container text-4xl md:text-5xl font-bold tracking-tight leading-none">
									{messages.title}
								</h2>

								<h3 className="text-complementary text-xl md:text-2xl font-bold">
									{messages.items[currentIndex]?.name} —{" "}
									<span className="text-sm font-medium text-on-surface-variant/80">
										{messages.items[currentIndex]?.role}
									</span>
								</h3>

								<p className="text-on-surface-variant text-base md:text-lg font-normal leading-relaxed min-h-35">
									{messages.items[currentIndex]?.description}
								</p>

								{leadersData.length > 1 && (
									<div className="flex items-center gap-4 pt-4">
										<Button
											variant="plain"
											tone="secondary"
											icon={<ArrowLeft />}
											onClick={prevLeader}
											className="flex items-center justify-center w-12 h-12 rounded-full border border-secondary text-secondary hover:bg-secondary hover:text-white transition-all duration-300 transform active:scale-90"
										/>

										<Button
											variant="plain"
											tone="secondary"
											icon={<ArrowRight />}
											onClick={nextLeader}
											className="flex items-center justify-center w-12 h-12 rounded-full border border-secondary text-secondary hover:bg-secondary hover:text-white transition-all duration-300 transform active:scale-90"
										/>
									</div>
								)}
							</div>
						</>
					)}
				</div>
			</div>
		</section>
	);
}
