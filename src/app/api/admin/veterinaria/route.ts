import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        // @ts-ignore
        const appointments = await prisma.veterinaryAppointment.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
        return NextResponse.json(appointments);
    } catch (error) {
        console.error("Error fetching veterinary appointments:", error);
        return NextResponse.json({ error: "Error interno" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, status, cancelReason } = body;

        if (!id) {
            return NextResponse.json({ error: "ID requerido" }, { status: 400 });
        }

        // @ts-ignore
        const appointment = await prisma.veterinaryAppointment.update({
            where: { id },
            data: {
                status,
                cancelReason
            }
        });

        return NextResponse.json(appointment);
    } catch (error) {
        console.error("Error updating veterinary appointment:", error);
        return NextResponse.json({ error: "Error interno" }, { status: 500 });
    }
}
