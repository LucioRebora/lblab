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
    CheckCircle2,
    ExternalLink,
    Upload,
    Dog
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/admin/Sidebar";

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [submissions, setSubmissions] = useState<any[]>([]);
    const [statsData, setStatsData] = useState({
        consultasHoy: 0,
        turnosManana: 0,
        totalPacientes: 0,
        veterinaryToday: 0,
        estudiosListos: "0%"
    });
    const [vetAppointments, setVetAppointments] = useState<any[]>([]);
    const [prpAppointments, setPrpAppointments] = useState<any[]>([]);
    const [loadingSubmissions, setLoadingSubmissions] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin");
        } else if (status === "authenticated" && session?.user?.role !== 'ADMIN') {
            router.push("/admin/resultados");
        }
    }, [status, router, session]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch Submissions
                const subRes = await fetch("/api/admin/submissions");
                if (subRes.ok) {
                    const data = await subRes.json();
                    setSubmissions(data.submissions);
                }

                // Fetch Stats
                const statsRes = await fetch("/api/admin/stats");
                if (statsRes.ok) {
                    const data = await statsRes.json();
                    setStatsData(data);
                }

                // Fetch Veterinary
                const vetRes = await fetch("/api/admin/veterinaria");
                if (vetRes.ok) {
                    const data = await vetRes.json();
                    setVetAppointments(data.slice(0, 5)); // Only show last 5
                }

                // Fetch PRP
                const prpRes = await fetch("/api/admin/appointments");
                if (prpRes.ok) {
                    const data = await prpRes.json();
                    setPrpAppointments(data.slice(0, 5)); // Only show last 5
                }
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoadingSubmissions(false);
            }
        };

        if (session) {
            fetchDashboardData();
        }
    }, [session]);

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center font-black uppercase tracking-widest text-primary-burgundy animate-pulse">
                Cargando Panel...
            </div>
        );
    }

    const currentStats = [
        { label: "Consultas hoy", value: statsData.consultasHoy.toString(), icon: MessageSquare, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Solicitudes Vet", value: statsData.veterinaryToday.toString(), icon: Dog, color: "text-primary-green", bg: "bg-green-50" },
        { label: "Estudios listos", value: statsData.estudiosListos, icon: CheckCircle2, color: "text-primary-burgundy", bg: "bg-red-50" },
        { label: "Turnos mañana", value: statsData.turnosManana.toString(), icon: Calendar, color: "text-orange-600", bg: "bg-orange-50" },
    ];

    const isAdmin = session?.user?.role === 'ADMIN';

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
                            placeholder="Buscar paciente o estudio..."
                            className="w-full bg-gray-50 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary-green outline-none"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-gray-900">{session.user?.name}</p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                                    {isAdmin ? "Admin" : "Usuario"}
                                </p>
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
                            <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
                                {isAdmin ? "Panel de Control" : "Área de Usuario"}
                            </h1>
                            <p className="text-gray-500 text-sm font-medium">
                                {isAdmin ? "Bienvenido de nuevo, Administrador." : "Bienvenido al portal del Laboratorio LB Lab."}
                            </p>
                        </div>
                        {isAdmin && (
                            <button className="bg-primary-green text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary-green/20 hover:scale-105 transition-all">
                                Nuevo Resultado
                            </button>
                        )}
                    </div>

                    {!isAdmin ? (
                        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-12 text-center space-y-6">
                            <div className="w-20 h-20 bg-gray-50 text-gray-300 rounded-[2rem] flex items-center justify-center mx-auto">
                                <Upload size={40} />
                            </div>
                            <div className="max-w-md mx-auto">
                                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-2">Acceso Restringido</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                                    Tu cuenta no tiene permisos para acceder a las herramientas administrativas.
                                    Puedes utilizar el botón de abajo para volver al sitio principal.
                                </p>
                                <Link
                                    href="/"
                                    className="inline-block bg-primary-green text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary-green/20 hover:scale-105 transition-all uppercase tracking-widest"
                                >
                                    Volver al Sitio Web
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {currentStats.map((stat, i) => (
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

                            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 text-black">
                                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-bold">Consultas Recientes</h3>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Últimas {submissions.length}</p>
                                    </div>
                                    <div className="space-y-4">
                                        {loadingSubmissions ? (
                                            <div className="py-12 text-center text-gray-400 animate-pulse font-bold uppercase tracking-widest text-xs">
                                                Cargando consultas...
                                            </div>
                                        ) : submissions.length === 0 ? (
                                            <div className="py-12 text-center text-gray-400 font-bold uppercase tracking-widest text-xs border-2 border-dashed border-gray-100 rounded-3xl">
                                                No hay consultas nuevas
                                            </div>
                                        ) : (
                                            submissions.map((sub, i) => (
                                                <div key={sub.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 bg-primary-burgundy/5 text-primary-burgundy rounded-xl flex items-center justify-center font-bold text-xs uppercase">
                                                            {sub.name.substring(0, 2)}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-sm">{sub.name}</p>
                                                            <p className="text-gray-400 text-xs italic line-clamp-1">{sub.comment}</p>
                                                            <p className="text-[10px] text-gray-300 font-bold mt-1 uppercase tracking-tighter">
                                                                {sub.email} {sub.web && `| ${sub.web}`}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-[10px] font-bold text-primary-green bg-green-50 px-3 py-1 rounded-full uppercase block mb-1">Nueva</span>
                                                        <span className="text-[9px] text-gray-300 font-bold uppercase">
                                                            {new Date(sub.createdAt).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>

                                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-bold">Turnos Veterinarios</h3>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Últimos {vetAppointments.length}</p>
                                    </div>
                                    <div className="space-y-4">
                                        {loadingSubmissions ? (
                                            <div className="py-12 text-center text-gray-400 animate-pulse font-bold uppercase tracking-widest text-xs">
                                                Cargando...
                                            </div>
                                        ) : vetAppointments.length === 0 ? (
                                            <div className="py-12 text-center text-gray-400 font-bold uppercase tracking-widest text-xs border-2 border-dashed border-gray-100 rounded-3xl">
                                                No hay turnos vet.
                                            </div>
                                        ) : (
                                            vetAppointments.map((apt) => (
                                                <div key={apt.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 bg-primary-green/5 text-primary-green rounded-xl flex items-center justify-center">
                                                            <Dog size={20} />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-sm">{apt.patient}</p>
                                                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-tighter">{apt.veterinary}</p>
                                                            <div className="flex flex-wrap gap-1 mt-1">
                                                                {apt.analysis.slice(0, 2).map((a: string, i: number) => (
                                                                    <span key={i} className="text-[8px] font-black uppercase bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded">
                                                                        {a}
                                                                    </span>
                                                                ))}
                                                                {apt.analysis.length > 2 && <span className="text-[8px] font-black text-gray-300">+{apt.analysis.length - 2}</span>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-full ${apt.status === 'PENDING' ? 'text-orange-500 bg-orange-50' :
                                                            apt.status === 'COMPLETED' ? 'text-primary-green bg-green-50' :
                                                                'text-red-500 bg-red-50'
                                                            }`}>
                                                            {apt.status === 'PENDING' ? 'Pdte' : apt.status === 'COMPLETED' ? 'OK' : 'X'}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    <Link
                                        href="/admin/veterinaria"
                                        className="mt-6 block text-center text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-primary-green transition-colors"
                                    >
                                        Ver todos los turnos
                                    </Link>
                                </div>

                                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-bold">Turnos PRP</h3>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Últimos {prpAppointments.length}</p>
                                    </div>
                                    <div className="space-y-4">
                                        {loadingSubmissions ? (
                                            <div className="py-12 text-center text-gray-400 animate-pulse font-bold uppercase tracking-widest text-xs">
                                                Cargando...
                                            </div>
                                        ) : prpAppointments.length === 0 ? (
                                            <div className="py-12 text-center text-gray-400 font-bold uppercase tracking-widest text-xs border-2 border-dashed border-gray-100 rounded-3xl">
                                                No hay turnos PRP.
                                            </div>
                                        ) : (
                                            prpAppointments.map((apt) => (
                                                <div key={apt.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
                                                            <Calendar size={20} />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-sm">{apt.patient}</p>
                                                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-tighter">
                                                                {apt.date.split('-').reverse().join('/')} | {apt.time} hs
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-full ${apt.status === 'SCHEDULED' ? 'text-orange-500 bg-orange-50' :
                                                            apt.status === 'COMPLETED' ? 'text-primary-green bg-green-50' :
                                                                'text-red-500 bg-red-50'
                                                            }`}>
                                                            {apt.status === 'SCHEDULED' ? 'Pdte' : apt.status === 'COMPLETED' ? 'OK' : 'X'}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    <Link
                                        href="/admin/appointments"
                                        className="mt-6 block text-center text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-orange-600 transition-colors"
                                    >
                                        Ver todos los turnos PRP
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
