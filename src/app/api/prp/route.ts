import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const date = searchParams.get("date");

        if (!date) {
            return NextResponse.json({ error: "Fecha requerida" }, { status: 400 });
        }

        const appointments = await prisma.prpAppointment.findMany({
            where: {
                date,
                status: { notIn: ["CANCELLED", "ANULADO"] }
            },
            select: { time: true }
        });

        const bookedTimes = appointments.map((a: { time: string }) => a.time);
        return NextResponse.json(bookedTimes);
    } catch (error) {
        console.error("Error al obtener turnos:", error);
        return NextResponse.json({ error: "Error interno" }, { status: 500 });
    }
}

import { sendMail } from "@/lib/mail";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, professional, patient, date, time, preparation } = body;

        if (!email || !patient || !date || !time) {
            return NextResponse.json(
                { error: "Faltan campos obligatorios" },
                { status: 400 }
            );
        }

        // Verificar si es fin de semana (0 = Domingo, 6 = Sábado)
        const appointmentDate = new Date(date + "T12:00:00");
        const dayOfWeek = appointmentDate.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            return NextResponse.json(
                { error: "No se pueden solicitar turnos en fines de semana" },
                { status: 400 }
            );
        }

        // Verificar si el turno está disponible
        const existing = await prisma.prpAppointment.findFirst({
            where: {
                date,
                time,
                status: { notIn: ["CANCELLED", "ANULADO"] }
            }
        });

        if (existing) {
            return NextResponse.json(
                { error: "El turno ya no está disponible" },
                { status: 409 }
            );
        }

        const appointment = await prisma.prpAppointment.create({
            data: {
                email,
                professional,
                patient,
                date,
                time,
                preparation,
            },
        });

        // Enviar notificación por email
        try {
            await sendMail({
                to: email, // Enviado directamente al paciente/remitente
                subject: `Confirmación de Turno PRP: ${patient}`,
                title: "Su turno ha sido confirmado con éxito",
                preheader: `Hola ${patient}, tu turno para Plasma Rico en Plaquetas ha sido programado.`,
                data: {
                    "Paciente": patient,
                    "Profesional": professional || "No especificado",
                    "Fecha del turno": date,
                    "Hora": `${time} hs`,
                    "Indicaciones preparatorias": preparation && preparation.length > 0 ? preparation.join(", ") : "Sin indicaciones especiales"
                }
            });
        } catch (mailError) {
            console.error("Error al enviar mail de notificación:", mailError);
        }

        return NextResponse.json(appointment, { status: 201 });
    } catch (error) {
        console.error("Error al guardar turno PRP:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
