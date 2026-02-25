"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    Settings,
    BarChart3,
    MessageSquare,
    LogOut,
    ExternalLink,
    Mail,
    Search,
    Calendar,
    Phone,
    Globe,
    X,
    CheckCircle2,
    Upload,
    Send,
    Loader2
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/admin/Sidebar";

export default function ConsultasPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [submissions, setSubmissions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSub, setSelectedSub] = useState<any>(null);
    const [replyEmail, setReplyEmail] = useState("");
    const [replyMessage, setReplyMessage] = useState("");
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin");
        }
    }, [status, router]);

    const fetchSubmissions = async () => {
        try {
            const response = await fetch("/api/admin/submissions");
            if (response.ok) {
                const data = await response.json();
                setSubmissions(data.submissions);
            }
        } catch (error) {
            console.error("Error fetching submissions:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (session) {
            fetchSubmissions();
        }
    }, [session]);

    const handleOpenReply = (sub: any) => {
        setSelectedSub(sub);
        setReplyEmail(sub.email);
        setIsModalOpen(true);
        setReplyMessage("");
    };

    const handleSendReply = async () => {
        if (!selectedSub || !replyMessage) return;
        setIsSending(true);
        try {
            const response = await fetch("/api/admin/submissions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: selectedSub.id,
                    email: replyEmail,
                    name: selectedSub.name,
                    message: replyMessage
                }),
            });

            if (response.ok) {
                await fetchSubmissions();
                setIsModalOpen(false);
                setSelectedSub(null);
                setReplyMessage("");
            }
        } catch (error) {
            console.error("Error sending reply:", error);
        } finally {
            setIsSending(false);
        }
    };

    const handleMarkAsPhoned = async (id: string) => {
        try {
            const response = await fetch("/api/admin/submissions", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id,
                    status: "RESPONDED_PHONE"
                }),
            });

            if (response.ok) {
                await fetchSubmissions();
            }
        } catch (error) {
            console.error("Error marking as phoned:", error);
        }
    };

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center font-black uppercase tracking-widest text-primary-burgundy animate-pulse">
                Cargando Panel...
            </div>
        );
    }

    if (!session) return null;

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
                            placeholder="Buscar por nombre, email..."
                            className="w-full bg-gray-50 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary-green outline-none text-black"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl">
                            <p className="text-sm font-bold text-gray-900 text-right">{session.user?.name}</p>
                            <div className="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center text-white font-bold text-xs uppercase">
                                {session.user?.name?.substring(0, 2)}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-8 space-y-8 text-black">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Buzón de Consultas</h2>
                            <p className="text-gray-500 text-sm font-medium">Revisa todos los mensajes enviados desde el sitio web.</p>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm transition-all focus-within:ring-2 focus-within:ring-primary-burgundy/20">
                            <div className="flex flex-col px-3 border-r border-gray-100">
                                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Estado</label>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="text-xs font-bold text-gray-900 outline-none bg-transparent cursor-pointer"
                                >
                                    <option value="ALL">TODOS</option>
                                    <option value="PENDING">PENDIENTES</option>
                                    <option value="RESPONDED">RESPONDIDOS</option>
                                    <option value="RESPONDED_PHONE">RESP. TELÉFONO</option>
                                </select>
                            </div>
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
                            {(startDate || endDate || statusFilter !== "ALL") && (
                                <button
                                    onClick={() => {
                                        setStartDate("");
                                        setEndDate("");
                                        setStatusFilter("ALL");
                                    }}
                                    className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                                    title="Limpiar filtros"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="grid gap-6">
                        {loading ? (
                            <div className="bg-white p-12 rounded-[2rem] border border-gray-100 shadow-sm text-center text-gray-400 font-bold uppercase text-xs animate-pulse">
                                Cargando consultas...
                            </div>
                        ) : (() => {
                            const filtered = submissions.filter(sub => {
                                const q = searchQuery.toLowerCase();
                                const matchesSearch = sub.name?.toLowerCase().includes(q) ||
                                    sub.email?.toLowerCase().includes(q) ||
                                    sub.comment?.toLowerCase().includes(q);

                                const subDate = new Date(sub.createdAt);
                                subDate.setHours(0, 0, 0, 0);

                                let matchesDate = true;
                                if (startDate) {
                                    const start = new Date(startDate + "T00:00:00");
                                    if (subDate < start) matchesDate = false;
                                }
                                if (endDate) {
                                    const end = new Date(endDate + "T00:00:00");
                                    if (subDate > end) matchesDate = false;
                                }

                                const matchesStatus = statusFilter === "ALL" || sub.status === statusFilter;

                                return matchesSearch && matchesDate && matchesStatus;
                            });

                            if (filtered.length === 0) {
                                return (
                                    <div className="bg-white p-12 rounded-[2rem] border-2 border-dashed border-gray-100 shadow-sm text-center text-gray-400 font-bold uppercase text-xs">
                                        No se encontraron consultas con los filtros aplicados.
                                    </div>
                                );
                            }

                            return filtered.map((sub, i) => (
                                <motion.div
                                    key={sub.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className={`bg-white p-8 rounded-[2rem] border transition-all group ${sub.status === 'RESPONDED' || sub.status === 'RESPONDED_PHONE' ? 'border-gray-100 opacity-80' : 'border-primary-green/20 bg-green-50/10 shadow-sm hover:shadow-md'}`}
                                >
                                    <div className="flex flex-col md:flex-row justify-between gap-6">
                                        <div className="space-y-4 flex-grow">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg uppercase shadow-inner ${sub.status === 'RESPONDED' ? 'bg-gray-100 text-gray-400' : 'bg-primary-burgundy/5 text-primary-burgundy'}`}>
                                                    {sub.name.substring(0, 2)}
                                                </div>
                                                <div>
                                                    <h3 className="font-black text-gray-900 text-lg uppercase tracking-tight">{sub.name}</h3>
                                                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                                        <Calendar size={12} className="text-primary-green" />
                                                        Recibido el {new Date(sub.createdAt).toLocaleDateString()} a las {new Date(sub.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100/50">
                                                <p className="text-gray-700 text-sm leading-relaxed font-medium italic">
                                                    "{sub.comment}"
                                                </p>
                                            </div>

                                            {sub.status === 'RESPONDED' && sub.replyMessage && (
                                                <motion.div
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    className="flex justify-end pr-4"
                                                >
                                                    <div className="bg-white p-6 rounded-2xl border-2 border-primary-green/20 shadow-sm max-w-[85%] relative overflow-hidden">
                                                        <div className="absolute top-0 left-0 w-1 h-full bg-primary-green/10" />
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <CheckCircle2 size={12} className="text-primary-green" />
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-primary-green">Nuestra Respuesta</span>
                                                        </div>
                                                        <p className="text-gray-600 text-sm leading-relaxed font-bold">
                                                            {sub.replyMessage}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )}

                                            <div className="flex flex-wrap gap-4">
                                                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-blue-100/50">
                                                    <Mail size={14} />
                                                    {sub.email}
                                                </div>
                                                {sub.web && (
                                                    <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-orange-100/50">
                                                        <Globe size={14} />
                                                        {sub.web}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-col justify-between items-end gap-4 min-w-[140px]">
                                            {sub.status === 'RESPONDED' ? (
                                                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-green-50 text-primary-green px-4 py-1.5 rounded-full border border-green-100">
                                                    <CheckCircle2 size={10} />
                                                    Respondido
                                                </span>
                                            ) : sub.status === 'RESPONDED_PHONE' ? (
                                                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full border border-blue-100">
                                                    <Phone size={10} />
                                                    Resp. Teléfono
                                                </span>
                                            ) : (
                                                <span className="bg-primary-green text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm animate-pulse">
                                                    Nueva Consulta
                                                </span>
                                            )}

                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleOpenReply(sub)}
                                                    disabled={sub.status !== 'PENDING'}
                                                    className={`p-3 rounded-xl transition-all shadow-sm ${sub.status !== 'PENDING'
                                                        ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                                        : 'bg-primary-green text-white hover:scale-110'
                                                        }`}
                                                    title={sub.status !== 'PENDING' ? "Respuesta ya enviada" : "Responder por Email"}
                                                >
                                                    <Mail size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleMarkAsPhoned(sub.id)}
                                                    disabled={sub.status !== 'PENDING'}
                                                    className={`p-3 rounded-xl transition-all shadow-sm ${sub.status === 'RESPONDED_PHONE'
                                                        ? 'bg-blue-600 text-white shadow-inner'
                                                        : sub.status === 'RESPONDED'
                                                            ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                                            : 'bg-gray-50 text-gray-400 hover:bg-blue-600 hover:text-white'
                                                        }`}
                                                    title={sub.status !== 'PENDING' ? "Consulta ya gestionada" : "Marcar como Respondido Telefónicamente"}
                                                >
                                                    <Phone size={18} />
                                                </button>
                                                <button className="p-3 bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all shadow-sm">
                                                    <X size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ));
                        })()}
                    </div>
                </div>
            </main>

            {/* Reply Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden"
                        >
                            <div className="bg-primary-green p-8 text-center relative">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                                <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 backdrop-blur-md">
                                    <Mail size={32} />
                                </div>
                                <h3 className="text-xl font-black text-white uppercase tracking-tight">Responder Consulta</h3>
                                <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mt-1">Para: {selectedSub?.name} &lt;{selectedSub?.email}&gt;</p>
                            </div>

                            <div className="p-8 space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-primary-green/60 ml-4">Enviar a (Email)</label>
                                        <input
                                            type="email"
                                            value={replyEmail}
                                            onChange={(e) => setReplyEmail(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 px-6 text-sm font-bold focus:border-primary-green outline-none text-black shadow-sm"
                                        />
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-xs text-gray-500 italic">
                                        En respuesta a: "{selectedSub?.comment}"
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-primary-green/60 ml-4">Mensaje de Respuesta</label>
                                    <textarea
                                        autoFocus
                                        value={replyMessage}
                                        onChange={(e) => setReplyMessage(e.target.value)}
                                        placeholder="Escribe tu respuesta aquí..."
                                        className="w-full bg-white border border-gray-200 rounded-2xl py-4 px-6 text-sm font-medium focus:border-primary-green outline-none text-black min-h-[160px] resize-none shadow-sm transition-all"
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 bg-gray-100 text-gray-400 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-all"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        disabled={isSending || !replyMessage}
                                        onClick={handleSendReply}
                                        className="flex-[2] bg-primary-green text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary-green/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                    >
                                        {isSending ? (
                                            <>Enviando... <Loader2 className="animate-spin" size={16} /></>
                                        ) : (
                                            <>Enviar Respuesta <Send size={16} /></>
                                        )}
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
