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
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const isUserRole = session?.user?.role === 'USER';
        const userEmail = session?.user?.email || "";

        const consultasPendientes = isUserRole ? 0 : await prisma.contactSubmission.count({
            where: {
                status: "PENDING"
            }
        });

        // Turnos mañana (PrpAppointment and Derivacion for tomorrow)
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = tomorrow.toISOString().split('T')[0];

        const prpTomorrow = await prisma.prpAppointment.count({
            where: {
                date: tomorrowStr,
                status: { not: "CANCELLED" },
                ...(isUserRole ? { email: userEmail } : {})
            }
        });

        const derivTomorrow = await prisma.derivacion.count({
            where: {
                date: tomorrowStr,
                status: { notIn: ["CANCELLED", "ANULADO"] },
                ...(isUserRole ? { email: userEmail } : {})
            }
        });

        const turnosManana = prpTomorrow + derivTomorrow;

        // Solicitudes Veterinarias Pendientes (Todas)
        // @ts-ignore
        const veterinaryPending = await prisma.veterinaryAppointment.count({
            where: {
                status: "PENDING",
                ...(isUserRole ? { email: userEmail } : {})
            }
        });

        // Derivaciones Pendientes
        const derivacionesPendientes = await prisma.derivacion.count({
            where: {
                status: "PENDING",
                ...(isUserRole ? { email: userEmail } : {})
            }
        });

        // Pacientes nuevos
        const uniquePatients = await prisma.prpAppointment.groupBy({
            by: ['patient'],
            where: isUserRole ? { email: userEmail } : {}
        });
        const totalPacientes = uniquePatients.length;

        return NextResponse.json({
            consultasHoy: consultasPendientes,
            turnosManana,
            totalPacientes,
            veterinaryToday: veterinaryPending,
            derivacionesPendientes,
            estudiosListos: "95%" // Placeholder standard
        });
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        return NextResponse.json({ error: "Error al obtener estadísticas" }, { status: 500 });
    }
}
