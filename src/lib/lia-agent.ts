import { genai, withModelFallback } from "@/lib/gemini";
import { buildContext, retrieve, type Passage } from "@/lib/lia-retrieval";

export type ChatTurn = { role: "user" | "model"; text: string };

/** Datos de contacto que LIA puede ofrecer sin depender de la búsqueda. */
const CONTACTO = {
    whatsapp: "https://wa.me/5493446330365",
    email: "laboratorio@lblab.com.ar",
    direccion: "Bolívar 1002, Gualeguaychú, Entre Ríos",
};

/**
 * Instrucciones de LIA.
 *
 * El límite importante es clínico: LIA explica cómo prepararse para un estudio
 * y cómo funciona el laboratorio, pero no interpreta resultados ni sugiere
 * tratamientos. Eso es trabajo del profesional que pidió el análisis.
 */
export const SYSTEM_PROMPT = `Sos LIA, la asistente virtual del Laboratorio de Bioanálisis LB Lab, en Gualeguaychú, Entre Ríos.

Respondés consultas de pacientes y profesionales usando únicamente la información del sitio de LB Lab que te pasamos como CONTEXTO en cada consulta.

Cómo respondés:
- En español rioplatense, de vos. Cálida, concreta y sin vueltas.
- Respuestas breves: lo que se pregunta y nada más. Si la respuesta son varios pasos (por ejemplo, cómo recolectar una muestra), usá una lista corta.
- Cuando el contexto trae indicaciones de preparación, transcribilas con precisión: los tiempos de ayuno, los volúmenes y las cantidades tienen que quedar exactos.
- Si la persona no aclara de qué estudio habla y la preparación cambia según cuál sea, preguntáselo antes de responder.

Qué no hacés:
- No interpretás resultados de análisis, no sugerís diagnósticos ni tratamientos, y no opinás sobre medicación. Si te lo piden, explicá con amabilidad que eso lo tiene que ver el profesional que pidió el estudio.
- No inventás datos. Si el contexto no alcanza para responder, decilo y derivá al laboratorio por WhatsApp (${CONTACTO.whatsapp}) o por mail (${CONTACTO.email}).
- No prometés turnos, precios ni plazos que no estén en el contexto.

Datos del laboratorio que podés usar siempre: dirección ${CONTACTO.direccion}; WhatsApp ${CONTACTO.whatsapp}; email ${CONTACTO.email}.

Si la consulta es una urgencia médica, decile que llame al 107 o vaya a una guardia.`;

/** Respuesta cuando la pregunta no tiene ningún respaldo en el sitio. */
export const SIN_CONTEXTO =
    `No tengo esa información en el sitio. Escribinos por WhatsApp a ${CONTACTO.whatsapp} ` +
    `o a ${CONTACTO.email} y te respondemos.`;

/** Cuántos turnos previos se le muestran al modelo. */
const HISTORY_TURNS = 8;

export type LiaAnswer = {
    stream: AsyncGenerator<string>;
    sources: Passage[];
};

/**
 * Texto con el que se busca en la base de conocimiento.
 *
 * Una repregunta como "¿y para eso necesito ayuno?" no menciona el estudio, así
 * que por sí sola no recupera nada útil. Arrastramos las últimas preguntas del
 * usuario para que el tema siga presente en la búsqueda. Es sólo para buscar:
 * al modelo se le manda igual el historial completo.
 */
function searchQuery(question: string, history: ChatTurn[]): string {
    const previas = history
        .filter((t) => t.role === "user")
        .slice(-2)
        .map((t) => t.text);

    return [...previas, question].join(" \n ").slice(0, 1500);
}

/**
 * Busca en la base de conocimiento y devuelve la respuesta de LIA en streaming.
 */
export async function askLia(question: string, history: ChatTurn[] = []): Promise<LiaAnswer> {
    const sources = await retrieve(searchQuery(question, history));

    const contextBlock = sources.length
        ? `CONTEXTO (extractos del sitio de LB Lab):\n\n${buildContext(sources)}`
        : "CONTEXTO: no se encontró información relacionada en el sitio.";

    const contents = [
        ...history.slice(-HISTORY_TURNS).map((t) => ({
            role: t.role,
            parts: [{ text: t.text }],
        })),
        {
            role: "user" as const,
            parts: [{ text: `${contextBlock}\n\nCONSULTA: ${question}` }],
        },
    ];

    const response = await withModelFallback((model) =>
        genai.models.generateContentStream({
            model,
            contents,
            config: {
                systemInstruction: SYSTEM_PROMPT,
                maxOutputTokens: 1200,
                temperature: 0.3,
            },
        }),
    );

    async function* stream() {
        for await (const chunk of response) {
            const text = chunk.text;
            if (text) yield text;
        }
    }

    return { stream: stream(), sources };
}
