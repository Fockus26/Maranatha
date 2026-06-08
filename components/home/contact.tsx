"use client";

import { Pin } from "iconoir-react";
import Image from "next/image";
import { type ReactElement, useEffect, useRef } from "react";
import { contactData } from "@/data/pages/home/contact.data";
import type { ContactMessages, Modalities } from "@/types/pages/home/contact.types";

interface Props {
	messages: ContactMessages;
}

export function Contact({ messages }: Props): ReactElement {
	const containerRef = useRef<HTMLDivElement>(null);

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
		<section ref={containerRef} className="w-full bg-background pb-24">
			<div className="relative h-[300px] w-full overflow-hidden">
				<Image
					width={500}
					height={500}
					src={contactData.image}
					alt={messages.imageAlt}
					className="w-full h-full object-cover filter grayscale opacity-50 contrast-125"
				/>
				<div className="absolute inset-0 bg-brand/5 pointer-events-none" />
			</div>

			<div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 relative z-20">
				<div className="bg-background rounded-3xl shadow-2xl -mt-20 p-8 md:p-12 lg:p-16 border-3 border-secondary-fixed-dim/15 reveal">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
						<div className="lg:col-span-5 space-y-6">
							<h2 className="text-primary-container text-4xl md:text-5xl font-bold tracking-tight">
								{messages.title}
							</h2>

							<div className="w-12 h-1 bg-secondary rounded-full" />

							{Object.keys(messages.modalities).map((modalityKey) => {
								const modality = modalityKey as Modalities;

								return (
									<div key={crypto.randomUUID()} className="space-y-2 pt-2">
										<span className="block text-secondary font-bold tracking-widest text-xs uppercase">
											{messages.modalities[modality].label}
										</span>
										<p className="text-primary-container text-xl md:text-2xl font-bold">
											{messages.modalities[modality].schedule}
										</p>
									</div>
								);
							})}

							<p className="italic text-on-surface-variant text-sm pt-4 border-i18n border-secondary-fixed-dim/20 flex items-start gap-2">
								<Pin />
								{messages.address}
							</p>
						</div>

						<div className="lg:col-span-7 flex flex-col justify-center">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
								{contactData.info.map((info, index) => (
									<div
										key={crypto.randomUUID()}
										className="flex gap-4 p-4 rounded-2xl hover:bg-surface-container-low transition-colors duration-300 border border-transparent hover:border-secondary-fixed-dim/20"
									>
										<div className="flex-shrink-0 text-secondary">
											<span className="material-symbols-outlined text-[32px] font-light">
												{info.icon}
											</span>
										</div>

										<div className="space-y-1">
											<h4 className="font-bold text-primary-container text-sm uppercase tracking-wide">
												{messages.info[index]?.title}
											</h4>
											<p className="text-on-surface-variant text-xs md:text-sm font-normal break-words max-w-[240px]">
												{info.value}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
