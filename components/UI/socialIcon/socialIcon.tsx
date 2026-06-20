import { Facebook, Instagram, Mail, Twitter, Whatsapp } from "iconoir-react";
import type { ReactElement } from "react";
import type { SocialMediaPlatform } from "@/types/project.types";

const ICONS: Record<SocialMediaPlatform, typeof Facebook> = {
	INSTAGRAM: Instagram,
	FACEBOOK: Facebook,
	TWITTER: Twitter,
	WHATSAPP: Whatsapp,
	GMAIL: Mail,
};

type Props = {
	platform: SocialMediaPlatform;
};

export const SocialIcon = ({ platform }: Props): ReactElement => {
	const Icon = ICONS[platform];

	return <Icon width={18} height={18} strokeWidth={2} />;
};
