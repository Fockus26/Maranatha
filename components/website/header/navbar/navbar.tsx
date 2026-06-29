"use client";

import { Menu } from "iconoir-react";
import { type ReactElement, useState } from "react";

import { Button } from "@/components/ui/button/button";
import { HoverDropdown } from "@/components/website/dropdown/hoverDropdown";
import { NavLink } from "@/components/website/navLink/navLink";
import { useMenu } from "@/hooks/useMenu";

import styles from "./navbar.module.scss";

type Props = {
	onDropdownChange?: (isOpen: boolean) => void;
};

export const Navbar = ({ onDropdownChange }: Props): ReactElement => {
	const { toggleMenu } = useMenu();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const handleDropdownChange = (value: boolean) => {
		setIsDropdownOpen(value);
		onDropdownChange?.(value);
	};

	return (
		<nav className={styles.navbar} onMouseLeave={() => handleDropdownChange(false)}>
			<ul className={styles.menu}>
				<li onMouseEnter={() => handleDropdownChange(false)}>
					<NavLink href="/">Inicio</NavLink>
				</li>
				<li onMouseEnter={() => handleDropdownChange(false)}>
					<NavLink href="/about">Sobre Nosotros</NavLink>
				</li>
				<li onMouseEnter={() => handleDropdownChange(false)}>
					<NavLink href="/events">Eventos</NavLink>
				</li>
				<HoverDropdown isOpen={isDropdownOpen} onOpenChange={handleDropdownChange} />
			</ul>

			<Button
				tone="accent"
				className={styles.prayerButton}
				icon={
					<svg
						width="17"
						height="17"
						viewBox="0 0 24 24"
						fill="none"
						stroke="white"
						strokeWidth="1.8"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M17 8C8 10 5.9 16.17 3.82 19.82a1 1 0 0 0 1.55 1.22C7 19 9.43 18 12 18c3 0 4.5 1.5 7 1.5V9l-2-1z" />
						<path d="M17 8V5a2 2 0 0 0-4 0v3" />
					</svg>
				}
			>
				Oración
			</Button>

			<button onClick={toggleMenu} className={styles.icon}>
				<Menu />
			</button>
		</nav>
	);
};
