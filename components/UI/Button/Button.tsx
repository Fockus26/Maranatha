import clsx from 'clsx'
import type { ComponentProps, ReactElement, ReactNode } from 'react'

import classes from './Button.module.css'

interface Props extends ComponentProps<'button'> {
	children: ReactNode
	icon?: ReactNode
}

export const Button = ({ children, className, icon, ...props }: Props): ReactElement => {
	return (
		<button className={clsx(className, classes.button)} {...props}>
			{icon && <span className={classes.icon}>{icon}</span>}
			{children}
		</button>
	)
}