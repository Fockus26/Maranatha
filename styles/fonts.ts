import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";

export const dmSans = DM_Sans({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-body",
});

export const clashDisplay = localFont({
    src: [
        {
            path: "../app/fonts/ClashDisplay-Regular.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../app/fonts/ClashDisplay-Medium.woff2",
            weight: "500",
            style: "normal",
        },
        {
            path: "../app/fonts/ClashDisplay-Semibold.woff2",
            weight: "600",
            style: "normal",
        },
        {
            path: "../app/fonts/ClashDisplay-Bold.woff2",
            weight: "700",
            style: "normal",
        },
    ],
    display: "swap",
    variable: "--font-header",
});
