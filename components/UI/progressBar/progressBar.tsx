import clsx from "clsx";
import { motion } from "framer-motion";
import type { HTMLAttributes, ReactElement } from "react";
import type { UITone } from "@/types/ui.types";
import styles from "./progressBar.module.scss";

type Props = HTMLAttributes<HTMLDivElement> & {
	value: number;
	tone?: UITone;
	showAnimation?: boolean;
};

export const ProgressBar = ({
	className,
	value,
	tone = "primary",
	showAnimation = true,
	...props
}: Props): ReactElement => {
	const progress = Math.min(Math.max(value, 0), 100);

	return (
		<div className={clsx(styles.progressBar, className)} {...props}>
			<motion.div
				className={clsx(styles.fill, styles[tone], showAnimation && styles.animation)}
				initial={false}
				animate={{
					scaleX: progress / 100,
				}}
				style={{
					transformOrigin: "left center",
				}}
			/>
		</div>
	);
};
