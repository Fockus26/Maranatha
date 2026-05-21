'use client'

import type { ReactElement, ReactNode } from 'react'

import { Internationalization } from './Internationalization'
import { Redux } from './Redux'
import { Theme } from './Theme'

interface Props {
	children: ReactNode

	locale: string

	messages: Record<string, unknown>
}

export const Providers = ({
	children,
	locale,
	messages,
}: Props): ReactElement => {
	return (
		<Redux>
			<Theme>
				<Internationalization locale={locale} messages={messages}>
					{children}
				</Internationalization>
			</Theme>
		</Redux>
	)
}
