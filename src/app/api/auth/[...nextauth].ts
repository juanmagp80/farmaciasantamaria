import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                // Aquí puedes verificar las credenciales contra una base de datos u otro servicio
                if (credentials?.email === "admin@farmacia.com" && credentials?.password === "tuPasswordSegura") {
                    return { id: "1", name: "Admin", email: "admin@farmacia.com" };
                }
                // Retorna null si las credenciales no son válidas
                return null;
            },
        }),
    ],
    pages: {
        signIn: "/auth/signin", // Página de inicio de sesión personalizada
    },
    // Configuraciones adicionales (si las necesitas)
});
