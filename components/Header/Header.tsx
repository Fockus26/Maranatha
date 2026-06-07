"use client";

import clsx from "clsx";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Donate } from "iconoir-react";
import { type ReactElement, useState } from "react";
import { Logo } from "@/components/header/logo/logo";
import { Navbar } from "@/components/header/navbar/navbar";
import { Button } from "@/components/ui/button/button";
import logoImage from "@/public/images/Logo-Maranatha.webp";
import type { HeaderMessages } from "@/types/header.types";
import classes from "./header.module.scss";

interface Props {
	messages: HeaderMessages;
}

export const Header = ({ messages }: Props): ReactElement => {
	const { scrollY } = useScroll();
	const [hidden, setHidden] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const [scrolled, setScrolled] = useState(false);

	useMotionValueEvent(scrollY, "change", (latest) => {
		const previous = scrollY.getPrevious() ?? 0;

		setScrolled(latest > 20);

		if (latest > previous && latest > 150) {
			setHidden(true);
		} else if (latest < previous) {
			setHidden(false);
		}
	});

	return (
		<motion.header
			className={clsx(
				classes.header,
				scrolled && classes.headerScrolled,
				dropdownOpen && classes.headerDark,
			)}
			animate={{ y: hidden ? "-100%" : "0%" }}
			transition={{ duration: 0.3, ease: "easeInOut" }}
		>
			<Logo href="/" alt={messages.imageAlt} src={logoImage} />
			<Navbar messages={messages.navbar} onDropdownChange={setDropdownOpen} />
			<Button icon={<Donate />}>{messages.button}</Button>
		</motion.header>
	);
};
