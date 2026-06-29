import { configureStore } from "@reduxjs/toolkit";
import { projectDashboardReducer } from "@/store/slices/projectDashboardSlice";
import { projectsApi } from "./api/projectsApi";
import { authReducer } from "./slices/authSlice";
import { menuReducer } from "./slices/menuSlice";
import { projectsDashboardReducer } from "./slices/projectsDashboardSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		projectsDashboard: projectsDashboardReducer,
		projectDashboard: projectDashboardReducer,
		[projectsApi.reducerPath]: projectsApi.reducer,
		menu: menuReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(projectsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
