"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar,
    Search,
    MessageSquare,
    Users,
    BarChart3,
    LogOut,
    Settings,
    ExternalLink,
    Filter,
    Stethoscope,
    Mail,
    Clock,
    CheckCircle2,
    X,
    AlertTriangle,
    Info,
    Building2,
    Upload,
    Send
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/admin/Sidebar";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function DerivacionesAdminPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [derivaciones, setDerivaciones] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // Cancellation state
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [cancelReason, setCancelReason] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin");
        }
    }, [status, router]);

    const fetchDerivaciones = async () => {
        setLoading(true);
        try {
            let url = "/api/admin/derivaciones";
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setDerivaciones(data);
            }
        } catch (error) {
            console.error("Error fetching derivaciones:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (session) {
            fetchDerivaciones();
        }
    }, [session]);

    const handleCancel = async () => {
        if (!selectedId || !cancelReason) return;
        setIsUpdating(true);
        try {
            const response = await fetch("/api/admin/derivaciones", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: selectedId,
                    status: "CANCELLED",
                    cancelReason
                }),
            });

            if (response.ok) {
                await fetchDerivaciones();
                setIsCancelModalOpen(false);
                setSelectedId(null);
                setCancelReason("");
            }
        } catch (error) {
            console.error("Error cancelling derivacion:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleComplete = async (id: string) => {
        setIsUpdating(true);
        try {
            const response = await fetch("/api/admin/derivaciones", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id,
                    status: "COMPLETED"
                }),
            });

            if (response.ok) {
                await fetchDerivaciones();
            }
        } catch (error) {
            console.error("Error completing derivacion:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center font-black uppercase tracking-widest text-primary-burgundy animate-pulse">
                Cargando Derivaciones...
            </div>
        );
    }

    if (!session) return null;

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />

            {/* Main Content */}
            <main className="flex-grow overflow-y-auto">
                <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
                    <div className="relative w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Buscar por paciente, lab o email..."
                            className="w-full bg-gray-50 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary-green outline-none text-black"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-gray-900">{session.user?.name}</p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Admin</p>
                            </div>
                            <div className="w-10 h-10 bg-primary-green rounded-full flex items-center justify-center text-white font-bold text-sm shadow-inner uppercase">
                                {session.user?.name?.substring(0, 2)}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-8 space-y-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Derivaciones</h1>
                            <p className="text-gray-500 text-sm font-medium">Gestión de muestras de laboratorios externos.</p>
                        </div>

                        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm transition-all focus-within:ring-2 focus-within:ring-primary-burgundy/20">
                            <div className="flex flex-col px-3">
                                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Desde</label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="text-xs font-bold text-gray-900 outline-none bg-transparent"
                                />
                            </div>
                            <div className="h-8 w-px bg-gray-100" />
                            <div className="flex flex-col px-3">
                                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Hasta</label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="text-xs font-bold text-gray-900 outline-none bg-transparent"
                                />
                            </div>
                            {(startDate || endDate) && (
                                <button
                                    onClick={() => {
                                        setStartDate("");
                                        setEndDate("");
                                    }}
                                    className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                                    title="Limpiar filtros"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden text-black">
                        <div className="overflow-x-auto text-black">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-100">
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Paciente</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Origen</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Fecha/Hora de Envío</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Análisis</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Estado</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={5} className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">
                                                <div className="flex flex-col items-center gap-4">
                                                    <div className="w-8 h-8 border-4 border-primary-burgundy border-t-transparent rounded-full animate-spin" />
                                                    Cargando derivaciones...
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (() => {
                                        const filtered = derivaciones.filter(d => {
                                            const q = searchQuery.toLowerCase();
                                            const matchesSearch = d.patient?.toLowerCase().includes(q) ||
                                                d.labName?.toLowerCase().includes(q) ||
                                                d.email?.toLowerCase().includes(q);

                                            const aptDate = new Date(d.date + "T00:00:00");
                                            let matchesDate = true;

                                            if (startDate) {
                                                const start = new Date(startDate + "T00:00:00");
                                                if (aptDate < start) matchesDate = false;
                                            }
                                            if (endDate) {
                                                const end = new Date(endDate + "T00:00:00");
                                                if (aptDate > end) matchesDate = false;
                                            }

                                            return matchesSearch && matchesDate;
                                        });

                                        if (filtered.length === 0) {
                                            return (
                                                <tr>
                                                    <td colSpan={5} className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs italic">
                                                        No se encontraron registros que coincidan con la búsqueda.
                                                    </td>
                                                </tr>
                                            );
                                        }

                                        return filtered.map((d) => (
                                            <motion.tr
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                key={d.id}
                                                className={`hover:bg-gray-50/50 transition-colors group ${d.status === 'CANCELLED' ? 'opacity-60' : ''}`}
                                            >
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs ${d.status === 'CANCELLED' ? 'bg-gray-200 text-gray-500' : 'bg-primary-burgundy/5 text-primary-burgundy'}`}>
                                                            {d.patient?.substring(0, 2).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className={`font-bold transition-colors ${d.status === 'CANCELLED' ? 'text-gray-400 line-through' : 'text-gray-900 group-hover:text-primary-burgundy'}`}>{d.patient}</p>
                                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">PACIENTE</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex flex-col gap-1">
                                                        <div className={`flex items-center gap-2 text-sm font-bold ${d.status === 'CANCELLED' ? 'text-gray-300' : 'text-gray-700'}`}>
                                                            <Building2 size={14} className="text-primary-green" />
                                                            {d.labName || "No especificado"}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                                                            <Mail size={12} />
                                                            {d.email}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex flex-col">
                                                        <div className={`flex items-center gap-2 font-bold text-sm ${d.status === 'CANCELLED' ? 'text-gray-300' : 'text-gray-800'}`}>
                                                            <Calendar size={14} className={d.status === 'CANCELLED' ? 'text-gray-300' : 'text-primary-burgundy'} />
                                                            {format(new Date(d.date + "T12:00:00"), "dd/MM/yyyy")}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 mt-1 uppercase">
                                                            <Clock size={12} />
                                                            {d.time === 'SOLICITUD' ? (
                                                                format(new Date(d.createdAt), "HH:mm")
                                                            ) : (
                                                                d.time
                                                            )} hs
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex flex-wrap gap-1">
                                                        {d.analysisType.map((type: string, i: number) => (
                                                            <span key={i} className="text-[9px] font-black uppercase tracking-tighter bg-gray-100 text-gray-500 px-2 py-0.5 rounded border border-gray-200">
                                                                {type}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <div className="flex flex-col items-end gap-2">
                                                        {d.status === 'CANCELLED' ? (
                                                            <div className="flex flex-col items-end gap-1">
                                                                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-red-50 text-red-500 px-4 py-1.5 rounded-full border border-red-100">
                                                                    <X size={10} />
                                                                    Cancelado
                                                                </span>
                                                                {d.cancelReason && (
                                                                    <div className="group/reason relative">
                                                                        <span className="text-[9px] text-gray-400 font-bold uppercase flex items-center gap-1 cursor-help hover:text-gray-600 transition-colors">
                                                                            <Info size={10} /> Ver Motivo
                                                                        </span>
                                                                        <div className="absolute right-0 bottom-full mb-2 w-48 bg-gray-900 text-white text-[10px] p-2 rounded-xl opacity-0 group-hover/reason:opacity-100 pointer-events-none transition-opacity shadow-xl z-20 font-medium">
                                                                            {d.cancelReason}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ) : d.status === 'COMPLETED' ? (
                                                            <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-gray-900 text-white px-4 py-1.5 rounded-full shadow-lg shadow-gray-200">
                                                                <CheckCircle2 size={10} className="text-primary-green" />
                                                                Completado
                                                            </span>
                                                        ) : (
                                                            <div className="flex items-center gap-2">
                                                                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-green-50 text-primary-green px-4 py-1.5 rounded-full border border-green-100">
                                                                    <CheckCircle2 size={10} />
                                                                    Programado
                                                                </span>
                                                                <div className="flex items-center gap-1">
                                                                    <button
                                                                        onClick={() => handleComplete(d.id)}
                                                                        disabled={isUpdating}
                                                                        className="p-2 text-gray-300 hover:text-primary-green hover:bg-green-50 rounded-xl transition-all"
                                                                        title="Marcar como Completado"
                                                                    >
                                                                        <CheckCircle2 size={18} />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => {
                                                                            setSelectedId(d.id);
                                                                            setIsCancelModalOpen(true);
                                                                        }}
                                                                        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                                        title="Anular Solicitud"
                                                                    >
                                                                        <X size={18} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ));
                                    })()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>

            {/* Cancel Modal */}
            <AnimatePresence>
                {isCancelModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCancelModalOpen(false)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden"
                        >
                            <div className="bg-red-500 p-8 text-center relative">
                                <button
                                    onClick={() => setIsCancelModalOpen(false)}
                                    className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                                <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 backdrop-blur-md">
                                    <AlertTriangle size={32} />
                                </div>
                                <h3 className="text-xl font-black text-white uppercase tracking-tight">Anular Derivación</h3>
                                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mt-1">Indique el motivo de la anulación</p>
                            </div>

                            <div className="p-8 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Motivo de Anulación</label>
                                    <textarea
                                        autoFocus
                                        value={cancelReason}
                                        onChange={(e) => setCancelReason(e.target.value)}
                                        placeholder="Ej: Muestra insuficiente, error en datos, cambio de fecha..."
                                        className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-red-500 outline-none text-black min-h-[120px] resize-none placeholder:font-normal"
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setIsCancelModalOpen(false)}
                                        className="flex-1 bg-gray-100 text-gray-400 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-all"
                                    >
                                        Descartar
                                    </button>
                                    <button
                                        disabled={isUpdating || !cancelReason}
                                        onClick={handleCancel}
                                        className="flex-[2] bg-red-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-red-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {isUpdating ? "Anulando..." : "Confirmar Anulación"}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
