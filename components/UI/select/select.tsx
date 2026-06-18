import clsx from "clsx";
import { NavArrowDown } from "iconoir-react";
import type { ReactElement } from "react";
import { useEffect, useId, useRef, useState } from "react";
import type { UIInputVariant, UITone } from "@/types/ui.types";
import styles from "./select.module.scss";

export type SelectOption = {
	label: string;
	value: string;
};

type Props = {
	options: SelectOption[];
	value?: string;
	onChange?: (value: string) => void;
	placeholder?: string;
	variant?: UIInputVariant;
	tone?: UITone;
	disabled?: boolean;
	className?: string;
};

export function Select({
	options,
	value,
	onChange,
	placeholder = "Seleccionar...",
	variant = "field",
	tone = "primary",
	disabled = false,
	className,
}: Props): ReactElement {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const id = useId();

	const selected = options.find((o) => o.value === value);

	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, []);

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};
		document.addEventListener("keydown", handler);
		return () => document.removeEventListener("keydown", handler);
	}, []);

	const handleSelect = (optionValue: string) => {
		onChange?.(optionValue);
		setOpen(false);
	};

	return (
		<div
			ref={ref}
			id={id}
			className={clsx(
				styles.select,
				styles[variant],
				styles[tone],
				disabled && styles.disabled,
				className,
			)}
		>
			<button
				type="button"
				className={styles.trigger}
				onClick={() => !disabled && setOpen((prev) => !prev)}
				aria-haspopup="listbox"
				aria-expanded={open}
				aria-disabled={disabled}
			>
				<span className={clsx(styles.value, !selected && styles.placeholder)}>
					{selected ? selected.label : placeholder}
				</span>

				<span className={clsx(styles.chevron, open && styles.chevronOpen)}>
					<NavArrowDown />
				</span>
			</button>

			{open && (
				<ul className={styles.dropdown}>
					{placeholder && (
						<li>
							<button
								type="button"
								className={clsx(styles.option, !value && styles.optionSelected)}
								onClick={() => handleSelect("")}
							>
								{placeholder}
							</button>
						</li>
					)}
					{options.map((option) => (
						<li key={option.value}>
							<button
								type="button"
								className={clsx(
									styles.option,
									value === option.value && styles.optionSelected,
								)}
								onClick={() => handleSelect(option.value)}
							>
								{option.label}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
