import { type NextRequest, NextResponse } from 'next/server'

import {
	createProject,
	getAllProjects,
	getProjectsByCategory,
} from '@/lib/services/project.service'
import {
	projectCategorySchema,
	projectSchema,
} from '@/lib/validations/project.validation'

export async function GET(request: NextRequest): Promise<NextResponse> {
	const { searchParams } = new URL(request.url)

	const category = searchParams.get('category')

	if (category) {
		const parsedCategory = projectCategorySchema.safeParse(category)

		if (!parsedCategory.success) {
			return NextResponse.json(
				{
					message: 'Invalid category parameter',
				},
				{
					status: 400,
				},
			)
		}

		const projects = await getProjectsByCategory(parsedCategory.data)

		return NextResponse.json(projects)
	}

	const projects = await getAllProjects()

	return NextResponse.json(projects)
}

export async function POST(request: NextRequest): Promise<NextResponse> {
	try {
		const body = await request.json()

		const validatedData = projectSchema.parse(body)

		const project = await createProject(validatedData)

		return NextResponse.json(project, {
			status: 201,
		})
	} catch (error) {
		return NextResponse.json(
			{
				message: 'Invalid request body',
				error,
			},
			{
				status: 400,
			},
		)
	}
}
