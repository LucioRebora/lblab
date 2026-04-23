"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar,
    Search,
    MessageSquare,
    Users,
    BarChart3,
    LogOut,
    Settings,
    Bell,
    ExternalLink,
    Filter,
    Stethoscope,
    User,
    Mail,
    Clock,
    CheckCircle2,
    X,
    AlertTriangle,
    Info,
    Upload,
    Eye,
    Save
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/admin/Sidebar";
import PRPForm from "@/components/admin/PRPForm";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useSearchParams } from "next/navigation";

export default function AppointmentsAdminPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center font-black uppercase tracking-widest text-primary-burgundy animate-pulse">Cargando...</div>}>
            <AppointmentsAdminContent />
        </Suspense>
    );
}

function AppointmentsAdminContent() {
    const { data: session, status } = useSession();
    const isAdminOrSecretary = session?.user?.role === 'ADMIN' || session?.user?.role === 'SECRETARY';
    const router = useRouter();
    const [appointments, setAppointments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const searchParams = useSearchParams();

    // PRP Modal state
    const [isPRPModalOpen, setIsPRPModalOpen] = useState(false);

    useEffect(() => {
        if (searchParams.get("new") === "prp") {
            setIsPRPModalOpen(true);
        }
    }, [searchParams]);

    // Cancellation state
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [selectedAptId, setSelectedAptId] = useState<string | null>(null);
    const [cancelReason, setCancelReason] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    // View/Edit state
    const [viewModalData, setViewModalData] = useState<any | null>(null);
    const [editStatus, setEditStatus] = useState("");
    const [editProtocolo, setEditProtocolo] = useState("");

    const handleSaveDetails = async () => {
        if (!viewModalData) return;
        setIsUpdating(true);
        try {
            const response = await fetch("/api/admin/appointments", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: viewModalData.id,
                    status: editStatus,
                    protocolo: editProtocolo,
                    cancelReason: editStatus === "CANCELLED" ? cancelReason : viewModalData.cancelReason
                }),
            });

            if (response.ok) {
                await fetchAppointments();
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

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            let url = "/api/admin/appointments";
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setAppointments(data);
            }
        } catch (error) {
            console.error("Error fetching appointments:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (session) {
            fetchAppointments();
        }
    }, [session]);

    const handleCancel = async () => {
        if (!selectedAptId || !cancelReason) return;
        setIsUpdating(true);
        try {
            const response = await fetch("/api/admin/appointments", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: selectedAptId,
                    status: "ANULADO",
                    cancelReason
                }),
            });

            if (response.ok) {
                await fetchAppointments();
                setIsCancelModalOpen(false);
                setSelectedAptId(null);
                setCancelReason("");
            }
        } catch (error) {
            console.error("Error cancelling appointment:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleConfirm = async (id: string) => {
        setIsUpdating(true);
        try {
            const response = await fetch("/api/admin/appointments", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id,
                    status: "CONFIRMADO"
                }),
            });

            if (response.ok) {
                await fetchAppointments();
            }
        } catch (error) {
            console.error("Error confirming appointment:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleComplete = async (id: string) => {
        setIsUpdating(true);
        try {
            const response = await fetch("/api/admin/appointments", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id,
                    status: "FINALIZADO"
                }),
            });

            if (response.ok) {
                await fetchAppointments();
            }
        } catch (error) {
            console.error("Error completing appointment:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center font-black uppercase tracking-widest text-primary-burgundy animate-pulse">
                Cargando Turnos...
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
                            placeholder="Buscar por paciente, email o médico..."
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
                            <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Turnos PRP</h1>
                            <p className="text-gray-500 text-sm font-medium">Gestiona las solicitudes de Plasma Rico en Plaquetas.</p>
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-4">
                            <button
                                onClick={() => setIsPRPModalOpen(true)}
                                className="bg-primary-burgundy text-white px-6 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-red-900/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3 w-full md:w-auto justify-center"
                            >
                                <Calendar size={14} strokeWidth={3} />
                                Solicitar Turno PRP
                            </button>

                            <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm transition-all focus-within:ring-2 focus-within:ring-primary-burgundy/20 w-full md:w-auto">
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
                    </div>

                    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse border-spacing-0">
                                <thead className="text-black">
                                    <tr className="bg-gray-50/50 border-b border-gray-100">
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Paciente</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Contacto</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Fecha y Hora</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Médico / Preparación</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Protocolo</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Estado / Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={5} className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">
                                                <div className="flex flex-col items-center gap-4">
                                                    <div className="w-8 h-8 border-4 border-primary-burgundy border-t-transparent rounded-full animate-spin" />
                                                    Cargando solicitudes...
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (() => {
                                        const filtered = appointments.filter(apt => {
                                            const query = searchQuery.toLowerCase();
                                            const matchesSearch = (
                                                apt.patient?.toLowerCase().includes(query) ||
                                                apt.email?.toLowerCase().includes(query) ||
                                                apt.professional?.toLowerCase().includes(query)
                                            );

                                            const aptDate = new Date(apt.date + "T00:00:00");
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
                                                        No se encontraron turnos que coincidan con la búsqueda.
                                                    </td>
                                                </tr>
                                            );
                                        }

                                        return filtered.map((apt) => (
                                            <motion.tr
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                key={apt.id}
                                                className={`hover:bg-gray-50/50 transition-colors group ${(apt.status === 'CANCELLED' || apt.status === 'ANULADO') ? 'opacity-60' : ''}`}
                                            >
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs ${(apt.status === 'CANCELLED' || apt.status === 'ANULADO') ? 'bg-gray-200 text-gray-500' : 'bg-primary-burgundy/5 text-primary-burgundy'}`}>
                                                            {apt.patient?.substring(0, 2).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className={`font-bold transition-colors ${(apt.status === 'CANCELLED' || apt.status === 'ANULADO') ? 'text-gray-400 line-through' : 'text-gray-900 group-hover:text-primary-burgundy'}`}>{apt.patient}</p>
                                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">ID: {apt.id.substring(0, 8)}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex flex-col gap-1">
                                                        <div className={`flex items-center gap-2 text-xs ${(apt.status === 'CANCELLED' || apt.status === 'ANULADO') ? 'text-gray-300 line-through' : 'text-gray-600'}`}>
                                                            <Mail size={12} className="text-gray-400" />
                                                            {apt.email}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex flex-col text-black">
                                                        <div className={`flex items-center gap-2 font-bold text-sm ${(apt.status === 'CANCELLED' || apt.status === 'ANULADO') ? 'text-gray-300' : 'text-gray-800'}`}>
                                                            <Calendar size={14} className={(apt.status === 'CANCELLED' || apt.status === 'ANULADO') ? 'text-gray-300' : 'text-primary-burgundy'} />
                                                            {format(new Date(apt.date + "T12:00:00"), "dd/MM/yyyy")}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 mt-1 uppercase">
                                                            <Clock size={12} />
                                                            {apt.time} hs
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-black">
                                                    <div className="space-y-1">
                                                        <div className={`flex items-center gap-2 text-xs font-bold ${(apt.status === 'CANCELLED' || apt.status === 'ANULADO') ? 'text-gray-300' : 'text-gray-700'}`}>
                                                            <Stethoscope size={12} className={(apt.status === 'CANCELLED' || apt.status === 'ANULADO') ? 'text-gray-200' : 'text-primary-green'} />
                                                            Prof: {apt.professional || "No especificado"}
                                                        </div>
                                                        <div className="flex flex-wrap gap-1">
                                                            {apt.preparation.map((p: string, i: number) => (
                                                                <span key={i} className="text-[9px] font-black uppercase tracking-tighter bg-gray-100 text-gray-500 px-2 py-0.5 rounded border border-gray-200">
                                                                    {p}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-black">
                                                    <div className="flex flex-col gap-1">
                                                        <span className={`font-black text-sm ${(apt.status === 'CANCELLED' || apt.status === 'ANULADO') ? 'text-gray-300' : 'text-gray-900'}`}>
                                                            {apt.protocolo || "-"}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <div className="flex flex-col items-end gap-2">
                                                        <div className="flex items-center justify-end gap-2 w-full">
                                                            {(apt.status === 'CANCELLED' || apt.status === 'ANULADO') && (
                                                                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-red-50 text-red-500 px-4 py-1.5 rounded-full border border-red-100 whitespace-nowrap">
                                                                    <X size={10} />
                                                                    Anulado
                                                                </span>
                                                            )}
                                                            {(apt.status === 'COMPLETED' || apt.status === 'FINALIZADO') && (
                                                                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-orange-50 text-orange-500 px-4 py-1.5 rounded-full border border-orange-100 shadow-sm whitespace-nowrap">
                                                                    <CheckCircle2 size={10} />
                                                                    Finalizado
                                                                </span>
                                                            )}
                                                            {(apt.status === 'CONFIRMED' || apt.status === 'CONFIRMADO') && (
                                                                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-green-50 text-primary-green px-4 py-1.5 rounded-full border border-green-100 whitespace-nowrap">
                                                                    <CheckCircle2 size={10} />
                                                                    Confirmado
                                                                </span>
                                                            )}
                                                            {(apt.status === 'SCHEDULED' || apt.status === 'PENDING' || apt.status === 'SOLICITADO' || (!['COMPLETED', 'FINALIZADO', 'CONFIRMED', 'CONFIRMADO', 'CANCELLED', 'ANULADO'].includes(apt.status))) && (
                                                                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-blue-50 text-blue-500 px-4 py-1.5 rounded-full border border-blue-100 whitespace-nowrap">
                                                                    <CheckCircle2 size={10} />
                                                                    Solicitado
                                                                </span>
                                                            )}

                                                            <div className="flex items-center gap-1 ml-2">
                                                                <button
                                                                    onClick={() => {
                                                                        setViewModalData(apt);
                                                                        setEditStatus(apt.status);
                                                                        setCancelReason(apt.cancelReason || "");
                                                                        setEditProtocolo(apt.protocolo || "");
                                                                    }}
                                                                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all group-hover:bg-white"
                                                                    title="Ver/Editar Detalles"
                                                                >
                                                                    <Eye size={18} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        {(apt.status === 'CANCELLED' || apt.status === 'ANULADO') && apt.cancelReason && (
                                                            <div className="group/reason relative mt-1">
                                                                <span className="text-[9px] text-gray-400 font-bold uppercase flex items-center gap-1 cursor-help hover:text-gray-600 transition-colors">
                                                                    <Info size={10} /> Ver Motivo
                                                                </span>
                                                                <div className="absolute right-0 bottom-full mb-2 w-48 bg-gray-900 text-white text-[10px] p-2 rounded-xl opacity-0 group-hover/reason:opacity-100 pointer-events-none transition-opacity shadow-xl z-20 font-medium text-left">
                                                                    {apt.cancelReason}
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
                                <h3 className="text-xl font-black text-white uppercase tracking-tight">Cancelar Turno</h3>
                                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mt-1">Ingresa el motivo de la cancelación</p>
                            </div>

                            <div className="p-8 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Motivo de Cancelación</label>
                                    <textarea
                                        autoFocus
                                        value={cancelReason}
                                        onChange={(e) => setCancelReason(e.target.value)}
                                        placeholder="Ej: Inasistencia del profesional, reprogramación solicitada..."
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
                                        {isUpdating ? "Cancelando..." : "Confirmar Cancelación"}
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
                                <h3 className="text-xl font-black text-white uppercase tracking-tight">Detalles del Turno PRP</h3>
                                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mt-1">
                                    Turno para el {format(new Date(viewModalData.date + "T12:00:00"), "dd/MM/yyyy")} a las {viewModalData.time} hs
                                </p>
                            </div>

                            <div className="p-8 overflow-y-auto space-y-6 text-left">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 outline-none">Paciente</p>
                                            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                                <p className="font-black text-gray-900 text-sm uppercase">{viewModalData.patient}</p>
                                                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 mt-2 lowercase">
                                                    <Mail size={12} />
                                                    {viewModalData.email}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 outline-none">Profesional</p>
                                            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex flex-col justify-center">
                                                <p className="font-bold text-gray-800 text-sm italic">{viewModalData.professional || "No especificado"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6 pt-2">
                                    <div>
                                        <p className="text-[10px] font-black text-primary-burgundy uppercase tracking-widest mb-1 outline-none">Nº Protocolo</p>
                                        <input
                                            type="text"
                                            maxLength={12}
                                            placeholder="Protocolo"
                                            value={editProtocolo}
                                            onChange={(e) => setEditProtocolo(e.target.value.replace(/[^0-9]/g, ''))}
                                            readOnly={!isAdminOrSecretary}
                                            className={`w-full bg-white border border-gray-200 rounded-2xl py-3 px-4 outline-none transition-all text-sm font-black text-gray-900 placeholder:text-gray-300 shadow-inner ${!isAdminOrSecretary ? 'opacity-70 cursor-not-allowed' : 'focus:ring-2 focus:ring-primary-burgundy'}`}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 outline-none">Estado del Turno</p>
                                        <select
                                            value={editStatus}
                                            onChange={(e) => setEditStatus(e.target.value)}
                                            disabled={!isAdminOrSecretary}
                                            className={`w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 px-4 outline-none transition-all text-sm font-black text-gray-900 cursor-pointer ${!isAdminOrSecretary ? 'opacity-70 cursor-not-allowed' : 'focus:ring-2 focus:ring-primary-burgundy'}`}
                                        >
                                            <option value="SOLICITADO">Solicitado</option>
                                            <option value="CONFIRMADO">Confirmado</option>
                                            <option value="FINALIZADO">Finalizado</option>
                                            <option value="ANULADO">Anulado</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 outline-none">Preparación Requerida</p>
                                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                        <div className="flex flex-wrap gap-2">
                                            {viewModalData.preparation?.map((p: string, i: number) => (
                                                <span key={i} className="text-[10px] font-black uppercase tracking-tighter bg-white text-primary-burgundy shadow-sm px-3 py-1.5 rounded-lg border border-gray-100">
                                                    {p}
                                                </span>
                                            ))}
                                            {(!viewModalData.preparation || viewModalData.preparation.length === 0) && (
                                                <span className="text-xs font-bold text-gray-500 italic">No se especificó preparación.</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {editStatus === "CANCELLED" || editStatus === "ANULADO" ? (
                                    <div className="mt-4 p-4 rounded-2xl border border-red-100 bg-red-50">
                                        <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <AlertTriangle size={12} />
                                            Motivo de Cancelación
                                        </p>
                                        <textarea
                                            value={cancelReason}
                                            onChange={(e) => setCancelReason(e.target.value)}
                                            placeholder="Ingresa el motivo de cancelación..."
                                            className="w-full bg-white border border-red-100 rounded-xl py-2 px-3 text-[11px] outline-none focus:ring-2 focus:ring-red-500 min-h-[60px] resize-none"
                                        />
                                    </div>
                                ) : null}

                                {viewModalData.cancelReason && (editStatus !== "CANCELLED" && editStatus !== "ANULADO") && (
                                    <div className="mt-4 p-4 rounded-2xl border border-gray-200 bg-gray-50">
                                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <Info size={12} />
                                            Motivo de Cancelación Previo
                                        </p>
                                        <p className="font-bold text-gray-600 text-sm italic">{viewModalData.cancelReason}</p>
                                    </div>
                                )}

                                <div className="pt-6 border-t border-gray-100 flex justify-end gap-4 mt-8">
                                    <button
                                        onClick={() => setViewModalData(null)}
                                        className="px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-xs text-gray-400 hover:bg-gray-100 transition-all"
                                    >
                                        {isAdminOrSecretary ? "Cerrar" : "Cerrar"}
                                    </button>
                                    {isAdminOrSecretary && (
                                        <button
                                            onClick={handleSaveDetails}
                                            disabled={isUpdating}
                                            className="bg-primary-burgundy text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-red-900/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
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

            {/* PRP Request Modal */}
            <AnimatePresence>
                {isPRPModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsPRPModalOpen(false)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[95vh]"
                        >
                            <div className="bg-primary-green p-8 text-center relative flex-shrink-0">
                                <button
                                    onClick={() => setIsPRPModalOpen(false)}
                                    className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2"
                                >
                                    <X size={20} />
                                </button>
                                <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 backdrop-blur-md">
                                    <Calendar size={32} />
                                </div>
                                <h3 className="text-xl font-black text-white uppercase tracking-tight">Nueva Solicitud Turno PRP</h3>
                                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mt-1">Completa los datos para agendar un nuevo turno</p>
                            </div>

                            <div className="p-8 overflow-y-auto">
                                <PRPForm onSuccess={() => {
                                    setIsPRPModalOpen(false);
                                    fetchAppointments();
                                }} />
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
