"use client";

import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { auth } from "@/lib/firebase/auth";
import { isUserAllowed, logout } from "@/lib/services/auth.service";
import { clearSessionTimestamp, isSessionExpired } from "@/lib/utils/session";
import { setCheckingAuth, setInitialized, setUser } from "@/store/slices/authSlice";

export function Auth({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            dispatch(setCheckingAuth(true));

            try {
                // 1. No user
                if (!user) {
                    dispatch(setUser(null));
                    return;
                }

                // 2. Session expired
                if (isSessionExpired()) {
                    clearSessionTimestamp();
                    await logout();
                    dispatch(setUser(null));
                    return;
                }

                // 3. Allowed users check (Firestore)
                const allowed = await isUserAllowed(user.uid);

                if (!allowed) {
                    await logout();
                    dispatch(setUser(null));
                    return;
                }

                // 4. User allowed → set session
                dispatch(
                    setUser({
                        id: user.uid,
                        email: user.email ?? "",
                        name: user.displayName ?? "",
                    }),
                );
            } finally {
                dispatch(setCheckingAuth(false));
                dispatch(setInitialized(true));
            }
        });

        return () => unsubscribe();
    }, [dispatch]);

    return children;
}
