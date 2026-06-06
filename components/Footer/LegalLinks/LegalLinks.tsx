import type { ReactElement } from "react";
import { NavLink } from "@/components/ui/navLink/navLink";
import { footerData } from "@/data/footer.data";
import type { FooterLinks, FooterMessages } from "@/types/footer.types";
import classes from "./legalLinks.module.scss";

interface Props {
	messages: FooterMessages;
}

export const LegalLinks = ({ messages }: Props): ReactElement => {
	return (
		<ul className={classes.legalLinks}>
			{Object.entries(footerData).map(([linKey, link]) => {
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
	);
};
