import prisma from "@/lib/prisma";
import { embedQuery } from "@/lib/gemini";

export type Passage = {
    url: string;
    pageTitle: string;
    heading: string | null;
    content: string;
    score: number;
};

/**
 * Búsqueda híbrida sobre el contenido tokenizado del sitio.
 *
 * Se combinan dos rankings con Reciprocal Rank Fusion:
 *
 *   · semántico — distancia coseno entre embeddings. Encuentra la respuesta
 *     aunque la persona use otras palabras ("¿puedo desayunar?" → ayuno).
 *   · léxico — tsvector en español sin acentos. Encuentra nombres propios de
 *     estudios ("coprocultivo", "espermograma") que el embedding puede diluir.
 *
 * La consulta léxica une los términos con OR en vez de AND: con AND, una
 * pregunta larga no matchea ningún fragmento y ese brazo queda mudo.
 */
const HYBRID_SQL = `
WITH sem AS (
    SELECT id, row_number() OVER (ORDER BY embedding <=> $1::vector) AS rank
    FROM "SiteChunk"
    WHERE embedding IS NOT NULL
    ORDER BY embedding <=> $1::vector
    LIMIT $3
), q AS (
    SELECT NULLIF(replace(plainto_tsquery('spanish', unaccent($2))::text, '&', '|'), '')::tsquery AS tsq
), lex AS (
    SELECT c.id,
           row_number() OVER (ORDER BY ts_rank_cd(c."searchVector", (SELECT tsq FROM q)) DESC) AS rank
    FROM "SiteChunk" c
    WHERE (SELECT tsq FROM q) IS NOT NULL
      AND c."searchVector" @@ (SELECT tsq FROM q)
    LIMIT $3
)
SELECT c.url,
       c."pageTitle",
       c.heading,
       c.content,
       (COALESCE(1.0 / (60 + sem.rank), 0) + COALESCE(1.0 / (60 + lex.rank), 0))::float8 AS score
FROM "SiteChunk" c
LEFT JOIN sem ON sem.id = c.id
LEFT JOIN lex ON lex.id = c.id
WHERE sem.id IS NOT NULL OR lex.id IS NOT NULL
ORDER BY score DESC
LIMIT $4
`;

/** Cuántos candidatos considera cada brazo antes de fusionar. */
const CANDIDATES = 20;

export async function retrieve(question: string, limit = 8): Promise<Passage[]> {
    const query = question.trim();
    if (!query) return [];

    const embedding = await embedQuery(query);
    const literal = `[${embedding.join(",")}]`;

    return prisma.$queryRawUnsafe<Passage[]>(HYBRID_SQL, literal, query, CANDIDATES, limit);
}

/** Arma el bloque de contexto que se le pasa al modelo. */
export function buildContext(passages: Passage[]): string {
    return passages
        .map((p, i) => `[${i + 1}] (${p.url})\n${p.content}`)
        .join("\n\n---\n\n");
}
