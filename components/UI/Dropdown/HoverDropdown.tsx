'use client'

import { AnimatePresence, motion } from 'framer-motion'
import type { ReactElement } from 'react'

import { NavLink } from '@/components/UI/NavLink/NavLink'

import classes from './HoverDropdown.module.css'

const projectLinks = [
	{ href: '/projects/el-evangelio-cambia', label: 'El Evangelio Cambia' },
	{ href: '/projects/eventos-especiales', label: 'Eventos Especiales' },
	{ href: '/projects/iglesia', label: 'Iglesia' },
]

type Props = {
	isOpen: boolean
	onOpenChange: (isOpen: boolean) => void
}

export const HoverDropdown = ({ isOpen, onOpenChange }: Props): ReactElement => {
	return (
		<li
			className={classes.dropdown}
			onMouseEnter={() => onOpenChange(true)}
		>
			<NavLink href="/projects">Proyectos</NavLink>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						className={classes.panel}
						initial={{ opacity: 0, y: -8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -8 }}
						transition={{ duration: 0.2, ease: 'easeOut' }}
					>
						<div className={classes.spacer} />

						<ul className={classes.links}>
							{projectLinks.map(({ href, label }) => (
								<li key={href}>
									<NavLink variant="vertical" href={href}>
										{label}
									</NavLink>
								</li>
							))}
						</ul>

						<div className={classes.divider} />

						<div className={classes.description}>
							<p className={classes.title}>Proyectos</p>
							<p className={classes.subtitle}>
								Conoce las distintas iniciativas y ministerios que llevamos
								adelante para impactar nuestra comunidad.
							</p>
						</div>

						<div className={classes.spacer} />
					</motion.div>
				)}
			</AnimatePresence>
		</li>
	)
}