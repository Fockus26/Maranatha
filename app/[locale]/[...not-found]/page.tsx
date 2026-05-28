import { notFound } from 'next/navigation'
import type { ReactElement } from 'react'

export default function CatchAllPage(): ReactElement {
	notFound()
}
