"use client";

import type { ReactElement } from "react";
import { ProjectCard } from "./projectCard";
import styles from "./projectsModule.module.scss";

type Project = {
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

type Props = {
	projects: Project[];
	selectedIds: string[];
	onSelectionChange: (ids: string[]) => void;
};

export const ProjectsGrid = ({ projects, selectedIds, onSelectionChange }: Props): ReactElement => {
	const toggleSelection = (id: string) => {
		if (selectedIds.includes(id)) {
			onSelectionChange(selectedIds.filter((selectedId) => selectedId !== id));

			return;
		}

		onSelectionChange([...selectedIds, id]);
	};

	return (
		<div className={styles.grid}>
			{projects.map((project) => (
				<ProjectCard
					key={project.id}
					project={project}
					selected={selectedIds.includes(project.id)}
					onSelect={() => toggleSelection(project.id)}
				/>
			))}
		</div>
	);
};
