"use client";

import { useEffect, useState } from "react";
import { Loader } from "@/components/ui/loader/loader";
import { logger } from "@/lib/logger/client";
import type { ProjectCard as ProjectCardType } from "@/types/project.types";
import { BulkActions } from "./bulkActions";
import { ProjectsGrid } from "./projectGrid";
import { ProjectsFilters } from "./projectsFilters";
import styles from "./projectsModule.module.scss";

export const ProjectsModule = () => {
	const [selectedIds, setSelectedIds] = useState<string[]>([]);
	const [projects, setProjects] = useState<ProjectCardType[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadProjects = async () => {
			try {
				const response = await fetch("/api/projects?view=card");

				if (!response.ok) {
					throw new Error("Failed to fetch projects");
				}

				const data = (await response.json()) as ProjectCardType[];

				setProjects(data);
			} catch (error) {
				logger.error(error);
			} finally {
				setLoading(false);
			}
		};

		void loadProjects();
	}, []);

	if (loading) {
		return <Loader label="Cargando proyectos" />;
	}

	return (
		<section className={styles.container}>
			<header className={styles.header}>
				<div>
					<h1>Proyectos</h1>
					<p>Gestiona proyectos y campañas</p>
				</div>

				<button type="button" className={styles.primaryButton}>
					Nuevo Proyecto
				</button>
			</header>

			<ProjectsFilters />

			{selectedIds.length > 0 && <BulkActions count={selectedIds.length} />}

			<ProjectsGrid
				projects={projects}
				selectedIds={selectedIds}
				onSelectionChange={setSelectedIds}
			/>
		</section>
	);
};
