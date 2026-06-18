import clsx from "clsx";
import type { ComponentProps, ReactElement, ReactNode } from "react";
import type { UIButtonVariant, UITone } from "@/types/ui.types";
import styles from "./button.module.scss";

type ButtonContent =
	| {
			children: ReactNode;
			icon?: ReactNode;
	  }
	| {
			icon: ReactNode;
			children?: ReactNode;
	  };

type Props = ComponentProps<"button"> &
	ButtonContent & {
		tone?: UITone;
		variant?: UIButtonVariant;
	};

export const Button = ({
	children,
	className,
	icon,
	tone,
	variant = "solid",
	...props
}: Props): ReactElement => {
	const resolvedTone = tone ?? (variant === "plain" ? undefined : "primary");

	return (
		<button
			className={clsx(
				styles.button,
				styles[variant],
				resolvedTone && styles[resolvedTone],
				className,
			)}
			{...props}
		>
			{icon && <span className={styles.icon}>{icon}</span>}

			{children}
		</button>
	);
};
