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
        const { id, status, cancelReason, protocolo } = body;

        if (!id) {
            return NextResponse.json({ error: "ID requerido" }, { status: 400 });
        }

        const dataToUpdate: any = {};
        if (status !== undefined) dataToUpdate.status = status;
        if (cancelReason !== undefined) dataToUpdate.cancelReason = cancelReason;
        if (protocolo !== undefined) dataToUpdate.protocolo = protocolo;

        // @ts-ignore
        const appointment = await prisma.veterinaryAppointment.update({
            where: { id },
            data: dataToUpdate
        });

        return NextResponse.json(appointment);
    } catch (error) {
        console.error("Error updating veterinary appointment:", error);
        return NextResponse.json({ error: "Error interno" }, { status: 500 });
    }
}
