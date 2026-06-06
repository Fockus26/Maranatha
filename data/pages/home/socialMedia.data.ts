import { FacebookIcon } from "@/components/icons/facebookIcon";
import { InstagramIcon } from "@/components/icons/instagramIcon";
import type { SocialMediaData } from "@/types/pages/home/socialMedia.types";

export const socialMediaData: SocialMediaData = {
	instagram: {
		label: "Instagram",
		account: "@maranathasancristobal",
		color: "#DC2743",
		url: "https://www.instagram.com/maranathasancristobal/",
		gradient: "linear-gradient(45deg, #F09433, #DC2743, #BC1888)",
		icon: InstagramIcon,
		items: [
			{
				image: "/images/instagram.jpg",
				url: "https://www.instagram.com/maranathasancristobal/",
			},
			{
				image: "/images/instagram.jpg",
				url: "https://www.instagram.com/maranathasancristobal/",
			},
			{
				image: "/images/instagram.jpg",
				url: "https://www.instagram.com/maranathasancristobal/",
			},
			{
				image: "/images/instagram.jpg",
				url: "https://www.instagram.com/maranathasancristobal/",
			},
		],
	},
	facebook: {
		label: "Facebook",
		account: "Iglesia Maranatha San Cristóbal",
		url: "https://www.facebook.com/Iglesiamaranathasc",
		color: "#1877F2",
		gradient: "linear-gradient(45deg, #1877F2, #0a5fd8)",
		icon: FacebookIcon,
		items: [
			{
				image: "/images/instagram.jpg",
				url: "https://www.facebook.com/Iglesiamaranathasc/",
			},
			{
				image: "/images/instagram.jpg",
				url: "https://www.facebook.com/Iglesiamaranathasc/",
			},
			{
				image: "/images/instagram.jpg",
				url: "https://www.facebook.com/Iglesiamaranathasc/",
			},
			{
				image: "/images/instagram.jpg",
				url: "https://www.facebook.com/Iglesiamaranathasc/",
			},
		],
	},
};
