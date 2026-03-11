"use client";

import Sidebar from "@/components/admin/Sidebar";
import DerivacionForm from "@/components/admin/DerivacionForm";
import { PlusCircle, Search } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SolicitudAnalisisPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin");
        }
    }, [status, router]);

    const isAdmin = (session?.user as any)?.role?.toUpperCase() === 'ADMIN';
    const canAccess = isAdmin || (session?.user as any)?.canAccessDerivaciones;

    if (status === "loading") return null;
    if (!session || !canAccess) return null;

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />

            <main className="flex-grow overflow-y-auto">
                <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
                    <div className="relative w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="w-full bg-gray-50 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary-green outline-none"
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

                <div className="p-8 max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Solicitud de Análisis</h1>
                        <p className="text-gray-500 text-sm font-medium tracking-wide">Complete los datos para enviar una nueva solicitud de derivación.</p>
                    </div>

                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl p-10">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shadow-inner">
                                <PlusCircle size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Nueva Derivación</h3>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Laboratorio LB Lab</p>
                            </div>
                        </div>

                        <DerivacionForm onSuccess={() => router.push("/admin/dashboard")} />
                    </div>
                </div>
            </main>
        </div>
    );
}
