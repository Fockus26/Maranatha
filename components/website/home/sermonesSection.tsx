import type { ReactElement } from 'react'
import type { SermonesData } from '@/data/home.data'
import { getLatestSermons } from '@/lib/api/youtube'
import SermonesClient from './sermonesClient'

interface Props {
	data: SermonesData
}

export default async function SermonesSection({
	data,
}: Props): Promise<ReactElement> {
	const videos = await getLatestSermons(4)

	return <SermonesClient data={data} videos={videos} />
}