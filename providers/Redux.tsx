'use client'

import type { ReactNode } from 'react'
import { Provider as ReduxProvider } from 'react-redux'

import { store } from '@/store'

interface Props {
	children: ReactNode
}

export const Redux = ({ children }: Props): ReactNode => {
	return <ReduxProvider store={store}>{children}</ReduxProvider>
}
