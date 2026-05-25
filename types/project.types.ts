export const PROJECT_CATEGORIES = [
	'Iglesia',
	'El Evangelio Cambia',
	'Generacion JEF',
] as const

export const PROJECT_STATUS = ['In Progress', 'Completed'] as const

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]

export type ProjectStatus = (typeof PROJECT_STATUS)[number]

export interface Project {
	id: string
	title: string
	category: ProjectCategory
	description: string
	shortDescription: string
	image: string
	status: ProjectStatus
}
