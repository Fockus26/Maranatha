"use client";

import { type ReactElement, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { useMenu } from "@/hooks/useMenu";

import styles from "./backdrop.module.scss";

export const Backdrop = (): ReactElement | null => {
	const [mounted, setMounted] = useState(false);

	const [modalsContainer, setModalsContainer] = useState<HTMLElement | null>(null);

	const { isOpen, closeMenu } = useMenu();

	useEffect(() => {
		setMounted(true);

		const element = document.getElementById("modals");

		setModalsContainer(element);
	}, []);

	useEffect(() => {
		if (!isOpen) {
			document.body.style.overflow = "";

			return;
		}

		document.body.style.overflow = "hidden";

		return (): void => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	if (!mounted || !isOpen || !modalsContainer) {
		return null;
	}

	return createPortal(<div className={styles.backdrop} onClick={closeMenu} />, modalsContainer);
};
