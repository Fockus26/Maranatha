import type { ReactElement } from "react";
import { LegalLinks } from "@/components/footer/legalLinks/legalLinks";
import type { FooterMessages } from "@/types/footer.types";
import classes from "./footer.module.scss";

interface Props {
	messages: FooterMessages;
}

export const Footer = ({ messages }: Props): ReactElement => {
	return (
		<footer className={classes.footer}>
			<div className={classes.main}>
				<LegalLinks messages={messages} />
			</div>
			<div className={classes.copyright}>
				<p>{messages.copyright}</p>
			</div>
		</footer>
	);
};
