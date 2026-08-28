/**
 * Extractor de contenido del sitio.
 *
 * El contenido real de las páginas vive en el código JSX: los acordeones de
 * /indicaciones, /prp, /veterinaria y /derivaciones sólo se renderizan al
 * hacer clic, así que el HTML servido no los contiene. Por eso leemos las
 * fuentes en vez de crawlear el sitio.
 *
 * La salida es una lista de fragmentos ("chunks") con página, título,
 * encabezado de sección y texto plano, listos para tokenizar en Postgres.
 */

import { readFile } from "fs/promises";
import { createHash } from "crypto";
import { join } from "path";

/** Páginas públicas del sitio y los componentes que las forman. */
export const PAGES = [
    {
        page: "inicio",
        url: "/",
        title: "Inicio – LB Lab",
        files: [
            "src/components/Hero.tsx",
            "src/components/Services.tsx",
            "src/components/Process.tsx",
            "src/components/Technology.tsx",
            "src/components/Indications.tsx",
            "src/components/Veterinary.tsx",
            "src/components/Results.tsx",
            "src/components/Contact.tsx",
            "src/components/Footer.tsx",
        ],
    },
    { page: "quienes-somos", url: "/quienes-somos", title: "Quiénes somos", files: ["src/app/quienes-somos/page.tsx"] },
    { page: "servicios", url: "/servicios", title: "Servicios", files: ["src/app/servicios/page.tsx"] },
    { page: "indicaciones", url: "/indicaciones", title: "Indicaciones para estudios de laboratorio", files: ["src/app/indicaciones/page.tsx"] },
    { page: "resultados", url: "/resultados", title: "Resultados online", files: ["src/app/resultados/page.tsx"] },
    { page: "prp", url: "/prp", title: "PRP – Plasma Rico en Plaquetas", files: ["src/app/prp/page.tsx"] },
    { page: "veterinaria", url: "/veterinaria", title: "Laboratorio veterinario", files: ["src/app/veterinaria/page.tsx"] },
    { page: "derivaciones", url: "/derivaciones", title: "Derivaciones", files: ["src/app/derivaciones/page.tsx"] },
    { page: "contacto", url: "/contacto", title: "Contacto", files: ["src/app/contacto/page.tsx"] },
];

/**
 * Etiquetas que no cortan la oración: el texto que las rodea pertenece al
 * mismo párrafo. Sin esto, "Evite <strong>actividad física</strong> antes"
 * se guardaría como tres fragmentos sueltos.
 */
const INLINE_TAGS = new Set([
    "strong", "b", "em", "i", "u", "span", "a", "small", "mark",
    "code", "sup", "sub", "br", "abbr",
]);

/** Componentes que abren una sección con título propio (acordeones, tarjetas). */
const SECTION_TAG = /Accordion|Section|Card|Panel|Item/i;

/** Props cuyo valor es texto visible para el usuario. */
const TEXT_PROPS = new Set(["title", "label", "alt", "placeholder", "aria-label", "heading", "subtitle", "description"]);

/** Componentes de navegación/UI cuyo texto no aporta al conocimiento. */
const SKIP_TEXT = new Set([
    "INICIO", "QUIENES SOMOS", "QUIÉNES SOMOS", "INDICACIONES", "VETERINARIA",
    "CONTACTO", "SERVICIOS", "DERIVACIONES", "PRP", "UBICACIÓN", "RESULTADOS",
    "RESULTADOS ONLINE", "ACCESO PANEL", "MENU", "MENÚ", "CERRAR", "VOLVER",
]);

const ENTITIES = {
    "&nbsp;": " ", "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"',
    "&apos;": "'", "&#39;": "'", "&#x27;": "'", "&hellip;": "…", "&mdash;": "—", "&ndash;": "–",
};

function decodeEntities(s) {
    return s.replace(/&[a-zA-Z]+;|&#x?[0-9a-fA-F]+;/g, (m) => ENTITIES[m] ?? m);
}

/** Quita comentarios de bloque y de línea sin romper strings simples. */
export function stripComments(src) {
    return src
        .replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, " ") // {/* comentario JSX */}
        .replace(/\/\*[\s\S]*?\*\//g, " ")
        .replace(/^[ \t]*\/\/.*$/gm, " ");
}

/**
 * Avanza desde `i` (posición de `{`) hasta después de la llave que la cierra,
 * respetando strings y template literals.
 */
function skipBraces(src, i) {
    let depth = 0;
    while (i < src.length) {
        const c = src[i];
        if (c === '"' || c === "'" || c === "`") {
            i = skipString(src, i);
            continue;
        }
        if (c === "{") depth++;
        else if (c === "}") {
            depth--;
            if (depth === 0) return i + 1;
        }
        i++;
    }
    return i;
}

/** Avanza desde una comilla de apertura hasta después de la de cierre. */
function skipString(src, i) {
    const quote = src[i];
    i++;
    while (i < src.length) {
        if (src[i] === "\\") { i += 2; continue; }
        if (src[i] === quote) return i + 1;
        i++;
    }
    return i;
}

/**
 * Intenta parsear una etiqueta JSX que empieza en `src[i] === "<"`.
 * Devuelve null si no es una etiqueta (por ejemplo, un operador `<`).
 */
function parseTag(src, i) {
    const after = src[i + 1];
    if (after === undefined) return null;

    const isClosing = after === "/";
    let j = i + 1 + (isClosing ? 1 : 0);

    // Fragmento <> o </>
    if (src[j] === ">") {
        return { end: j + 1, name: "", isClosing, selfClosing: false, attrTexts: [] };
    }
    if (!/[A-Za-z_]/.test(src[j] ?? "")) return null;

    let name = "";
    while (j < src.length && /[A-Za-z0-9_.:-]/.test(src[j])) { name += src[j]; j++; }

    const attrTexts = [];
    let pendingProp = null;
    let lastSignificant = "";

    while (j < src.length) {
        const c = src[j];
        if (c === '"' || c === "'") {
            const start = j;
            j = skipString(src, j);
            if (pendingProp) {
                attrTexts.push({ prop: pendingProp, value: src.slice(start + 1, j - 1) });
                pendingProp = null;
            }
            lastSignificant = '"';
            continue;
        }
        if (c === "{") { j = skipBraces(src, j); pendingProp = null; lastSignificant = "}"; continue; }
        if (c === ">") {
            return { end: j + 1, name, isClosing, selfClosing: lastSignificant === "/", attrTexts };
        }
        if (/[A-Za-z_]/.test(c)) {
            let prop = "";
            while (j < src.length && /[A-Za-z0-9_-]/.test(src[j])) { prop += src[j]; j++; }
            // Sólo nos interesa si es `prop=` (con valor)
            let k = j;
            while (k < src.length && /\s/.test(src[k])) k++;
            pendingProp = src[k] === "=" && TEXT_PROPS.has(prop) ? prop : null;
            lastSignificant = "a";
            continue;
        }
        if (!/\s/.test(c)) lastSignificant = c;
        j++;
    }
    return null; // etiqueta sin cerrar
}

/**
 * ¿Este literal de string es texto para el usuario y no un detalle técnico?
 *
 * Hace falta porque parte del contenido vive en arrays mapeados a JSX
 * (`{["Ayuno previo de 8 horas", ...].map(...)}`), que quedarían fuera si sólo
 * mirásemos los nodos de texto. El filtro descarta rutas, URLs y listas de
 * clases de Tailwind, que son los otros strings frecuentes en esa posición.
 */
function looksLikeProse(s) {
    const t = s.trim();
    if (t.length < 20) return false;
    if (!/\S\s+\S+\s+\S/.test(t)) return false;          // al menos tres palabras
    if (/^[/#.@]/.test(t) || /^https?:\/\//.test(t)) return false;
    if (/[<>{}]|\$\{/.test(t)) return false;
    if (!/[aeiouáéíóúü]/i.test(t)) return false;

    const words = t.split(/\s+/);
    const classLike = words.filter((w) => /^[a-z0-9]+[:-][a-z0-9:[\]/._-]*$/.test(w)).length;
    return classLike / words.length <= 0.3;
}

/**
 * Identificadores que en este código van seguidos de un genérico de TypeScript
 * (`useState<string>`), no de una etiqueta JSX. La lista es explícita a
 * propósito: una regla más amplia — "rechazar si antes del `<` hay un
 * identificador" — también descartaría JSX legítimo como `texto<strong>` o
 * cualquier etiqueta de cierre pegada al texto, como `Atención</h3>`.
 */
const GENERIC_CALLERS = new Set([
    "useState", "useRef", "useMemo", "useCallback", "useReducer",
    "Array", "Record", "Promise", "Map", "Set", "FormEvent", "ChangeEvent",
]);

/**
 * Decide si un `<` abre una etiqueta JSX o es otra cosa (un genérico de
 * TypeScript, o un `<` de comparación).
 */
function isTagStart(src, i) {
    const next = src[i + 1];
    if (next === undefined) return false;
    if (!/[A-Za-z_/>]/.test(next)) return false;

    // Un genérico va pegado a su identificador, sin espacio de por medio.
    let k = i - 1;
    if (k >= 0 && /[A-Za-z0-9_$]/.test(src[k])) {
        let ident = "";
        while (k >= 0 && /[A-Za-z0-9_$]/.test(src[k])) { ident = src[k] + ident; k--; }
        if (GENERIC_CALLERS.has(ident)) return false;
    }
    return true;
}

/**
 * Recorre el archivo y emite un stream de eventos:
 *   { type: "section", value }  → nueva sección (título de acordeón)
 *   { type: "heading", value }  → encabezado h1–h4
 *   { type: "text", value }     → texto visible
 */
export function tokenizeJsx(src) {
    const events = [];
    let i = 0;
    let jsxDepth = 0;           // elementos JSX abiertos
    const exprStack = [];       // jsxDepth al abrir cada `{` dentro de JSX
    let headingDepth = 0;       // >0 mientras estamos dentro de un <h1>..<h4>
    let buffer = [];            // texto acumulado del encabezado actual
    let joinNext = false;       // el próximo texto continúa el párrafo anterior

    // Sólo hay texto visible si estamos dentro de un elemento JSX abierto
    // *después* de la llave más interna. Así el código JS de un
    // `{items.map(...)}` se ignora, pero el JSX que ese map devuelve no.
    const emitting = () => {
        const base = exprStack.length ? exprStack[exprStack.length - 1] : 0;
        return jsxDepth > base;
    };

    const flushHeading = () => {
        const value = buffer.join(" ").replace(/\s+/g, " ").trim();
        buffer = [];
        if (value) events.push({ type: "heading", value });
    };

    while (i < src.length) {
        const c = src[i];

        if (c === "<" && isTagStart(src, i)) {
            const tag = parseTag(src, i);
            if (tag) {
                const isHeading = /^h[1-4]$/i.test(tag.name);
                if (isHeading && !tag.selfClosing) {
                    if (tag.isClosing) {
                        headingDepth = Math.max(0, headingDepth - 1);
                        if (headingDepth === 0) flushHeading();
                    } else {
                        if (headingDepth === 0) buffer = [];
                        headingDepth++;
                    }
                }

                for (const { prop, value } of tag.attrTexts) {
                    const v = decodeEntities(value).replace(/\s+/g, " ").trim();
                    if (!v) continue;
                    if (prop === "title" && SECTION_TAG.test(tag.name)) {
                        events.push({ type: "section", value: v });
                    } else if (v.length > 1) {
                        events.push({ type: "text", value: v });
                    }
                }

                // Al cerrar el acordeón, su título deja de aplicar.
                if (tag.isClosing && SECTION_TAG.test(tag.name)) {
                    events.push({ type: "sectionEnd" });
                }

                joinNext = INLINE_TAGS.has(tag.name.toLowerCase());

                if (tag.isClosing) jsxDepth = Math.max(0, jsxDepth - 1);
                else if (!tag.selfClosing) jsxDepth++;

                i = tag.end;
                continue;
            }
        }

        if (!emitting()) {
            // Estamos en código JS: saltamos strings para que sus llaves y
            // signos `<` no confundan al recorrido. Si el string es prosa y
            // está dentro de una expresión JSX, lo guardamos: así entra el
            // contenido de los arrays que se mapean a listas.
            if (c === '"' || c === "'" || c === "`") {
                const start = i;
                i = skipString(src, i);
                if (exprStack.length > 0) {
                    const literal = decodeEntities(src.slice(start + 1, i - 1)).replace(/\s+/g, " ");
                    if (looksLikeProse(literal)) {
                        events.push({ type: "text", value: literal.trim() });
                    }
                }
                continue;
            }
            if (c === "{") { exprStack.push(jsxDepth); i++; continue; }
            if (c === "}") { exprStack.pop(); i++; continue; }
            i++;
            continue;
        }

        if (c === "{") { exprStack.push(jsxDepth); i++; continue; }

        let j = i;
        while (j < src.length && src[j] !== "<" && src[j] !== "{") j++;
        if (j === i) { i++; continue; }  // un `<` que no abre etiqueta: seguir
        const raw = decodeEntities(src.slice(i, j)).replace(/\s+/g, " ").trim();
        if (raw) {
            if (headingDepth > 0) {
                buffer.push(raw);
            } else {
                const last = events[events.length - 1];
                if (joinNext && last?.type === "text") last.value += " " + raw;
                else events.push({ type: "text", value: raw });
            }
        }
        i = j;
    }

    if (headingDepth > 0) flushHeading();
    return events;
}

/** Descarta ruido: navegación, fragmentos de código, símbolos sueltos. */
function isNoise(text) {
    const t = text.trim();
    if (t.length < 2) return true;
    if (!/[a-záéíóúñA-ZÁÉÍÓÚÑ]/.test(t)) return true;      // sin letras
    if (SKIP_TEXT.has(t.toUpperCase())) return true;
    if (/^[•·◦▪–—:;,.\-|/]+$/.test(t)) return true;
    if (/=>|className|useState|const\s|function\s|return\s|\)\s*;?$/.test(t)) return true;
    if (/^\d{4}\s+LB LAB/i.test(t)) return true;            // pie de página
    if (/^(Hecho con|itia\.ar|Acceso Panel)$/i.test(t)) return true;
    // Mensajes de validación y error de los formularios: son estados de la
    // interfaz, no información que el asistente deba responder.
    if (/^(error al |por favor (selecciona|complet|ingres|intenta)|no se pudo|hubo un error|su turno ya no)/i.test(t)) return true;
    return false;
}

/** Une el stream de eventos en secciones con encabezado. */
export function buildSections(events, pageTitle) {
    const sections = [];
    let section = null;              // título del acordeón abierto (p. ej. "UROCULTIVO")
    let current = { section: null, heading: null, lines: [] };

    const push = () => {
        const lines = current.lines.filter((l) => !isNoise(l));
        if (lines.length) sections.push({ ...current, lines });
    };

    for (const ev of events) {
        if (ev.type === "sectionEnd") {
            push();
            section = null;
            current = { section: null, heading: null, lines: [] };
            continue;
        }

        if (ev.type === "section") {
            push();
            section = ev.value.replace(/\s+/g, " ").trim();
            current = { section, heading: null, lines: [] };
            continue;
        }

        if (ev.type === "heading") {
            const heading = ev.value.replace(/\s+/g, " ").trim();
            // Un encabezado que repite el título de página no abre sección nueva
            if (heading.toLowerCase() === pageTitle.toLowerCase()) continue;
            push();
            // El subtítulo cuelga del acordeón que lo contiene, si hay uno.
            current = { section, heading, lines: [] };
            continue;
        }

        if (!isNoise(ev.value)) current.lines.push(ev.value);
    }
    push();
    return sections;
}

/** Junta líneas en párrafos y parte lo que exceda `maxChars`. */
function splitToChunks(lines, maxChars) {
    const chunks = [];
    let buf = [];
    let len = 0;
    for (const line of lines) {
        if (len + line.length + 1 > maxChars && buf.length) {
            chunks.push(buf.join("\n"));
            buf = [];
            len = 0;
        }
        buf.push(line);
        len += line.length + 1;
    }
    if (buf.length) chunks.push(buf.join("\n"));
    return chunks;
}

export function checksum(text) {
    return createHash("sha256").update(text).digest("hex").slice(0, 32);
}

/**
 * Extrae y fragmenta el contenido de todo el sitio.
 * @param {string} root Raíz del proyecto.
 * @param {{maxChars?: number}} [opts]
 */
export async function extractSite(root, opts = {}) {
    const maxChars = opts.maxChars ?? 1400;
    const out = [];

    for (const page of PAGES) {
        const sections = [];
        for (const file of page.files) {
            let src;
            try {
                src = await readFile(join(root, file), "utf8");
            } catch {
                console.warn(`  ! no se pudo leer ${file}, se omite`);
                continue;
            }
            sections.push(...buildSections(tokenizeJsx(stripComments(src)), page.title));
        }

        let position = 0;
        for (const section of sections) {
            // El encabezado lleva el camino completo para que el fragmento se
            // entienda solo: "Indicaciones — UROCULTIVO — Preparación previa".
            const path = [page.title, section.section, section.heading].filter(Boolean);
            const header = path.join(" — ");
            const heading = [section.section, section.heading].filter(Boolean).join(" — ") || null;

            for (const body of splitToChunks(section.lines, maxChars)) {
                const content = `${header}\n${body}`;
                out.push({
                    page: page.page,
                    url: page.url,
                    pageTitle: page.title,
                    heading,
                    content,
                    chars: content.length,
                    position: position++,
                    checksum: checksum(content),
                });
            }
        }
    }

    return out;
}
