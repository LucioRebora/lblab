import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category");

        const where = category ? { category } : {};

        const prices = await prisma.analysisPrice.findMany({
            where,
            orderBy: { name: "asc" }
        });
        return NextResponse.json(prices);
    } catch (error) {
        return NextResponse.json({ error: "Error fetching prices" }, { status: 500 });
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
        const { name, nbuUnits, category } = body;

        const price = await prisma.analysisPrice.create({
            data: {
                name,
                nbuUnits: parseFloat(nbuUnits),
                category: category || "GENERAL"
            }
        });

        return NextResponse.json(price, { status: 201 });
    } catch (error: any) {
        console.error("Error creating price:", error);
        if (error.code === 'P2002') {
            return NextResponse.json({ error: "Ya existe un análisis con este nombre" }, { status: 400 });
        }
        return NextResponse.json({ error: "Error al crear el análisis: " + error.message }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    const session = await getServerSession(authOptions) as any;
    if (!session) {
        return NextResponse.json({ error: "No hay sesión activa" }, { status: 401 });
    }
    if (session?.user?.role !== "ADMIN") {
        return NextResponse.json({ error: "No tienes permisos de administrador" }, { status: 403 });
    }

    try {
        const body = await request.json();
        const { id, name, nbuUnits, category } = body;

        const price = await prisma.analysisPrice.update({
            where: { id },
            data: {
                name,
                nbuUnits: parseFloat(nbuUnits),
                category
            }
        });

        return NextResponse.json(price);
    } catch (error) {
        return NextResponse.json({ error: "Error updating price" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions) as any;
    if (!session) {
        return NextResponse.json({ error: "No hay sesión activa" }, { status: 401 });
    }
    if (session?.user?.role !== "ADMIN") {
        return NextResponse.json({ error: "No tienes permisos de administrador" }, { status: 403 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

        await prisma.analysisPrice.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Error deleting price" }, { status: 500 });
    }
}
