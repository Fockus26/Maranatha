'use client'

import { type ReactElement } from 'react'
import clsx from 'clsx'
import { Menu } from 'iconoir-react'

import { Button } from '@/components/UI/Button/Button'
import { HoverDropdown } from '@/components/UI/Dropdown/HoverDropdown'
import { NavLink } from '@/components/UI/NavLink/NavLink'
import { useMenu } from '@/hooks/useMenu'

import classes from './Navbar.module.css'

export const Navbar = (): ReactElement => {
	const { toggleMenu } = useMenu()

	return (
		<nav className={clsx(classes.navbar)}>
			<ul className={clsx(classes.menu)}>
				<li>
					<NavLink href="/about">¿Quienes Somos?</NavLink>
				</li>
				<HoverDropdown />
			</ul>
			<Button className={classes.donateButton}>Quiero Ayudar</Button>
			<button onClick={toggleMenu} className={classes.icon}>
				<Menu />
			</button>
		</nav>
	)
}
