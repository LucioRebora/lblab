import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { enviarTurnoPrpABio } from "@/lib/bio-sync";

/** Reenvía a Bio los turnos PRP de los últimos 30 días en adelante. Idempotente: Bio actualiza lo que ya tenía. */
export async function POST() {
    const session = (await getServerSession(authOptions)) as any;
    if (!session) return NextResponse.json({ error: "No hay sesión activa" }, { status: 401 });
    if (session.user?.role !== "ADMIN") return NextResponse.json({ error: "Solo el administrador" }, { status: 403 });

    const desde = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const turnos = await prisma.prpAppointment.findMany({ where: { date: { gte: desde } }, orderBy: [{ date: "asc" }, { time: "asc" }] });

    let enviados = 0;
    let fallidos = 0;
    let motivo: string | undefined;
    for (const t of turnos) {
        const r = await enviarTurnoPrpABio({
            id: t.id,
            email: t.email,
            professional: t.professional,
            patient: t.patient,
            date: t.date,
            time: t.time,
            preparation: t.preparation,
            status: t.status,
            cancelReason: t.cancelReason,
            protocolo: t.protocolo,
        });
        if (r.ok) enviados++;
        else {
            fallidos++;
            motivo = r.motivo;
            // Si Bio no está vinculado o no responde, no tiene sentido insistir con el resto.
            break;
        }
    }
    return NextResponse.json({ total: turnos.length, enviados, fallidos, motivo });
}
