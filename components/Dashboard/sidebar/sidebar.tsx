"use client";

import clsx from "clsx";
import { Dashboard, Edit, Folder, LogOut, Menu, Xmark } from "iconoir-react";
import { usePathname, useRouter } from "next/navigation";
import { type ReactElement, useState } from "react";
import { Button } from "@/components/ui/button/button";
import { useAppDispatch } from "@/hooks/useRedux";
import { logout } from "@/store/slices/authSlice";
import styles from "./sidebar.module.scss";

const items = [
	{
		id: "projects",
		label: "Proyectos",
		href: "/dashboard/projects",
		icon: <Folder />,
	},
	{
		id: "content",
		label: "Contenido",
		href: "/dashboard/content",
		icon: <Edit />,
	},
] as const;

export const Sidebar = (): ReactElement => {
	const [drawerOpen, setDrawerOpen] = useState(false);

	const pathname = usePathname();
	const router = useRouter();

	const dispatch = useAppDispatch();

	const handleLogout = async (): Promise<void> => {
		await dispatch(logout());
		router.replace("/auth");
	};

	const open = () => setDrawerOpen(true);
	const close = () => setDrawerOpen(false);

	const sidebarContent = (
		<aside className={clsx(styles.sidebar, drawerOpen && styles.sidebarOpen)}>
			<header className={styles.header}>
				<div className={styles.logo}>
					<Dashboard />
				</div>

				<div>
					<h3 className={styles.title}>Dashboard</h3>
					<p className={styles.subtitle}>Administrador</p>
				</div>
			</header>

			<nav className={styles.navigation}>
				{items.map((item) => {
					const isActive = pathname.startsWith(item.href);

					return (
						<Button
							key={item.id}
							icon={item.icon}
							variant={isActive ? "solid" : "outline"}
							onClick={() => {
								router.push(item.href);
								close();
							}}
						>
							<span>{item.label}</span>
						</Button>
					);
				})}
			</nav>

			<footer className={styles.footer}>
				<Button icon={<LogOut />} variant="plain" tone="error" onClick={handleLogout}>
					<span>Cerrar sesión</span>
				</Button>
				<span className={styles.version}>v1.0.0</span>
			</footer>
		</aside>
	);

	return (
		<>
			{sidebarContent}
			<div
				className={clsx(styles.overlay, drawerOpen && styles.overlayOpen)}
				onClick={close}
				aria-hidden="true"
			/>

			<Button
				className={styles.hamburger}
				variant="gradient"
				icon={drawerOpen ? <Xmark /> : <Menu />}
				onClick={drawerOpen ? close : open}
				aria-label={drawerOpen ? "Cerrar menú" : "Abrir menú"}
				aria-expanded={drawerOpen}
				aria-controls="sidebar"
			/>
		</>
	);
};
