"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Dog,
    Mail,
    Clock,
    CheckCircle2,
    X,
    AlertTriangle,
    Info,
    Calendar,
    Stethoscope,
    Building2,
    Eye,
    Save,
    User
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function VeterinaryAdminPage() {
    const { data: session, status } = useSession();
    const isAdminOrSecretary = session?.user?.role === 'ADMIN' || session?.user?.role === 'SECRETARY';
    const router = useRouter();
    const [appointments, setAppointments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // Cancellation state
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [selectedAptId, setSelectedAptId] = useState<string | null>(null);
    const [cancelReason, setCancelReason] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    // View/Edit state
    const [viewModalData, setViewModalData] = useState<any | null>(null);
    const [editProtocolo, setEditProtocolo] = useState("");
    const [editStatus, setEditStatus] = useState("");
    const [editPrecio, setEditPrecio] = useState<string | number>("");

    const handleSaveDetails = async () => {
        if (!viewModalData) return;
        setIsUpdating(true);
        try {
            const response = await fetch("/api/admin/veterinaria", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: viewModalData.id,
                    protocolo: editProtocolo,
                    status: editStatus,
                    precio: editPrecio ? parseFloat(editPrecio.toString()) : null
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
            const response = await fetch("/api/admin/veterinaria");
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

    const handleUpdateStatus = async (id: string, newStatus: string, reason?: string) => {
        setIsUpdating(true);
        try {
            const response = await fetch("/api/admin/veterinaria", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id,
                    status: newStatus,
                    cancelReason: reason
                }),
            });

            if (response.ok) {
                await fetchAppointments();
                setIsCancelModalOpen(false);
                setSelectedAptId(null);
                setCancelReason("");
            }
        } catch (error) {
            console.error("Error updating appointment:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center font-black uppercase tracking-widest text-primary-burgundy animate-pulse">
                Cargando Solicitudes...
            </div>
        );
    }

    if (!session) return null;

    const filteredAppointments = appointments.filter(apt => {
        const query = searchQuery.toLowerCase();
        const matchesSearch = (
            apt.nombreMascota?.toLowerCase().includes(query) ||
            apt.especie?.toLowerCase().includes(query) ||
            apt.propietario?.toLowerCase().includes(query) ||
            apt.email?.toLowerCase().includes(query) ||
            apt.veterinary?.toLowerCase().includes(query) ||
            apt.professional?.toLowerCase().includes(query)
        );

        const aptDate = new Date(apt.createdAt);
        aptDate.setHours(0, 0, 0, 0);

        let matchesDate = true;
        if (startDate) {
            const start = new Date(startDate);
            start.setMinutes(start.getMinutes() + start.getTimezoneOffset());
            start.setHours(0, 0, 0, 0);
            if (aptDate < start) matchesDate = false;
        }
        if (endDate) {
            const end = new Date(endDate);
            end.setMinutes(end.getMinutes() + end.getTimezoneOffset());
            end.setHours(0, 0, 0, 0);
            if (aptDate > end) matchesDate = false;
        }

        return matchesSearch && matchesDate;
    });

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />

            <main className="flex-grow overflow-y-auto">
                <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
                    <div className="relative w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Buscar por paciente, veterinaria o profesional..."
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
                            <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Veterinarias</h1>
                            <p className="text-gray-500 text-sm font-medium">Gestión de solicitudes de análisis para clínicas veterinarias.</p>
                        </div>

                        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm transition-all focus-within:ring-2 focus-within:ring-primary-green/20">
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

                    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-100">
                                        <th className="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-wider">Paciente / Especie</th>
                                        <th className="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-wider">Veterinaria / Prof.</th>
                                        <th className="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-wider">Protocolo</th>
                                        <th className="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-wider">Precio</th>
                                        <th className="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-wider">Análisis Solicitados</th>
                                        <th className="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-wider">Fecha Solicitud</th>
                                        <th className="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-wider text-right">Estado</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={7} className="px-8 py-20 text-center">
                                                <div className="flex flex-col items-center gap-4">
                                                    <div className="w-8 h-8 border-4 border-primary-green border-t-transparent rounded-full animate-spin" />
                                                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Cargando solicitudes...</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : filteredAppointments.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs italic">
                                                No se encontraron solicitudes.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredAppointments.map((apt) => (
                                            <motion.tr
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                key={apt.id}
                                                className={`hover:bg-gray-50/50 transition-colors group ${(apt.status === 'CANCELLED' || apt.status === 'ANULADO') ? 'opacity-60' : ''}`}
                                            >
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-10 h-10 bg-primary-green/5 text-primary-green rounded-full flex items-center justify-center">
                                                            <Dog size={20} />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-gray-900">{apt.nombreMascota}</p>
                                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{apt.especie} | {apt.propietario}</p>
                                                            <p className="text-xs text-gray-500 mt-1">{apt.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                                                            <Building2 size={12} className="text-primary-green" />
                                                            {apt.veterinary}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
                                                            <Stethoscope size={12} />
                                                            {apt.professional}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="flex flex-col gap-1">
                                                        <span className={`font-black text-sm ${(apt.status === 'CANCELLED' || apt.status === 'ANULADO') ? 'text-gray-300' : 'text-gray-900'}`}>
                                                            {apt.protocolo || "-"}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="flex flex-col gap-1">
                                                        <span className={`font-black text-sm ${(apt.status === 'CANCELLED' || apt.status === 'ANULADO') ? 'text-gray-300' : 'text-primary-green'}`}>
                                                            {apt.precio ? `$${apt.precio.toLocaleString()}` : "-"}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="flex flex-wrap gap-1">
                                                        {apt.analysis.map((a: string, i: number) => (
                                                            <span key={i} className="text-[9px] font-black uppercase tracking-tighter bg-gray-100 text-gray-600 px-2 py-0.5 rounded border border-gray-200">
                                                                {a}
                                                            </span>
                                                        ))}
                                                        {apt.other && (
                                                            <span className="text-[9px] font-black uppercase tracking-tighter bg-primary-green/5 text-primary-green px-2 py-0.5 rounded border border-primary-green/20 italic">
                                                                + {apt.other}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="flex flex-col text-gray-600">
                                                        <div className="flex items-center gap-2 font-bold text-sm">
                                                            <Calendar size={14} className="text-primary-green" />
                                                            {format(new Date(apt.createdAt), "dd/MM/yyyy")}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 mt-1 uppercase">
                                                            <Clock size={12} />
                                                            {format(new Date(apt.createdAt), "HH:mm")} hs
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-right">
                                                    <div className="flex flex-col items-end gap-2">
                                                        <div className="flex items-center justify-end gap-2 w-full">
                                                            {(apt.status === 'CANCELLED' || apt.status === 'ANULADO') && (
                                                                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-red-50 text-red-500 px-4 py-1.5 rounded-full border border-red-100 whitespace-nowrap">
                                                                    <X size={10} />
                                                                    Anulado
                                                                </span>
                                                            )}
                                                            {(apt.status === 'COMPLETED' || apt.status === 'FINALIZADO') && (
                                                                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-orange-50 text-orange-500 px-4 py-1.5 rounded-full border border-orange-100 whitespace-nowrap">
                                                                    <CheckCircle2 size={10} />
                                                                    Finalizado
                                                                </span>
                                                            )}
                                                            {(apt.status === 'RECEIVED' || apt.status === 'EN_PROCESO') && (
                                                                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-green-50 text-primary-green px-4 py-1.5 rounded-full border border-green-100 whitespace-nowrap">
                                                                    <CheckCircle2 size={10} />
                                                                    En Proceso
                                                                </span>
                                                            )}
                                                            {(apt.status === 'PENDING' || apt.status === 'PENDIENTE' || (!['COMPLETED', 'FINALIZADO', 'RECEIVED', 'EN_PROCESO', 'CANCELLED', 'ANULADO'].includes(apt.status))) && (
                                                                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-blue-50 text-blue-500 px-4 py-1.5 rounded-full border border-blue-100 whitespace-nowrap">
                                                                    <CheckCircle2 size={10} />
                                                                    Pendiente
                                                                </span>
                                                            )}
                                                            <div className="flex items-center gap-1 ml-2">
                                                                <button
                                                                    onClick={() => {
                                                                        setViewModalData(apt);
                                                                        setEditProtocolo(apt.protocolo || "");
                                                                        setEditStatus(apt.status);
                                                                        setEditPrecio(apt.precio || "");
                                                                    }}
                                                                    className="p-2 text-gray-300 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
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
                                        ))
                                    )}
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
                                <h3 className="text-xl font-black text-white uppercase tracking-tight">Cancelar Solicitud</h3>
                                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mt-1">Ingresa el motivo</p>
                            </div>

                            <div className="p-8 space-y-6">
                                <textarea
                                    autoFocus
                                    value={cancelReason}
                                    onChange={(e) => setCancelReason(e.target.value)}
                                    placeholder="Motivo de la cancelación..."
                                    className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-red-500 outline-none text-black min-h-[120px] resize-none"
                                />

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setIsCancelModalOpen(false)}
                                        className="flex-1 bg-gray-100 text-gray-400 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-200"
                                    >
                                        Volver
                                    </button>
                                    <button
                                        disabled={isUpdating || !cancelReason}
                                        onClick={() => handleUpdateStatus(selectedAptId!, 'ANULADO', cancelReason)}
                                        className="flex-[2] bg-red-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-red-500/20 active:scale-95 transition-all"
                                    >
                                        {isUpdating ? "Confirmando..." : "Confirmar Cancelación"}
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
                            <div className="bg-primary-green p-8 text-center relative flex-shrink-0">
                                <button
                                    onClick={() => setViewModalData(null)}
                                    className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2"
                                >
                                    <X size={20} />
                                </button>
                                <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 backdrop-blur-md">
                                    <Eye size={32} />
                                </div>
                                <h3 className="text-xl font-black text-white uppercase tracking-tight">Detalle de la solicitud</h3>
                                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mt-1">
                                    Enviado el {format(new Date(viewModalData.createdAt), "dd/MM/yyyy HH:mm")} hs
                                </p>
                            </div>

                            <div className="p-8 overflow-y-auto space-y-6 text-left">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 outline-none">Origen</p>
                                            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                                <p className="font-black text-gray-900 text-sm uppercase">{viewModalData.veterinary}</p>
                                                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 mt-2">
                                                    <Stethoscope size={12} />
                                                    {viewModalData.professional}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 mt-1 lowercase">
                                                    <Mail size={12} />
                                                    {viewModalData.email}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 outline-none">Paciente</p>
                                            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                                <p className="font-black text-gray-900 text-sm uppercase">{viewModalData.nombreMascota}</p>
                                                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 mt-2 capitalize">
                                                    <Dog size={12} />
                                                    {viewModalData.especie}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 mt-1 capitalize">
                                                    <User size={12} />
                                                    {viewModalData.propietario}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-6 pt-2">
                                    <div>
                                        <p className="text-[10px] font-black text-primary-green uppercase tracking-widest mb-1 outline-none">Nº Protocolo</p>
                                        <input
                                            type="text"
                                            maxLength={12}
                                            placeholder="Protocolo"
                                            value={editProtocolo}
                                            onChange={(e) => setEditProtocolo(e.target.value.replace(/[^0-9]/g, ''))}
                                            readOnly={!isAdminOrSecretary}
                                            className={`w-full bg-white border border-gray-200 rounded-2xl py-3 px-4 outline-none transition-all text-sm font-black text-gray-900 placeholder:text-gray-300 shadow-inner ${!isAdminOrSecretary ? 'opacity-70 cursor-not-allowed' : 'focus:ring-2 focus:ring-primary-green'}`}
                                        />
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
                                                className={`w-full bg-white border border-gray-200 rounded-2xl py-3 pl-8 pr-4 outline-none transition-all text-sm font-black text-gray-900 placeholder:text-gray-300 shadow-inner ${!isAdminOrSecretary ? 'opacity-70 cursor-not-allowed' : 'focus:ring-2 focus:ring-primary-green'}`}
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
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 outline-none">Análisis Solicitados</p>
                                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                        <div className="flex flex-wrap gap-2">
                                            {viewModalData.analysis?.map((type: string, i: number) => (
                                                <span key={i} className="text-[10px] font-black uppercase tracking-tighter bg-white text-primary-green shadow-sm px-3 py-1.5 rounded-lg border border-gray-100">
                                                    {type}
                                                </span>
                                            ))}
                                            {viewModalData.other && (
                                                <span className="text-[10px] font-black uppercase tracking-tighter bg-primary-green/5 text-primary-green px-3 py-1.5 rounded-lg border border-primary-green/20">
                                                    + {viewModalData.other}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {viewModalData.cancelReason && (editStatus === "CANCELLED" || editStatus === "ANULADO") && (
                                    <div className="mt-4 p-4 rounded-2xl border border-red-100 bg-red-50">
                                        <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <AlertTriangle size={12} />
                                            Motivo de Cancelación
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
