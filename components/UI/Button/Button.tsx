import clsx from "clsx";
import type { ComponentProps, ReactElement, ReactNode } from "react";

import classes from "./Button.module.scss";

interface Props extends ComponentProps<"button"> {
    children: ReactNode;
}

export const Button = ({ children, className, type = "button" }: Props): ReactElement => {
    return (
        <button type={type} className={clsx(className, classes.button)}>
            {children}
        </button>
    );
};
