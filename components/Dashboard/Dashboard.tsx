import { type ReactElement, useState } from "react";
import { Projects } from "@/components/dashboard/projects/projects";
import { type DashboardSection, Sidebar } from "@/components/dashboard/sidebar/sidebar";
import styles from "./dashboard.module.scss";

export const Dashboard = (): ReactElement => {
	const [section, setSection] = useState<DashboardSection>("projects");

	const content =
		section === "projects" ? (
			<Projects />
		) : section === "content" ? (
			"ContentModule"
		) : (
			"NoModule"
		);

	return (
		<div className={styles.dashboard}>
			<Sidebar activeSection={section} onChangeSection={setSection} />
			<main>{content}</main>
		</div>
	);
};
