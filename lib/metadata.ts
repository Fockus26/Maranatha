import type { Metadata } from 'next'

import { siteConfig } from '@/config/site'

interface GenerateMetadataProps {
	title?: string

	description?: string

	image?: string
}

export const generateMetadata = ({
	title,
	description,
	image,
}: GenerateMetadataProps = {}): Metadata => {
	const metadataTitle = title
		? `${title} | ${siteConfig.shortName}`
		: siteConfig.name

	const metadataDescription = description ?? siteConfig.description

	const metadataImage = image ?? siteConfig.ogImage

	return {
		metadataBase: new URL(siteConfig.url),

		title: metadataTitle,

		description: metadataDescription,

		applicationName: siteConfig.name,

		keywords: siteConfig.keywords,

		creator: siteConfig.creator,

		openGraph: {
			type: 'website',

			url: siteConfig.url,

			title: metadataTitle,

			description: metadataDescription,

			siteName: siteConfig.name,

			images: [
				{
					url: metadataImage,

					width: 1200,

					height: 630,
				},
			],
		},

		twitter: {
			card: 'summary_large_image',

			title: metadataTitle,

			description: metadataDescription,

			images: [metadataImage],
		},
	}
}
