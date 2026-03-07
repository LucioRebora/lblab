import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const date = searchParams.get("date");

        if (!date) {
            return NextResponse.json({ error: "Fecha requerida" }, { status: 400 });
        }

        const appointments = await prisma.derivacion.findMany({
            where: {
                date,
                status: { not: "CANCELLED" }
            },
            select: { time: true }
        });

        const bookedTimes = appointments.map((a: { time: string }) => a.time);
        return NextResponse.json(bookedTimes);
    } catch (error) {
        console.error("Error al obtener turnos de derivaciones:", error);
        return NextResponse.json({ error: "Error interno" }, { status: 500 });
    }
}

import { sendMail } from "@/lib/mail";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, labName, patient, date, time, analysisType, protocoloExterno, protocolo, observaciones } = body;

        if (!email || !patient) {
            return NextResponse.json(
                { error: "Faltan campos obligatorios" },
                { status: 400 }
            );
        }

        const now = new Date();
        const formattedNow = now.toLocaleDateString('es-AR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }) + " " + now.toLocaleTimeString('es-AR', {
            hour: '2-digit',
            minute: '2-digit'
        }) + " Hs.";

        const submissionDate = date || new Date().toISOString().split('T')[0];
        const submissionTime = time || "SOLICITUD";

        // Verificar si el turno está disponible solo si se proporcionaron fecha y hora
        if (date && time) {
            const existing = await prisma.derivacion.findFirst({
                where: {
                    date: submissionDate,
                    time: submissionTime,
                    status: { not: "CANCELLED" }
                }
            });

            if (existing) {
                return NextResponse.json(
                    { error: "El turno ya no está disponible" },
                    { status: 409 }
                );
            }
        }

        // @ts-ignore
        const derivacion = await prisma.derivacion.create({
            data: {
                email,
                labName,
                patient,
                protocoloExterno,
                protocolo,
                observaciones,
                date: submissionDate,
                time: submissionTime,
                analysisType: analysisType || [],
            },
        });

        // Enviar notificación por email
        try {
            // Mail al laboratorio/profesional
            await sendMail({
                to: email,
                subject: `Confirmación de derivación: ${labName || patient}`,
                title: "Su solicitud ha sido recibida",
                preheader: `Hola, hemos recibido tu solicitud de derivación para ${patient || labName}`,
                customBody: `Estimado/a colega.<br>Hemos recibido correctamente su solicitud de derivación.<br>Con los detalles registrados:`,
                data: {
                    "Laboratorio / Profesional Derivante": labName || "No especificado",
                    "N° de Protocolo": protocolo || "No especificado",
                    "N° de Protocolo Externo": protocoloExterno || "No especificado",
                    "Paciente": patient,
                    "Observaciones": observaciones || "Sin observaciones",
                    "Determinaciones solicitadas": analysisType && analysisType.length > 0 ? analysisType.join(", ") : "General",
                    "Fecha de solicitud": formattedNow
                }
            });

            // Copia a los administradores
            const contactEmails = process.env.EMAILS_CONTACTO;
            if (contactEmails) {
                await sendMail({
                    to: contactEmails,
                    subject: `[COPIA] Confirmación de derivación: ${labName || patient}`,
                    title: "Nueva Solicitud de Derivación Recibida",
                    preheader: `Se ha registrado una nueva derivación para ${patient || labName}`,
                    customBody: `Estimado/a colega.<br>Hemos recibido correctamente su solicitud de derivación.<br>Con los detalles registrados:`,
                    data: {
                        "Enviado por": email,
                        "Laboratorio / Profesional Derivante": labName || "No especificado",
                        "N° de Protocolo": protocolo || "No especificado",
                        "N° de Protocolo Externo": protocoloExterno || "No especificado",
                        "Paciente": patient,
                        "Observaciones": observaciones || "Sin observaciones",
                        "Determinaciones solicitadas": analysisType && analysisType.length > 0 ? analysisType.join(", ") : "General",
                        "Fecha de solicitud": formattedNow
                    }
                });
            }
        } catch (mailError) {
            console.error("Error al enviar mail de derivación:", mailError);
        }

        return NextResponse.json(derivacion, { status: 201 });
    } catch (error) {
        console.error("Error al guardar derivación:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
