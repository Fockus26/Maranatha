import { type NextRequest, NextResponse } from "next/server";

import { deleteProject, getProjectById, updateProject } from "@/lib/services/project.service";
import { projectUpdateSchema } from "@/lib/validations/project.validation";

export async function GET(
    _: NextRequest,
    context: {
        params: Promise<{
            id: string;
        }>;
    },
): Promise<NextResponse> {
    const { id } = await context.params;

    const project = await getProjectById(id);

    if (!project) {
        return NextResponse.json(
            {
                message: "Project not found",
            },
            {
                status: 404,
            },
        );
    }

    return NextResponse.json(project);
}

export async function PUT(
    request: NextRequest,
    context: {
        params: Promise<{
            id: string;
        }>;
    },
): Promise<NextResponse> {
    const { id } = await context.params;

    const body = await request.json();

    const parsed = projectUpdateSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json(
            {
                message: "Invalid update payload",
                error: parsed.error.flatten(),
            },
            { status: 400 },
        );
    }

    const updatedProject = await updateProject(id, body);

    if (!updatedProject) {
        return NextResponse.json(
            {
                message: "Project not found",
            },
            {
                status: 404,
            },
        );
    }

    return NextResponse.json(updatedProject);
}

export async function DELETE(
    _: NextRequest,
    context: {
        params: Promise<{
            id: string;
        }>;
    },
): Promise<NextResponse> {
    const { id } = await context.params;

    const deleted = await deleteProject(id);

    if (!deleted) {
        return NextResponse.json(
            {
                message: "Project not found",
            },
            {
                status: 404,
            },
        );
    }

    return NextResponse.json({
        message: "Project deleted",
    });
}
