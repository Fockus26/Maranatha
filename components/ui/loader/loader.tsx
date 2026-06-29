import type { ReactElement } from "react";
import styles from "./loader.module.scss";

type Props = {
	label: string;
};

export const Loader = ({ label }: Props): ReactElement => {
	return (
		<div className={styles.loaderContainer}>
			<div className={styles.loader} />
			<p className={styles.loaderText}>{label}</p>
		</div>
	);
};
