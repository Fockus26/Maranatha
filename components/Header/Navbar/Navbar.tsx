"use client";

import { Menu } from "iconoir-react";
import { type ReactElement, useState } from "react";
import { Button } from "@/components/UI/Button/Button";
import { HoverDropdown } from "@/components/UI/Dropdown/HoverDropdown";
import { NavLink } from "@/components/UI/NavLink/NavLink";
import { headerData } from "@/data/header.data";
import { useMenu } from "@/hooks/useMenu";
import type { NavbarLinks, NavbarMessages } from "@/types/header.types";
import classes from "./navbar.module.scss";

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
		<nav className={classes.navbar} onMouseLeave={() => handleDropdownChange(false)}>
			<ul className={classes.menu}>
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

			<Button icon={<Menu />} type="button" onClick={toggleMenu} className={classes.icon} />
		</nav>
	);
};
