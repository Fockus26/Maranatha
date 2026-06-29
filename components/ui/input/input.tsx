import clsx from "clsx";
import type { ComponentProps } from "react";
import type { UIInputVariant, UITone } from "@/types/ui.types";
import styles from "./input.module.scss";

type Props = ComponentProps<"input"> & {
	variant?: UIInputVariant;
	tone?: UITone;
};

export function Input({
	type = "text",
	className,
	variant = "field",
	tone = "primary",
	...props
}: Props) {
	return (
		<input
			type={type}
			className={clsx(styles.input, styles[variant], styles[tone], className)}
			{...props}
		/>
	);
}
