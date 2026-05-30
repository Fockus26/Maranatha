'use client'

import { type ReactElement, useEffect, useState } from 'react'
import clsx from 'clsx'
import { createPortal } from 'react-dom'

import { ClickDropdown } from '@/components/UI/Dropdown/ClickDropdown'
import { NavLink } from '@/components/UI/NavLink/NavLink'
import { useMenu } from '@/hooks/useMenu'

import classes from './MobileMenu.module.css'

export const MobileMenu = (): ReactElement | null => {
	const [mounted, setMounted] = useState(false)

	const [modalsContainer, setModalsContainer] = useState<HTMLElement | null>(
		null,
	)

	const { isOpen, closeMenu } = useMenu()

	useEffect(() => {
		setMounted(true)

		const element = document.getElementById('modals')

		setModalsContainer(element)
	}, [])

	if (!mounted || !isOpen || !modalsContainer) {
		return null
	}

	return createPortal(
		<ul className={clsx(classes.menu, classes.isOpen)}>
			<ul className={clsx(classes.menu, classes.isOpen)}>
				<li>
					<NavLink href="/about" onClick={closeMenu} variant="vertical">
						Sobre Nosotros
					</NavLink>
				</li>
				<li>
					<NavLink href="/events" onClick={closeMenu} variant="vertical">
						Eventos
					</NavLink>
				</li>
				<li>
					<NavLink href="/evangelio-cambia" onClick={closeMenu} variant="vertical">
						Evangelio Cambia
					</NavLink>
				</li>
				<li>
					<NavLink href="/jef" onClick={closeMenu} variant="vertical">
						Jef
					</NavLink>
				</li>
				<li>
					<NavLink href="/ofrendas" onClick={closeMenu} variant="vertical">
						Ofrendas
					</NavLink>
				</li>
				<ClickDropdown onSelect={closeMenu} />
			</ul>
			<ClickDropdown onSelect={closeMenu} />
		</ul>,
		modalsContainer,
	)
}
