import clsx from "clsx";
import type { ComponentProps, ReactElement, ReactNode } from "react";

import classes from "./button.module.scss";

type ButtonContent =
	| {
			children: ReactNode;
			icon?: ReactNode;
	  }
	| {
			icon: ReactNode;
			children?: ReactNode;
	  };

type Props = ComponentProps<"button"> & ButtonContent;

export const Button = ({ children, className, icon, ...props }: Props): ReactElement => {
	return (
		<button className={clsx(classes.button, className)} {...props}>
			{icon && <span className={classes.icon}>{icon}</span>}
			{children}
		</button>
	);
};
