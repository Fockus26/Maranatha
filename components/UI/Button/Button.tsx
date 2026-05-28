import clsx from 'clsx'
import type { ComponentProps, ReactElement, ReactNode } from 'react'

import classes from './Button.module.css'

interface Props extends ComponentProps<'button'> {
	children: ReactNode
}

export const Button = ({ children, className }: Props): ReactElement => {
	return (
		<button className={clsx(className, classes.button)}>{children}</button>
	)
}
