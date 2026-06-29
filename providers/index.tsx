"use client";

import type { ReactElement, ReactNode } from "react";
import { Auth as AuthProvider } from "@/providers/auth";
import { Internationalization as InternationalizationProvider } from "@/providers/internationalization";
import { Redux as ReduxProvider } from "@/providers/redux";
import { Theme as ThemeProvider } from "@/providers/theme";

interface Props {
	children: ReactNode;

	locale: string;

	messages: Record<string, unknown>;
}

export const Providers = ({ children, locale, messages }: Props): ReactElement => {
	return (
		<ReduxProvider>
			<AuthProvider>
				<ThemeProvider>
					<InternationalizationProvider locale={locale} messages={messages}>
						{children}
					</InternationalizationProvider>
				</ThemeProvider>
			</AuthProvider>
		</ReduxProvider>
	);
};
