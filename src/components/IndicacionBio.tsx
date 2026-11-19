import type { ReactNode } from "react";

/** Quita los `*` de negrita de WhatsApp. */
const limpiar = (t: string) => t.replace(/\*/g, "").trim();

/**
 * Dibuja el texto de una indicación de Bio (formato WhatsApp) con el mismo estilo de las indicaciones fijas:
 * `*Título*` → subtítulo, «• texto» / «– texto» → viñeta, otra línea → párrafo. La primera línea en negrita es el encabezado.
 */
export default function IndicacionBio({ contenido }: { contenido: string }) {
    const bloques: { titulo?: string; lineas: { tipo: "p" | "li"; texto: string }[] }[] = [];
    let actual: (typeof bloques)[number] = { lineas: [] };
    for (const cruda of contenido.replace(/\r/g, "").split("\n")) {
        const linea = cruda.trim();
        if (!linea) continue;
        const esTitulo = /^\*[^*].*\*$/.test(linea);
        if (esTitulo) {
            if (actual.titulo || actual.lineas.length) bloques.push(actual);
            actual = { titulo: limpiar(linea), lineas: [] };
        } else if (/^[•\-–·]\s*/.test(linea)) {
            actual.lineas.push({ tipo: "li", texto: limpiar(linea.replace(/^[•\-–·]\s*/, "")) });
        } else {
            actual.lineas.push({ tipo: "p", texto: limpiar(linea) });
        }
    }
    if (actual.titulo || actual.lineas.length) bloques.push(actual);

    const render = (lineas: (typeof bloques)[number]["lineas"], esIntro: boolean): ReactNode[] => {
        const out: ReactNode[] = [];
        let items: string[] = [];
        const volcar = (k: number) => {
            if (!items.length) return;
            out.push(
                <ul key={`ul${k}`} className="space-y-4 pl-4">
                    {items.map((t, i) => (
                        <li key={i} className="flex gap-3 text-sm text-gray-600 font-medium">
                            <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                            {t}
                        </li>
                    ))}
                </ul>
            );
            items = [];
        };
        lineas.forEach((l, k) => {
            if (l.tipo === "li") return void items.push(l.texto);
            volcar(k);
            out.push(
                <p key={`p${k}`} className={esIntro ? "text-sm text-gray-600 leading-relaxed font-medium border-l-4 border-primary-green pl-4" : "text-sm text-gray-600 leading-relaxed font-medium pl-4"}>
                    {l.texto}
                </p>
            );
        });
        volcar(lineas.length);
        return out;
    };

    return (
        <div className="space-y-10 text-gray-700">
            {bloques.map((b, i) => (
                <div key={i} className={i === 0 ? "space-y-4" : "space-y-6"}>
                    {b.titulo && (
                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">{b.titulo}</h4>
                    )}
                    {render(b.lineas, i === 0)}
                </div>
            ))}
        </div>
    );
}
