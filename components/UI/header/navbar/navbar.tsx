"use client";

import { Menu } from "iconoir-react";
import { type ReactElement, useState } from "react";
import { Button } from "@/components/ui/button/button";
import { HoverDropdown } from "@/components/ui/dropdown/hoverDropdown";
import { NavLink } from "@/components/ui/navLink/navLink";
import { headerData } from "@/data/header.data";
import { useMenu } from "@/hooks/useMenu";
import type { NavbarLinks, NavbarMessages } from "@/types/header.types";
import styles from "./navbar.module.scss";

type Props = {
	onDropdownChange?: (isOpen: boolean) => void;
	messages: NavbarMessages;
};

export const Navbar = ({ onDropdownChange, messages }: Props): ReactElement => {
	const { toggleMenu } = useMenu();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const handleDropdownChange = (value: boolean) => {
		setIsDropdownOpen(value);
		onDropdownChange?.(value);
	};

	return (
		<nav className={styles.navbar} onMouseLeave={() => handleDropdownChange(false)}>
			<ul className={styles.menu}>
				{Object.entries(headerData.navBarLinks).map(([linkKey, link]) => {
					const key = linkKey as NavbarLinks;

					return (
						<li
							key={crypto.randomUUID()}
							onMouseEnter={() => handleDropdownChange(false)}
						>
							<NavLink href={link}>{messages[key]}</NavLink>
						</li>
					);
				})}
				<HoverDropdown
					messages={messages.dropdown}
					isOpen={isDropdownOpen}
					onOpenChange={handleDropdownChange}
				/>
			</ul>

			<Button
				variant="plain"
				icon={<Menu />}
				onClick={toggleMenu}
				className={styles.toggleMenu}
			/>
		</nav>
	);
};
