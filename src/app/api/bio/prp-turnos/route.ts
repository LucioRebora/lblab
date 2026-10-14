import crypto from "crypto";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendMail } from "@/lib/mail";
import { getBioIntegration } from "@/lib/bio-integration";

/**
 * POST /api/bio/prp-turnos — Bio (el LIS del laboratorio) reserva un turno de PRP en nombre de un cliente que no
 * lo pidió por la web. La web es la dueña de los horarios, así que el turno se crea acá y Bio guarda este id.
 *
 * Autenticado con el mismo token de la Vinculación con Bio. Aplica las mismas reglas que el formulario público:
 * sin fines de semana y sin pisar un horario ya ocupado.
 */

function tokenValido(recibido: string, esperado: string | null): boolean {
    if (!recibido || !esperado) return false;
    const a = Buffer.from(recibido);
    const b = Buffer.from(esperado);
    return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function POST(request: Request) {
    const { token } = await getBioIntegration();
    const recibido = (request.headers.get("x-api-key") || (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "")).trim();
    if (!tokenValido(recibido, token)) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
        return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
    }

    const texto = (v: unknown) => (typeof v === "string" ? v.trim() : "");
    const email = texto(body.email);
    const professional = texto(body.professional);
    const patient = texto(body.patient);
    const date = texto(body.date);
    const time = texto(body.time);
    const preparation: string[] = Array.isArray(body.preparation)
        ? body.preparation.filter((p: unknown) => typeof p === "string" && p.trim()).map((p: string) => p.trim())
        : [];

    if (!patient || !date || !time) {
        return NextResponse.json({ error: "Faltan paciente, fecha u hora" }, { status: 400 });
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) {
        return NextResponse.json({ error: "Fecha u hora inválida" }, { status: 400 });
    }
    const dia = new Date(date + "T12:00:00").getDay();
    if (dia === 0 || dia === 6) {
        return NextResponse.json({ error: "No se pueden dar turnos en fines de semana" }, { status: 400 });
    }

    const ocupado = await prisma.prpAppointment.findFirst({
        where: { date, time, status: { notIn: ["CANCELLED", "ANULADO"] } },
    });
    if (ocupado) {
        return NextResponse.json({ error: "El horario ya está ocupado" }, { status: 409 });
    }

    const turno = await prisma.prpAppointment.create({
        data: { email, professional: professional || null, patient, date, time, preparation, status: "CONFIRMADO" },
    });

    await prisma.auditLog
        .create({
            data: {
                userEmail: "bio",
                userName: "Reservado desde Bio",
                action: "CREATE",
                entityType: "PRP",
                entityId: turno.id,
                newStatus: "CONFIRMADO",
            },
        })
        .catch(() => {});

    // Si hay un email del médico, recibe la misma confirmación que cuando reserva por la web.
    if (email) {
        try {
            await sendMail({
                to: email,
                subject: `Confirmación de Turno PRP: ${patient}`,
                title: "Su turno ha sido confirmado con éxito",
                preheader: `Hola, el turno de ${patient} para Plasma Rico en Plaquetas ha sido programado.`,
                data: {
                    "Paciente": patient,
                    "Profesional": professional || "No especificado",
                    "Fecha del turno": date,
                    "Hora": `${time} hs`,
                    "Indicaciones preparatorias": preparation.length > 0 ? preparation.join(", ") : "Sin indicaciones especiales",
                },
            });
        } catch (mailError) {
            console.error("Error al enviar mail de confirmación:", mailError);
        }
    }

    return NextResponse.json({ id: turno.id }, { status: 201 });
}
