"use client";

import type { ReactElement, ReactNode } from "react";
import { Auth as AuthProvider } from "@/providers/Auth";
import { Internationalization as InternationalizationProvider } from "./Internationalization";
import { Redux as ReduxProvider } from "./Redux";
import { Theme as ThemeProvider } from "./Theme";

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
