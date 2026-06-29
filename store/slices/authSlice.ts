import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	login as authLogin,
	loginWithGoogle as authLoginWithGoogle,
	logout as authLogout,
} from "@/lib/services/auth.service";
import type { AuthState, User } from "@/types/store/auth.types";

export const login = createAsyncThunk(
	"auth/login",
	async (payload: { email: string; password: string }, { rejectWithValue }) => {
		try {
			const user = await authLogin(payload.email, payload.password);
			return user;
		} catch (err) {
			return rejectWithValue((err as Error).message);
		}
	},
);

export const loginWithGoogle = createAsyncThunk("auth/google", async (_, { rejectWithValue }) => {
	try {
		return await authLoginWithGoogle();
	} catch (err) {
		return rejectWithValue((err as Error).message);
	}
});

export const logout = createAsyncThunk("auth/logout", async () => {
	await authLogout();
});

const initialState: AuthState = {
	user: null,
	loading: false,
	initialized: false,
	checkingAuth: false,
	error: null,
};

const slice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<User | null>) {
			state.user = action.payload;
		},
		setInitialized(state, action: PayloadAction<boolean>) {
			state.initialized = action.payload;
		},
		setCheckingAuth(state, action) {
			state.checkingAuth = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(loginWithGoogle.fulfilled, (state) => {
				state.loading = false;
			});
	},
});

export const authReducer = slice.reducer;
export const { setUser, setInitialized, setCheckingAuth } = slice.actions;
