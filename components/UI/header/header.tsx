"use client";

import clsx from "clsx";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Donate } from "iconoir-react";
import { useState } from "react";
import { Button } from "@/components/ui/button/button";
import { Logo } from "@/components/ui/header/logo/logo";
import { Navbar } from "@/components/ui/header/navbar/navbar";
import type { HeaderMessages } from "@/types/header.types";
import styles from "./header.module.scss";

interface Props {
	messages: HeaderMessages;
}

export const Header = ({ messages }: Props) => {
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const { scrollY } = useScroll();

	const [hidden, setHidden] = useState(false);

	useMotionValueEvent(scrollY, "change", (latest) => {
		const previous = scrollY.getPrevious() ?? 0;

		if (latest <= 0) {
			setHidden(false);
			return;
		}

		if (latest > previous && latest > 100) {
			setHidden(true);
		} else if (latest < previous) {
			setHidden(false);
		}
	});

	return (
		<motion.header
			className={clsx(styles.header, dropdownOpen && styles.headerDark)}
			animate={{ y: hidden ? "-100%" : "0%" }}
			transition={{ duration: 0.28, ease: "easeInOut" }}
		>
			<Logo />

			<Navbar messages={messages.navbar} onDropdownChange={setDropdownOpen} />

			<Button className={styles.cta} tone="accent" icon={<Donate />}>
				{messages.button}
			</Button>
		</motion.header>
	);
};
