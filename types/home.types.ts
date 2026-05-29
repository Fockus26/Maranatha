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

export interface ValorItem {
    icon: string;
    title: string;
    description: string;
    image: string;
    delay: number;
}

export interface ValoresData {
    sectionTitle: string;
    items: ValorItem[];
}

export interface PastorItem {
    name: string;
    role: string;
    description: string;
    image: string;
    signature?: string;
}

export interface PastoresData {
    sectionLabel: string;
    sectionTitle: string;
    items: PastorItem[];
}

export interface SermonItem {
    title: string;
    series: string;
    date: string;
    thumbnail: string;
    youtubeId: string;
}

export interface SermonesData {
    sectionTitle: string;
    featured: SermonItem;
    secundarios: SermonItem[];
}

export interface EventoItem {
    category: string;
    title: string;
    description: string;
    date: string;
    image: string;
    delay: number;
    bg: string;
    text: string;
    muted: string;
    tag: string;
}

export interface EventosData {
    sectionTag: string;
    sectionDescription: string;
    items: EventoItem[];
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
}

export interface ContactoInfo {
    icon: string;
    title: string;
    value: string;
}

export interface ContactoData {
    sectionTitle: string;
    onlineLabel: string;
    onlineSchedule: string;
    presencialLabel: string;
    presencialSchedule: string;
    address: string;
    mapImage: string;
    info: ContactoInfo[];
}

export interface HomeData {
    hero: HeroData;
    valores: ValoresData;
    pastores: PastoresData;
    sermones: SermonesData;
    eventos: EventosData;
    instagram: InstagramData;
    contacto: ContactoData;
}
