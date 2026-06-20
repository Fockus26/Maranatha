import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ProjectDashboardState {
	projectId: string | null;
	selectedPhaseId: string | null;
	sidebarOpen: boolean;
}

const initialState: ProjectDashboardState = {
	projectId: null,
	selectedPhaseId: null,
	sidebarOpen: true,
};

export const projectDashboardSlice = createSlice({
	name: "projectDashboard",
	initialState,
	reducers: {
		setProjectDashboardId: (state, action: PayloadAction<string | null>) => {
			state.projectId = action.payload;
		},
		setSelectedPhaseId: (state, action: PayloadAction<string | null>) => {
			state.selectedPhaseId = action.payload;
		},
		setSidebarOpen: (state, action: PayloadAction<boolean>) => {
			state.sidebarOpen = action.payload;
		},
		toggleSidebar: (state) => {
			state.sidebarOpen = !state.sidebarOpen;
		},
		resetProjectDashboard: () => initialState,
	},
});

export const {
	setProjectDashboardId,
	setSelectedPhaseId,
	setSidebarOpen,
	toggleSidebar,
	resetProjectDashboard,
} = projectDashboardSlice.actions;

export const projectDashboardReducer = projectDashboardSlice.reducer;
