import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { getMessages } from 'next-intl/server'
import clsx from 'clsx'
import type { ReactElement, ReactNode } from 'react'

import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import { MobileMenu } from '@/components/Header/MobileMenu/MobileMenu'
import { Backdrop } from '@/components/UI/Backdrop/Backdrop'
import { isRtlLocale } from '@/i18n/config'
import { routing } from '@/i18n/routing'
import { generateMetadata } from '@/lib/metadata'
import { Providers } from '@/providers/index'
import { firaCode, inter } from '@/styles/fonts'

import '@/styles/globals.css'

interface Props {
	children: ReactNode

	params: Promise<{
		locale: string
	}>
}

export const metadata: Metadata = generateMetadata()

const RootLayout = async ({
	children,
	params,
}: Readonly<Props>): Promise<ReactElement> => {
	const { locale } = await params

	if (!hasLocale(routing.locales, locale)) {
		notFound()
	}

	const messages = await getMessages()

	const isRtl = isRtlLocale(locale)

	return (
		<html
			lang={locale}
			dir={isRtl ? 'rtl' : 'ltr'}
			suppressHydrationWarning
			className={clsx(inter.variable, firaCode.variable)}
			data-scroll-behavior="smooth"
		>
			<head>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
				/>
			</head>
			<body>
				<div id="modals" />
				<Providers locale={locale} messages={messages}>
					<Backdrop />
					<MobileMenu />
					<Header />
					{children}
					<Footer />
				</Providers>
			</body>
		</html>
	)
}

export default RootLayout
