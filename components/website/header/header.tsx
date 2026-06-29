"use client";

import clsx from "clsx";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUp } from "iconoir-react";
import { type ReactElement, useState } from "react";

import { Logo } from "@/components/website/header/logo/logo";
import { Navbar } from "@/components/website/header/navbar/navbar";

import styles from "./header.module.scss";

export const Header = (): ReactElement => {
	const { scrollY } = useScroll();
	const [hidden, setHidden] = useState(false);
	const [showArrow, setShowArrow] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	useMotionValueEvent(scrollY, "change", (latest) => {
		const previous = scrollY.getPrevious() ?? 0;

		if (latest > previous && latest > 150) {
			setHidden(true);
			setShowArrow(true);
		} else if (latest === 0) {
			setHidden(false);
			setShowArrow(false);
		}
	});

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<>
			<motion.header
				className={clsx(styles.header, dropdownOpen && styles.headerDark)}
				animate={{ y: hidden ? "-100%" : "0%" }}
				transition={{ duration: 0.3, ease: "easeInOut" }}
			>
				<Logo />
				<Navbar onDropdownChange={setDropdownOpen} />
			</motion.header>

			<AnimatePresence>
				{showArrow && (
					<motion.button
						className={styles.scrollTop}
						onClick={scrollToTop}
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.5 }}
						transition={{ duration: 0.2, ease: "easeOut" }}
						aria-label="Volver arriba"
					>
						<ArrowUp />
					</motion.button>
				)}
			</AnimatePresence>
		</>
	);
};
