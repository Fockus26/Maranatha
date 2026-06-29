import type { ReactElement, ReactNode } from "react";
import { Backdrop } from "@/components/website/backdrop/backdrop";
import { Footer } from "@/components/website/footer/footer";
import { Header } from "@/components/website/header/header";
import { MobileMenu } from "@/components/website/header/mobileMenu/mobileMenu";

import "@/styles/globals.css";
import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

interface Props {
	children: ReactNode;
}

export const metadata: Metadata = generateMetadata();

const WebsiteLayout = async ({ children }: Readonly<Props>): Promise<ReactElement> => {
	return (
		<>
			<div id="modals" />
			<Backdrop />
			<MobileMenu />
			<Header />
			{children}
			<Footer />
		</>
	);
};

export default WebsiteLayout;
