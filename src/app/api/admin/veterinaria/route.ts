import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        const where: any = {};
        if (session?.user?.role === 'USER') {
            where.email = session.user.email;
        }

        // @ts-ignore
        const appointments = await prisma.veterinaryAppointment.findMany({
            where,
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

        const session = await getServerSession(authOptions);

        // @ts-ignore
        const oldAppointment = await prisma.veterinaryAppointment.findUnique({
            where: { id }
        });

        if (!oldAppointment) {
            return NextResponse.json({ error: "Turno no encontrado" }, { status: 404 });
        }

        // @ts-ignore
        const appointment = await prisma.veterinaryAppointment.update({
            where: { id },
            data: dataToUpdate
        });

        if (status !== undefined && oldAppointment.status !== status) {
            await prisma.auditLog.create({
                data: {
                    userEmail: session?.user?.email || "unknown",
                    userName: session?.user?.name || "Desconocido",
                    action: "UPDATE_STATUS",
                    entityType: "VETERINARIA",
                    entityId: id,
                    oldStatus: oldAppointment.status,
                    newStatus: status,
                }
            });
        }

        return NextResponse.json(appointment);
    } catch (error) {
        console.error("Error updating veterinary appointment:", error);
        return NextResponse.json({ error: "Error interno" }, { status: 500 });
    }
}
