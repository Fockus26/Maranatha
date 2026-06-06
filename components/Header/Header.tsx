"use client";

import clsx from "clsx";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Donate } from "iconoir-react";
import { type ReactElement, useState } from "react";
import { Logo } from "@/components/header/logo/logo";
import { Navbar } from "@/components/header/navbar/navbar";
import { Button } from "@/components/UI/Button/Button";
import logoImage from "@/public/images/Logo-Maranatha.webp";
import type { HeaderMessages } from "@/types/messages.types";
import classes from "./header.module.scss";

interface Props {
	messages: HeaderMessages;
}

export const Header = ({ messages }: Props): ReactElement => {
	const { scrollY } = useScroll();
	const [hidden, setHidden] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	useMotionValueEvent(scrollY, "change", (latest) => {
		const previous = scrollY.getPrevious() ?? 0;

		if (latest > previous && latest > 150) {
			setHidden(true);
		} else if (latest === 0) {
			setHidden(false);
		}
	});

	return (
		<motion.header
			className={clsx(classes.header, dropdownOpen && classes.headerDark)}
			animate={{ y: hidden ? "-100%" : "0%" }}
			transition={{ duration: 0.3, ease: "easeInOut" }}
		>
			<Logo href="/" alt={messages.imageAlt} src={logoImage} width={30} height={30} />
			<Navbar messages={messages.navbar} onDropdownChange={setDropdownOpen} />
			<Button icon={<Donate />}>{messages.button}</Button>
		</motion.header>
	);
};
