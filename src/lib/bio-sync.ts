import { getBioIntegration } from "@/lib/bio-integration";

export interface TurnoPrpParaBio {
    id: string;
    email: string;
    professional?: string | null;
    patient: string;
    date: string;
    time: string;
    preparation: string[];
    status: string;
    cancelReason?: string | null;
}

/**
 * Empuja un turno PRP al LIS de Bio. Nunca tira: si Bio no está vinculado o no responde, el turno ya quedó
 * guardado en la web y se puede reenviar desde Vinculación con Bio (el envío es idempotente por `id`).
 */
export async function enviarTurnoPrpABio(turno: TurnoPrpParaBio): Promise<{ ok: boolean; motivo?: string }> {
    try {
        const { token, url } = await getBioIntegration();
        if (!token) return { ok: false, motivo: "La web no está vinculada con Bio." };

        const res = await fetch(`${url}/api/web/prp-turnos`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-api-key": token },
            body: JSON.stringify(turno),
            signal: AbortSignal.timeout(8000),
        });
        if (!res.ok) {
            const detalle = await res.text().catch(() => "");
            console.error("[bio-sync] Bio rechazó el turno:", res.status, detalle.slice(0, 200));
            return { ok: false, motivo: `Bio respondió ${res.status}` };
        }
        return { ok: true };
    } catch (error) {
        console.error("[bio-sync] No se pudo enviar el turno a Bio:", error);
        return { ok: false, motivo: "No se pudo conectar con Bio." };
    }
}
