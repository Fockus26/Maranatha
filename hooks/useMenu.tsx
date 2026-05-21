import { closeMenu, openMenu, toggleMenu } from '@/store/slices/menuSlice'

import { useAppDispatch, useAppSelector } from './useRedux'

interface UseMenuReturn {
	isOpen: boolean

	openMenu: () => void

	closeMenu: () => void

	toggleMenu: () => void
}

export const useMenu = (): UseMenuReturn => {
	const dispatch = useAppDispatch()

	const isOpen = useAppSelector((state) => state.menu.isOpen)

	return {
		isOpen,

		openMenu: (): void => {
			dispatch(openMenu())
		},

		closeMenu: (): void => {
			dispatch(closeMenu())
		},

		toggleMenu: (): void => {
			dispatch(toggleMenu())
		},
	}
}
