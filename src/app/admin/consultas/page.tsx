"use client";

import { motion } from "framer-motion";
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
    Upload
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

            {/* Main Content */}
            <main className="flex-grow overflow-y-auto">
                <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
                    <h1 className="text-lg font-black text-gray-900 uppercase tracking-tight">Registro de Consultas</h1>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl">
                            <div className="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center text-white font-bold text-xs uppercase">
                                {session.user?.name?.substring(0, 2)}
                            </div>
                            <p className="text-sm font-bold text-gray-900">{session.user?.name}</p>
                        </div>
                    </div>
                </header>

                <div className="p-8 space-y-8 text-black">
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Buzón de Consultas</h2>
                        <p className="text-gray-500 text-sm font-medium">Revisa todos los mensajes enviados desde el sitio web.</p>
                    </div>

                    {/* Submissions List */}
                    <div className="grid gap-6">
                        {loading ? (
                            <div className="bg-white p-12 rounded-[2rem] border border-gray-100 shadow-sm text-center text-gray-400 font-bold uppercase text-xs animate-pulse">
                                Cargando consultas...
                            </div>
                        ) : submissions.length === 0 ? (
                            <div className="bg-white p-12 rounded-[2rem] border-2 border-dashed border-gray-100 shadow-sm text-center text-gray-400 font-bold uppercase text-xs">
                                No hay consultas registradas aún.
                            </div>
                        ) : submissions.map((sub, i) => (
                            <motion.div
                                key={sub.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group"
                            >
                                <div className="flex flex-col md:flex-row justify-between gap-6">
                                    <div className="space-y-4 flex-grow">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-primary-burgundy/5 text-primary-burgundy rounded-2xl flex items-center justify-center font-black text-lg uppercase shadow-inner">
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

                                    <div className="flex flex-col justify-between items-end gap-4 min-w-[120px]">
                                        <span className="bg-green-100 text-primary-green px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                                            Nueva Consulta
                                        </span>
                                        <div className="flex gap-2">
                                            <a
                                                href={`mailto:${sub.email}`}
                                                className="p-3 bg-gray-50 text-gray-400 hover:bg-primary-burgundy hover:text-white rounded-xl transition-all shadow-sm"
                                                title="Responder por email"
                                            >
                                                <Mail size={18} />
                                            </a>
                                            <button className="p-3 bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all shadow-sm">
                                                <X size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
