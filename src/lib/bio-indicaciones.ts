import { getBioIntegration } from "@/lib/bio-integration";

export type IndicacionBio = { id: string; titulo: string; contenido: string };

/** Normaliza un título para compararlo: mayúsculas, sin tildes ni puntuación («ORINA DE 24 HS.» == «Orina de 24 hs»). */
export function clavePorTitulo(titulo: string): string {
    return titulo
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .toUpperCase()
        .replace(/[^A-Z0-9]+/g, " ")
        .trim();
}

/**
 * Indicaciones que la sede publicó en Bio («Publicar en la web»). Usa la misma vinculación que los turnos de PRP.
 * Nunca rompe la página: sin vinculación, sin conexión o con error devuelve [] y la web muestra las indicaciones fijas.
 */
export async function getIndicacionesDeBio(): Promise<IndicacionBio[]> {
    try {
        const { token, url } = await getBioIntegration();
        if (!token) return [];
        const res = await fetch(`${url}/api/web/indicaciones`, {
            headers: { "x-api-key": token },
            next: { revalidate: 300 },
            signal: AbortSignal.timeout(5000),
        });
        if (!res.ok) return [];
        const data = await res.json();
        if (!data?.ok || !Array.isArray(data.indicaciones)) return [];
        return data.indicaciones
            .filter((i: any) => i && typeof i.titulo === "string" && typeof i.contenido === "string" && i.contenido.trim())
            .map((i: any) => ({ id: String(i.id), titulo: i.titulo.trim(), contenido: i.contenido }));
    } catch {
        return [];
    }
}
