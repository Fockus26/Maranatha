import type { RootState } from "@/store/index";

export const selectProjectDashboardId = (state: RootState) => state.projectDashboard.projectId;

export const selectSelectedPhaseId = (state: RootState) => state.projectDashboard.selectedPhaseId;

export const selectSidebarOpen = (state: RootState) => state.projectDashboard.sidebarOpen;

export const selectProjectDashboardContext = (state: RootState) => state.projectDashboard;
