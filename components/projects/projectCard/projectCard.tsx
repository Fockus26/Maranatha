"use client";

import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
import { MoreVert } from "iconoir-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
	type ReactElement,
	type MouseEvent as ReactMouseEvent,
	useEffect,
	useRef,
	useState,
} from "react";
import { CardBulkActions } from "@/components/projects/projectCard/cardBulkActions/cardBulkActions";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import { ProgressBar } from "@/components/ui/progressBar/progressBar";
import { PROJECT_STATUSES, type ProjectCard as ProjectCardType } from "@/types/project.types";
import styles from "./projectCard.module.scss";

interface Props {
	project: ProjectCardType;
	selected: boolean;
	selectionMode: boolean;
	onSelect: () => void;
}

export const ProjectCard = ({
	project,
	selected,
	onSelect,
	selectionMode,
}: Props): ReactElement => {
	const router = useRouter();

	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	const progress =
		project.currentPhase.targetAmount > 0
			? (project.currentPhase.currentAmount / project.currentPhase.targetAmount) * 100
			: 0;

	const status = PROJECT_STATUSES[project.currentPhase.status].label;
	const isCompleted = status === "Completed";

	useEffect(() => {
		if (!menuOpen) return;

		const handleClickOutside = (e: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setMenuOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [menuOpen]);

	const handleMenuClick = (e: ReactMouseEvent) => {
		e.stopPropagation();
		setMenuOpen((prev) => !prev);
	};

	const openBulkActions = menuOpen && !selected && !selectionMode;

	const handleCardClick = () => {
		if (selectionMode) {
			onSelect();
			return;
		}

		router.push(`/dashboard/projects/${project.id}`);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key !== "Enter" && e.key !== " ") return;

		e.preventDefault();

		if (selectionMode) {
			onSelect();
			return;
		}

		router.push(`/dashboard/projects/${project.id}`);
	};

	const selectableProps = {
		role: "button" as const,
		tabIndex: 0,
		onClick: handleCardClick,
		onKeyDown: handleKeyDown,
	};

	return (
		<article className={clsx(styles.card, selected && styles.selected)} {...selectableProps}>
			<div className={styles.imageWrapper}>
				<Checkbox
					tone="primary"
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

				<div className={clsx(styles.status)}>
					<Badge tone={isCompleted ? "success" : "warning"}>{status}</Badge>
				</div>

				<div ref={menuRef} className={styles.menuWrapper}>
					<Button
						icon={<MoreVert />}
						variant="plain"
						className={clsx(styles.menu)}
						disabled={selectionMode}
						onClick={handleMenuClick}
					/>

					<AnimatePresence>{openBulkActions && <CardBulkActions />}</AnimatePresence>
				</div>
			</div>

			<div className={styles.content}>
				<Badge
					tone={
						project.category === "EEC"
							? "success"
							: project.category === "GJEF"
								? "accent"
								: "secondary"
					}
				>
					{project.category}
				</Badge>

				<div className={styles.contentBody}>
					<h3>{project.title}</h3>

					<p>{project.shortDescription}</p>
				</div>

				<div className={styles.progressWrapper}>
					<div className={styles.progressTrack}>
						<ProgressBar
							value={progress}
							tone={progress === 100 ? "success" : "primary"}
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
