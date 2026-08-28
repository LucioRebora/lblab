import { GoogleGenAI } from "@google/genai";

/**
 * Cliente compartido de Gemini. La credencial nunca sale del servidor:
 * este módulo sólo debe importarse desde route handlers o server components.
 */

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey && process.env.NODE_ENV !== "production") {
    console.warn("[gemini] Falta GEMINI_API_KEY: el asistente LIA no va a responder.");
}

export const genai = new GoogleGenAI({ apiKey: apiKey ?? "" });

export const hasGeminiKey = Boolean(apiKey);

/**
 * Modelos de chat, en orden de preferencia. Se puede fijar el primero con
 * GEMINI_CHAT_MODEL en .env.
 *
 * Hay más de uno porque Gemini devuelve 503 ("high demand") cuando un modelo
 * está saturado: sin alternativa, el chat del sitio se caería con él.
 */
export const CHAT_MODELS = [
    process.env.GEMINI_CHAT_MODEL ?? "gemini-3.6-flash",
    "gemini-3.5-flash",
    "gemini-2.5-flash",
].filter((m, i, all) => all.indexOf(m) === i);

export const CHAT_MODEL = CHAT_MODELS[0];

/** Códigos que conviene reintentar: saturación y límite de cuota. */
const RETRYABLE = new Set([429, 500, 502, 503, 504]);

export function isRetryable(error: unknown): boolean {
    const status = (error as { status?: number })?.status;
    return typeof status === "number" && RETRYABLE.has(status);
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Ejecuta `run` probando cada modelo de la lista. Reintenta una vez por modelo
 * ante un error transitorio antes de pasar al siguiente.
 */
export async function withModelFallback<T>(run: (model: string) => Promise<T>): Promise<T> {
    let last: unknown;

    for (const model of CHAT_MODELS) {
        for (let intento = 0; intento < 2; intento++) {
            try {
                return await run(model);
            } catch (error) {
                last = error;
                if (!isRetryable(error)) throw error;
                if (intento === 0) await sleep(400);
            }
        }
        console.warn(`[gemini] ${model} no responde, se prueba el siguiente modelo`);
    }
    throw last;
}

/**
 * Modelo y dimensión de embeddings. Tienen que coincidir con los que usó
 * `scripts/ingest-knowledge.mjs`: si cambian, hay que volver a ingestar todo
 * con `npm run ingest:lia -- --force`.
 */
export const EMBEDDING_MODEL = "gemini-embedding-001";
export const EMBEDDING_DIMS = 768;

/** Devuelve el embedding de un texto, listo para comparar contra la base. */
export async function embedQuery(text: string): Promise<number[]> {
    const res = await genai.models.embedContent({
        model: EMBEDDING_MODEL,
        contents: [text],
        config: { taskType: "RETRIEVAL_QUERY", outputDimensionality: EMBEDDING_DIMS },
    });

    const values = res.embeddings?.[0]?.values;
    if (!values?.length) {
        throw new Error("Gemini no devolvió un embedding para la consulta");
    }
    return values;
}
