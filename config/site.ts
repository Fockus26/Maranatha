// import { env } from './env'

interface SiteConfig {
	shortName: string
	name: string
	description: string
	url: string
	creator: string
	keywords: string[]
	ogImage: string
	lang: 'es' | 'en'
}

export const siteConfig: SiteConfig = {
	shortName: 'Maranatha',

	name: 'Maranatha San Cristobal',

	description: 'Iglesia Maranatha San Cristobal',

	url: 'http://localhost:3000',

	creator: 'https://github.com/Fockus26',

	keywords: ['Next.js', 'React', 'TypeScript'],

	ogImage: '/og-image.jpeg',

	lang: 'es',
}
