"use client";

import type { ReactElement } from "react";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/ui/icons/socialIcons";
import type { LiderSenior, PastorPrincipal } from "@/data/about.data";

type StaffItem = PastorPrincipal | LiderSenior;

interface Props {
	sectionTitle: string;
	sectionDescription: string;
	items: StaffItem[];
}

export default function StaffGrid({
	sectionTitle,
	sectionDescription,
	items,
}: Props): ReactElement {
	const gridColsClasses =
		{
			1: "max-w-md grid-cols-1",
			2: "max-w-4xl grid-cols-1 sm:grid-cols-2",
			3: "max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
			4: "max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
		}[Math.min(items.length, 4)] || "max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

	return (
		<section className="py-20 w-full select-none">
			<div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col items-center">
				<div className="text-center max-w-2xl mb-16 space-y-4">
					<h2 className="text-2xl md:text-5xl font-bold text-primary-container tracking-tight">
						{sectionTitle}
					</h2>
					<p className="text-on-surface-variant text-base md:text-lg font-light leading-relaxed">
						{sectionDescription}
					</p>
				</div>

				<div className={`grid ${gridColsClasses} gap-8 w-full justify-center`}>
					{items.map((item, idx) => {
						const socialLinks = [
							"instagram" in item &&
								item.instagram && {
									key: "instagram",
									url: item.instagram,
									icon: <InstagramIcon />,
								},
							"facebook" in item &&
								item.facebook && {
									key: "facebook",
									url: item.facebook,
									icon: <FacebookIcon />,
								},
							"tiktok" in item &&
								item.tiktok && {
									key: "tiktok",
									url: item.tiktok,
									icon: <TikTokIcon />,
								},
						].filter(Boolean) as {
							key: string;
							url: string;
							icon: ReactElement;
						}[];

						return (
							<div
								key={idx}
								className="group relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-md bg-zinc-100 dark:bg-zinc-900 transition-all duration-500 hover:scale-[1.01] hover:shadow-xl cursor-pointer"
								style={{
									backgroundImage: `url(${item.image})`,
									backgroundSize: "cover",
									backgroundPosition: "center",
								}}
							>
								<div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95" />

								<div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col justify-end text-white pointer-events-none space-y-1">
									<h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
										{item.name}
									</h3>
									<p className="text-sm md:text-base font-light italic text-white/80 tracking-wide">
										{item.role}
									</p>

									{socialLinks.length > 0 && (
										<div className="flex items-center gap-2 pt-3 mt-2 pointer-events-auto">
											{socialLinks.map((link) => (
												<a
													key={link.key}
													href={link.url}
													target="_blank"
													rel="noopener noreferrer"
													className="text-white/60 hover:text-white transition-colors"
												>
													{link.icon}
												</a>
											))}
										</div>
									)}

									{"description" in item && item.description && (
										<p className="text-xs md:text-sm font-light text-white/75 pt-2 leading-relaxed tracking-wide border-t border-white/10 mt-2">
											{item.description}
										</p>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
