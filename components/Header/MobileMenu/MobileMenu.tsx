"use client";

import clsx from "clsx";
import { type ReactElement, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ClickDropdown } from "@/components/UI/Dropdown/ClickDropdown";
import { NavLink } from "@/components/UI/NavLink/NavLink";
import { headerData } from "@/data/header.data";
import { useMenu } from "@/hooks/useMenu";
import type { NavbarLinks, NavbarMessages } from "@/types/header.types";
import classes from "./mobileMenu.module.scss";

interface Props {
	messages: NavbarMessages;
}

export const MobileMenu = ({ messages }: Props): ReactElement | null => {
	const [mounted, setMounted] = useState(false);

	const [modalsContainer, setModalsContainer] = useState<HTMLElement | null>(null);

	const { isOpen, closeMenu } = useMenu();

	useEffect(() => {
		setMounted(true);

		const element = document.getElementById("modals");

		setModalsContainer(element);
	}, []);

	if (!mounted || !isOpen || !modalsContainer) {
		return null;
	}

	return createPortal(
		<ul className={clsx(classes.menu, classes.isOpen)}>
			<ul className={clsx(classes.menu, classes.isOpen)}>
				{Object.entries(headerData.navBarLinks).map(([linkKey, link]) => {
					const key = linkKey as NavbarLinks;
					return (
						<li key={crypto.randomUUID()}>
							<NavLink href={link} onClick={closeMenu} variant="vertical">
								{messages[key]}
							</NavLink>
						</li>
					);
				})}
				<ClickDropdown messages={messages.dropdown} onSelect={closeMenu} />
			</ul>
			<ClickDropdown messages={messages.dropdown} onSelect={closeMenu} />
		</ul>,
		modalsContainer,
	);
};
