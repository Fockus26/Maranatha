import { motion } from "framer-motion";
import styles from "./fallback.module.scss";

interface Props {
	title: string;
	instruction?: string;
}

export function Fallback({ title, instruction }: Props) {
	return (
		<motion.div
			className={styles.fallback}
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -16 }}
		>
			<h3>{title}</h3>
			{instruction && <p>{instruction}</p>}
		</motion.div>
	);
}
