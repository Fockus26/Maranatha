"use client";

import clsx from "clsx";
import { type ReactElement, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { ClickDropdown } from "@/components/UI/Dropdown/ClickDropdown";
import { NavLink } from "@/components/UI/NavLink/NavLink";
import { useMenu } from "@/hooks/useMenu";

import classes from "./MobileMenu.module.scss";

export const MobileMenu = (): ReactElement | null => {
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
            <li>
                <NavLink href="/about" onClick={closeMenu} variant="vertical">
                    ¿Quienes Somos?
                </NavLink>
            </li>
            <ClickDropdown onSelect={closeMenu} />
        </ul>,
        modalsContainer,
    );
};
