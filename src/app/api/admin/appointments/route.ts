import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const date = searchParams.get("date");

        const where: any = {};
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
        const { id, status, cancelReason } = body;

        if (!id) {
            return NextResponse.json({ error: "ID de turno requerido" }, { status: 400 });
        }

        const appointment = await prisma.prpAppointment.update({
            where: { id },
            data: {
                status,
                cancelReason
            },
        });

        return NextResponse.json(appointment);
    } catch (error) {
        console.error("Error al actualizar turno PRP:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
