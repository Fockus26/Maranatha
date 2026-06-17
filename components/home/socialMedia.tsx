"use client";

import { OpenInBrowser, Star } from "iconoir-react";
import Image from "next/image";
import { type ReactElement, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button/button";
import { socialMediaData } from "@/data/pages/home/socialMedia.data";
import type {
	Networks,
	SocialMediaMessages,
	SocialMediaNetwork,
} from "@/types/pages/home/socialMedia.types";

interface Props {
	messages: SocialMediaMessages;
}

export function SocialMedia({ messages }: Props): ReactElement | null {
	const [activeNetworkId, setActiveNetworkId] = useState<Networks>("instagram");
	const activeNetwork: SocialMediaNetwork = socialMediaData[activeNetworkId];

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
			{ threshold: 0.05 },
		);

		const cards = containerRef.current?.querySelectorAll(".social-card");
		cards?.forEach((el) => {
			observer.observe(el);
		});

		return () => observer.disconnect();
	}, []);

	const containerRef = useRef<HTMLDivElement>(null);

	return (
		<section ref={containerRef} className="py-24 bg-surface w-full">
			<div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
				{/* Header */}
				<div className="flex flex-col mb-12 gap-6">
					{/* Fila 1 — título izquierda, toggle centro, espacio derecha */}
					<div className="flex items-center justify-between">
						<div>
							<p className="text-primary-container font-bold text-[2rem]">
								{activeNetwork.account}
							</p>
							<p className="text-on-surface-variant text-sm">{messages.title}</p>
						</div>

						{/* Toggle centro */}
						<div className="flex items-center gap-2 bg-white rounded-2xl p-2 shadow-sm border border-border">
							{Object.entries(socialMediaData).map(([networkKey, network]) => {
								const Icon = network.icon;

								return (
									<Button
										variant="plain"
										tone="primary"
										icon={<Icon />}
										key={crypto.randomUUID()}
										onClick={() => setActiveNetworkId(networkKey as Networks)}
										className={
											"flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-background font-semibold transition-all duration-300"
										}
									>
										{network.label}
									</Button>
								);
							})}
						</div>
					</div>
				</div>

				{/* Grid de posts */}
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
					{activeNetwork.items.map((post, index) => (
						<a
							key={crypto.randomUUID()}
							href={post.url}
							target="_blank"
							rel="noopener noreferrer"
							className="social-card w-full rounded-lg overflow-hidden relative group cursor-pointer"
							style={{
								aspectRatio: "4/5",
								transitionDelay: `${index * 80}ms`,
							}}
						>
							<Image
								width={500}
								height={500}
								src={post.image}
								alt={
									messages.networks[activeNetworkId].items[index]?.imageAlt ?? ""
								}
								className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
							/>
							<div className="absolute inset-0 bg-primary-container/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								<Star />
							</div>
						</a>
					))}
				</div>

				{/* Fila 2 — botón síguenos alineado a la derecha */}
				<div className="flex justify-end mt-8">
					<a
						href={activeNetwork.url}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 shadow-sm hover:shadow-md"
						style={{
							background: `linear-gradient(white, white) padding-box, ${activeNetwork.gradient} border-box`,
							border: "2px solid transparent",
						}}
					>
						<span
							className="font-bold bg-clip-text text-transparent"
							style={{ backgroundImage: activeNetwork.gradient }}
						>
							{messages.networks[activeNetworkId].follow}
						</span>
						<OpenInBrowser style={{ color: activeNetwork.color }} />
					</a>
				</div>
			</div>
		</section>
	);
}
