import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sendMail } from "@/lib/mail";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    try {
        // Al usar SELECT * después de un cambio de schema, PostgreSQL puede fallar con "cached plan must not change result type"
        // en entornos con pooling (como Neon). Especificar las columnas explícitamente resuelve esto.
        const submissions = await prisma.$queryRawUnsafe(`
            SELECT "id", "name", "email", "comment", "web", "status", "replyMessage", "createdAt"
            FROM "ContactSubmission"
            ORDER BY "createdAt" DESC
        `);

        return NextResponse.json({
            submissions,
        });
    } catch (error) {
        console.error("Error fetching submissions:", error);
        return NextResponse.json({ error: "Error al obtener consultas" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { id, email, message, name } = body;

        if (!id || !email || !message) {
            return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
        }

        // 1. Enviar el mail
        await sendMail({
            to: email,
            subject: `Re: LB Lab - Respuesta a tu consulta`,
            title: `Respuesta a tu consulta`,
            preheader: `Hola ${name}, respondemos a tu mensaje.`,
            data: {
                "Nombre": name,
                "Tu mensaje": "Visto por el equipo de LB Lab",
                "Nuestra respuesta": message
            }
        });

        // 2. Marcar como respondido y guardar el mensaje usando Raw SQL
        await prisma.$executeRawUnsafe(
            'UPDATE "ContactSubmission" SET "status" = \'RESPONDED\', "replyMessage" = $1 WHERE "id" = $2',
            message,
            id
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error replying to submission:", error);
        return NextResponse.json({ error: "Error al enviar respuesta" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { id, status } = body;

        if (!id || !status) {
            return NextResponse.json({ error: "ID y estado requeridos" }, { status: 400 });
        }

        await prisma.$executeRawUnsafe(
            'UPDATE "ContactSubmission" SET "status" = $1 WHERE "id" = $2',
            status,
            id
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating submission status:", error);
        return NextResponse.json({ error: "Error al actualizar estado" }, { status: 500 });
    }
}
