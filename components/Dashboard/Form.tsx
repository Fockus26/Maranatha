"use client";

import type { ReactElement } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import { login } from "@/store/slices/authSlice";
import styles from "./Form.module.scss";

type Props = {
    onLogin?: () => void;
};

export const Form = ({ onLogin }: Props): ReactElement => {
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

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
                <label className={styles.label} htmlFor="auth-email">
                    Email
                </label>
                <input
                    className={styles.input}
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
                <input
                    className={styles.input}
                    id="auth-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            {error && <div className={styles.error}>{error}</div>}
            <button className={styles.button} type="submit" disabled={loading}>
                {loading ? "Ingresando..." : "Ingresar"}
            </button>
        </form>
    );
};
