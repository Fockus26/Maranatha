"use client";

import type { ReactElement } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";
import type { AppDispatch } from "@/store";
import { login, loginWithGoogle } from "@/store/slices/authSlice";
import styles from "./loginForm.module.scss";

type Props = {
	onLogin?: () => void;
};

export const LoginForm = ({ onLogin }: Props): ReactElement => {
	const dispatch = useDispatch<AppDispatch>();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError(null);
		setLoading(true);
		try {
			const res = await dispatch(login({ email, password }));
			if (login.fulfilled.match(res)) {
				onLogin?.();
			} else {
				const msg =
					(res.payload as string) || res.error?.message || "Error de inicio de sesión";
				setError(msg);
			}
		} catch (err) {
			setError((err as Error).message || "Error de inicio de sesión");
		} finally {
			setLoading(false);
		}
	}

	const handleGoogleLogin = async () => {
		setError(null);

		const res = await dispatch(loginWithGoogle());

		if (loginWithGoogle.fulfilled.match(res)) {
			onLogin?.();
		} else {
			setError(
				(res.payload as string) ||
					res.error.message ||
					"Error al iniciar sesión con Google",
			);
		}
	};

	return (
		<main className={styles.container}>
			<div className={styles.header}>
				<h1 className={styles.title}>Acceder</h1>

				<p className={styles.description}>Inicia sesión para administrar el contenido.</p>
			</div>

			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.field}>
					<label className={styles.label} htmlFor="auth-email">
						Email
					</label>
					<Input
						id="auth-email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className={styles.field}>
					<label className={styles.label} htmlFor="auth-password">
						Contraseña
					</label>
					<Input
						id="auth-password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				{error && <div className={styles.error}>{error}</div>}
				<Button type="submit" disabled={loading}>
					{loading ? "Ingresando..." : "Ingresar"}
				</Button>
				<div className={styles.separator}>o continuar con</div>
				<Button type="button" variant="plain" tone="primary" onClick={handleGoogleLogin}>
					Google
				</Button>
			</form>
		</main>
	);
};
