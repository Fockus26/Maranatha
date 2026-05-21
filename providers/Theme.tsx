'use client'

import { ThemeProvider } from 'next-themes'
import type { ReactElement, ReactNode } from 'react'

interface Props {
	children: ReactNode
}

export const Theme = ({ children }: Props): ReactElement => {
	return (
		<ThemeProvider
			attribute="data-theme"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			{children}
		</ThemeProvider>
	)
}
