import { z } from "zod";

import { PROJECT_CATEGORY_VALUES } from "@/lib/utils/project.utils";

export const projectPhaseSchema = z.object({
    id: z.string(),
    title: z.string().min(1),
    description: z.string().min(1),
    images: z.array(z.string()),
    startDate: z.string(),
    endDate: z.string(),
    targetAmount: z.number().min(0),
    currentAmount: z.number().min(0),
});

export const projectTeamMemberSchema = z.object({
    id: z.string(),
    name: z.string().min(1),
    role: z.string().min(1),
    image: z.string().optional(),
});

export const projectSchema = z.object({
    title: z.string().min(1),
    category: z.enum(PROJECT_CATEGORY_VALUES),
    description: z.string().min(1),
    shortDescription: z.string().min(1),
    image: z.string().url(),
    status: z.enum(["IN_PROGRESS", "COMPLETED"]),
    team: z.array(projectTeamMemberSchema),
    phases: z.array(projectPhaseSchema),
    currentPhaseId: z.string(),
});

export const projectListQuerySchema = z.object({
    category: z.string().optional(),
    status: z.enum(["IN_PROGRESS", "COMPLETED"]).optional(),
    perPage: z.coerce.number().min(1).max(100).optional(),
    view: z.enum(["full", "card"]).default("full"),
});

export type CreateProjectDto = z.infer<typeof projectSchema>;

export type ProjectListQueryDto = z.infer<typeof projectListQuerySchema>;
