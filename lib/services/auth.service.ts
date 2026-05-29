import { users } from "@/data/users";

export type AuthUser = { id: string; email: string; name?: string };

export async function login(email: string, password: string): Promise<AuthUser> {
    await new Promise((r) => setTimeout(r, 500));
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) {
        throw new Error("Credenciales inválidas");
    }
    const { password: _pw, ...safe } = found;
    return safe;
}
