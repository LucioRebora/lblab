import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const date = searchParams.get("date");

        const where: any = {};
        if (date) {
            where.date = date;
        }

        const derivaciones = await prisma.derivacion.findMany({
            where,
            orderBy: [
                { date: "desc" },
                { time: "asc" }
            ]
        });

        return NextResponse.json(derivaciones);
    } catch (error) {
        console.error("Error fetching admin derivaciones:", error);
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
            return NextResponse.json({ error: "ID de derivación requerido" }, { status: 400 });
        }

        const dataToUpdate: any = {};
        if (status !== undefined) dataToUpdate.status = status;
        if (cancelReason !== undefined) dataToUpdate.cancelReason = cancelReason;
        if (protocolo !== undefined) dataToUpdate.protocolo = protocolo;
        const session = await getServerSession(authOptions);

        const oldDerivacion = await prisma.derivacion.findUnique({
            where: { id }
        });

        if (!oldDerivacion) {
            return NextResponse.json({ error: "Derivación no encontrada" }, { status: 404 });
        }

        const derivacion = await prisma.derivacion.update({
            where: { id },
            data: dataToUpdate,
        });

        if (status !== undefined && oldDerivacion.status !== status) {
            await prisma.auditLog.create({
                data: {
                    userEmail: session?.user?.email || "unknown",
                    userName: session?.user?.name || "Desconocido",
                    action: "UPDATE_STATUS",
                    entityType: "DERIVACION",
                    entityId: id,
                    oldStatus: oldDerivacion.status,
                    newStatus: status,
                }
            });
        }

        return NextResponse.json(derivacion);
    } catch (error) {
        console.error("Error al actualizar derivación:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
