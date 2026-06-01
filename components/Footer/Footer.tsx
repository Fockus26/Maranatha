import type { ReactElement } from "react";

import { LegalLinks } from "@/components/Footer/LegalLinks/LegalLinks";
import { LogoSvg } from "@/components/Icons/LogoSvg";

import classes from "./Footer.module.css";

export const Footer = (): ReactElement => {
    return (
        <footer className={classes.footer}>
            <div className={classes.main}>
                <LegalLinks />
            </div>
            <div className={classes.copyright}>
                <p>Copyright © 2026 Maranatha San Cristóbal | Hecho con ♥ por Simón y César</p>
            </div>
        </footer>
    );
};
