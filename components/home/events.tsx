"use client";

import { ArrowRight, Calendar } from "iconoir-react";
import Image from "next/image";
import { type ReactElement, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button/button";
import { eventsData } from "@/data/pages/home/events.data";
import type { EventsMessages } from "@/types/pages/home/events.types";

interface Props {
	messages: EventsMessages;
}

export function Events({ messages }: Props): ReactElement {
	const containerRef = useRef<HTMLDivElement>(null);

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
			{ threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
		);

		const cards = containerRef.current?.querySelectorAll(".event-card");
		cards?.forEach((el) => {
			observer.observe(el);
		});

		return () => observer.disconnect();
	}, []);

	return (
		<section ref={containerRef} className="py-24 bg-background w-full">
			<div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
				{/* Header */}
				<div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
					<div className="max-w-[700px] space-y-4">
						<div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-secondary text-xs font-bold tracking-wide border-2">
							{messages.label}
						</div>
						<h2 className="text-primary-container text-3xl md:text-4xl font-bold tracking-tight">
							{messages.title}
						</h2>
						<p className="text-on-surface-variant text-base font-light">
							{messages.description}
						</p>
					</div>
					<div className="hidden md:block">
						<Button
							icon={<ArrowRight />}
							style={{
								backgroundColor: "transparent",
								color: "var(--color-secondary)",
							}}
							className="flex items-center gap-2 group text-primary font-semibold text-sm transition-all duration-300 hover:text-accent/85"
						>
							{messages.buttons.viewCalendar}
						</Button>
					</div>
				</div>

				{/* Grid 2x2 estilo Apple */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{eventsData.map((event, index) => {
						return (
							<div
								key={crypto.randomUUID()}
								className={`event-card group relative min-h-[480px] rounded-3xl overflow-hidden flex flex-col items-center justify-between text-center px-10 py-12 cursor-pointer transition-all duration-500 hover:scale-[1.01] ${event.bg}`}
								style={{ transitionDelay: `${index * 120}ms` }}
							>
								{/* Top content */}
								<div className="space-y-3 z-10">
									<span
										className={`inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full ${event.tag}`}
									>
										{messages.items[index]?.category}
									</span>
									<h3
										className={`text-3xl font-bold leading-tight ${event.text}`}
									>
										{messages.items[index]?.title}
									</h3>
									<p
										className={`text-base font-light leading-relaxed max-w-xs mx-auto ${event.muted}`}
									>
										{messages.items[index]?.description}
									</p>
									<div
										className={`flex items-center justify-center gap-2 text-sm font-medium pt-1 ${event.muted}`}
									>
										<Calendar />
										{messages.items[index]?.date}
									</div>

									{/* Botones estilo Apple */}
									<div className="flex items-center justify-center gap-3 pt-2">
										<Button
											className="bg-primary text-white rounded-full px-6 py-2 text-sm font-semibold hover:bg-primary/85 transition-all duration-300"
											style={{ backgroundColor: "var(--color-background)" }}
										>
											{messages.buttons.moreInfo}
										</Button>
										<Button
											className="border border-primary text-white rounded-full px-6 py-2 text-sm font-semibold hover:bg-primary/10 transition-all duration-300"
											style={{ backgroundColor: "var(--color-background)" }}
										>
											{messages.buttons.register}
										</Button>
									</div>
								</div>

								{/* Imagen centrada abajo */}
								<div className="w-full flex items-end justify-center mt-8 z-10">
									<Image
										width={500}
										height={500}
										src={event.image}
										alt={messages.items[index]?.category ?? ""}
										className="max-h-[220px] w-auto object-contain transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-2 drop-shadow-2xl"
									/>
								</div>
							</div>
						);
					})}
				</div>

				{/* Mobile button */}
				<div className="mt-8 text-center md:hidden">
					<Button
						icon={<ArrowRight />}
						className="inline-flex items-center gap-2 text-primary font-semibold text-sm"
					>
						{messages.buttons.viewCalendar}
					</Button>
				</div>
			</div>
		</section>
	);
}
