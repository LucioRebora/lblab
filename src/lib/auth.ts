import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findFirst({
                    where: {
                        email: {
                            equals: credentials.email,
                            mode: 'insensitive'
                        }
                    }
                });

                if (!user) return null;

                if (user.active === false) {
                    throw new Error("Usuario inactivo. Contacte al administrador.");
                }

                const isPasswordValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isPasswordValid) return null;

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    active: user.active
                };
            }
        }),
        GoogleProvider({
            clientId: process.env.OAUTH_CLIENT_ID || "",
            clientSecret: process.env.OAUTH_CLIENT_SECRET || "",
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === "google" && user.email) {
                let dbUser = await prisma.user.findFirst({
                    where: {
                        email: {
                            equals: user.email,
                            mode: 'insensitive'
                        }
                    }
                });

                if (!dbUser) {
                    // El usuario no existe en la base de datos, no le dejamos entrar con Google
                    return "/admin?error=AccessDenied";
                }

                if (dbUser.active === false) {
                    return "/admin?error=AccessDenied";
                }

                return true;
            }
            return true;
        },
        async jwt({ token, user, account }) {
            if (user) {
                if (account?.provider === "google" && user.email) {
                    const dbUser = await prisma.user.findFirst({
                        where: {
                            email: {
                                equals: user.email,
                                mode: 'insensitive'
                            }
                        }
                    });
                    if (dbUser && dbUser.active) {
                        token.role = dbUser.role;
                    }
                } else {
                    token.role = (user as any).role;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role;
            }
            return session;
        },
    },
    pages: {
        signIn: "/admin",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
