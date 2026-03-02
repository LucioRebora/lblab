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

        const derivacion = await prisma.derivacion.update({
            where: { id },
            data: dataToUpdate,
        });

        return NextResponse.json(derivacion);
    } catch (error) {
        console.error("Error al actualizar derivación:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
