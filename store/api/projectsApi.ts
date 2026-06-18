import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ProjectCard, ProjectCategory, ProjectStatus } from "@/types/project.types";

export interface GetProjectsArgs {
	category?: ProjectCategory;
	status?: ProjectStatus;
	view: "card" | "full";
}

export const projectsApi = createApi({
	reducerPath: "projectsApi",

	baseQuery: fetchBaseQuery({ baseUrl: "/api" }),

	keepUnusedDataFor: 300, // 5 minutes

	endpoints: (builder) => ({
		getProjects: builder.query<ProjectCard[], GetProjectsArgs>({
			query: ({ category, status, view = "card" }) => {
				const params = new URLSearchParams({ view });

				if (category) params.set("category", category);
				if (status) params.set("status", status);

				return `/projects?${params.toString()}`;
			},
		}),
	}),
});

export const { useGetProjectsQuery } = projectsApi;
