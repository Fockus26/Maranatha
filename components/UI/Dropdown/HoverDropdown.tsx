"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactElement } from "react";
import { NavLink } from "@/components/ui/navLink/navLink";
import { headerData } from "@/data/header.data";
import type { DropdownLinks, DropdownMessages } from "@/types/header.types";
import styles from "./hoverDropdown.module.scss";

type Props = {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	messages: DropdownMessages;
};

export const HoverDropdown = ({ isOpen, onOpenChange, messages }: Props): ReactElement => {
	return (
		<li className={styles.dropdown} onMouseEnter={() => onOpenChange(true)}>
			<NavLink href="/projects">{messages.projects}</NavLink>

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
							{Object.entries(headerData.dropdownLinks).map(([linkKey, link]) => {
								const key = linkKey as DropdownLinks;

								return (
									<li key={link}>
										<NavLink variant="vertical" href={link}>
											{messages.links[key]}
										</NavLink>
									</li>
								);
							})}
						</ul>

						<div className={styles.divider} />

						<div className={styles.description}>
							<p className={styles.title}>{messages.title}</p>
							<p className={styles.subtitle}>{messages.subtitle}</p>
						</div>

						<div className={styles.spacer} />
					</motion.div>
				)}
			</AnimatePresence>
		</li>
	);
};
