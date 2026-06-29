"use client";

import { useRouter } from "next/navigation";
import { type ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import { LoginForm } from "@/components/admin/auth/loginForm/loginForm";
import { Loader } from "@/components/ui/loader/loader";
import {
	selectAuthInitialized,
	selectCheckingAuth,
	selectUser,
} from "@/store/selectors/auth.selectors";

const AuthPage = (): ReactElement => {
	const router = useRouter();

	const user = useSelector(selectUser);
	const initialized = useSelector(selectAuthInitialized);
	const checkingAuth = useSelector(selectCheckingAuth);

	useEffect(() => {
		if (initialized && !checkingAuth && user) {
			router.replace("/dashboard");
		}
	}, [initialized, checkingAuth, user, router]);

	if (!initialized || checkingAuth) {
		return <Loader label="Verificando sesión" />;
	}

	if (user) {
		return <Loader label="Redirigiendo..." />;
	}

	return <LoginForm />;
};

export default AuthPage;
