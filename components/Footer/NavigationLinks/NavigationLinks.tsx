import type { ReactElement } from 'react'

import { ClickDropdown } from '@/components/UI/Dropdown/ClickDropdown'
import { NavLink } from '@/components/UI/NavLink/NavLink'

import classes from './NavigationLinks.module.css'

export const NavigationLinks = (): ReactElement => {
	return (
		<ul className={classes.navigation}>
			<li>
				<NavLink href="/about" variant="vertical">
					¿Quienes Somos?
				</NavLink>
			</li>
			<ClickDropdown />
		</ul>
	)
}
