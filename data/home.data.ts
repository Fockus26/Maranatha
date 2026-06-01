// Types
export interface HeroSlide {
    badge: string;
    title: string;
    subtitle: string;
    buttonText: string;
    buttonHref: string;
    image: string;
}

export const homeData: HomeData = {
    hero: {
        slides: [
            {
                badge: "Iglesia Maranatha San Cristóbal",
                title: "La Palabra que transforma",
                subtitle:
                    "Porque la palabra de Dios es viva y eficaz. El evangelio de Cristo es nuestra misión, nuestra pasión y nuestra vida.",
                buttonText: "Conoce nuestros servicios",
                buttonHref: "/servicios",
                image: "/images/palabra.webp",
            },
            // {
            // 	badge: 'Nuestra visión',
            // 	title: 'Creciendo en comunidad',
            // 	subtitle: 'Un espacio donde cada alma encuentra su propósito y cada corazón su hogar en la presencia de Dios.',
            // 	buttonText: 'Conócenos',
            // 	buttonHref: '#nosotros',
            // 	image: '/images/alabanza.jpg',
            // },
        ],
    },
    valores: {
        sectionTitle: "Nuestros Pilares Fundamentales",
        items: [
            {
                icon: "/iconos/orar.png",
                title: "Oración",
                description:
                    "El fundamento de todo lo que somos; la oración mueve el corazón de Dios y transforma el nuestro cada día.",
                image: "/images/oracion.webp",
                delay: 100,
            },
            {
                icon: "music_note",
                title: "Adoración",
                description:
                    "Celebramos a Dios con todo lo que somos; la adoración no es un momento, es un estilo de vida diario.",
                image: "/images/adoracion.webp",
                delay: 200,
            },
            {
                icon: "school",
                title: "Discipulado",
                description:
                    "Crecemos juntos en la fe; cada creyente es formado y equipado para impactar su familia y entorno.",
                image: "/images/discipulado.webp",
                delay: 300,
            },
            {
                icon: "campaign",
                title: "Evangelización",
                description:
                    "Llevamos el evangelio más allá de nuestras paredes, porque toda persona merece escuchar las buenas nuevas.",
                image: "/images/evangelizacion.webp",
                delay: 400,
            },
        ],
    },
    pastores: {
        sectionLabel: "Liderazgo espiritual",
        sectionTitle: "Nuestros pastores",
        items: [
            {
                name: "Juan y María Delgado",
                role: "Pastores Principales",
                description:
                    "Con más de 20 años de ministerio, los pastores Delgado han guido a Maranatha con una visión de integridad y amor. Su pasión es ver vidas transformadas por la gracia de Dios y familias fortalecidas en la verdad bíblica.",
                image: "/images/pastores-foto.png",
            },
        ],
    },
    sermones: {
        sectionTitle: "Palabra Viva",
        featured: {
            title: "Caminando sobre las Aguas",
            series: "Fe Inquebrantable",
            date: "12 May 2026",
            thumbnail:
                "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&q=80&w=1200&h=675",
            youtubeId: "dQw4w9WgXcQ",
        },
        secundarios: [
            {
                title: "La Raíz de la Esperanza",
                series: "Fe Inquebrantable",
                date: "05 May 2026",
                thumbnail:
                    "https://images.unsplash.com/photo-1438029071396-1e831a7fa6d8?auto=format&fit=crop&q=80&w=600",
                youtubeId: "dQw4w9WgXcQ",
            },
            {
                title: "Paz en la Tormenta",
                series: "Fe Inquebrantable",
                date: "28 Abr 2026",
                thumbnail:
                    "https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&q=80&w=600",
                youtubeId: "dQw4w9WgXcQ",
            },
            {
                title: "Transformación Total",
                series: "Raíces",
                date: "21 Abr 2026",
                thumbnail:
                    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600",
                youtubeId: "dQw4w9WgXcQ",
            },
        ],
    },
    eventos: {
        sectionTag: "Nuestra Agenda",
        sectionDescription:
            "Mantente conectado con nuestras actividades semanales y eventos especiales diseñados para toda la familia.",
        items: [
            {
                category: "Jóvenes",
                title: "Noche de Conexión",
                description:
                    "Un espacio para compartir, aprender y crecer juntos en un ambiente relajado.",
                date: "Vie, 24 Mayo • 19:30",
                image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=600&h=800",
                delay: 100,
                bg: "bg-primary-container",
                text: "text-white",
                muted: "text-white/60",
                tag: "bg-accent/20 text-accent",
            },
            {
                category: "Familias",
                title: "Día del Parque Maranatha",
                description: "Juegos, comida y compañerismo para todas las edades al aire libre.",
                date: "Dom, 02 Junio • 11:00",
                image: "https://images.unsplash.com/photo-1469571486040-7a3084c73d11?auto=format&fit=crop&q=80&w=600&h=800",
                delay: 200,
                bg: "bg-surface",
                text: "text-primary-container",
                muted: "text-on-surface-variant",
                tag: "bg-accent/10 text-accent",
            },
            {
                category: "Discipulado",
                title: "Taller de Vida Interior",
                description:
                    "Descubre herramientas prácticas para fortalecer tu relación diaria con Dios.",
                date: "Sáb, 15 Junio • 09:00",
                image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=600&h=800",
                delay: 300,
                bg: "bg-accent/10",
                text: "text-primary-container",
                muted: "text-on-surface-variant",
                tag: "bg-primary-container/10 text-primary-container",
            },
            {
                category: "Jóvenes",
                title: "Noche de Conexión",
                description:
                    "Un espacio para compartir, aprender y crecer juntos en un ambiente relajado.",
                date: "Vie, 24 Mayo • 19:30",
                image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=600&h=800",
                delay: 100,
                bg: "bg-primary-container",
                text: "text-white",
                muted: "text-white/60",
                tag: "bg-accent/20 text-accent",
            },
        ],
    },
    instagram: {
        handle: "@maranatha_oficial",
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
    },
    contacto: {
        sectionTitle: "Conéctate",
        onlineLabel: "Servicio Online",
        onlineSchedule: "Domingos • 10:00 AM",
        presencialLabel: "Presencial",
        presencialSchedule: "Domingos • 12:00 PM & 18:00 PM",
        address: "Calle de la Luz 123, Tu Ciudad",
        mapImage:
            "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200&h=300",
        info: [
            { icon: "mail", title: "Email", value: "hola@maranatha.com" },
            { icon: "call", title: "Teléfono", value: "+1 (000) 000-0000" },
            { icon: "location_on", title: "Ubicación", value: "Calle de la Luz 123" },
            { icon: "schedule", title: "Oficina", value: "Lun-Vie: 9h - 17h" },
        ],
    },
};
