import type { ReactElement } from "react";
import { TeamMember } from "@/components/admin/project/team/teamMember/teamMember";
import type { ProjectTeamMember } from "@/types/project.types";
import styles from "./team.module.scss";

type Props = {
	members: ProjectTeamMember[];
};

export const Team = ({ members }: Props): ReactElement | null => {
	if (members.length === 0) {
		return null;
	}

	return (
		<div className={styles.grid}>
			{members.map((member) => (
				<TeamMember key={member.id} member={member} />
			))}
		</div>
	);
};
