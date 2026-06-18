import { configureStore } from "@reduxjs/toolkit";
import { projectsApi } from "./api/projectsApi";
import { authReducer } from "./slices/authSlice";
import { menuReducer } from "./slices/menuSlice";
import { projectsDashboardReducer } from "./slices/projectsDashboardSlice";

export const store = configureStore({
	reducer: {
		menu: menuReducer,
		auth: authReducer,
		projectsDashboard: projectsDashboardReducer,
		[projectsApi.reducerPath]: projectsApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(projectsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
