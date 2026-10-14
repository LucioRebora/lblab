"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import { Link2, Lock, CheckCircle2, Save, Trash2 } from "lucide-react";

export default function IntegracionBioPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [token, setToken] = useState("");
    const [url, setUrl] = useState("");
    const [configurado, setConfigurado] = useState(false);
    const [enmascarado, setEnmascarado] = useState<string | null>(null);
    const [guardando, setGuardando] = useState(false);
    const [mensaje, setMensaje] = useState<{ ok: boolean; texto: string } | null>(null);

    useEffect(() => {
        if (status === "unauthenticated" || (status === "authenticated" && session?.user?.role !== "ADMIN")) {
            router.push("/admin");
        }
    }, [status, session, router]);

    const cargar = async () => {
        const res = await fetch("/api/admin/integracion-bio");
        if (!res.ok) return;
        const data = await res.json();
        setConfigurado(data.configured);
        setEnmascarado(data.token);
        setUrl(data.url || "");
    };

    useEffect(() => {
        if (session?.user?.role === "ADMIN") cargar();
    }, [session]);

    const guardar = async (e: React.FormEvent) => {
        e.preventDefault();
        setGuardando(true);
        setMensaje(null);
        try {
            const res = await fetch("/api/admin/integracion-bio", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, url }),
            });
            const data = await res.json();
            if (res.ok) {
                setToken("");
                setMensaje({ ok: true, texto: "Vinculación guardada." });
                await cargar();
            } else {
                setMensaje({ ok: false, texto: data.error || "No se pudo guardar." });
            }
        } catch {
            setMensaje({ ok: false, texto: "Error de conexión." });
        } finally {
            setGuardando(false);
        }
    };

    const desvincular = async () => {
        if (!confirm("¿Desvincular la web de Bio? Los turnos dejarán de enviarse al LIS.")) return;
        const res = await fetch("/api/admin/integracion-bio", { method: "DELETE" });
        if (res.ok) {
            setMensaje({ ok: true, texto: "Web desvinculada de Bio." });
            await cargar();
        }
    };

    const reenviar = async () => {
        setMensaje(null);
        const res = await fetch("/api/admin/integracion-bio/reenviar", { method: "POST" });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            setMensaje({ ok: false, texto: data.error || "No se pudo reenviar." });
        } else if (data.fallidos > 0) {
            setMensaje({ ok: false, texto: `No se pudieron enviar los turnos: ${data.motivo || "error desconocido"}.` });
        } else {
            setMensaje({ ok: true, texto: `Se enviaron ${data.enviados} turno(s) a Bio.` });
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 p-6 lg:p-10 max-w-3xl">
                <h1 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2 mb-2">
                    <Link2 className="text-primary-green" /> Vinculación con Bio
                </h1>
                <p className="text-sm text-gray-500 mb-8">
                    Pegá acá el token que generaste en Bio → Integradores → Página Web. Con eso la web envía los turnos PRP al LIS
                    y lee las indicaciones. No hace falta tocar ningún archivo del servidor.
                </p>

                <form onSubmit={guardar} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-600 flex items-center gap-2">
                            <Lock size={14} /> Token de Bio
                        </label>
                        <input
                            type="password"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            placeholder={configurado ? "Dejalo vacío para conservar el actual" : "bio_web_..."}
                            autoComplete="off"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-mono"
                        />
                        {configurado && (
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                                <CheckCircle2 size={13} className="text-green-600" /> Token guardado ({enmascarado}).
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-600">Dirección de Bio (LIS)</label>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://lab.itia.ar/lis"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm"
                        />
                    </div>

                    {mensaje && (
                        <p className={`text-sm font-semibold ${mensaje.ok ? "text-green-700" : "text-red-600"}`}>{mensaje.texto}</p>
                    )}

                    <div className="flex items-center gap-3">
                        <button
                            type="submit"
                            disabled={guardando}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-green text-white text-xs font-black uppercase tracking-widest disabled:opacity-60"
                        >
                            <Save size={16} /> {guardando ? "Guardando..." : "Guardar"}
                        </button>
                        {configurado && (
                            <button
                                type="button"
                                onClick={reenviar}
                                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 text-gray-700 text-xs font-bold uppercase tracking-widest"
                            >
                                Reenviar turnos PRP
                            </button>
                        )}
                        {configurado && (
                            <button
                                type="button"
                                onClick={desvincular}
                                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-red-200 text-red-600 text-xs font-bold uppercase tracking-widest"
                            >
                                <Trash2 size={16} /> Desvincular
                            </button>
                        )}
                    </div>
                </form>
            </main>
        </div>
    );
}
