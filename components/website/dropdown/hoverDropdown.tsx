"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactElement } from "react";

import { NavLink } from "@/components/website/navLink/navLink";

import styles from "./hoverDropdown.module.scss";

const projectLinks = [
	{ href: "/projects/el-evangelio-cambia", label: "El Evangelio Cambia" },
	{ href: "/projects/eventos-especiales", label: "Eventos Especiales" },
	{ href: "/projects/iglesia", label: "Iglesia" },
];

type Props = {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
};

export const HoverDropdown = ({ isOpen, onOpenChange }: Props): ReactElement => {
	return (
		<li className={styles.dropdown} onMouseEnter={() => onOpenChange(true)}>
			<NavLink href="/projects">Proyectos</NavLink>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						className={styles.panel}
						initial={{ opacity: 0, y: -8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -8 }}
						transition={{ duration: 0.2, ease: "easeOut" }}
					>
						<div className={styles.spacer} />

						<ul className={styles.links}>
							{projectLinks.map(({ href, label }) => (
								<li key={href}>
									<NavLink variant="vertical" href={href}>
										{label}
									</NavLink>
								</li>
							))}
						</ul>

						<div className={styles.divider} />

						<div className={styles.description}>
							<p className={styles.title}>Proyectos</p>
							<p className={styles.subtitle}>
								Conoce las distintas iniciativas y ministerios que llevamos adelante
								para impactar nuestra comunidad.
							</p>
						</div>

						<div className={styles.spacer} />
					</motion.div>
				)}
			</AnimatePresence>
		</li>
	);
};
