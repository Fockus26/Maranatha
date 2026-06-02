import type { ReactElement } from "react";
import { Link } from "@/i18n/navigation";

import classes from "./Logo.module.scss";

export const Logo = (): ReactElement => {
    return (
        <Link href="/" className={classes.logo}>
            <img src="/images/Logo-Maranatha.webp" width={55} height={55} alt="Logo" />
        </Link>
    );
};
