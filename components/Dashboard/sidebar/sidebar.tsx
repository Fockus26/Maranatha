"use client";

import clsx from "clsx";
import { Dashboard, Edit, Folder, LogOut } from "iconoir-react";
import type { ReactElement } from "react";
import { Button } from "@/components/ui/button/button";
import { useAppDispatch } from "@/hooks/useRedux";
import { logout } from "@/store/slices/authSlice";
import styles from "./sidebar.module.scss";

export type DashboardSection = "projects" | "content";

type Props = {
	activeSection: DashboardSection;
	onChangeSection: (section: DashboardSection) => void;
};

const items = [
	{
		id: "projects",
		label: "Proyectos",
		icon: <Folder />,
	},
	{
		id: "content",
		label: "Contenido",
		icon: <Edit />,
	},
] as const;

export const Sidebar = ({ activeSection, onChangeSection }: Props): ReactElement => {
	const dispatch = useAppDispatch();
	// const router = useRouter();

	const handleLogout = async (): Promise<void> => {
		await dispatch(logout());

		// router.replace("/login");
	};

	return (
		<aside className={styles.sidebar}>
			<header className={styles.header}>
				<div className={styles.logo}>
					<Dashboard />
				</div>

				<div>
					<h1 className={styles.title}>Dashboard</h1>
					<p className={styles.subtitle}>Administrador</p>
				</div>
			</header>

			<nav className={styles.navigation}>
				{items.map((item) => (
					<Button
						key={item.id}
						icon={item.icon}
						variant={activeSection === item.id ? "solid" : "outline"}
						className={clsx(styles.navItem)}
						onClick={() => onChangeSection(item.id)}
					>
						<span>{item.label}</span>
					</Button>
				))}
			</nav>

			<footer className={styles.footer}>
				<Button icon={<LogOut />} variant="plain" tone="error" onClick={handleLogout}>
					<span>Cerrar sesión</span>
				</Button>
				<span className={styles.version}>v1.0.0</span>
			</footer>
		</aside>
	);
};
