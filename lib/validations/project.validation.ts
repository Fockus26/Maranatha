import { z } from 'zod'

export const projectSchema = z.object({
	title: z.string().min(1),
	category: z.enum(['Iglesia', 'El Evangelio Cambia', 'Generacion JEF']),
	description: z.string().min(1),
	shortDescription: z.string().min(1),
	image: z.string().min(1),
	status: z.enum(['In Progress', 'Completed']),
})

export const projectCategorySchema = z.enum([
	'Iglesia',
	'El Evangelio Cambia',
	'Generacion JEF',
])

export type CreateProjectDto = z.infer<typeof projectSchema>
