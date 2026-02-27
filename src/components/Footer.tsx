"use client";

import { MapPin, LayoutDashboard, Instagram, Facebook, MessageCircle, Phone } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Footer() {
    const { status } = useSession();
    const isAdmin = status === "authenticated";
    return (
        <footer className="bg-sage-bg pt-10 pb-12 border-t border-primary-green/5 text-gray-900">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Bottom Section: Separator and Footer Credits */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8">
                    {/* Left side: Copyright */}
                    <div className="space-y-1 w-full md:w-1/3 text-center md:text-left">
                        <p className="text-gray-400 text-[10px] font-black tracking-widest uppercase">
                            © 2026 LB LAB – LABORATORIO DE BIOANÁLISIS.
                        </p>
                        <p className="flex items-baseline justify-center md:justify-start gap-1 text-gray-600">
                            <span className="font-light text-[11px] tracking-normal">
                                Hecho con <span className="text-[13px] mx-0.5 text-red-500 font-normal">♡</span> en
                            </span>
                            <a href="https://itia.ar/" target="_blank" rel="noopener noreferrer" className="font-bold text-[11px] tracking-normal hover:underline transition-colors hover:text-gray-800">
                                itia.ar
                            </a>
                        </p>
                    </div>

                    {/* Center: Social Icons */}
                    <div className="flex gap-6 items-center justify-center w-full md:w-1/3">
                        <a href="tel:3446434574" className="text-gray-400 hover:text-primary-burgundy transition-all hover:scale-110">
                            <Phone size={20} />
                        </a>
                        <a href="https://wa.me/5493446330365" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#25D366] transition-all hover:scale-110">
                            <MessageCircle size={20} />
                        </a>
                        <a href="https://www.instagram.com/lb.lab?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-600 transition-all hover:scale-110">
                            <Instagram size={20} />
                        </a>
                        <a href="https://web.facebook.com/laboratoriolblab/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-all hover:scale-110">
                            <Facebook size={20} />
                        </a>
                    </div>

                    {/* Right side: Admin Access */}
                    <div className="w-full md:w-1/3 flex justify-center md:justify-end">
                        <Link
                            href="/admin"
                            className="inline-flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-gray-400 hover:text-primary-green transition-colors group"
                        >
                            <LayoutDashboard size={14} className="group-hover:scale-110 transition-transform" />
                            Acceso Panel
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
