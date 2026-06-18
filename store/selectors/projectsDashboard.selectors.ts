import type { RootState } from "@/store/index";
import type { ProjectCard } from "@/types/project.types";

export const selectSearch = (state: RootState) => state.projectsDashboard.search;
export const selectCategory = (state: RootState) => state.projectsDashboard.category;
export const selectStatus = (state: RootState) => state.projectsDashboard.status;
export const selectSelectedIds = (state: RootState) => state.projectsDashboard.selectedIds;
export const selectSelectionMode = (state: RootState) =>
	state.projectsDashboard.selectedIds.length > 0;

export const selectFilteredProjects = (projects: ProjectCard[]) => (state: RootState) => {
	const search = selectSearch(state).toLowerCase().trim();

	if (!search) return projects;

	return projects.filter(
		(p) =>
			p.title.toLowerCase().includes(search) ||
			p.shortDescription.toLowerCase().includes(search),
	);
};
