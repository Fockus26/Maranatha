import type { ReactElement } from "react";
import { NavLink } from "@/components/ui/navLink/navLink";
import { footerData } from "@/data/footer.data";
import type { FooterLinks, FooterMessages } from "@/types/footer.types";
import styles from "./footer.module.scss";

interface Props {
	messages: FooterMessages;
}

export const Footer = ({ messages }: Props): ReactElement => {
	return (
		<footer className={styles.footer}>
			<div className={styles.main}>
				<ul className={styles.links}>
					{Object.entries(footerData.legalLinks).map(([linKey, link]) => {
						const key = linKey as FooterLinks;
						return (
							<li key={crypto.randomUUID()}>
								<NavLink variant="vertical" href={link}>
									{messages.links[key]}
								</NavLink>
							</li>
						);
					})}
				</ul>
			</div>
			<div className={styles.copyright}>
				<p>{messages.copyright}</p>
			</div>
		</footer>
	);
};
