"use client";

import { Calendar, Xmark } from "iconoir-react";
import { type ReactElement, useEffect, useRef, useState } from "react";
import { Button } from "@/components/UI/Button/Button";
import { sermonsData } from "@/data/pages/home/sermons.data";
import type { SermonsMessages } from "@/types/pages/home/sermons.types";
import type { YoutubeVideo } from "@/types/youtube.types";

interface Props {
	messages: SermonsMessages;
	videos: YoutubeVideo[];
}

export function Sermons({ videos, messages }: Props): ReactElement {
	const [activeVideo, setActiveVideo] = useState("");
	const containerRef = useRef<HTMLDivElement>(null);
	const featured = videos[0] || sermonsData.featured;
	const secondary = videos.length > 0 ? videos.slice(1) : sermonsData.secondary;

	useEffect(() => {
		const observerOptions = {
			root: null,
			rootMargin: "0px",
			threshold: 0.05,
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("revealed");
					observer.unobserve(entry.target);
				}
			});
		}, observerOptions);

		const revealElements = containerRef.current?.querySelectorAll(".reveal");
		revealElements?.forEach((el) => {
			observer.observe(el);
		});

		return () => observer.disconnect();
	}, []);

	return (
		<section ref={containerRef} className="py-24 bg-primary-container w-full text-white">
			<div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
				<div className="text-center mb-16 reveal">
					<h2 className="text-white text-3xl md:text-4xl font-bold tracking-wider uppercase">
						{messages.title}
					</h2>
					<div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full" />
				</div>

				{featured && (
					<div className="mb-16 reveal">
						<div
							className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10"
							style={{ paddingTop: "56.25%" }}
						>
							<iframe
								src={`https://www.youtube.com/embed/${featured.youtubeId}?controls=1&rel=0&modestbranding=1&enablejsapi=1`}
								title={messages.featured.title}
								className="absolute inset-0 w-full h-full border-none"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							/>

							<div className="absolute inset-0 bg-gradient-to-i18n from-primary-container via-transparent to-transparent opacity-60 pointer-events-none" />

							<div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 space-y-2 z-10 pointer-events-none">
								<span className="inline-block text-secondary-fixed-dim text-xs font-semibold tracking-wider uppercase bg-accent/20 px-3 py-1 rounded-full">
									{messages.featured.series}
								</span>
								<h3 className="text-xl md:text-3xl font-bold leading-tight">
									{messages.featured.title}
								</h3>
								<p className="text-white/70 text-xs md:text-sm font-light flex items-center gap-2">
									<Calendar />
									{messages.featured.date}
								</p>
							</div>
						</div>
					</div>
				)}

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{secondary.map((sermon, index) => (
						<Button
							key={crypto.randomUUID()}
							className="reveal flex flex-col group cursor-pointer"
							onClick={() =>
								setActiveVideo(`https://www.youtube.com/embed/${sermon.youtubeId}`)
							}
						>
							<div className="relative aspect-video w-full rounded-xl overflow-hidden bg-brand shadow-md border border-white/5 mb-4">
								<iframe
									src={`https://www.youtube.com/embed/${sermon.youtubeId}?controls=0&modestbranding=1&rel=0`}
									title={messages.secondary[index]?.title}
									className="absolute inset-0 w-full h-full border-none"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
								/>
							</div>

							<h4 className="text-base font-semibold line-clamp-2 leading-snug text-white group-hover:text-secondary-fixed-dim transition-colors duration-300">
								{messages.secondary[index]?.title}
							</h4>

							<div className="flex items-center justify-between mt-2 text-white/50 text-xs font-light">
								<span className="uppercase tracking-wider font-medium text-[10px] text-secondary-fixed-dim">
									{messages.secondary[index]?.series}
								</span>
								<span>{messages.secondary[index]?.date}</span>
							</div>
						</Button>
					))}
				</div>
			</div>

			{activeVideo && (
				<div className="fixed inset-0 bg-brand/90 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all duration-300">
					<div className="relative w-full max-w-4xl bg-brand rounded-2xl overflow-hidden shadow-2xl border border-white/10">
						<Button
							icon={<Xmark />}
							onClick={() => setActiveVideo("")}
							className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-20"
						/>

						<div className="aspect-video w-full bg-black">
							<iframe
								src={activeVideo}
								title={messages.featured.title}
								className="w-full h-full border-none"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							/>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}
