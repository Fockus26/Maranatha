import { type ReactElement, useState } from "react";
import { ProjectsModule } from "@/components/dashboard/projectsModule/projectsModule";
import { type DashboardSection, Sidebar } from "@/components/dashboard/sidebar/sidebar";
import styles from "./dashboard.module.scss";

export const Dashboard = (): ReactElement => {
	const [section, setSection] = useState<DashboardSection>("projects");

	const content =
		section === "projects" ? (
			<ProjectsModule />
		) : section === "content" ? (
			"ContentModule"
		) : (
			"NoModule"
		);

	return (
		<div className={styles.dashboard}>
			<Sidebar activeSection={section} onChangeSection={setSection} />

			<main className={styles.content}>{content}</main>
		</div>
	);
};
