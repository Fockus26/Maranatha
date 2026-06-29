import type { ReactElement } from "react";

import { LogoSvg } from "@/components/ui/icons/logoSvg";
import { Link } from "@/i18n/navigation";

import styles from "./logo.module.scss";

export const Logo = (): ReactElement => {
	return (
		<Link href="/" className={styles.logo}>
			<img src="/images/logo-maranatha.webp" width={55} height={55} alt="Logo" />
		</Link>
	);
};
