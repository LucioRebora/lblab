import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const date = searchParams.get("date");

        const session = await getServerSession(authOptions);
        const where: any = {};

        if (session?.user?.role === 'USER') {
            where.email = session.user.email;
        }

        if (date) {
            where.date = date;
        }

        const appointments = await prisma.prpAppointment.findMany({
            where,
            orderBy: [
                { date: "desc" },
                { time: "asc" }
            ]
        });

        return NextResponse.json(appointments);
    } catch (error) {
        console.error("Error fetching admin prp appointments:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, status, cancelReason, protocolo } = body;

        if (!id) {
            return NextResponse.json({ error: "ID de turno requerido" }, { status: 400 });
        }

        const session = await getServerSession(authOptions);

        const oldAppointment = await prisma.prpAppointment.findUnique({
            where: { id }
        });

        if (!oldAppointment) {
            return NextResponse.json({ error: "Turno no encontrado" }, { status: 404 });
        }

        const appointment = await prisma.prpAppointment.update({
            where: { id },
            data: {
                status,
                cancelReason,
                protocolo
            },
        });

        if (oldAppointment.status !== status) {
            await prisma.auditLog.create({
                data: {
                    userEmail: session?.user?.email || "unknown",
                    userName: session?.user?.name || "Desconocido",
                    action: "UPDATE_STATUS",
                    entityType: "PRP",
                    entityId: id,
                    oldStatus: oldAppointment.status,
                    newStatus: status,
                }
            });
        }

        return NextResponse.json(appointment);
    } catch (error) {
        console.error("Error al actualizar turno PRP:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
