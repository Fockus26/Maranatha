"use client";

import { NavArrowLeft, NavArrowRight } from "iconoir-react";
import Image from "next/image";
import type { ReactElement } from "react";
import { useRef } from "react";
import { Button } from "@/components/ui/button/button";
import styles from "./gallery.module.scss";

type Props = {
	images: string[];
};

export const Gallery = ({ images }: Props): ReactElement | null => {
	const trackRef = useRef<HTMLDivElement>(null);

	if (images.length === 0) {
		return null;
	}

	const scrollBy = (direction: 1 | -1) => {
		const track = trackRef.current;

		if (!track) {
			return;
		}

		track.scrollBy({ left: direction * track.clientWidth * 0.9, behavior: "smooth" });
	};

	return (
		<div className={styles.gallery}>
			<div className={styles.track} ref={trackRef}>
				{images.map((src, index) => (
					<div className={styles.slide} key={src}>
						<Image
							fill
							src={src}
							alt={`Imagen ${index + 1} de la fase`}
							sizes="(max-width: 768px) 100vw, 600px"
						/>
					</div>
				))}
			</div>

			{images.length > 1 && (
				<div className={styles.controls}>
					<Button
						variant="plain"
						icon={<NavArrowLeft />}
						onClick={() => scrollBy(-1)}
						aria-label="Imagen anterior"
					/>

					<Button
						variant="plain"
						icon={<NavArrowRight />}
						onClick={() => scrollBy(1)}
						aria-label="Siguiente imagen"
					/>
				</div>
			)}
		</div>
	);
};
