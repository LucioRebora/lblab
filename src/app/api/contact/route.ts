import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, comment, web } = body;

        if (!name || !email || !comment) {
            return NextResponse.json(
                { error: "Nombre, email y comentario son obligatorios" },
                { status: 400 }
            );
        }

        const submission = await prisma.contactSubmission.create({
            data: {
                name,
                email,
                comment,
                web,
            },
        });

        return NextResponse.json(
            { message: "Mensaje enviado con éxito", id: submission.id },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error saving contact submission:", error);
        return NextResponse.json(
            { error: "Error interno al enviar el mensaje" },
            { status: 500 }
        );
    }
}
