import type { ReactElement } from "react";

import { LogoSvg } from "@/components/Icons/LogoSvg";
import { Link } from "@/i18n/navigation";

import classes from "./Logo.module.css";

export const Logo = (): ReactElement => {
    return (
        <Link href="/" className={classes.logo}>
            <LogoSvg className={classes.image} />
        </Link>
    );
};
