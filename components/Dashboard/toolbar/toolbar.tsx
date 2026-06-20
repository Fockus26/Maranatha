"use client";

import clsx from "clsx";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Plus } from "iconoir-react";
import { useLayoutEffect, useRef, useState } from "react";
import { Filters } from "@/components/dashboard/toolbar/filters/filters";
import { ToolbarBulkActions } from "@/components/dashboard/toolbar/toolbarBulkActions/toolbarBulkActions";
import { Button } from "@/components/ui/button/button";
import { useAppSelector } from "@/hooks/useRedux";
import styles from "./toolbar.module.scss";

export const Toolbar = () => {
	const selectedCount = useAppSelector((state) => state.projectsDashboard.selectedIds.length);
	const { scrollY } = useScroll();
	const [hidden, setHidden] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const scrollLockUntilRef = useRef(0);
	const headerRef = useRef<HTMLElement>(null);

	useLayoutEffect(() => {
		const header = headerRef.current;
		if (!header) return;

		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				// Obtenemos la altura real mutada por Framer Motion o CSS
				const height = entry.borderBoxSize[0]
					? entry.borderBoxSize[0].blockSize
					: entry.contentRect.height;

				// Seteamos la variable en el :root (document.documentElement)
				document.documentElement.style.setProperty("--toolbar-height", `${height}px`);
			}
		});

		resizeObserver.observe(header);

		return () => {
			resizeObserver.disconnect(); // Deja de observar
			document.documentElement.style.removeProperty("--toolbar-height"); // Borra la variable del :root
		};
	}, []);

	useLayoutEffect(() => {
		scrollLockUntilRef.current = Date.now() + 200;
	}, [selectedCount]);

	useMotionValueEvent(scrollY, "change", (latest) => {
		const previous = scrollY.getPrevious() ?? 0;
		const delta = latest - previous;

		if (latest > 100) setScrolled(true);
		else if (latest < 60) setScrolled(false);

		if (Date.now() < scrollLockUntilRef.current) return;

		if (delta > 4 && latest > 150) {
			setHidden(true);
		} else if (delta < -4) {
			setHidden(false);
		}
	});

	return (
		<>
			<motion.header
				className={clsx(styles.toolbar)}
				animate={{ y: hidden ? "-110%" : "0%" }}
				transition={{ duration: 0.25, ease: "easeInOut" }}
				ref={headerRef}
			>
				<motion.div
					className={styles.topRow}
					animate={{
						height: scrolled ? 0 : "auto",
						opacity: scrolled ? 0 : 1,
						marginBottom: scrolled ? 0 : "1.5rem",
					}}
					style={{ overflow: "hidden" }}
					transition={{ duration: 0.3, ease: "easeInOut" }}
				>
					<div>
						<h1>Proyectos</h1>
						<p>Gestiona proyectos y campañas</p>
					</div>
					<Button tone="secondary" variant="gradient" icon={<Plus />}>
						<span>Nuevo Proyecto</span>
					</Button>
				</motion.div>

				<Filters />

				<AnimatePresence initial={false} mode="popLayout">
					{selectedCount > 0 && <ToolbarBulkActions count={selectedCount} />}
				</AnimatePresence>
			</motion.header>

			<Button
				variant="gradient"
				tone="secondary"
				icon={<Plus />}
				className={clsx(styles.fab, scrolled && styles.scrolled)}
				aria-label="Nuevo Proyecto"
			/>
		</>
	);
};
