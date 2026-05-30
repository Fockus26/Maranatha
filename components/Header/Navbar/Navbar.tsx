'use client'

import { type ReactElement, useState } from 'react'
import { Menu } from 'iconoir-react'

import { Button } from '@/components/UI/Button/Button'
import { HoverDropdown } from '@/components/UI/Dropdown/HoverDropdown'
import { NavLink } from '@/components/UI/NavLink/NavLink'
import { useMenu } from '@/hooks/useMenu'

import classes from './Navbar.module.css'

type Props = {
	onDropdownChange?: (isOpen: boolean) => void
}

export const Navbar = ({ onDropdownChange }: Props): ReactElement => {
	const { toggleMenu } = useMenu()
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)

	const handleDropdownChange = (value: boolean) => {
		setIsDropdownOpen(value)
		onDropdownChange?.(value)
	}

	return (
		<nav
			className={classes.navbar}
			onMouseLeave={() => handleDropdownChange(false)}
		>
			<ul className={classes.menu}>
				<li onMouseEnter={() => handleDropdownChange(false)}>
					<NavLink href="/about">Sobre Nosotros</NavLink>
				</li>
				<li onMouseEnter={() => handleDropdownChange(false)}>
					<NavLink href="/events">Eventos</NavLink>
				</li>
				<li onMouseEnter={() => handleDropdownChange(false)}>
					<NavLink href="/evangelio-cambia">Evangelio Cambia</NavLink>
				</li>
				<li onMouseEnter={() => handleDropdownChange(false)}>
					<NavLink href="/jef">Jef</NavLink>
				</li>
				<li onMouseEnter={() => handleDropdownChange(false)}>
					<NavLink href="/ofrendas">Ofrendas</NavLink>
				</li>
				<HoverDropdown
					isOpen={isDropdownOpen}
					onOpenChange={handleDropdownChange}
				/>
			</ul>

			<Button className={classes.prayerButton}>Oración</Button>

			<button onClick={toggleMenu} className={classes.icon}>
				<Menu />
			</button>
		</nav>
	)
}