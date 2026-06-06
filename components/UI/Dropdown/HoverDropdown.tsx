"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactElement } from "react";
import { NavLink } from "@/components/ui/navLink/navLink";
import { headerData } from "@/data/header.data";
import type { DropdownLinks, DropdownMessages } from "@/types/header.types";
import classes from "./hoverDropdown.module.scss";

type Props = {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	messages: DropdownMessages;
};

export const HoverDropdown = ({ isOpen, onOpenChange, messages }: Props): ReactElement => {
	return (
		<li className={classes.dropdown} onMouseEnter={() => onOpenChange(true)}>
			<NavLink href="/projects">{messages.projects}</NavLink>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						className={classes.panel}
						initial={{ opacity: 0, y: -8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -8 }}
						transition={{ duration: 0.2, ease: "easeOut" }}
					>
						<div className={classes.spacer} />

						<ul className={classes.links}>
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

						<div className={classes.divider} />

						<div className={classes.description}>
							<p className={classes.title}>{messages.title}</p>
							<p className={classes.subtitle}>{messages.subtitle}</p>
						</div>

						<div className={classes.spacer} />
					</motion.div>
				)}
			</AnimatePresence>
		</li>
	);
};
