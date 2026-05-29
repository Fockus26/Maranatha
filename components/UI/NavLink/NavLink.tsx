"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import type { ComponentProps, ReactElement, ReactNode } from "react";

import { Link, usePathname } from "@/i18n/navigation";

import classes from "./NavLink.module.css";

const MotionLink = motion.create(Link);

type Props = {
    children: ReactNode;
    variant?: "horizontal" | "vertical";
} & ComponentProps<typeof Link>;

export const NavLink = ({
    href,
    children,
    variant = "horizontal",
    className,
    onClick,
}: Props): ReactElement => {
    const pathname = usePathname();

    const isActive = pathname === href;

    return (
        <MotionLink href={href} className={clsx(classes.link, className)} onClick={onClick}>
            {children}

            {/* NAVBAR PRINCIPAL */}
            {variant === "horizontal" && isActive && (
                <motion.span layoutId="navbar-indicator" className={classes.indicator} />
            )}

            {/* DROPDOWN */}
            {variant === "vertical" && (
                <motion.span
                    className={classes.indicator}
                    initial={{
                        scaleX: 0,
                        transformOrigin: "left",
                    }}
                    animate={
                        isActive
                            ? {
                                  scaleX: 1,
                                  transformOrigin: "left",
                              }
                            : {
                                  scaleX: 0,
                                  transformOrigin: "right",
                              }
                    }
                    transition={{
                        duration: 0.25,
                        ease: "easeInOut",
                    }}
                />
            )}
        </MotionLink>
    );
};
