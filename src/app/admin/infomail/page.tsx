"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "@/components/admin/Sidebar";
import { Mail, Search } from "lucide-react";

export default function InfoMailPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin");
        } else if (status === "authenticated" && session?.user?.role !== 'ADMIN') {
            router.push("/admin/dashboard");
        }
    }, [status, router, session]);

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center font-black uppercase tracking-widest text-primary-burgundy animate-pulse">
                Cargando...
            </div>
        );
    }

    if (!session) return null;

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />

            <main className="flex-grow overflow-y-auto">
                <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
                    <h1 className="text-lg font-black text-gray-900 uppercase tracking-tight">InfoMail</h1>
                    <div className="flex items-center gap-4">
                        <button className="bg-gray-50 text-gray-400 p-2.5 rounded-xl hover:bg-gray-100 transition-colors">
                            <Search size={20} />
                        </button>
                        <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl">
                            <div className="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center text-white font-bold text-xs uppercase">
                                {session.user?.name?.substring(0, 2)}
                            </div>
                            <p className="text-sm font-bold text-gray-900">{session.user?.name}</p>
                        </div>
                    </div>
                </header>

                <div className="p-8 space-y-8 text-black">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">InfoMail</h2>
                            <p className="text-gray-500 text-sm font-medium">Gestión de correos informativos y boletines.</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-12 text-center space-y-6">
                        <div className="w-20 h-20 bg-primary-green/5 text-primary-green rounded-[2rem] flex items-center justify-center mx-auto">
                            <Mail size={40} />
                        </div>
                        <div className="max-w-md mx-auto">
                            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-2">Espacio en Blanco</h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-8 font-medium">
                                Este módulo está siendo preparado. Aquí podrás configurar y enviar correos informativos a los usuarios.
                            </p>
                            <button className="bg-primary-green text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary-green/20 hover:scale-105 transition-all opacity-50 cursor-not-allowed uppercase tracking-widest">
                                Configurar Campaña
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
