import prisma from "@/lib/prisma";

/** Claves de `GlobalConfig` que guardan la vinculación con Bio. El token nunca se expone por la API pública de config. */
export const BIO_TOKEN_KEY = "BIO_API_TOKEN";
export const BIO_URL_KEY = "BIO_API_URL";
export const CLAVES_SECRETAS = [BIO_TOKEN_KEY];

export const BIO_URL_POR_DEFECTO = "https://lab.itia.ar/lis";

export async function getBioIntegration(): Promise<{ token: string | null; url: string }> {
    const filas = await prisma.globalConfig.findMany({ where: { key: { in: [BIO_TOKEN_KEY, BIO_URL_KEY] } } });
    const token = filas.find((f) => f.key === BIO_TOKEN_KEY)?.value?.trim() || null;
    const url = filas.find((f) => f.key === BIO_URL_KEY)?.value?.trim() || BIO_URL_POR_DEFECTO;
    return { token, url: url.replace(/\/+$/, "") };
}
