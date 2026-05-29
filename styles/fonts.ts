import { Fira_Code, Inter } from "next/font/google";

export const inter = Inter({
    subsets: ["latin"],

    display: "swap",

    variable: "--font-primary",
});

export const firaCode = Fira_Code({
    subsets: ["latin"],

    display: "swap",

    variable: "--font-mono",
});
