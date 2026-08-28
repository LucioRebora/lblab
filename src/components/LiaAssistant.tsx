"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Send, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Source = { url: string; pageTitle: string; heading: string | null };

type Message = {
    role: "user" | "model";
    text: string;
    sources?: Source[];
};

const SALUDO =
    "¡Hola! Soy LIA, la asistente de LB Lab. Puedo ayudarte con la preparación de los estudios, horarios, ubicación y cómo retirar resultados. ¿Qué necesitás saber?";

const SUGERENCIAS = [
    "¿Cuántas horas de ayuno necesito?",
    "¿Cómo recolecto una muestra de orina?",
    "¿Cuáles son los horarios de extracción?",
];

/** Parsea el stream SSE del endpoint y va entregando los eventos. */
async function* readEvents(response: Response) {
    const reader = response.body?.getReader();
    if (!reader) return;

    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const blocks = buffer.split("\n\n");
        buffer = blocks.pop() ?? "";

        for (const block of blocks) {
            const event = block.match(/^event: (.+)$/m)?.[1];
            const data = block.match(/^data: (.+)$/m)?.[1];
            if (!event || !data) continue;
            try {
                yield { event, data: JSON.parse(data) };
            } catch {
                // Un bloque incompleto se descarta: el siguiente trae el resto.
            }
        }
    }
}

/**
 * Renderiza el subconjunto de Markdown que usa el modelo: **negrita** y viñetas.
 * No usamos una librería ni `dangerouslySetInnerHTML`: al construir los nodos
 * con React, el texto que llega del modelo queda escapado por defecto.
 */
function RichText({ text }: { text: string }) {
    const lines = text.split("\n");

    return (
        <>
            {lines.map((line, i) => {
                const bullet = /^\s*[*-]\s+(.*)$/.exec(line);
                const body = bullet ? bullet[1] : line;

                const parts = body.split(/\*\*(.+?)\*\*/g).map((part, k) =>
                    k % 2 === 1 ? <strong key={k} className="font-bold text-gray-900">{part}</strong> : part,
                );

                if (bullet) {
                    return (
                        <span key={i} className="flex gap-2 pl-1">
                            <span aria-hidden className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-primary-green" />
                            <span>{parts}</span>
                        </span>
                    );
                }
                if (!line.trim()) return <span key={i} className="block h-2" />;
                return <span key={i} className="block">{parts}</span>;
            })}
        </>
    );
}

export default function LiaAssistant() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [busy, setBusy] = useState(false);
    const [messages, setMessages] = useState<Message[]>([{ role: "model", text: SALUDO }]);

    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, [messages, open]);

    useEffect(() => {
        if (open) inputRef.current?.focus();
    }, [open]);

    // Cerrar con Escape
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    if (pathname?.startsWith("/admin")) return null;

    async function send(question: string) {
        const text = question.trim();
        if (!text || busy) return;

        // El historial que se manda es el previo a este turno.
        const history = messages
            .filter((m) => m.text !== SALUDO)
            .map((m) => ({ role: m.role, text: m.text }));

        setMessages((prev) => [...prev, { role: "user", text }, { role: "model", text: "" }]);
        setInput("");
        setBusy(true);

        try {
            const res = await fetch("/api/lia", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: text, history }),
            });

            if (!res.ok) {
                const { error } = await res.json().catch(() => ({ error: null }));
                throw new Error(error ?? "No pudimos responder tu consulta.");
            }

            for await (const { event, data } of readEvents(res)) {
                if (event === "sources") {
                    setMessages((prev) => {
                        const next = [...prev];
                        next[next.length - 1] = { ...next[next.length - 1], sources: data as Source[] };
                        return next;
                    });
                } else if (event === "delta") {
                    setMessages((prev) => {
                        const next = [...prev];
                        const last = next[next.length - 1];
                        next[next.length - 1] = { ...last, text: last.text + (data as string) };
                        return next;
                    });
                } else if (event === "error") {
                    throw new Error(data as string);
                }
            }
        } catch (error) {
            const detalle = error instanceof Error ? error.message : "Ocurrió un problema.";
            setMessages((prev) => {
                const next = [...prev];
                next[next.length - 1] = { role: "model", text: detalle };
                return next;
            });
        } finally {
            setBusy(false);
            inputRef.current?.focus();
        }
    }

    const ultimo = messages[messages.length - 1];
    const esperando = busy && ultimo?.role === "model" && !ultimo.text;

    return (
        <>
            {/* Botón flotante con avatar de LIA – reemplaza al ícono de WhatsApp */}
            <motion.button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Cerrar el chat con LIA" : "Abrir el chat con LIA"}
                aria-expanded={open}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -6, 0],
                }}
                transition={{
                    opacity: { duration: 0.5 },
                    scale: { duration: 0.5 },
                    y: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    },
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-8 right-8 z-50 flex h-[68px] w-[68px] items-center justify-center"
            >
                {!open && (
                    <span className="absolute inset-0 rounded-full bg-primary-green animate-ping opacity-20" />
                )}
                <AnimatePresence mode="wait" initial={false}>
                    {open ? (
                        <motion.span
                            key="x"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-primary-green text-white shadow-2xl shadow-primary-green/30"
                        >
                            <X size={26} strokeWidth={2.5} />
                        </motion.span>
                    ) : (
                        <motion.span
                            key="avatar"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="relative"
                        >
                            <Image
                                src="/img/lia.jpg"
                                alt="LIA – Asistente de LB Lab"
                                width={68}
                                height={68}
                                className="rounded-full shadow-2xl shadow-primary-green/30 ring-2 ring-white"
                            />
                            <span className="absolute -right-1 -top-1 rounded-full bg-primary-burgundy px-2 py-0.5 text-[10px] font-black tracking-widest text-white">
                                LIA
                            </span>
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        role="dialog"
                        aria-label="Chat con LIA"
                        initial={{ opacity: 0, y: 24, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 24, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="fixed bottom-28 left-4 right-4 z-50 flex max-h-[70vh] flex-col overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-2xl sm:left-auto sm:right-8 sm:w-[26rem]"
                    >
                        <header className="flex items-center gap-3 bg-primary-green px-6 py-5 text-white">
                            <div className="overflow-hidden rounded-2xl bg-white/15">
                                <Image
                                    src="/img/lia.jpg"
                                    alt="LIA"
                                    width={36}
                                    height={36}
                                    className="rounded-2xl"
                                />
                            </div>
                            <div className="leading-tight">
                                <p className="font-heading text-sm font-black uppercase tracking-[0.2em]">LIA</p>
                                <p className="text-[11px] font-medium text-white/70">Asistente de LB Lab</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                aria-label="Cerrar"
                                className="ml-auto rounded-xl p-2 transition-colors hover:bg-white/10"
                            >
                                <X size={18} strokeWidth={2.5} />
                            </button>
                        </header>

                        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto bg-sage-bg/30 px-5 py-5">
                            {messages.map((m, i) => (
                                <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                                    <div
                                        className={
                                            m.role === "user"
                                                ? "max-w-[85%] rounded-2xl rounded-br-md bg-primary-green px-4 py-3 text-sm font-medium text-white"
                                                : "max-w-[90%] rounded-2xl rounded-bl-md border border-gray-100 bg-white px-4 py-3 text-sm text-gray-700 shadow-sm"
                                        }
                                    >
                                        <div className="flex flex-col gap-1 leading-relaxed">
                                            {m.role === "model"
                                                ? <RichText text={m.text} />
                                                : <span className="whitespace-pre-wrap">{m.text}</span>}
                                        </div>

                                        {m.role === "model" && m.text && m.sources && m.sources.length > 0 && (
                                            <div className="mt-3 flex flex-wrap gap-1.5 border-t border-gray-100 pt-2.5">
                                                {[...new Map(m.sources.map((s) => [s.url, s])).values()]
                                                    .slice(0, 3)
                                                    .map((s) => (
                                                        <a
                                                            key={s.url}
                                                            href={s.url}
                                                            className="rounded-full bg-sage-bg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-green transition-colors hover:bg-primary-green hover:text-white"
                                                        >
                                                            {s.pageTitle}
                                                        </a>
                                                    ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {esperando && (
                                <div className="flex justify-start">
                                    <div className="flex gap-1.5 rounded-2xl rounded-bl-md border border-gray-100 bg-white px-4 py-4 shadow-sm">
                                        {[0, 1, 2].map((i) => (
                                            <motion.span
                                                key={i}
                                                className="h-1.5 w-1.5 rounded-full bg-primary-green"
                                                animate={{ opacity: [0.3, 1, 0.3] }}
                                                transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {messages.length === 1 && (
                                <div className="flex flex-wrap gap-2 pt-1">
                                    {SUGERENCIAS.map((s) => (
                                        <button
                                            key={s}
                                            type="button"
                                            onClick={() => send(s)}
                                            className="rounded-full border border-primary-green/20 bg-white px-3 py-1.5 text-xs font-medium text-primary-green transition-colors hover:bg-primary-green hover:text-white"
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <form
                            onSubmit={(e) => { e.preventDefault(); send(input); }}
                            className="flex items-center gap-2 border-t border-gray-100 bg-white px-4 py-3"
                        >
                            <input
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                maxLength={800}
                                placeholder="Escribí tu consulta…"
                                aria-label="Tu consulta para LIA"
                                className="flex-1 rounded-xl bg-sage-bg/50 px-4 py-3 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-primary-green/30"
                            />
                            <button
                                type="submit"
                                disabled={busy || !input.trim()}
                                aria-label="Enviar"
                                className="rounded-xl bg-primary-green p-3 text-white transition-opacity disabled:opacity-40"
                            >
                                <Send size={16} strokeWidth={2.5} />
                            </button>
                        </form>

                        <p className="bg-white px-5 pb-3 text-center text-[10px] leading-tight text-gray-400">
                            LIA responde con información del sitio. No interpreta resultados ni reemplaza a tu médico.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
