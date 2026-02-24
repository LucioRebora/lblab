"use client";

import { motion } from "framer-motion";
import {
    FileText,
    Search,
    Download,
    Bell,
    ExternalLink
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Sidebar from "@/components/admin/Sidebar";

export default function ResultadosPage() {
    const { data: session } = useSession();

    // Simulamos datos de resultados para el portal del usuario
    const resultados = [
        { id: "RES-001", fecha: "20/02/2026", paciente: "Juan Pérez", estudio: "Hemograma Completo", estado: "Listos" },
        { id: "RES-002", fecha: "18/02/2026", paciente: "Juan Pérez", estudio: "Perfil Lipídico", estado: "Listos" },
        { id: "RES-003", fecha: "15/02/2026", paciente: "Juan Pérez", estudio: "Glucosa", estado: "Listos" },
    ];

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
                            placeholder="Buscar en mis resultados..."
                            className="w-full bg-gray-50 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary-green outline-none"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-gray-900">{session.user?.name}</p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Usuario</p>
                            </div>
                            <div className="w-10 h-10 bg-primary-green rounded-full flex items-center justify-center text-white font-bold text-sm shadow-inner uppercase">
                                {session.user?.name?.substring(0, 2)}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-8 space-y-8">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Mis Resultados</h1>
                        <p className="text-gray-500 text-sm font-medium">Aquí puedes ver y descargar tus últimos estudios de laboratorio.</p>
                    </div>

                    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100">
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">ID Informe</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Fecha</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Estudio</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">Estado</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Acción</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {resultados.map((res) => (
                                        <motion.tr
                                            key={res.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="hover:bg-gray-50/50 transition-colors"
                                        >
                                            <td className="px-6 py-4 text-xs font-bold text-gray-900 tracking-wider font-mono">{res.id}</td>
                                            <td className="px-6 py-4 text-xs font-medium text-gray-500">{res.fecha}</td>
                                            <td className="px-6 py-4 text-sm font-bold text-gray-900">{res.estudio}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-[10px] font-bold text-primary-green bg-green-50 px-3 py-1 rounded-full uppercase">
                                                    {res.estado}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-primary-burgundy hover:scale-110 transition-transform p-2">
                                                    <Download size={18} />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-primary-burgundy/5 rounded-2xl p-6 border border-primary-burgundy/10">
                        <div className="flex items-start gap-4">
                            <div className="bg-primary-burgundy text-white p-2 rounded-lg">
                                <FileText size={20} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-primary-burgundy uppercase tracking-tight">Información importante</h4>
                                <p className="text-xs text-primary-burgundy/70 mt-1 leading-relaxed">
                                    Si no encuentras algún resultado o tienes dudas con los mismos, puedes contactarnos directamente
                                    a través de nuestro sitio web o por WhatsApp.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
