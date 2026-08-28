/**
 * Ingesta del contenido del sitio a la base de conocimiento de LIA.
 *
 *   node scripts/ingest-knowledge.mjs          # ingesta incremental
 *   node scripts/ingest-knowledge.mjs --force  # recalcula todos los embeddings
 *
 * Cada fragmento se guarda con dos representaciones para poder buscarlo:
 *   · searchVector — tokens léxicos en español, sin acentos (búsqueda exacta)
 *   · embedding    — vector semántico de Gemini (búsqueda por significado)
 *
 * Los fragmentos cuyo texto no cambió conservan su embedding, así que volver a
 * correr el script después de editar una sola página cuesta muy pocas llamadas.
 */

import { GoogleGenAI } from "@google/genai";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import { extractSite } from "./extract-content.mjs";
import { bootstrap } from "./db-bootstrap.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
dotenv.config({ path: join(ROOT, ".env") });

export const EMBEDDING_MODEL = "gemini-embedding-001";
export const EMBEDDING_DIMS = 768;
const BATCH_SIZE = 32;

const prisma = new PrismaClient();

/** Convierte un array de números al literal que espera pgvector. */
function toVectorLiteral(values) {
    return `[${values.join(",")}]`;
}

async function embedBatch(ai, texts, taskType) {
    const res = await ai.models.embedContent({
        model: EMBEDDING_MODEL,
        contents: texts,
        config: { taskType, outputDimensionality: EMBEDDING_DIMS },
    });
    const vectors = (res.embeddings ?? []).map((e) => e.values);
    if (vectors.length !== texts.length) {
        throw new Error(`Se pidieron ${texts.length} embeddings y llegaron ${vectors.length}`);
    }
    return vectors;
}

async function main() {
    const force = process.argv.includes("--force");
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("Falta GEMINI_API_KEY en .env");
    }
    const ai = new GoogleGenAI({ apiKey });

    console.log("1/5  Preparando la base…");
    await bootstrap({ quiet: true });

    console.log("2/5  Extrayendo el contenido del sitio…");
    const chunks = await extractSite(ROOT);
    console.log(`     ${chunks.length} fragmentos, ${chunks.reduce((a, c) => a + c.chars, 0)} caracteres`);

    console.log("3/5  Comparando con lo que ya está guardado…");
    const existing = await prisma.siteChunk.findMany({
        select: { url: true, position: true, checksum: true },
    });
    const previous = new Map(existing.map((r) => [`${r.url}#${r.position}`, r.checksum]));

    const pending = force
        ? chunks
        : chunks.filter((c) => previous.get(`${c.url}#${c.position}`) !== c.checksum);
    console.log(`     ${pending.length} fragmentos nuevos o modificados${force ? " (--force)" : ""}`);

    console.log("4/5  Calculando embeddings…");
    const vectors = new Map();
    for (let i = 0; i < pending.length; i += BATCH_SIZE) {
        const batch = pending.slice(i, i + BATCH_SIZE);
        const embedded = await embedBatch(ai, batch.map((c) => c.content), "RETRIEVAL_DOCUMENT");
        batch.forEach((c, k) => vectors.set(`${c.url}#${c.position}`, embedded[k]));
        process.stdout.write(`     ${Math.min(i + BATCH_SIZE, pending.length)}/${pending.length}\r`);
    }
    if (pending.length) process.stdout.write("\n");

    console.log("5/5  Guardando…");
    for (const c of pending) {
        const vector = vectors.get(`${c.url}#${c.position}`);
        await prisma.$executeRawUnsafe(
            `INSERT INTO "SiteChunk"
               (id, url, page, "pageTitle", heading, content, chars, position, checksum,
                "createdAt", "updatedAt", "searchVector", embedding, tokens)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, now(), now(),
                     to_tsvector('spanish', unaccent($6)), $10::vector,
                     length(to_tsvector('spanish', unaccent($6))))
             ON CONFLICT (url, position) DO UPDATE SET
               page         = EXCLUDED.page,
               "pageTitle"  = EXCLUDED."pageTitle",
               heading      = EXCLUDED.heading,
               content      = EXCLUDED.content,
               chars        = EXCLUDED.chars,
               checksum     = EXCLUDED.checksum,
               "updatedAt"  = now(),
               "searchVector" = EXCLUDED."searchVector",
               embedding    = EXCLUDED.embedding,
               tokens       = EXCLUDED.tokens`,
            randomUUID(), c.url, c.page, c.pageTitle, c.heading, c.content,
            c.chars, c.position, c.checksum, toVectorLiteral(vector),
        );
    }

    // Borra fragmentos que ya no existen (secciones eliminadas del sitio).
    const keep = new Set(chunks.map((c) => `${c.url}#${c.position}`));
    const stale = existing.filter((r) => !keep.has(`${r.url}#${r.position}`));
    for (const r of stale) {
        await prisma.siteChunk.deleteMany({ where: { url: r.url, position: r.position } });
    }

    const [stats] = await prisma.$queryRawUnsafe(
        `SELECT count(*)::int AS fragmentos,
                sum(tokens)::int AS tokens,
                count(embedding)::int AS con_embedding
         FROM "SiteChunk"`,
    );

    console.log(`\nListo.`);
    console.log(`  fragmentos guardados : ${stats.fragmentos}`);
    console.log(`  tokens indexados     : ${stats.tokens}`);
    console.log(`  con embedding        : ${stats.con_embedding}`);
    if (stale.length) console.log(`  eliminados (obsoletos): ${stale.length}`);
}

main()
    .catch((e) => { console.error("\nFalló la ingesta:", e.message); process.exitCode = 1; })
    .finally(() => prisma.$disconnect());
