"use client";

import { NextIntlClientProvider as InternationalizationProvider } from "next-intl";
import type { ReactElement, ReactNode } from "react";

interface Props {
    children: ReactNode;

    locale: string;

    messages: Record<string, unknown>;
}

export const Internationalization = ({ children, locale, messages }: Props): ReactElement => {
    return (
        <InternationalizationProvider locale={locale} messages={messages}>
            {children}
        </InternationalizationProvider>
    );
};
