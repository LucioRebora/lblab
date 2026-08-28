/**
 * Prepara Postgres para la base de conocimiento del asistente LAB.
 *
 * Es idempotente: se puede correr todas las veces que haga falta. Conviene
 * volver a correrlo después de cada `prisma db push`, porque `db push` puede
 * borrar los índices que no están declarados en el schema.
 */

import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "../.env") });

const prisma = new PrismaClient();

const STATEMENTS = [
    // Búsqueda semántica
    `CREATE EXTENSION IF NOT EXISTS vector`,
    // Búsqueda léxica insensible a acentos ("analisis" encuentra "análisis")
    `CREATE EXTENSION IF NOT EXISTS unaccent`,
    // Tolerancia a errores de tipeo
    `CREATE EXTENSION IF NOT EXISTS pg_trgm`,
];

const INDEXES = [
    `CREATE INDEX IF NOT EXISTS "SiteChunk_searchVector_idx"
       ON "SiteChunk" USING GIN ("searchVector")`,
    `CREATE INDEX IF NOT EXISTS "SiteChunk_embedding_idx"
       ON "SiteChunk" USING hnsw ("embedding" vector_cosine_ops)`,
    `CREATE INDEX IF NOT EXISTS "SiteChunk_content_trgm_idx"
       ON "SiteChunk" USING GIN ("content" gin_trgm_ops)`,
];

async function tableExists(name) {
    const rows = await prisma.$queryRawUnsafe(
        `SELECT to_regclass($1) IS NOT NULL AS present`,
        `public."${name}"`,
    );
    return rows[0]?.present === true;
}

export async function bootstrap({ quiet = false } = {}) {
    const log = quiet ? () => {} : (...a) => console.log(...a);

    for (const sql of STATEMENTS) {
        await prisma.$executeRawUnsafe(sql);
        log(`  ✓ ${sql.split("\n")[0].trim()}`);
    }

    if (await tableExists("SiteChunk")) {
        for (const sql of INDEXES) {
            await prisma.$executeRawUnsafe(sql);
            log(`  ✓ ${sql.split("\n")[0].trim()}`);
        }
    } else {
        log(`  · la tabla "SiteChunk" todavía no existe — corré \`npx prisma db push\` y volvé a ejecutar esto`);
    }
}

const isMain = process.argv[1] && import.meta.url.endsWith(process.argv[1].split("/").pop());
if (isMain) {
    bootstrap()
        .then(() => console.log("\nBase preparada."))
        .catch((e) => { console.error(e); process.exitCode = 1; })
        .finally(() => prisma.$disconnect());
}
