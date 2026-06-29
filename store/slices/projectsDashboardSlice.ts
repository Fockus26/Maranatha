import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProjectCategory, ProjectStatus } from "@/types/project.types";

interface ProjectsDashboardState {
	selectedIds: string[];
	search: string;
	category: ProjectCategory | "";
	status: ProjectStatus | "";
}

const initialState: ProjectsDashboardState = {
	selectedIds: [],
	search: "",
	category: "",
	status: "",
};

export const projectsDashboardSlice = createSlice({
	name: "projectsDashboard",
	initialState,
	reducers: {
		toggleSelection: (state, action: PayloadAction<string>) => {
			const id = action.payload;
			const index = state.selectedIds.indexOf(id);

			if (index !== -1) {
				state.selectedIds.splice(index, 1);
			} else {
				state.selectedIds.push(id);
			}
		},
		clearSelection: (state) => {
			state.selectedIds = [];
		},
		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
		setCategory: (state, action: PayloadAction<ProjectCategory | "">) => {
			state.category = action.payload;
		},
		setStatus: (state, action: PayloadAction<ProjectStatus | "">) => {
			state.status = action.payload;
		},
		resetFilters: (state) => {
			state.search = "";
			state.category = "";
			state.status = "";
		},
	},
});

export const { toggleSelection, clearSelection, setSearch, setCategory, setStatus, resetFilters } =
	projectsDashboardSlice.actions;

export const projectsDashboardReducer = projectsDashboardSlice.reducer;
