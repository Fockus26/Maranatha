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

export interface EventsItem {
	title: string;
	location: string;
	date: string;
	time: string;
	venue: string;
	image: string;
}

export interface CarouselItem {
	title: string;
	description: string;
	imageMobile: string;
	imageDesktop: string;
	orderUrl: string;
	learnMoreUrl: string;
}

export interface EventsData {
	hero: HeroData;
	sectionTitle: string;
	carouselItems: CarouselItem[];
	items: EventsItem[];
}

export const eventsData: EventsData = {
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
	sectionTitle: "Próximos Eventos",
	carouselItems: [
		{
			title: "Noche de Adoración",
			description: "Una velada de alabanza y adoración para toda la familia.",
			imageMobile:
				"https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&q=80&w=600&h=400",
			imageDesktop:
				"https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&q=80&w=1440&h=700",
			orderUrl: "#",
			learnMoreUrl: "#",
		},
		{
			title: "Conferencia de Fe",
			description: "Tres días de enseñanza, milagros y renovación espiritual.",
			imageMobile:
				"https://images.unsplash.com/photo-1438029071396-1e831a7fa6d8?auto=format&fit=crop&q=80&w=600&h=400",
			imageDesktop:
				"https://images.unsplash.com/photo-1438029071396-1e831a7fa6d8?auto=format&fit=crop&q=80&w=1440&h=700",
			orderUrl: "#",
			learnMoreUrl: "#",
		},
		{
			title: "Campamento Juvenil",
			description: "Una experiencia única de comunión, aventura y propósito.",
			imageMobile:
				"https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&q=80&w=600&h=400",
			imageDesktop:
				"https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&q=80&w=1440&h=700",
			orderUrl: "#",
			learnMoreUrl: "#",
		},
	],
	items: [
		{
			title: "Noche de Adoración",
			location: "San Cristóbal",
			date: "Dom. 28 Junio, 2026",
			time: "7:00 PM GMT-4",
			venue: "Auditorio Maranatha",
			image: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&q=80&w=800&h=500",
		},
		{
			title: "Conferencia de Fe",
			location: "San Cristóbal",
			date: "Sáb. 10 Julio, 2026",
			time: "9:00 AM GMT-4",
			venue: "Centro de Convenciones",
			image: "https://images.unsplash.com/photo-1438029071396-1e831a7fa6d8?auto=format&fit=crop&q=80&w=800&h=500",
		},
		{
			title: "Campamento Juvenil",
			location: "Táriba",
			date: "Vie. 24-26 Julio, 2026",
			time: "3:00 PM GMT-4",
			venue: "Finca El Encuentro",
			image: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&q=80&w=800&h=500",
		},
		{
			title: "Taller de Matrimonios",
			location: "San Cristóbal",
			date: "Sáb. 7 Agosto, 2026",
			time: "10:00 AM GMT-4",
			venue: "Salón Principal",
			image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800&h=500",
		},
		{
			title: "Conferencia de Fe",
			location: "San Cristóbal",
			date: "Sáb. 10 Julio, 2026",
			time: "9:00 AM GMT-4",
			venue: "Centro de Convenciones",
			image: "https://images.unsplash.com/photo-1438029071396-1e831a7fa6d8?auto=format&fit=crop&q=80&w=800&h=500",
		},
		{
			title: "Campamento Juvenil",
			location: "Táriba",
			date: "Vie. 24-26 Julio, 2026",
			time: "3:00 PM GMT-4",
			venue: "Finca El Encuentro",
			image: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&q=80&w=800&h=500",
		},
	],
};
