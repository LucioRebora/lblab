import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { CLAVES_SECRETAS } from "@/lib/bio-integration";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const key = searchParams.get("key");

        // Esta ruta es pública: las claves secretas (token de Bio) no salen por acá.
        if (key && CLAVES_SECRETAS.includes(key)) {
            return NextResponse.json(null);
        }
        if (key) {
            const config = await prisma.globalConfig.findUnique({
                where: { key }
            });
            return NextResponse.json(config);
        }

        const allConfigs = await prisma.globalConfig.findMany({ where: { key: { notIn: CLAVES_SECRETAS } } });
        return NextResponse.json(allConfigs);
    } catch (error) {
        return NextResponse.json({ error: "Error fetching config" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions) as any;
    if (!session) {
        return NextResponse.json({ error: "No hay sesión activa" }, { status: 401 });
    }
    if (session?.user?.role !== "ADMIN") {
        return NextResponse.json({ error: "No tienes permisos de administrador (" + session?.user?.role + ")" }, { status: 403 });
    }

    try {
        const body = await request.json();
        const { key, value } = body;
        if (CLAVES_SECRETAS.includes(key)) {
            return NextResponse.json({ error: "Clave reservada" }, { status: 403 });
        }

        const config = await prisma.globalConfig.upsert({
            where: { key },
            update: { value },
            create: { key, value }
        });

        return NextResponse.json(config);
    } catch (error) {
        return NextResponse.json({ error: "Error saving config" }, { status: 500 });
    }
}
