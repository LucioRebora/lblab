"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, MapPin, Settings } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";

const navLinks = [
    { name: "INICIO", href: "/#inicio" },
    { name: "QUIENES SOMOS", href: "/quienes-somos" },
    { name: "INDICACIONES", href: "/indicaciones" },
    { name: "VETERINARIA", href: "/veterinaria" },
    { name: "CONTACTO", href: "/contacto" },
    { name: "SERVICIOS", href: "/servicios" },
    { name: "DERIVACIONES", href: "/derivaciones" },
    { name: "PRP", href: "/prp" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-2" : "bg-white py-4"
                }`}
        >
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-6">
                <div className="flex justify-between items-center h-22 md:h-24">
                    {/* Logo - Vertically Centered on the Left */}
                    <div className="flex-shrink-0 flex items-center h-full">
                        <Link href="/" className="flex items-center">
                            <div className="relative w-40 h-40 md:w-52 md:h-52 flex items-center">
                                <Image
                                    src="/img/logo-lblab.png"
                                    alt="LB Lab Logo"
                                    width={200}
                                    height={200}
                                    className="object-contain"
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Menu - On the Right */}
                    <div className="hidden lg:flex items-center space-x-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-[13px] font-bold text-gray-700 hover:text-primary-green transition-colors tracking-widest uppercase"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/#mapa"
                            className="flex items-center gap-2 bg-sage-bg text-gray-700 px-4 py-2.5 rounded-full text-[13px] font-black tracking-widest hover:bg-gray-200 transition-all border border-gray-200"
                        >
                            <MapPin size={14} className="text-primary-green" />
                            UBICACIÓN
                        </Link>
                        <a
                            href="https://redlab.com.ar/lblab"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary-burgundy text-white px-6 py-2.5 rounded-full text-[13px] font-black tracking-widest hover:bg-opacity-90 transition-all shadow-lg hover:shadow-primary-burgundy/20"
                        >
                            RESULTADOS
                        </a>
                        <Link
                            href="/admin"
                            className="text-gray-400 hover:text-primary-green transition-colors p-1 flex items-center justify-center"
                            title="Panel de Control"
                        >
                            <Settings size={20} strokeWidth={2.5} />
                        </Link>
                    </div>

                    {/* Mobile Button */}
                    <div className="lg:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-primary-green p-2"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                    } bg-white border-t border-gray-100 shadow-2xl relative z-40`}
            >
                <div className="px-6 pt-4 pb-12 space-y-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="block py-4 text-xs font-black text-gray-900 border-b border-gray-50 uppercase tracking-widest"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/#mapa"
                        onClick={() => setIsOpen(false)}
                        className="block py-4 text-xs font-black text-primary-green border-b border-gray-50 uppercase tracking-widest flex items-center gap-2"
                    >
                        <MapPin size={14} />
                        UBICACIÓN
                    </Link>
                    <a
                        href="https://redlab.com.ar/lblab"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)}
                        className="block w-full text-center bg-primary-burgundy text-white px-5 py-5 rounded-2xl text-xs font-black mt-8 tracking-[0.2em]"
                    >
                        RESULTADOS ONLINE
                    </a>
                    <Link
                        href="/admin"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center gap-2 mt-6 text-gray-400 hover:text-primary-green text-[11px] font-black tracking-widest uppercase transition-colors"
                    >
                        <Settings size={18} strokeWidth={2.5} />
                        Panel de Control
                    </Link>
                </div>
            </div>
        </nav>
    );
}
