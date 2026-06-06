export type User = { id: string; email: string; name?: string };

export type AuthState = {
	user: User | null;
	loading: boolean;
	initialized: boolean;
	checkingAuth: boolean;
	error: string | null;
};
