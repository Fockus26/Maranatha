import type { ReactElement } from "react";

import { NavLink } from "@/components/UI/NavLink/NavLink";

import classes from "./LegalLinks.module.scss";

export const LegalLinks = (): ReactElement => {
    return (
        <ul className={classes.legalLinks}>
            <li>
                <NavLink href="/legal-notice" variant="vertical">
                    Aviso Legal
                </NavLink>
            </li>
            <li>
                <NavLink href="/privacy-policy" variant="vertical">
                    Política de Privacidad
                </NavLink>
            </li>
            <li>
                <NavLink href="/cookie-policy" variant="vertical">
                    Política de Cookies
                </NavLink>
            </li>
            <li>
                <NavLink href="/terms" variant="vertical">
                    Términos y Condiciones
                </NavLink>
            </li>
        </ul>
    );
};
