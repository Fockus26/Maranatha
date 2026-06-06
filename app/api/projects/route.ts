import { type NextRequest, NextResponse } from "next/server";

import { createProject, getAllProjects } from "@/lib/services/project.service";
import { getProjectCategoryBySlug } from "@/lib/utils/project.utils";
import { projectListQuerySchema, projectSchema } from "@/lib/validations/project.validation";

export async function GET(request: NextRequest): Promise<NextResponse> {
	const { searchParams } = new URL(request.url);

	const queryParams = Object.fromEntries(searchParams.entries());

	const parsedQuery = projectListQuerySchema.safeParse(queryParams);

	if (!parsedQuery.success) {
		return NextResponse.json(
			{
				message: "Invalid query parameters",
				error: parsedQuery.error.flatten(),
			},
			{
				status: 400,
			},
		);
	}

	const { category, status, perPage, view } = parsedQuery.data;

	const parsedCategory = category ? getProjectCategoryBySlug(category) : null;

	if (category && !parsedCategory) {
		return NextResponse.json(
			{
				message: "Invalid category",
			},
			{
				status: 400,
			},
		);
	}

	const filters = {
		view,
	} as const;

	const projects = await getAllProjects({
		...filters,

		...(parsedCategory && {
			category: parsedCategory,
		}),

		...(status && {
			status,
		}),

		...(perPage && {
			perPage: perPage,
		}),
	});

	return NextResponse.json(projects);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
	try {
		const body = await request.json();

		const validatedData = projectSchema.parse(body);

		const project = await createProject(validatedData);

		return NextResponse.json(project, {
			status: 201,
		});
	} catch (error) {
		return NextResponse.json(
			{
				message: "Invalid request body",
				error,
			},
			{
				status: 400,
			},
		);
	}
}
