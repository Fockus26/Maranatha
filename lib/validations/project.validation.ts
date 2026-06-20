import { z } from "zod";
import { isValidDateRange } from "@/lib/utils/date";
import { normalizeCategory, normalizeStatus } from "@/lib/utils/project.utils";
import { SOCIAL_MEDIA_KEYS, type SocialMediaPlatform } from "@/types/project.types";

const socialMediaLinkSchema = z.object({
	platform: z.enum(SOCIAL_MEDIA_KEYS as [SocialMediaPlatform, ...SocialMediaPlatform[]]),
	url: z.url(),
});

// TEAM
export const projectTeamMemberSchema = z.object({
	id: z.string().min(1),
	name: z.string().min(1).max(80),
	role: z.string().min(1).max(80),
	description: z.string().min(1).max(120).optional(),
	image: z.url().optional(),
	socialMedia: z
		.array(socialMediaLinkSchema)
		.max(3, "Máximo 3 redes sociales")
		.refine((links) => new Set(links.map((l) => l.platform)).size === links.length, {
			message: "No se puede repetir una red social",
		})
		.optional(),
});

// PHASE
export const projectPhaseSchema = z
	.object({
		id: z.string().min(1),
		title: z.string().min(1).max(120),
		description: z.string().min(1).max(1000),
		images: z.array(z.url()).max(10),
		status: z
			.string()
			.transform(normalizeStatus)
			.refine((val) => val !== null, { message: "Invalid status" }),
		startDate: z.iso.datetime(),
		endDate: z.iso.datetime(),
		targetAmount: z.number().min(0),
		currentAmount: z.number().min(0),
		team: z.array(projectTeamMemberSchema).max(20),
	})
	.refine((data) => isValidDateRange(data.startDate, data.endDate), {
		message: "endDate must be greater than startDate",
		path: ["endDate"],
	});

// PROJECT
export const projectSchema = z.object({
	title: z.string().min(1).max(120),
	category: z
		.string()
		.transform(normalizeCategory)
		.refine((val) => val !== null, { message: "Invalid category" }),
	description: z.string().min(1).max(5000),
	shortDescription: z.string().min(1).max(200),
	image: z
		.url()
		.refine((val) => /\.(jpg|jpeg|png|webp)$/i.test(val), { message: "Invalid image format" }),
	startDate: z.iso.datetime(),
	phases: z.array(projectPhaseSchema).max(10),
	currentPhaseId: z.string().min(1),
});

// QUERY
export const projectListQuerySchema = z.object({
	category: z
		.string()
		.optional()
		.transform((v) => (v ? normalizeCategory(v) : undefined))
		.refine((v) => v !== null, {
			message: "Invalid category",
		}),
	status: z
		.string()
		.optional()
		.transform((v) => (v ? normalizeStatus(v) : undefined))
		.refine((v) => v !== null, {
			message: "Invalid status",
		}),
	perPage: z.coerce.number().min(1).max(100).optional(),
	view: z.enum(["full", "card"]).default("full"),
});

export const projectUpdateSchema = projectSchema.partial();
export type CreateProjectDto = z.infer<typeof projectSchema>;
export type ProjectListQueryDto = z.infer<typeof projectListQuerySchema>;
export type UpdateProjectDto = z.infer<typeof projectUpdateSchema>;
