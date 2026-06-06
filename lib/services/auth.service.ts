import {
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth } from "@/lib/firebase/auth";
import { db } from "@/lib/firebase/firestore";
import { clearSessionTimestamp, saveSessionTimestamp } from "@/lib/utils/session";

export type AuthUser = {
	id: string;
	email: string;
	name?: string;
};

type AllowedUser = {
	active: boolean;
	role: "admin" | "editor";
};

export async function isUserAllowed(uid: string) {
	const ref = doc(db, "allowedUsers", uid);
	const snap = await getDoc(ref);

	if (!snap.exists()) return false;

	const data = snap.data() as AllowedUser;

	return data?.active === true && (data?.role === "admin" || data?.role === "editor");
}

export async function login(email: string, password: string): Promise<AuthUser> {
	const credential = await signInWithEmailAndPassword(auth, email, password);

	const user = credential.user;

	// Save session timestamp (7-day expiration)
	saveSessionTimestamp();

	return {
		id: user.uid,
		email: user.email ?? "",
		name: user.displayName ?? "",
	};
}

export async function loginWithGoogle(): Promise<AuthUser> {
	const provider = new GoogleAuthProvider();

	const credential = await signInWithPopup(auth, provider);

	const user = credential.user;

	// Save session timestamp (7-day expiration)
	saveSessionTimestamp();

	return {
		id: user.uid,
		email: user.email ?? "",
		name: user.displayName ?? "",
	};
}

export async function logout() {
	// Clear session timestamp on logout
	clearSessionTimestamp();
	await signOut(auth);
}
