import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AuthState, User } from "@/types/auth.types";
import { login as authLogin } from "../../lib/services/auth.service";

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

const initialState: AuthState = { user: null, loading: false, error: null };

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) || action.error.message || "Login failed";
            });
    },
});

export const authReducer = slice.reducer;
export const { logout } = slice.actions;
