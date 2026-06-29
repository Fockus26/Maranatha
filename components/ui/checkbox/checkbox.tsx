import clsx from "clsx";
import { Check } from "iconoir-react";
import type { ComponentProps, ElementType } from "react";
import type { UITone } from "@/types/ui.types";
import styles from "./checkbox.module.scss";

type Props = ComponentProps<"input"> & {
	tone?: UITone;
	icon?: ElementType;
};

export function Checkbox({
	tone = "primary",
	icon: Icon = Check,
	className,
	checked,
	...props
}: Props) {
	return (
		<label
			className={clsx(styles.checkbox, styles[tone], className)}
			onClick={(e) => e.stopPropagation()}
		>
			<input
				type="checkbox"
				checked={checked}
				className={clsx(styles.checkbox, className)}
				{...props}
			/>

			<span className={styles.control}>
				<Icon />
			</span>
		</label>
	);
}
