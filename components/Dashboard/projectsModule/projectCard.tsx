"use client";

import Image from "next/image";
import type { ReactElement } from "react";
import styles from "./projectsModule.module.scss";

type Props = {
	project: {
		id: string;
		title: string;
		shortDescription: string;
		category: string;
		image: string;
		status: string;
		currentPhase: {
			targetAmount: number;
			currentAmount: number;
			endDate: string;
		};
	};
	selected: boolean;
	onSelect: () => void;
};

export const ProjectCard = ({ project, selected, onSelect }: Props): ReactElement => {
	const progress =
		project.currentPhase.targetAmount > 0
			? (project.currentPhase.currentAmount / project.currentPhase.targetAmount) * 100
			: 0;

	return (
		<article className={`${styles.card} ${selected ? styles.selected : ""}`}>
			<div className={styles.imageWrapper}>
				<input
					type="checkbox"
					checked={selected}
					onChange={onSelect}
					className={styles.checkbox}
				/>

				<Image
					src={project.image}
					width={0}
					height={0}
					sizes="100vw"
					alt={project.title}
					className={styles.image}
				/>

				<div
					className={`${styles.status} ${
						project.status === "COMPLETED" ? styles.completed : styles.inProgress
					}`}
				>
					{project.status === "COMPLETED" ? "Completado" : "En progreso"}
				</div>

				<button type="button" className={styles.menu}>
					<span className="material-symbols-outlined">more_vert</span>
				</button>
			</div>

			<div className={styles.content}>
				<span className={styles.category}>{project.category}</span>

				<h3>{project.title}</h3>

				<p>{project.shortDescription}</p>

				<div className={styles.progressWrapper}>
					<div className={styles.progressTrack}>
						<div
							className={styles.progressFill}
							style={{
								width: `${Math.min(progress, 100)}%`,
							}}
						/>
					</div>

					<span>{progress.toFixed(0)}%</span>
				</div>

				<div className={styles.amounts}>
					<div>
						<strong>${project.currentPhase.currentAmount.toLocaleString()}</strong>

						<span>Recaudado</span>
					</div>

					<div>
						<strong>${project.currentPhase.targetAmount.toLocaleString()}</strong>

						<span>Meta</span>
					</div>
				</div>
			</div>
		</article>
	);
};
