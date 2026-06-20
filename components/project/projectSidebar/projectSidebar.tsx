import type { ReactElement } from "react";
import { Badge } from "@/components/ui/badge/badge";
import { ProgressBar } from "@/components/ui/progressBar/progressBar";
import { Select } from "@/components/ui/select/select";
import {
	PROJECT_CATEGORIES,
	PROJECT_STATUSES,
	type Project,
	type ProjectPhase,
} from "@/types/project.types";

type Props = {
	selectedPhase: ProjectPhase;
	onSelectPhase: (phaseId: string) => void;
	project: Project;
	progress: number;
};

export const ProjectSidebar = ({
	selectedPhase,
	project,
	onSelectPhase,
	progress,
}: Props): ReactElement => {
	return (
		<div>
			<Select
				value={selectedPhase.id}
				onChange={onSelectPhase}
				options={project.phases.map((phase) => ({ value: phase.id, label: phase.title }))}
			/>

			<ProgressBar value={progress} tone={progress >= 100 ? "success" : "secondary"} />

			<div>
				<strong>${selectedPhase.currentAmount.toLocaleString()}</strong>
				<span>recaudado</span>
			</div>

			<div>
				<strong>${selectedPhase.targetAmount.toLocaleString()}</strong>
				<span>meta</span>
			</div>

			<Badge>{PROJECT_STATUSES[selectedPhase.status].label}</Badge>
			<Badge>{PROJECT_CATEGORIES[project.category].label}</Badge>
		</div>
	);
};
