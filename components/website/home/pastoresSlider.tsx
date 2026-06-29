"use client";

import { type ReactElement, useEffect, useRef, useState } from "react";
import type { PastoresData, PastorItem } from "@/data/home.data";

interface Props {
	data: PastoresData;
}

export default function PastoresSlider({ data }: Props): ReactElement {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [visible, setVisible] = useState(true);
	const containerRef = useRef<HTMLDivElement>(null);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const goToSlide = (index: number) => {
		if (index === currentIndex) return;
		setVisible(false);
		setTimeout(() => {
			setCurrentIndex(index);
			setVisible(true);
		}, 600);
	};

	const startAutoSlide = () => {
		stopAutoSlide();
		intervalRef.current = setInterval(() => {
			setVisible(false);
			setTimeout(() => {
				setCurrentIndex((prev) => (prev === data.items.length - 1 ? 0 : prev + 1));
				setVisible(true);
			}, 600);
		}, 30000);
	};

	const stopAutoSlide = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	useEffect(() => {
		startAutoSlide();
		return () => stopAutoSlide();
	}, [data.items.length]);

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
	}, [currentIndex, data]);

	const displayOpacity = visible ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]";

	const current = (data.items[currentIndex] ?? data.items[0]) as PastorItem;

	return (
		<section ref={containerRef} className="pt-16 pb-40 w-full">
			<div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
					<div
						className={`col-span-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center transition-all duration-900 ease-in-out ${displayOpacity}`}
					>
						<div className="lg:col-span-5 relative slide-left flex items-end self-end">
							<div className="absolute bottom-0 left-4 w-[85%] h-[85%] bg-[#121b30] rounded-2xl -z-20 pointer-events-none" />
							<div className="absolute bottom-4 left-8 w-[85%] h-[85%] bg-[#121b30]/30 rounded-2xl -z-10 pointer-events-none" />
							<img
								src={current.image}
								alt={current.name}
								className="relative w-[1000px] h-auto object-contain object-bottom z-10"
								style={{
									filter: "drop-shadow(0 20px 40px rgba(14, 122, 184, 0.25))",
								}}
							/>
						</div>

						<div className="lg:col-span-7 space-y-6 flex flex-col justify-center slide-right">
							<span className="text-brand	 font-bold tracking-[0.2em] text-xs md:text-sm uppercase block">
								{data.sectionLabel}
							</span>

							<h2 className="text-xl md:text-4xl font-bold text-brand">
								{current.name} |{" "}
								<span className="text-lg md:text-1xl font-medium text-on-surface-variant/80">
									{current.role}
								</span>
							</h2>

							<p className="text-on-surface-variant text-base md:text-lg font-normal leading-relaxed min-h-[140px] whitespace-pre-line">
								{current.description}
							</p>

							{data.items.length > 1 && (
								<div className=" flex gap-3 pt-4">
									<button
										onClick={() =>
											goToSlide(
												currentIndex === data.items.length - 1
													? 0
													: currentIndex + 1,
											)
										}
										aria-label="Siguiente pastor"
										className="group flex items-center gap-2 px-5 py-2.5 rounded-full !bg-[#012650] text-white cursor-pointer"
										style={{
											fontWeight: 600,
											alignItems: "end",
											fontSize: "15px",
										}}
									>
										Nuestros pastores
										<svg
											className="transition-transform duration-300 group-hover:translate-x-1"
											width="18"
											height="18"
											viewBox="0 0 24 24"
											fill="none"
											stroke="white"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<path d="M5 12h14M12 5l7 7-7 7" />
										</svg>
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
