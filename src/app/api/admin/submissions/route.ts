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
        const submissions = await prisma.contactSubmission.findMany({
            orderBy: {
                createdAt: "desc",
            },
            take: 10,
        });

        const totalSubmissions = await prisma.contactSubmission.count();

        return NextResponse.json({
            submissions,
            totalSubmissions,
        });
    } catch (error) {
        console.error("Error fetching submissions:", error);
        return NextResponse.json({ error: "Error al obtener consultas" }, { status: 500 });
    }
}
