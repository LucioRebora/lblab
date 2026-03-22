import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const numeroSecuencial = searchParams.get("numeroSecuencial");

        if (!numeroSecuencial) {
            return NextResponse.json({ error: "numeroSecuencial es requerido" }, { status: 400 });
        }

        const bioitiaKey = process.env.BIOITIA_API_KEY;
        const laboratoryId = process.env.LABORATORY_ID;

        if (!bioitiaKey || !laboratoryId) {
            console.error("Missing Bioitia configuration in .env");
            return NextResponse.json({ error: "Configuración de API no encontrada" }, { status: 500 });
        }

        const url = `https://bio.itia.ar/api/external/protocol-link?numeroSecuencial=${numeroSecuencial}`;
        
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "X-API-KEY": bioitiaKey,
                "X-LAB-ID": laboratoryId,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Bioitia API error:", errorText);
            return NextResponse.json({ error: "Error al obtener el link del protocolo" }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error in report-link route:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
