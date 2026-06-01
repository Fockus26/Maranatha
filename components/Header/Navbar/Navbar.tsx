"use client";

import { Menu } from "iconoir-react";
import { type ReactElement, useState } from "react";

import { Button } from "@/components/UI/Button/Button";
import { HoverDropdown } from "@/components/UI/Dropdown/HoverDropdown";
import { NavLink } from "@/components/UI/NavLink/NavLink";
import { useMenu } from "@/hooks/useMenu";

import classes from "./Navbar.module.scss";

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
        <nav className={classes.navbar} onMouseLeave={() => handleDropdownChange(false)}>
            <ul className={classes.menu}>
                <li onMouseEnter={() => handleDropdownChange(false)}>
                    <NavLink href="/about">Sobre Nosotros</NavLink>
                </li>
                <li onMouseEnter={() => handleDropdownChange(false)}>
                    <NavLink href="/events">Eventos</NavLink>
                </li>
                <li onMouseEnter={() => handleDropdownChange(false)}>
                    <NavLink href="/evangelio-cambia">Evangelio Cambia</NavLink>
                </li>
                <li onMouseEnter={() => handleDropdownChange(false)}>
                    <NavLink href="/jef">Jef</NavLink>
                </li>
                <li onMouseEnter={() => handleDropdownChange(false)}>
                    <NavLink href="/ofrendas">Ofrendas</NavLink>
                </li>
                <HoverDropdown isOpen={isDropdownOpen} onOpenChange={handleDropdownChange} />
            </ul>

            <Button
                className={classes.prayerButton}
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

            <button onClick={toggleMenu} className={classes.icon}>
                <Menu />
            </button>
        </nav>
    );
};
