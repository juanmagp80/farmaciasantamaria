import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials): Promise<any> {
                if (credentials?.email === "admin@farmacia.com" && credentials?.password === "tuPasswordSegura") {
                    return { id: 1, name: "Admin", email: "admin@farmacia.com" };
                }
                return null;
            },
        }),
    ],
    pages: {
        signIn: "/auth/signin",
    },
});

export { handler as GET, handler as POST };
