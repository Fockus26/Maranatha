import { getMessages } from "next-intl/server";
import type { ReactNode } from "react";
import { Backdrop } from "@/components/ui/backdrop/backdrop";
import { Footer } from "@/components/ui/footer/footer";
import { Header } from "@/components/ui/header/header";
import { MobileMenu } from "@/components/ui/header/mobileMenu/mobileMenu";

export default async function WebsiteLayout({ children }: { children: ReactNode }) {
	const messages = await getMessages();

	return (
		<>
			<Backdrop />
			<MobileMenu messages={messages.header.navbar} />
			<Header messages={messages.header} />
			<main>{children}</main>
			<Footer messages={messages.footer} />
		</>
	);
}
