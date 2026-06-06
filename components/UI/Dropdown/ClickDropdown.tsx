"use client";

import { AnimatePresence, motion } from "framer-motion";
import { NavArrowDown } from "iconoir-react";
import { type ReactElement, useState } from "react";
import { Button } from "@/components/ui/button/button";
import { NavLink } from "@/components/ui/navLink/navLink";
import { headerData } from "@/data/header.data";
import type { DropdownLinks, DropdownMessages } from "@/types/header.types";
import classes from "./clickDropdown.module.scss";

interface Props {
	onSelect?: () => void;
	messages: DropdownMessages;
}

const MotionButton = motion.create(Button);

export const ClickDropdown = ({ onSelect, messages }: Props): ReactElement => {
	const [isOpenDropdown, setIsOpenDropdown] = useState(false);

	const toggleDropdown = (): void => setIsOpenDropdown((prev) => !prev);
	const closeDropdown = (): void => {
		setIsOpenDropdown(false);
		onSelect?.();
	};

	return (
		<li className={classes.dropdown}>
			<div className={classes.trigger}>
				<NavLink href="/projects" onClick={closeDropdown} variant="vertical">
					{messages.projects}
				</NavLink>
				<MotionButton
					icon={<NavArrowDown />}
					animate={{ y: "-50%", rotate: isOpenDropdown ? 180 : 0 }}
					type="button"
					className={classes.icon}
					onClick={toggleDropdown}
				/>
			</div>

			<AnimatePresence>
				{isOpenDropdown && (
					<motion.ul
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
					>
						{Object.entries(headerData.dropdownLinks).map(([linkKey, link]) => {
							const key = linkKey as DropdownLinks;
							return (
								<li key={crypto.randomUUID()}>
									<NavLink variant="vertical" href={link}>
										{messages.links[key]}
									</NavLink>
								</li>
							);
						})}
					</motion.ul>
				)}
			</AnimatePresence>
		</li>
	);
};
