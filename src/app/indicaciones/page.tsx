import { getIndicacionesDeBio } from "@/lib/bio-indicaciones";
import IndicacionesClient from "./IndicacionesClient";

// Las indicaciones que la sede publica en Bio se renuevan solas cada 5 minutos, sin volver a desplegar la web.
export const revalidate = 300;

export default async function IndicacionesPage() {
    const deBio = await getIndicacionesDeBio();
    return <IndicacionesClient deBio={deBio} />;
}
