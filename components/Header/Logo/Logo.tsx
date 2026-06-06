import Image, { type ImageProps, type StaticImageData } from "next/image";
import type { ReactElement } from "react";
import { Link } from "@/i18n/navigation";
import classes from "./logo.module.scss";

interface Props extends Omit<ImageProps, "src" | "alt"> {
	href: string;
	alt: string;
	src: StaticImageData;
}

export const Logo = ({ href, alt, src, ...props }: Props): ReactElement => {
	return (
		<Link href={href} className={classes.logo}>
			<Image src={src} {...props} alt={alt} />
		</Link>
	);
};
