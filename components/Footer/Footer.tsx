import { Donate } from "iconoir-react";
import Image from "next/image";
import type { ReactElement } from "react";

import { LegalLinks } from "@/components/Footer/LegalLinks/LegalLinks";
import { NavigationLinks } from "@/components/Footer/NavigationLinks/NavigationLinks";
import { SocialLinks } from "@/components/Footer/SocialLinks/SocialLinks";
import { LogoSvg } from "@/components/Icons/LogoSvg";
import { Button } from "@/components/UI/Button/Button";

import eecLogo from "../../assets/images/dark-eec-logo.png";
import classes from "./Footer.module.scss";

export const Footer = (): ReactElement => {
    return (
        <footer className={classes.footer}>
            <section>
                <div className={classes.title}>
                    <h4>Servir es una honra</h4>
                    <Donate />
                </div>
                <div className={classes.images}>
                    <LogoSvg />
                    <Image src={eecLogo} alt="EEC Logo" />
                </div>
                <Button className={classes.button}>Quiero Ayudar</Button>
            </section>
            <section>
                <h4>Información Legal</h4>
                <LegalLinks />
            </section>
            <section>
                <h4>Contáctanos</h4>
                <SocialLinks />
            </section>
            <section>
                <h4>Navegación</h4>
                <NavigationLinks />
            </section>
        </footer>
    );
};
