import Link from "next/link";
import { Facebook, Instagram, Mail, Tiktok, Whatsapp } from "iconoir-react";
import type { ReactElement } from "react";

import classes from "./SocialLinks.module.scss";

export const SocialLinks = (): ReactElement => {
    return (
        <ul className={classes.socialLinks}>
            <li>
                <Link href="https://www.facebook.com/Iglesiamaranathasc" target="_blank">
                    <Facebook />
                    Iglesia Maranatha San Cristóbal
                </Link>
            </li>
            <li>
                <Link href="https://www.instagram.com/maranathasancristobal/" target="_blank">
                    <Instagram />
                    @maranathasancristobal
                </Link>
            </li>
            <li>
                <Link href="https://api.whatsapp.com/send?phone=582763565704" target="_blank">
                    <Whatsapp />
                    +58 276-3565704
                </Link>
            </li>
            <li>
                <Link href="https://www.tiktok.com/@generacion_jef" target="_blank">
                    <Tiktok />
                    @generacion_jef
                </Link>
            </li>

            <li>
                <Link href="mailto:iglesiamaranathasc@gmail.com" target="_blank">
                    <Mail />
                    iglesiamaranathasc@gmail.com
                </Link>
            </li>
        </ul>
    );
};
