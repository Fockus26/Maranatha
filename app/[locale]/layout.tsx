import clsx from "clsx";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import type { ReactElement, ReactNode } from "react";
import { isRtlLocale } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { generateMetadata } from "@/lib/metadata";
import { Providers } from "@/providers/index";
import { clashDisplay, dmSans } from "@/styles/fonts";

import "@/styles/theme.scss";
import "@/styles/globals.scss";

interface Props {
	children: ReactNode;

	params: Promise<{
		locale: string;
	}>;
}

export const metadata: Metadata = generateMetadata();

const RootLayout = async ({ children, params }: Readonly<Props>): Promise<ReactElement> => {
	const { locale } = await params;

	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	const messages = await getMessages();
	const isRtl = isRtlLocale(locale);

	return (
		<html
			lang={locale}
			dir={isRtl ? "rtl" : "ltr"}
			suppressHydrationWarning
			className={clsx(dmSans.variable, clashDisplay.variable)}
			data-scroll-behavior="smooth"
		>
			<body>
				<Providers locale={locale} messages={messages}>
					{children}
				</Providers>
			</body>
		</html>
	);
};

export default RootLayout;
