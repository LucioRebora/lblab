"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";
import {
    BarChart3,
    Calendar,
    Upload,
    MessageSquare,
    Users,
    Settings,
    ExternalLink,
    LogOut,
    ChevronDown,
    ChevronRight,
    FileText,
    Dog,
    Mail
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useSession } from "next-auth/react";

export default function Sidebar() {
    const { data: session } = useSession();
    const pathname = usePathname();
    const [isConfigOpen, setIsConfigOpen] = useState(false);

    const isAdmin = session?.user?.role === 'ADMIN';
    const isSecretary = session?.user?.role === 'SECRETARY';
    const isStaff = isAdmin || isSecretary;

    const adminMenuItems = [
        { name: "Dashboard", href: "/admin/dashboard", icon: BarChart3 },
        { name: "Turnos PRP", href: "/admin/appointments", icon: Calendar },
        { name: "Veterinarias", href: "/admin/veterinaria", icon: Dog },
        { name: "Derivaciones", href: "/admin/derivaciones", icon: Upload },
        { name: "Consultas", href: "/admin/consultas", icon: MessageSquare },
        { name: "Usuarios", href: "/admin/users", icon: Users, adminOnly: true },
    ];

    const menuItems = isStaff
        ? adminMenuItems.filter(item => !item.adminOnly || isAdmin)
        : [
            { name: "Resultados", href: "/admin/resultados", icon: FileText },
        ];

    return (
        <aside className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col h-screen sticky top-0">
            <div className="py-3 px-4 border-b border-gray-100 flex items-center justify-center">
                <div className="relative w-48 h-32">
                    <Image
                        src="/img/logo-lblab.png"
                        alt="LB Lab Logo"
                        fill
                        className="object-contain"
                    />
                </div>
            </div>

            <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${isActive
                                ? "bg-primary-burgundy text-white shadow-lg shadow-primary-burgundy/20"
                                : "text-gray-500 hover:bg-gray-100"
                                }`}
                        >
                            <Icon size={18} />
                            {item.name}
                        </Link>
                    );
                })}

                {/* Collapsible Configuration - Only for Admins */}
                {isAdmin && (
                    <div className="space-y-1">
                        <button
                            onClick={() => setIsConfigOpen(!isConfigOpen)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${isConfigOpen ? "text-primary-burgundy bg-gray-50" : "text-gray-500 hover:bg-gray-100"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <Settings size={18} />
                                Configuración
                            </div>
                            {isConfigOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </button>

                        <AnimatePresence>
                            {isConfigOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden pl-10"
                                >
                                    <Link
                                        href="/admin/infomail"
                                        className={`w-full flex items-center gap-3 py-2 text-xs font-bold transition-all ${pathname === "/admin/infomail"
                                            ? "text-primary-burgundy"
                                            : "text-gray-400 hover:text-gray-600"
                                            }`}
                                    >
                                        <Mail size={14} />
                                        InfoMail
                                    </Link>
                                    <Link
                                        href="/admin/config/precios-derivantes"
                                        className={`w-full flex items-center gap-3 py-2 text-xs font-bold transition-all ${pathname === "/admin/config/precios-derivantes"
                                            ? "text-primary-burgundy"
                                            : "text-gray-400 hover:text-gray-600"
                                            }`}
                                    >
                                        <FileText size={14} />
                                        Lista Precios Derivantes
                                    </Link>
                                    <Link
                                        href="/admin/config/precios-veterinarias"
                                        className={`w-full flex items-center gap-3 py-2 text-xs font-bold transition-all ${pathname === "/admin/config/precios-veterinarias"
                                            ? "text-primary-burgundy"
                                            : "text-gray-400 hover:text-gray-600"
                                            }`}
                                    >
                                        <FileText size={14} />
                                        Lista Precios Veterinarias
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}

                <div className="pt-4 mt-4 border-t border-gray-100">
                    <Link
                        href="/"
                        target="_blank"
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-primary-green hover:bg-green-50 transition-all group"
                    >
                        <ExternalLink size={18} className="group-hover:scale-110 transition-transform" />
                        Ver sitio web
                    </Link>
                </div>
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
    );
}
