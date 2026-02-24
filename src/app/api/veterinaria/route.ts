import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendMail } from "@/lib/mail";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, veterinaria, profesional, paciente, analysis, otro } = body;

        if (!email || !paciente) {
            return NextResponse.json(
                { error: "Faltan campos obligatorios" },
                { status: 400 }
            );
        }

        // @ts-ignore
        const appointment = await prisma.veterinaryAppointment.create({
            data: {
                email,
                veterinary: veterinaria,
                professional: profesional,
                patient: paciente,
                analysis,
                other: otro,
            },
        });

        // Enviar notificación por email
        try {
            await sendMail({
                to: email,
                subject: `LB Lab - Solicitud de Análisis Veterinario: ${paciente}`,
                title: "Solicitud de Análisis Recibida",
                preheader: `Hola, hemos recibido tu solicitud para ${paciente}.`,
                data: {
                    "Paciente": paciente,
                    "Veterinaria": veterinaria || "No especificada",
                    "Profesional": profesional || "No especificado",
                    "Análisis": analysis && analysis.length > 0 ? analysis.join(", ") : "No especificados",
                    "Otros detalles": otro || "Ninguno"
                }
            });
        } catch (mailError) {
            console.error("Error al enviar mail de notificación:", mailError);
        }

        return NextResponse.json(appointment, { status: 201 });
    } catch (error) {
        console.error("Error al guardar solicitud veterinaria:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
