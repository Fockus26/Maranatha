"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactElement } from "react";
import { useState } from "react";

import { NavLink } from "@/components/UI/NavLink/NavLink";

import classes from "./HoverDropdown.module.scss";

export const HoverDropdown = (): ReactElement => {
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);

    return (
        <li
            className={classes.dropdown}
            onMouseEnter={() => setIsOpenDropdown(true)}
            onMouseLeave={() => setIsOpenDropdown(false)}
        >
            <NavLink href="/projects">Proyectos</NavLink>

            <AnimatePresence>
                {isOpenDropdown && (
                    <motion.ul
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                    >
                        <li>
                            <NavLink variant="vertical" href="/projects/el-evangelio-cambia">
                                El Evangelio Cambia
                            </NavLink>
                        </li>
                        <li>
                            <NavLink variant="vertical" href="/projects/eventos-especiales">
                                Eventos Especiales
                            </NavLink>
                        </li>
                        <li>
                            <NavLink variant="vertical" href="/projects/iglesia">
                                Iglesia
                            </NavLink>
                        </li>
                    </motion.ul>
                )}
            </AnimatePresence>
        </li>
    );
};
