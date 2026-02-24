import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendMail } from "@/lib/mail";

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

        // Enviar notificaciones por Email
        const contactEmails = process.env.EMAILS_CONTACTO;

        if (contactEmails) {
            try {
                await sendMail({
                    to: contactEmails,
                    subject: `Nuevo mensaje de contacto: ${name}`,
                    title: "Nuevo contacto desde el sitio web",
                    preheader: `${name} ha enviado un nuevo mensaje.`,
                    data: {
                        "Nombre": name,
                        "WhatsApp / Email": email,
                        "Empresa": web || "No especificada",
                        "Mensaje": comment
                    }
                });
            } catch (mailError) {
                console.error("Error al enviar email de contacto:", mailError);
            }
        }

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
