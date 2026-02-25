"use client";

import { MapPin, LayoutDashboard } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Footer() {
    const { status } = useSession();
    const isAdmin = status === "authenticated";
    return (
        <footer className="bg-sage-bg pt-20 pb-12 border-t border-primary-green/5 text-gray-900">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Top: Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 mb-20">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <h4 className="text-primary-green font-black text-[15px] tracking-tight uppercase">
                            LB LAB – Laboratorio de Bioanálisis.
                        </h4>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs font-medium">
                            Compromiso, precisión y calidez humana en cada estudio. Tecnología avanzada para tu salud.
                        </p>
                    </div>

                    {/* Contact Column */}
                    <div className="space-y-4 px-0 md:px-8">
                        <h4 className="text-primary-green font-black text-[15px] tracking-tight uppercase">
                            Datos de contacto
                        </h4>
                        <div className="space-y-3">
                            <p className="text-gray-500 text-sm">
                                WhatsApp: <span className="font-bold text-gray-800 tracking-wide">+54 9 3446 330365</span>
                            </p>
                            <p className="text-gray-500 text-sm">
                                Teléfono: <span className="font-bold text-gray-800 tracking-wide">3446 434574</span>
                            </p>
                        </div>
                    </div>

                    {/* Address Column */}
                    <div className="space-y-4">
                        <div className="space-y-4">
                            <h4 className="text-primary-green font-black text-[15px] tracking-tight uppercase">
                                Dirección
                            </h4>
                            <a
                                href="#mapa"
                                className="flex items-start gap-2 group hover:opacity-80 transition-opacity"
                            >
                                <MapPin size={18} className="text-primary-burgundy mt-0.5 shrink-0" />
                                <p className="text-gray-900 font-bold text-sm leading-relaxed hover:underline decoration-primary-green/30 cursor-pointer">
                                    Bolívar 1002, Gualeguaychú, <br />Entre Ríos, Argentina
                                </p>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Separator and Footer Credits */}
                <div className="pt-10 border-t border-primary-green/10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                    {/* Left side: Copyright */}
                    <div className="space-y-1">
                        <p className="text-gray-400 text-[10px] font-black tracking-widest uppercase">
                            © 2026 LB LAB – LABORATORIO DE BIOANÁLISIS. TODOS LOS DERECHOS RESERVADOS.
                        </p>
                        <p className="text-gray-400 text-[9px] font-bold tracking-[0.2em] uppercase flex items-center gap-2">
                            POWERED BY <a href="https://itia.ar/" target="_blank" rel="noopener noreferrer" className="text-primary-green hover:underline">ITIA.AR</a>
                        </p>
                    </div>

                    {/* Right side: Admin Access */}
                    <Link
                        href="/admin"
                        className="inline-flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-gray-400 hover:text-primary-green transition-colors group"
                    >
                        <LayoutDashboard size={14} className="group-hover:scale-110 transition-transform" />
                        Acceso Panel
                    </Link>
                </div>
            </div>
        </footer>
    );
}
