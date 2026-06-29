"use client";

import { type ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { Loader } from "@/components/ui/loader/loader";
import { useRouter } from "@/i18n/navigation";
import {
	selectAuthInitialized,
	selectCheckingAuth,
	selectUser,
} from "@/store/selectors/auth.selectors";

type Props = {
	children: ReactNode;
};

export const AuthGuard = ({ children }: Props) => {
	const router = useRouter();

	const user = useSelector(selectUser);
	const initialized = useSelector(selectAuthInitialized);
	const checkingAuth = useSelector(selectCheckingAuth);

	useEffect(() => {
		if (initialized && !checkingAuth && !user) {
			router.replace("/auth");
		}
	}, [initialized, checkingAuth, user, router]);

	if (!initialized || checkingAuth) {
		return <Loader label="Verificando sesión" />;
	}

	if (!user) {
		return <Loader label="Redirigiendo..." />;
	}

	return <>{children}</>;
};
