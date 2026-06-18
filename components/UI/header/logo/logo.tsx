import Image from "next/image";
import type { ReactElement } from "react";
import { Link } from "@/i18n/navigation";
import logoImage from "@/public/images/Logo-Maranatha.webp";
import styles from "./logo.module.scss";

export const Logo = (): ReactElement => {
	return (
		<Link href="/">
			<Image src={logoImage} alt={"Logo Maranatha"} className={styles.logo} />
		</Link>
	);
};
