import Image from "next/image";
import type { ReactElement } from "react";
import { SocialIcon } from "@/components/ui/socialIcon/socialIcon";
import type { ProjectTeamMember } from "@/types/project.types";
import styles from "./teamMember.module.scss";

type Props = {
	member: ProjectTeamMember;
};

export const TeamMember = ({ member }: Props): ReactElement => {
	const hasExpandableContent = Boolean(member.description) || Boolean(member.socialMedia?.length);

	return (
		<article className={styles.card}>
			<div className={styles.imageWrapper}>
				{member.image ? (
					<Image fill src={member.image} alt={member.name} className={styles.image} />
				) : (
					<div className={styles.placeholder} />
				)}
			</div>

			<div className={styles.info}>
				<h3>{member.name}</h3>
				<span className={styles.role}>{member.role}</span>

				{hasExpandableContent && (
					<div className={styles.expandable}>
						{member.description && <p>{member.description}</p>}

						{member.socialMedia && member.socialMedia.length > 0 && (
							<ul className={styles.social}>
								{member.socialMedia.map((link) => (
									<li key={link.platform}>
										<a href={link.url} target="_blank" rel="noreferrer">
											<SocialIcon platform={link.platform} />
										</a>
									</li>
								))}
							</ul>
						)}
					</div>
				)}
			</div>
		</article>
	);
};
