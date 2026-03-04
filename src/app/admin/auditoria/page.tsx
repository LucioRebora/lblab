"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import { History, Search, User, Filter, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function AuditLogsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (status === "unauthenticated" || (status === "authenticated" && session?.user?.role !== 'ADMIN')) {
            router.push("/admin");
        }
    }, [status, session, router]);

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/admin/audit");
            if (response.ok) {
                const data = await response.json();
                setLogs(data);
            }
        } catch (error) {
            console.error("Error fetching audit logs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (session?.user?.role === 'ADMIN') {
            fetchLogs();
        }
    }, [session]);

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center font-black uppercase tracking-widest text-primary-burgundy animate-pulse">
                Cargando Auditoría...
            </div>
        );
    }

    if (!session || session.user?.role !== 'ADMIN') return null;

    const filteredLogs = logs.filter(log => {
        const q = searchQuery.toLowerCase();
        return (
            log.userName?.toLowerCase().includes(q) ||
            log.userEmail?.toLowerCase().includes(q) ||
            log.entityType.toLowerCase().includes(q) ||
            log.entityId.toLowerCase().includes(q) ||
            log.action.toLowerCase().includes(q)
        );
    });

    const getStatusText = (status: string | null) => {
        if (!status) return "-";
        const map: any = {
            "SCHEDULED": "Solicitado",
            "PENDING": "Pendiente",
            "CONFIRMED": "Confirmado",
            "COMPLETED": "Finalizado",
            "RECEIVED": "En Proceso",
            "CANCELLED": "Anulado",
            "ANULADO": "Anulado",
            "FINALIZADO": "Finalizado",
            "EN_PROCESO": "En Proceso",
            "SOLICITADO": "Solicitado",
            "PENDIENTE": "Pendiente",
            "CONFIRMADO": "Confirmado"
        };
        return map[status] || status;
    };

    const getStatusColor = (status: string | null) => {
        if (!status) return "bg-gray-100 text-gray-500";
        if (status === 'CANCELLED' || status === 'ANULADO') return "bg-red-50 text-red-500 border-red-100";
        if (status === 'COMPLETED' || status === 'FINALIZADO') return "bg-orange-50 text-orange-500 border-orange-100";
        if (status === 'RECEIVED' || status === 'EN_PROCESO') return "bg-green-50 text-primary-green border-green-100";
        if (status === 'CONFIRMED' || status === 'CONFIRMADO') return "bg-green-50 text-primary-green border-green-100";
        return "bg-blue-50 text-blue-500 border-blue-100"; // PENDING, SCHEDULED
    };

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
                            placeholder="Buscar por usuario, entidad, acción..."
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
                            <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-3">
                                <History className="text-primary-burgundy" size={32} />
                                Registro de Auditoría
                            </h1>
                            <p className="text-gray-500 text-sm font-medium mt-1">Historial de cambios de estado y acciones del sistema.</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse border-spacing-0">
                                <thead className="text-black bg-gray-50/50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Fecha y Hora</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Usuario</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Acción / Entidad</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Estado Anterior</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Nuevo Estado</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredLogs.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs italic">
                                                No se encontraron registros de auditoría.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredLogs.map((log) => (
                                            <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-8 py-6">
                                                    <div className="flex flex-col text-black">
                                                        <span className="font-bold text-sm">
                                                            {format(new Date(log.createdAt), "dd/MM/yyyy", { locale: es })}
                                                        </span>
                                                        <span className="text-xs font-bold text-gray-400 mt-1 uppercase">
                                                            {format(new Date(log.createdAt), "HH:mm:ss")}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs uppercase">
                                                            {log.userName ? log.userName.substring(0, 2) : <User size={14} />}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-gray-900 text-sm">{log.userName || "Desconocido"}</p>
                                                            <p className="text-[10px] text-gray-400 font-bold">{log.userEmail}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-xs font-black text-gray-700 uppercase tracking-widest">
                                                            {log.action}
                                                        </span>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[10px] font-bold text-primary-burgundy bg-primary-burgundy/5 px-2 py-0.5 rounded border border-primary-burgundy/10">
                                                                {log.entityType}
                                                            </span>
                                                            <span className="text-[9px] font-bold text-gray-400 uppercase">
                                                                ID: {log.entityId.substring(0, 8)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    {log.oldStatus ? (
                                                        <span className={`inline-flex items-center text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${getStatusColor(log.oldStatus)}`}>
                                                            {getStatusText(log.oldStatus)}
                                                        </span>
                                                    ) : <span className="text-gray-400">-</span>}
                                                </td>
                                                <td className="px-8 py-6">
                                                    {log.newStatus ? (
                                                        <span className={`inline-flex items-center text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${getStatusColor(log.newStatus)}`}>
                                                            {getStatusText(log.newStatus)}
                                                        </span>
                                                    ) : <span className="text-gray-400">-</span>}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
