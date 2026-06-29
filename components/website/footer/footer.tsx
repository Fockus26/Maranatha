import type { ReactElement } from "react";
import { LogoSvg } from "@/components/ui/icons/logoSvg";
import { LegalLinks } from "@/components/website/footer/legalLinks/legalLinks";
import styles from "./footer.module.scss";

export const Footer = (): ReactElement => {
	return (
		<footer className={styles.footer}>
			<div className={styles.main}>
				<LegalLinks />
			</div>
			<div className={styles.copyright}>
				<p>Copyright © 2026 Maranatha San Cristóbal | Hecho con ♥ por Simón y César</p>
			</div>
		</footer>
	);
};
