This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## LIA — asistente de IA del sitio

LIA responde consultas de pacientes y profesionales usando **únicamente** el
contenido del propio sitio. No interpreta resultados ni sugiere tratamientos.

### Cómo funciona

1. `scripts/extract-content.mjs` extrae el texto de las páginas. Lee las
   fuentes `.tsx` y no el HTML publicado, porque el contenido de los acordeones
   (indicaciones, PRP, veterinaria, derivaciones) sólo se renderiza al hacer
   clic y no está en el HTML que sirve el servidor.
2. `npm run ingest:lia` guarda cada fragmento en la tabla `SiteChunk` con dos
   representaciones: tokens léxicos en español (`searchVector`) y un embedding
   semántico de Gemini (`embedding`).
3. `/api/lia` busca combinando ambas (Reciprocal Rank Fusion) y le pasa los
   fragmentos encontrados a Gemini como contexto.

### Comandos

```bash
npm run ingest:lia            # actualiza la base de conocimiento
npm run ingest:lia -- --force # recalcula todos los embeddings
npm run db:bootstrap          # recrea extensiones e índices de Postgres
```

**Volvé a correr `npm run ingest:lia` cada vez que cambie el contenido de una
página**, si no LIA sigue respondiendo con el texto viejo. La ingesta es
incremental: sólo recalcula los fragmentos cuyo texto cambió.

Después de un `prisma db push` conviene correr `npm run db:bootstrap`, porque
`db push` puede borrar los índices que no están declarados en el schema.

### Variables de entorno

| Variable | Para qué |
| --- | --- |
| `GEMINI_API_KEY` | Obligatoria. Sin ella el widget responde que no está configurado. |
| `GEMINI_CHAT_MODEL` | Opcional. Modelo de chat; por defecto `gemini-3.6-flash`. Ante un 503 por saturación se prueban modelos alternativos automáticamente. |

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
