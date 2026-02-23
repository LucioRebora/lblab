"use client";

import { motion } from "framer-motion";
import {
    Users,
    Settings,
    BarChart3,
    MessageSquare,
    Bell,
    LogOut,
    Search,
    Calendar,
    CheckCircle2
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const stats = [
    { label: "Consultas hoy", value: "12", icon: MessageSquare, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Pacientes nuevos", value: "48", icon: Users, color: "text-primary-green", bg: "bg-green-50" },
    { label: "Estudios listos", value: "85%", icon: CheckCircle2, color: "text-primary-burgundy", bg: "bg-red-50" },
    { label: "Turnos mañana", value: "24", icon: Calendar, color: "text-orange-600", bg: "bg-orange-50" },
];

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin");
        }
    }, [status, router]);

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
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-black text-primary-burgundy uppercase tracking-tighter">
                        LB Lab <span className="text-gray-400 font-light">Admin</span>
                    </h2>
                </div>

                <nav className="flex-grow p-4 space-y-2">
                    {[
                        { label: "Dashboard", icon: BarChart3, active: true },
                        { label: "Consultas", icon: MessageSquare },
                        { label: "Pacientes", icon: Users },
                        { label: "Configuración", icon: Settings },
                    ].map((item, i) => (
                        <button
                            key={i}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${item.active
                                ? "bg-primary-burgundy text-white shadow-lg shadow-primary-burgundy/20"
                                : "text-gray-500 hover:bg-gray-100"
                                }`}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={() => signOut({ callbackUrl: "/admin" })}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
                    >
                        <LogOut size={18} />
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow overflow-y-auto">
                <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
                    <div className="relative w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar paciente o estudio..."
                            className="w-full bg-gray-50 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary-green outline-none"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                        </button>
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
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Panel de Control</h1>
                            <p className="text-gray-500 text-sm font-medium">Bienvenido de nuevo, Administrador.</p>
                        </div>
                        <button className="bg-primary-green text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary-green/20 hover:scale-105 transition-all">
                            Nuevo Resultado
                        </button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4`}>
                                    <stat.icon size={24} />
                                </div>
                                <p className="text-gray-400 text-xs font-black uppercase tracking-widest">{stat.label}</p>
                                <h3 className="text-2xl font-black text-gray-900 mt-1">{stat.value}</h3>
                            </motion.div>
                        ))}
                    </div>

                    {/* Recent Activity Section */}
                    <div className="grid lg:grid-cols-3 gap-8 text-black">
                        <div className="lg:col-span-2 bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
                            <h3 className="text-xl font-bold mb-6">Consultas Recientes</h3>
                            <div className="space-y-4">
                                {[1, 2, 3].map((_, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-gray-100 rounded-xl" />
                                            <div>
                                                <p className="font-bold text-sm">Paciente #{1240 + i}</p>
                                                <p className="text-gray-400 text-xs italic">Consulta sobre análisis de sangre</p>
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-bold text-primary-green bg-green-50 px-3 py-1 rounded-full uppercase">Pendiente</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-16 h-16 bg-red-50 text-primary-burgundy rounded-full flex items-center justify-center mb-2">
                                <BarChart3 size={32} />
                            </div>
                            <h3 className="text-lg font-bold">Estado del Sistema</h3>
                            <p className="text-gray-400 text-sm italic">Todos los equipos (S30 y CM260i) están operando correctamente.</p>
                            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-primary-green w-[98%]" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
