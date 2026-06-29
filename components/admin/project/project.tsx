"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Gallery } from "@/components/admin/project/gallery/gallery";
import { ProjectSidebar } from "@/components/admin/project/projectSidebar/projectSidebar";
import { Team } from "@/components/admin/project/team/team";
import { Fallback } from "@/components/ui/fallback/fallback";
import { Loader } from "@/components/ui/loader/loader";
import { formatDateES } from "@/lib/utils/date";
import { useGetProjectByIdQuery } from "@/store/api/projectsApi";
import styles from "./project.module.scss";

type Props = {
	id: string;
};

export function Project({ id }: Props) {
	const {
		data: project,
		isLoading,
		isError,
	} = useGetProjectByIdQuery(id, {
		skip: !id,
	});

	const [selectedPhaseId, setSelectedPhaseId] = useState("");

	useEffect(() => {
		if (project) {
			setSelectedPhaseId(project.currentPhaseId);
		}
	}, [project]);

	if (isLoading) {
		return <Loader label="Cargando Proyecto" />;
	}

	if (isError || !project) {
		return <Fallback title="Proyecto no encontrado" />;
	}

	const selectedPhase = project.phases.find((phase) => phase.id === selectedPhaseId);

	if (!selectedPhase) {
		return <Fallback title="Este proyecto no tiene fases" />;
	}

	const { currentAmount, targetAmount, startDate, endDate, team, images } = selectedPhase;

	const progress = targetAmount > 0 ? (currentAmount / targetAmount) * 100 : 0;

	const wasUpdated = project.updatedAt !== project.createdAt;

	return (
		<main className={styles.project}>
			<header className={styles.hero}>
				<Image fill priority src={project.image} alt={project.title} />

				<div className={styles.overlay}>
					<h1>{project.title}</h1>
					<p>{project.shortDescription}</p>

					<div className={styles.heroDates}>
						<span>Inicio de fase: {formatDateES(startDate)}</span>
						<span>Cierre estimado: {formatDateES(endDate)}</span>
					</div>
				</div>
			</header>

			<div className={styles.body}>
				<section className={styles.content}>
					{wasUpdated && (
						<span className={styles.updatedAt}>
							Actualizado el {formatDateES(project.updatedAt)}
						</span>
					)}

					<p className={styles.aboutProject}>{project.description}</p>

					<h2>{selectedPhase.title}</h2>
					<p>{selectedPhase.description}</p>

					<Gallery images={images} />

					<Team members={team} />
				</section>

				<aside className={styles.sidebar}>
					<ProjectSidebar
						project={project}
						selectedPhase={selectedPhase}
						onSelectPhase={setSelectedPhaseId}
						progress={progress}
					/>
				</aside>
			</div>
		</main>
	);
}
