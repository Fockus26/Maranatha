"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { type ReactElement, useState } from "react";

import { Logo } from "@/components/Header/Logo/Logo";
import { Navbar } from "@/components/Header/Navbar/Navbar";

import classes from "./Header.module.scss";

export const Header = (): ReactElement => {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;

        if (latest > previous && latest > 150) {
            setHidden(true);
        } else if (latest < previous) {
            setHidden(false);
        }
    });

    return (
        <motion.header
            className={classes.header}
            animate={{ y: hidden ? "-100%" : "0%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <Logo />
            <Navbar />
        </motion.header>
    );
};
