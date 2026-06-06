"use client";

import Image from "next/image";
import { type ReactElement, useEffect, useRef } from "react";
import { valuesData } from "@/data/pages/home/values.data";
import type { ValuesMessages } from "@/types/pages/home/values.types";

interface Props {
	messages: ValuesMessages;
}

export function Values({ messages }: Props): ReactElement {
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
			{ threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
		);

		const cards = containerRef.current?.querySelectorAll(".value-card");
		cards?.forEach((el) => {
			observer.observe(el);
		});

		return () => observer.disconnect();
	}, []);

	return (
		<section ref={containerRef} className="py-24 bg-background w-full">
			<div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
				<div className="text-center mb-16">
					<h2 className="text-primary-container text-3xl md:text-4xl font-bold tracking-wider uppercase">
						{messages.title}
					</h2>
					<div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full" />
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{valuesData.map((value, index) => (
						<div
							key={crypto.randomUUID()}
							className="value-card group relative min-h-[420px] rounded-2xl overflow-hidden cursor-default hover:scale-[1.02] transition-all duration-500"
							style={{ transitionDelay: `${index * 150}ms` }}
						>
							{/* Imagen de fondo */}
							<div
								className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
								style={{ backgroundImage: `url(${value.image})` }}
							/>
							<div className="text-center mb-16">
								<h2 className="text-primary-container text-3xl md:text-4xl font-bold tracking-wider uppercase">
									{messages.title}
								</h2>
								<div className="w-16 h-1 bg-[#e8603a] mx-auto mt-4 rounded-full" />
							</div>

							{/* Overlay */}
							<div className="absolute inset-0 bg-gradient-to-i18n from-primary-container via-primary-container/50 to-transparent" />

							{/* Contenido */}
							<div className="absolute bottom-0 left-0 right-0 p-8 space-y-3">
								{/* Icono */}
								<div className="flex items-center justify-center w-11 h-11 rounded-full bg-[#e8603a] text-white mb-2">
									{value.icon.startsWith("/") ? (
										<Image
											width={300}
											height={300}
											src={value.icon}
											alt={messages.items[index]?.imageAlt ?? ""}
											className="w-6 h-6 object-contain"
										/>
									) : (
										<span className="material-symbols-outlined text-2xl">
											{value.icon}
										</span>
									)}
								</div>
								<h3 className="text-white text-xl font-bold tracking-wide">
									{messages.items[index]?.title}
								</h3>
								<p className="text-white/75 text-sm leading-relaxed max-w-sm">
									{messages.items[index]?.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
