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
    Send,
    Eye,
    Save, // Add Save
    Edit2 // Add Edit2
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/admin/Sidebar";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function DerivacionesAdminPage() {
    const { data: session, status } = useSession();
    const isAdminOrSecretary = session?.user?.role === 'ADMIN' || session?.user?.role === 'SECRETARY';
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

    // View/Edit state
    const [viewModalData, setViewModalData] = useState<any | null>(null);
    const [editProtocolo, setEditProtocolo] = useState("");
    const [editProtocoloExterno, setEditProtocoloExterno] = useState("");
    const [editStatus, setEditStatus] = useState("");
    const [editPrecio, setEditPrecio] = useState<string | number>("");

    const handleSaveDetails = async () => {
        if (!viewModalData) return;
        setIsUpdating(true);
        try {
            const response = await fetch("/api/admin/derivaciones", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: viewModalData.id,
                    protocolo: editProtocolo,
                    protocoloExterno: editProtocoloExterno,
                    status: editStatus,
                    precio: editPrecio ? parseFloat(editPrecio.toString()) : null
                }),
            });

            if (response.ok) {
                await fetchDerivaciones();
                setViewModalData(null);
            } else {
                alert("Error al guardar los detalles.");
            }
        } catch (error) {
            console.error("Error updating details:", error);
        } finally {
            setIsUpdating(false);
        }
    };
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
                    status: "ANULADO",
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
                    status: "FINALIZADO"
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
                                        <th className="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-wider">Paciente</th>
                                        <th className="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-wider">Protocolo LBLab</th>
                                        <th className="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-wider">Protocolo Externo</th>
                                        <th className="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-wider">Precio</th>
                                        <th className="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-wider">Origen</th>
                                        <th className="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-wider">Fecha/Hora de Envío</th>
                                        <th className="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-wider">Análisis</th>
                                        <th className="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-wider text-right">Estado</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={8} className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">
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
                                                d.email?.toLowerCase().includes(q) ||
                                                (d.protocolo && d.protocolo.toLowerCase().includes(q)) ||
                                                (d.protocoloExterno && d.protocoloExterno.toLowerCase().includes(q));

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
                                                    <td colSpan={8} className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs italic">
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
                                                className={`hover:bg-gray-50/50 transition-colors group ${(d.status === 'CANCELLED' || d.status === 'ANULADO') ? 'opacity-60' : ''}`}
                                            >
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs ${(d.status === 'CANCELLED' || d.status === 'ANULADO') ? 'bg-gray-200 text-gray-500' : 'bg-primary-burgundy/5 text-primary-burgundy'}`}>
                                                            {d.patient?.substring(0, 2).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className={`font-bold transition-colors ${(d.status === 'CANCELLED' || d.status === 'ANULADO') ? 'text-gray-400 line-through' : 'text-gray-900 group-hover:text-primary-burgundy'}`}>{d.patient}</p>
                                                            <div className="flex flex-col gap-0.5 mt-0.5">
                                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">PACIENTE</p>
                                                                {d.observaciones && (
                                                                    <p className="text-[9px] font-bold text-primary-burgundy/60 italic overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px]">
                                                                        Obs: {d.observaciones}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="flex flex-col gap-1">
                                                        <span className={`font-black text-sm ${(d.status === 'CANCELLED' || d.status === 'ANULADO') ? 'text-gray-300' : 'text-gray-900'}`}>
                                                            {d.protocolo || "-"}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="flex flex-col gap-1">
                                                        <span className={`font-black text-sm ${(d.status === 'CANCELLED' || d.status === 'ANULADO') ? 'text-gray-300' : 'text-gray-900'}`}>
                                                            {d.protocoloExterno || "-"}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="flex flex-col gap-1">
                                                        <span className={`font-black text-sm ${(d.status === 'CANCELLED' || d.status === 'ANULADO') ? 'text-gray-300' : 'text-primary-green'}`}>
                                                            {d.precio ? `$${d.precio.toLocaleString()}` : "-"}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="flex flex-col gap-1">
                                                        <div className={`flex items-center gap-2 text-sm font-bold ${(d.status === 'CANCELLED' || d.status === 'ANULADO') ? 'text-gray-300' : 'text-gray-700'}`}>
                                                            <Building2 size={14} className="text-primary-green" />
                                                            {d.labName || "No especificado"}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                                                            <Mail size={12} />
                                                            {d.email}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="flex flex-col">
                                                        <div className={`flex items-center gap-2 font-bold text-sm ${(d.status === 'CANCELLED' || d.status === 'ANULADO') ? 'text-gray-300' : 'text-gray-800'}`}>
                                                            <Calendar size={14} className={(d.status === 'CANCELLED' || d.status === 'ANULADO') ? 'text-gray-300' : 'text-primary-burgundy'} />
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
                                                <td className="px-4 py-4">
                                                    <div className="flex flex-wrap gap-1">
                                                        {d.analysisType.map((type: string, i: number) => (
                                                            <span key={i} className="text-[9px] font-black uppercase tracking-tighter bg-gray-100 text-gray-500 px-2 py-0.5 rounded border border-gray-200">
                                                                {type}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-right">
                                                    <div className="flex flex-col items-end gap-2">
                                                        <div className="flex items-center justify-end gap-2 w-full">
                                                            {(d.status === 'CANCELLED' || d.status === 'ANULADO') && (
                                                                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-red-50 text-red-500 px-4 py-1.5 rounded-full border border-red-100 whitespace-nowrap">
                                                                    <X size={10} />
                                                                    Anulado
                                                                </span>
                                                            )}
                                                            {(d.status === 'COMPLETED' || d.status === 'FINALIZADO') && (
                                                                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-orange-50 text-orange-500 px-4 py-1.5 rounded-full border border-orange-100 whitespace-nowrap">
                                                                    <CheckCircle2 size={10} />
                                                                    Finalizado
                                                                </span>
                                                            )}
                                                            {(d.status === 'RECEIVED' || d.status === 'EN_PROCESO') && (
                                                                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-green-50 text-primary-green px-4 py-1.5 rounded-full border border-green-100 whitespace-nowrap">
                                                                    <CheckCircle2 size={10} />
                                                                    En Proceso
                                                                </span>
                                                            )}
                                                            {(d.status === 'SCHEDULED' || d.status === 'PENDING' || d.status === 'PENDIENTE' || (!['COMPLETED', 'FINALIZADO', 'RECEIVED', 'EN_PROCESO', 'CANCELLED', 'ANULADO'].includes(d.status))) && (
                                                                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-blue-50 text-blue-500 px-4 py-1.5 rounded-full border border-blue-100 whitespace-nowrap">
                                                                    <CheckCircle2 size={10} />
                                                                    Pendiente
                                                                </span>
                                                            )}
                                                            <div className="flex items-center gap-1 ml-2">
                                                                <button
                                                                    onClick={() => {
                                                                        setViewModalData(d);
                                                                        setEditProtocolo(d.protocolo || "");
                                                                        setEditProtocoloExterno(d.protocoloExterno || "");
                                                                        setEditStatus(d.status);
                                                                        setEditPrecio(d.precio || "");
                                                                    }}
                                                                    className="p-2 text-gray-300 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                                                                    title="Ver/Editar Detalles"
                                                                >
                                                                    <Eye size={18} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        {(d.status === 'CANCELLED' || d.status === 'ANULADO') && d.cancelReason && (
                                                            <div className="group/reason relative mt-1">
                                                                <span className="text-[9px] text-gray-400 font-bold uppercase flex items-center gap-1 cursor-help hover:text-gray-600 transition-colors">
                                                                    <Info size={10} /> Ver Motivo
                                                                </span>
                                                                <div className="absolute right-0 bottom-full mb-2 w-48 bg-gray-900 text-white text-[10px] p-2 rounded-xl opacity-0 group-hover/reason:opacity-100 pointer-events-none transition-opacity shadow-xl z-20 font-medium text-left">
                                                                    {d.cancelReason}
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

                {/* View Details Modal */}
                {viewModalData && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setViewModalData(null)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            <div className="bg-primary-burgundy p-8 text-center relative flex-shrink-0">
                                <button
                                    onClick={() => setViewModalData(null)}
                                    className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2"
                                >
                                    <X size={20} />
                                </button>
                                <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 backdrop-blur-md">
                                    <Eye size={32} />
                                </div>
                                <h3 className="text-xl font-black text-white uppercase tracking-tight">Detalles de la Derivación</h3>
                                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mt-1">
                                    Enviado el {format(new Date(viewModalData.createdAt), "dd/MM/yyyy HH:mm")} hs
                                </p>
                            </div>

                            <div className="p-8 overflow-y-auto space-y-6 text-left">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 outline-none">Origen</p>
                                            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 min-h-[70px] flex flex-col justify-center">
                                                <p className="font-black text-gray-900 text-sm uppercase">{viewModalData.labName}</p>
                                                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 mt-2 lowercase">
                                                    <Mail size={12} />
                                                    {viewModalData.email}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 outline-none">Paciente</p>
                                            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 min-h-[70px] flex items-center">
                                                <p className="font-bold text-gray-800 text-sm uppercase">{viewModalData.patient}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-4 gap-6 pt-2">
                                    <div>
                                        <p className="text-[10px] font-black text-primary-burgundy uppercase tracking-widest mb-1 outline-none">Protocolo LBLab</p>
                                        <input
                                            type="text"
                                            maxLength={12}
                                            placeholder="N° Protocolo"
                                            value={editProtocolo}
                                            onChange={(e) => setEditProtocolo(e.target.value.replace(/[^0-9]/g, ''))}
                                            readOnly={!isAdminOrSecretary}
                                            className={`w-full bg-white border border-gray-200 rounded-2xl py-3 px-4 outline-none transition-all text-sm font-black text-gray-900 placeholder:text-gray-300 shadow-inner ${!isAdminOrSecretary ? 'opacity-70 cursor-not-allowed' : 'focus:ring-2 focus:ring-primary-burgundy'}`}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 outline-none">Protocolo Externo</p>
                                        <div className="bg-gray-50 border border-gray-100 rounded-2xl py-3 px-4 text-sm font-black text-gray-400 shadow-inner">
                                            {editProtocoloExterno || "-"}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 outline-none">Precio</p>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                                            <input
                                                type="number"
                                                placeholder="0.00"
                                                value={editPrecio}
                                                onChange={(e) => setEditPrecio(e.target.value)}
                                                readOnly={!isAdminOrSecretary}
                                                className={`w-full bg-white border border-gray-200 rounded-2xl py-3 pl-8 pr-4 outline-none transition-all text-sm font-black text-gray-900 placeholder:text-gray-300 shadow-inner ${!isAdminOrSecretary ? 'opacity-70 cursor-not-allowed' : 'focus:ring-2 focus:ring-primary-burgundy'}`}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 outline-none">Estado Solicitud</p>
                                        <select
                                            value={editStatus}
                                            onChange={(e) => setEditStatus(e.target.value)}
                                            disabled={!isAdminOrSecretary}
                                            className={`w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 px-4 outline-none transition-all text-sm font-black text-gray-900 cursor-pointer ${!isAdminOrSecretary ? 'opacity-70 cursor-not-allowed' : 'focus:ring-2 focus:ring-primary-green'}`}
                                        >
                                            <option value="PENDIENTE">Pendiente</option>
                                            <option value="EN_PROCESO">En Proceso</option>
                                            <option value="FINALIZADO">Finalizado</option>
                                            <option value="ANULADO">Anulado</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 outline-none">Observaciones</p>
                                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 min-h-[60px] flex items-center">
                                        <p className="font-medium text-gray-600 text-xs italic">{viewModalData.observaciones || "Sin observaciones específicas"}</p>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 outline-none">Análisis Solicitados</p>
                                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                        <div className="flex flex-wrap gap-2">
                                            {viewModalData.analysisType?.map((type: string, i: number) => (
                                                <span key={i} className="text-[10px] font-black uppercase tracking-tighter bg-white text-primary-burgundy shadow-sm px-3 py-1.5 rounded-lg border border-gray-100">
                                                    {type}
                                                </span>
                                            ))}
                                            {(!viewModalData.analysisType || viewModalData.analysisType.length === 0) && (
                                                <span className="text-xs font-bold text-gray-500 italic">No se especificaron análisis.</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {viewModalData.cancelReason && (editStatus === "CANCELLED" || editStatus === "ANULADO") && (
                                    <div className="mt-4 p-4 rounded-2xl border border-red-100 bg-red-50">
                                        <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <AlertTriangle size={12} />
                                            Motivo de Anulación
                                        </p>
                                        <p className="font-bold text-red-600 text-sm italic">{viewModalData.cancelReason}</p>
                                    </div>
                                )}

                                <div className="pt-6 border-t border-gray-100 flex justify-end gap-4 mt-8">
                                    <button
                                        onClick={() => setViewModalData(null)}
                                        className="px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-xs text-gray-400 hover:bg-gray-100 transition-all"
                                    >
                                        {isAdminOrSecretary ? "Cancelar" : "Cerrar"}
                                    </button>
                                    {isAdminOrSecretary && (
                                        <button
                                            onClick={handleSaveDetails}
                                            disabled={isUpdating}
                                            className="bg-primary-green text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-green-100 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
                                        >
                                            <Save size={16} />
                                            {isUpdating ? "Guardando..." : "Guardar Cambios"}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
