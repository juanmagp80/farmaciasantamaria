"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

const SignInPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await signIn("credentials", {
            email,
            password,
            callbackUrl: "/admin", // Redirigir al panel de administrador tras el inicio de sesión
        });
    };

    return (
        <div>
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default SignInPage;
