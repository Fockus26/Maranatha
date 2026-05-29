"use client";

import { AnimatePresence, motion } from "framer-motion";
import { NavArrowDown } from "iconoir-react";
import { type ReactElement, useState } from "react";

import { NavLink } from "@/components/UI/NavLink/NavLink";

import classes from "./ClickDropdown.module.scss";

interface Props {
    onSelect?: () => void;
}

export const ClickDropdown = ({ onSelect }: Props): ReactElement => {
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);

    const toggleDropdown = (): void => setIsOpenDropdown((prev) => !prev);
    const closeDropdown = (): void => {
        setIsOpenDropdown(false);
        onSelect?.();
    };

    return (
        <li className={classes.dropdown}>
            <div className={classes.trigger}>
                <NavLink href="/projects" onClick={closeDropdown} variant="vertical">
                    Proyectos
                </NavLink>

                <motion.button
                    animate={{ y: "-50%", rotate: isOpenDropdown ? 180 : 0 }}
                    type="button"
                    className={classes.icon}
                    onClick={toggleDropdown}
                    aria-label="Toggle dropdown"
                >
                    <NavArrowDown />
                </motion.button>
            </div>

            <AnimatePresence>
                {isOpenDropdown && (
                    <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <li>
                            <NavLink
                                onClick={closeDropdown}
                                variant="vertical"
                                href="/projects/el-evangelio-cambia"
                            >
                                El Evangelio Cambia
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                onClick={closeDropdown}
                                variant="vertical"
                                href="/projects/eventos-especiales"
                            >
                                Eventos Especiales
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                onClick={closeDropdown}
                                variant="vertical"
                                href="/projects/iglesia"
                            >
                                Iglesia
                            </NavLink>
                        </li>
                    </motion.ul>
                )}
            </AnimatePresence>
        </li>
    );
};
