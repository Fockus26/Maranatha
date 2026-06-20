import clsx from "clsx";
import type { HTMLAttributes, ReactElement, ReactNode } from "react";
import type { UITone } from "@/types/ui.types";
import styles from "./badge.module.scss";

type BadgeContent =
	| {
			children: ReactNode;
			icon?: ReactNode;
	  }
	| {
			icon: ReactNode;
			children?: ReactNode;
	  };

type Props = HTMLAttributes<HTMLSpanElement> &
	BadgeContent & {
		tone?: UITone;
	};

export const Badge = ({
	children,
	className,
	icon,
	tone = "primary",
	...props
}: Props): ReactElement => {
	return (
		<span className={clsx(styles.badge, styles[tone], className)} {...props}>
			{icon && <span className={styles.icon}>{icon}</span>}

			{children}
		</span>
	);
};
