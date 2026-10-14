import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { BIO_TOKEN_KEY, BIO_URL_KEY, BIO_URL_POR_DEFECTO, getBioIntegration } from "@/lib/bio-integration";

async function soloAdmin() {
    const session = (await getServerSession(authOptions)) as any;
    if (!session) return { error: NextResponse.json({ error: "No hay sesión activa" }, { status: 401 }) };
    if (session.user?.role !== "ADMIN") return { error: NextResponse.json({ error: "Solo el administrador puede ver esto" }, { status: 403 }) };
    return { session };
}

function enmascarar(token: string | null) {
    if (!token) return null;
    return token.length > 12 ? `${token.slice(0, 8)}...${token.slice(-4)}` : "••••••••";
}

export async function GET() {
    const { error } = await soloAdmin();
    if (error) return error;
    const { token, url } = await getBioIntegration();
    return NextResponse.json({ configured: Boolean(token), token: enmascarar(token), url });
}

export async function POST(request: Request) {
    const { session, error } = await soloAdmin();
    if (error) return error;

    const body = await request.json().catch(() => ({}));
    const token = typeof body.token === "string" ? body.token.trim() : "";
    const url = typeof body.url === "string" ? body.url.trim() : "";

    if (url) {
        try {
            const u = new URL(url);
            if (u.protocol !== "https:" && u.protocol !== "http:") throw new Error("protocolo");
        } catch {
            return NextResponse.json({ error: "La URL de Bio no es válida (debe empezar con https://)." }, { status: 400 });
        }
    }
    // Un token con "..." es el enmascarado que mostró la pantalla: no se pisa lo guardado.
    if (token && !token.includes("...") && !token.includes("••")) {
        await prisma.globalConfig.upsert({ where: { key: BIO_TOKEN_KEY }, update: { value: token }, create: { key: BIO_TOKEN_KEY, value: token } });
    }
    await prisma.globalConfig.upsert({
        where: { key: BIO_URL_KEY },
        update: { value: url || BIO_URL_POR_DEFECTO },
        create: { key: BIO_URL_KEY, value: url || BIO_URL_POR_DEFECTO },
    });

    await prisma.auditLog
        .create({
            data: {
                userEmail: session.user?.email ?? null,
                userName: session.user?.name ?? null,
                action: "UPDATE",
                entityType: "INTEGRACION_BIO",
                entityId: BIO_TOKEN_KEY,
                details: "Se actualizó la vinculación con Bio (el valor del token no se registra).",
            },
        })
        .catch(() => {});

    return NextResponse.json({ ok: true });
}

export async function DELETE() {
    const { error } = await soloAdmin();
    if (error) return error;
    await prisma.globalConfig.deleteMany({ where: { key: BIO_TOKEN_KEY } });
    return NextResponse.json({ ok: true });
}
