// Types
export interface HeroSlide {
	badge: string;
	title: string;
	subtitle: string;
	buttonText: string;
	buttonHref: string;
	image: string;
}

export interface HeroData {
	slides: HeroSlide[];
}

export interface PastorPrincipal {
	name: string;
	role: string;
	description: string;
	image: string;
	instagram?: string;
	facebook?: string;
	tiktok?: string;
}

export interface LiderSenior {
	name: string;
	role: string;
	image: string;
	description?: string;
	instagram?: string;
	facebook?: string;
	tiktok?: string;
}

export interface AreaServicio {
	title: string;
	capitan: string;
	image: string;
	bg: string;
	text: string;
	muted: string;
	buttonOneUrl?: string;
	buttonTwoUrl?: string;
	buttonOne?: string;
	buttonTwo?: string;
}

export interface LiderEvangelismo {
	name: string;
	role: string;
}

export interface EvangelismoData {
	title: string;
	description: string;
	image: string;
	buttonOneUrl?: string;
	buttonOne?: string;
	lideres: LiderEvangelismo[];
}

export interface InstagramPost {
	image: string;
	alt: string;
	url: string;
}

export interface InstagramData {
	handle: string;
	subtitle: string;
	followText: string;
	posts: InstagramPost[];
	facebookPosts: InstagramPost[];
	redes: RedSocialConfig[];
}

export interface RedSocialConfig {
	id: string;
	label: string;
	handle: string;
	url: string;
	gradient: string;
	followText: string;
}

export interface AboutData {
	hero: HeroData;
	sectionTitle: string;
	sectionDescription: string;
	pastoresPrincipales: PastorPrincipal[];
	lideresSectionTitle: string;
	lideresSectionDescription: string;
	lideresSenior: LiderSenior[];
	areasServicio: AreaServicio[];
	evangelismo: EvangelismoData;
	instagram: InstagramData;
}

export const aboutData: AboutData = {
	hero: {
		slides: [
			{
				badge: "Iglesia Maranatha San Cristóbal",
				title: "La Palabra que transforma",
				subtitle:
					"Porque la palabra de Dios es viva y eficaz. El evangelio de Cristo es nuestra misión, nuestra pasión y nuestra vida.",
				buttonText: "Conoce nuestros servicios",
				buttonHref: "",
				image: "/images/Iglesia.webp",
			},
		],
	},
	sectionTitle: "Pastores Principales",
	sectionDescription:
		"Nuestros pastores principales son el corazón de nuestra iglesia, guiando con amor, integridad y visión bíblica.",
	lideresSectionTitle: "Liderazgo Senior",
	lideresSectionDescription:
		"Hombres y mujeres comprometidos con la visión que Dios nos ha dado.",
	pastoresPrincipales: [
		{
			name: "Juan y María Delgado",
			role: "Pastores Principales",
			description: "Descripcion corta",
			image: "/images/pastor.jpg",
			instagram: "https://www.instagram.com/maranathasancristobal/",
			facebook: "https://www.facebook.com/Iglesiamaranathasc/",
			tiktok: "https://www.tiktok.com/",
		},
		{
			name: "Juan y María Delgado",
			role: "Pastores Principales",
			description: "Descripcion corta Descripcion corta",
			image: "/images/pastor.jpg",
			instagram: "https://www.instagram.com/maranathasancristobal/",
			facebook: "https://www.facebook.com/Iglesiamaranathasc/",
			tiktok: "https://www.tiktok.com/",
		},
	],
	lideresSenior: [
		{
			name: "Carlos Mendoza",
			role: "Director de Operaciones",
			description: "Apasionado por la excelencia en los procesos de la iglesia.",
			image: "/images/pastor.jpg",
			instagram: "https://www.instagram.com/",
			facebook: "https://www.facebook.com/",
		},
		{
			name: "Elena de Mendoza",
			role: "Directora de Discipulado",
			description: "Guiando a cada creyente a su próximo nivel espiritual.",
			image: "/images/pastor.jpg",
			tiktok: "https://www.tiktok.com/",
		},
		{
			name: "Andrés Silva",
			role: "Director de Administración",
			description: "Administrando los recursos de la casa de Dios con fidelidad.",
			image: "/images/pastor.jpg",
		},
		{
			name: "Carlos Mendoza",
			role: "Director de Operaciones",
			description: "Apasionado por la excelencia en los procesos de la iglesia.",
			image: "/images/pastor.jpg",
			instagram: "https://www.instagram.com/",
			facebook: "https://www.facebook.com/",
		},
		{
			name: "Elena de Mendoza",
			role: "Directora de Discipulado",
			description: "Guiando a cada creyente a su próximo nivel espiritual.",
			image: "/images/pastor.jpg",
			tiktok: "https://www.tiktok.com/",
		},
		{
			name: "Andrés Silva",
			role: "Director de Administración",
			description: "Administrando los recursos de la casa de Dios con fidelidad.",
			image: "/images/pastor.jpg",
		},
		{
			name: "Elena de Mendoza",
			role: "Directora de Discipulado",
			description: "Guiando a cada creyente a su próximo nivel espiritual.",
			image: "/images/pastor.jpg",
			tiktok: "https://www.tiktok.com/",
		},
		{
			name: "Andrés Silva",
			role: "Director de Administración",
			description: "Administrando los recursos de la casa de Dios con fidelidad.",
			image: "/images/pastor.jpg",
		},
	],
	areasServicio: [
		{
			title: "Alabanza & Adoración",
			capitan: "Capitán: Samuel Roa",
			image: "/images/adoracion.webp",
			bg: "bg-primary-container",
			text: "text-white",
			muted: "text-white/70",
		},
		{
			title: "Medios y Producción",
			capitan: "Capitán: Simón",
			image: "/images/palabra.webp",
			bg: "bg-surface",
			text: "text-primary-container",
			muted: "text-on-surface-variant",
		},
		{
			title: "Alabanza & Adoración",
			capitan: "Capitán: Samuel Roa",
			image: "/images/adoracion.webp",
			bg: "bg-primary-container",
			text: "text-white",
			muted: "text-white/70",
		},
		{
			title: "Medios y Producción",
			capitan: "Capitán: Simón",
			image: "/images/palabra.webp",
			bg: "bg-surface",
			text: "text-primary-container",
			muted: "text-on-surface-variant",
		},
		{
			title: "Alabanza & Adoración",
			capitan: "Capitán: Samuel Roa",
			image: "/images/adoracion.webp",
			bg: "bg-primary-container",
			text: "text-white",
			muted: "text-white/70",
		},
		{
			title: "Medios y Producción",
			capitan: "Capitán: Simón",
			image: "/images/palabra.webp",
			bg: "bg-surface",
			text: "text-primary-container",
			muted: "text-on-surface-variant",
		},
	],
	evangelismo: {
		title: "Maranatha en las Calles",
		description:
			"Llevamos el evangelio más allá de nuestras paredes, transformando vidas en cada sector de San Cristóbal.",
		image: "/images/evangelizacion.webp",
		buttonOneUrl: "#",
		buttonOne: "Quiero Participar",
		lideres: [
			{ name: "Pedro Gómez", role: "Coordinador de Rutas" },
			{ name: "Ana María Flores", role: "Líder de Misiones" },
		],
	},
	instagram: {
		handle: "@eectachira.sc",
		subtitle: "Nuestra vida diaria en imágenes",
		followText: "Síguenos en Instagram",
		posts: [
			{
				image: "/images/instagram.jpg",
				alt: "Post de Instagram 1",
				url: "https://www.instagram.com/maranathasancristobal/",
			},
			{
				image: "/images/instagram.jpg",
				alt: "Post de Instagram 2",
				url: "https://www.instagram.com/maranathasancristobal/",
			},
			{
				image: "/images/instagram.jpg",
				alt: "Post de Instagram 3",
				url: "https://www.instagram.com/maranathasancristobal/",
			},
			{
				image: "/images/instagram.jpg",
				alt: "Post de Instagram 4",
				url: "https://www.instagram.com/maranathasancristobal/",
			},
		],
		facebookPosts: [
			{
				image: "/images/instagram.jpg",
				alt: "Post FB 1",
				url: "https://www.facebook.com/Iglesiamaranathasc/",
			},
			{
				image: "/images/instagram.jpg",
				alt: "Post FB 2",
				url: "https://www.facebook.com/Iglesiamaranathasc/",
			},
			{
				image: "/images/instagram.jpg",
				alt: "Post FB 3",
				url: "https://www.facebook.com/Iglesiamaranathasc/",
			},
			{
				image: "/images/instagram.jpg",
				alt: "Post FB 4",
				url: "https://www.facebook.com/Iglesiamaranathasc/",
			},
		],
		redes: [
			{
				id: "instagram",
				label: "Instagram",
				handle: "@eectachira.sc",
				url: "https://www.instagram.com/maranathasancristobal/",
				gradient: "linear-gradient(45deg, #F09433, #DC2743, #BC1888)",
				followText: "Síguenos en Instagram",
			},
		],
	},
};
