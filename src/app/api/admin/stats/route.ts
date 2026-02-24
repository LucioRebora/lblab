import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    try {
        // Consultas hoy (ContactSubmission created today)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const consultasHoy = await prisma.contactSubmission.count({
            where: {
                createdAt: {
                    gte: today
                }
            }
        });

        // Turnos mañana (PrpAppointment and Derivacion for tomorrow)
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = tomorrow.toISOString().split('T')[0];

        const prpTomorrow = await prisma.prpAppointment.count({
            where: {
                date: tomorrowStr,
                status: { not: "CANCELLED" }
            }
        });

        const derivTomorrow = await prisma.derivacion.count({
            where: {
                date: tomorrowStr,
                status: { not: "CANCELLED" }
            }
        });

        const turnosManana = prpTomorrow + derivTomorrow;

        // Turnos Veterinarios Hoy (VeterinaryAppointment created today)
        const veterinaryToday = await prisma.veterinaryAppointment.count({
            where: {
                createdAt: { gte: today },
                status: "PENDING"
            }
        });

        // Pacientes nuevos (Assuming this refers to count of unique patient names in the last 30 days or similar)
        // For now, let's just return a placeholder or total unique patients from appointments
        const uniquePatients = await prisma.prpAppointment.groupBy({
            by: ['patient'],
        });
        const totalPacientes = uniquePatients.length;

        return NextResponse.json({
            consultasHoy,
            turnosManana,
            totalPacientes,
            veterinaryToday,
            estudiosListos: "95%" // Placeholder standard
        });
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        return NextResponse.json({ error: "Error al obtener estadísticas" }, { status: 500 });
    }
}
