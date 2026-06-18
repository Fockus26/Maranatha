import type { RootState } from "@/store/index";

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.user !== null;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthInitialized = (state: RootState) => state.auth.initialized;
export const selectCheckingAuth = (state: RootState) => state.auth.checkingAuth;
export const selectAuthError = (state: RootState) => state.auth.error;
