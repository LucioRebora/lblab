import { NextResponse } from "next/server";

import { hasGeminiKey } from "@/lib/gemini";
import { askLia, type ChatTurn } from "@/lib/lia-agent";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_QUESTION_CHARS = 800;

/** Límite de consultas por IP, para que el endpoint no quede abierto de par en par. */
const RATE_LIMIT = { max: 20, windowMs: 60_000 };
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string) {
    const now = Date.now();
    const entry = hits.get(ip);

    if (!entry || now > entry.resetAt) {
        hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT.windowMs });
        return false;
    }
    entry.count += 1;
    return entry.count > RATE_LIMIT.max;
}

/** Deja sólo turnos con la forma esperada; el historial viene del cliente. */
function sanitizeHistory(raw: unknown): ChatTurn[] {
    if (!Array.isArray(raw)) return [];
    return raw
        .filter((t): t is ChatTurn =>
            !!t && typeof t === "object" &&
            (t as ChatTurn).role !== undefined &&
            ["user", "model"].includes((t as ChatTurn).role) &&
            typeof (t as ChatTurn).text === "string" &&
            (t as ChatTurn).text.trim().length > 0,
        )
        .map((t) => ({ role: t.role, text: t.text.slice(0, MAX_QUESTION_CHARS) }));
}

export async function POST(req: Request) {
    if (!hasGeminiKey) {
        return NextResponse.json(
            { error: "El asistente no está configurado (falta GEMINI_API_KEY)." },
            { status: 503 },
        );
    }

    const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        req.headers.get("x-real-ip") ||
        "desconocida";

    if (rateLimited(ip)) {
        return NextResponse.json(
            { error: "Demasiadas consultas seguidas. Probá de nuevo en un minuto." },
            { status: 429 },
        );
    }

    let question: string;
    let history: ChatTurn[];

    try {
        const body = await req.json();
        question = typeof body?.question === "string" ? body.question.trim() : "";
        history = sanitizeHistory(body?.history);
    } catch {
        return NextResponse.json({ error: "Cuerpo de la consulta inválido" }, { status: 400 });
    }

    if (!question) {
        return NextResponse.json({ error: "Falta la consulta" }, { status: 400 });
    }
    if (question.length > MAX_QUESTION_CHARS) {
        return NextResponse.json(
            { error: `La consulta no puede superar los ${MAX_QUESTION_CHARS} caracteres.` },
            { status: 400 },
        );
    }

    try {
        const { stream, sources } = await askLia(question, history);
        const encoder = new TextEncoder();

        // Las fuentes viajan primero como un evento propio, así el widget puede
        // mostrar los enlaces mientras todavía se está escribiendo la respuesta.
        const body = new ReadableStream({
            async start(controller) {
                const send = (event: string, data: unknown) =>
                    controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));

                try {
                    send("sources", sources.map((s) => ({
                        url: s.url,
                        pageTitle: s.pageTitle,
                        heading: s.heading,
                    })));

                    for await (const delta of stream) {
                        send("delta", delta);
                    }
                    send("done", true);
                } catch (error) {
                    console.error("[LIA] error durante el streaming:", error);
                    send("error", "Se cortó la respuesta. Probá de nuevo.");
                } finally {
                    controller.close();
                }
            },
        });

        return new Response(body, {
            headers: {
                "Content-Type": "text/event-stream; charset=utf-8",
                "Cache-Control": "no-cache, no-transform",
                Connection: "keep-alive",
            },
        });
    } catch (error) {
        console.error("[LIA] error al responder:", error);
        return NextResponse.json(
            {
                error:
                    "Ahora mismo no puedo responderte. Probá de nuevo en un momento " +
                    "o escribinos por WhatsApp al 3446 33-0365.",
            },
            { status: 503 },
        );
    }
}
