import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                active: true,
                canAccessVeterinaria: true,
                canAccessDerivaciones: true,
                canAccessPRP: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ error: "Error al obtener usuarios" }, { status: 500 });
    }
}

import { sendMail } from "@/lib/mail";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    try {
        const { name, email, password, role, canAccessVeterinaria, canAccessDerivaciones, canAccessPRP } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Email y contraseña son requeridos" }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ error: "El usuario ya existe" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: role || 'USER',
                canAccessVeterinaria: !!canAccessVeterinaria,
                canAccessDerivaciones: !!canAccessDerivaciones,
                canAccessPRP: !!canAccessPRP,
            },
        });

        // Enviar mail con credenciales
        try {
            await sendMail({
                to: email,
                subject: "Acceso al Sistema - Laboratorio LB Lab",
                title: "Tus credenciales de acceso",
                preheader: `Hola ${name || 'Usuario'}, se ha creado tu cuenta en el sistema.`,
                data: {
                    "Usuario (Email)": email,
                    "Contraseña": password,
                    "Nombre": name || "No especificado",
                    "Rol asignado": role || 'USER',
                    "Link de acceso": (process.env.NEXTAUTH_URL || 'http://localhost:3000') + '/admin'
                }
            });
        } catch (mailError) {
            console.error("Error al enviar mail de bienvenida:", mailError);
        }

        return NextResponse.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            active: user.active,
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "Error al crear usuario" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'ADMIN') {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    try {
        const { id, name, email, password, role, active, canAccessVeterinaria, canAccessDerivaciones, canAccessPRP } = await req.json();

        if (!id) {
            return NextResponse.json({ error: "ID de usuario requerido" }, { status: 400 });
        }

        const updateData: any = {};
        if (name !== undefined) updateData.name = name;
        if (email !== undefined) updateData.email = email;
        if (role !== undefined) updateData.role = role;
        if (active !== undefined) updateData.active = active;
        if (canAccessVeterinaria !== undefined) updateData.canAccessVeterinaria = canAccessVeterinaria;
        if (canAccessDerivaciones !== undefined) updateData.canAccessDerivaciones = canAccessDerivaciones;
        if (canAccessPRP !== undefined) updateData.canAccessPRP = canAccessPRP;

        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const user = await prisma.user.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            active: user.active,
            canAccessVeterinaria: user.canAccessVeterinaria,
            canAccessDerivaciones: user.canAccessDerivaciones,
            canAccessPRP: user.canAccessPRP,
        });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ error: "Error al actualizar usuario" }, { status: 500 });
    }
}
