"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, MapPin, Settings, User, LogOut, LayoutDashboard } from "lucide-react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

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
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);

    const getInitials = (name?: string | null) => {
        if (!name) return "U";
        const names = name.split(" ");
        if (names.length >= 2) {
            return `${names[0][0]}${names[1][0]}`.toUpperCase();
        }
        return names[0].substring(0, 1).toUpperCase();
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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

                        {/* User Session - Separated to the right */}
                        <div className="flex items-center ml-4 pl-6 border-l border-gray-100">
                            {status === "authenticated" ? (
                                <div className="relative" ref={userMenuRef}>
                                    <button
                                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                        className="w-9 h-9 rounded-full bg-primary-burgundy text-white flex items-center justify-center text-[11px] font-black tracking-tighter hover:bg-black transition-all shadow-md"
                                        title="Mi Cuenta"
                                    >
                                        <span>{getInitials(session?.user?.name)}</span>
                                    </button>

                                    <AnimatePresence>
                                        {isUserMenuOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 overflow-hidden"
                                            >
                                                <div className="px-4 py-3 border-b border-gray-50 mb-1">
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Conectado como</p>
                                                    <p className="text-xs font-bold text-gray-800 truncate">{session?.user?.name || session?.user?.email}</p>
                                                </div>
                                                <Link
                                                    href="/admin/dashboard"
                                                    onClick={() => setIsUserMenuOpen(false)}
                                                    className="flex items-center gap-3 px-4 py-3 text-[13px] font-bold text-gray-700 hover:bg-gray-50 hover:text-primary-green transition-all"
                                                >
                                                    <LayoutDashboard size={16} strokeWidth={2.5} />
                                                    INGRESAR
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        setIsUserMenuOpen(false);
                                                        signOut();
                                                    }}
                                                    className="w-full flex items-center gap-3 px-4 py-3 text-[13px] font-bold text-red-500 hover:bg-red-50 transition-all border-t border-gray-50 mt-1"
                                                >
                                                    <LogOut size={16} strokeWidth={2.5} />
                                                    LOGOUT
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <Link
                                    href="/admin"
                                    className="text-gray-400 hover:text-primary-green transition-colors p-1 flex items-center justify-center"
                                    title="Iniciar Sesión"
                                >
                                    <User size={20} strokeWidth={2.5} />
                                </Link>
                            )}
                        </div>
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
                    <div className="flex flex-col items-center justify-center gap-4 mt-8">
                        {status === "authenticated" ? (
                            <div className="w-full space-y-3">
                                <div className="flex flex-col items-center gap-2 mb-4">
                                    <div className="w-16 h-16 rounded-full bg-primary-burgundy text-white flex items-center justify-center text-lg font-black shadow-xl">
                                        {getInitials(session?.user?.name)}
                                    </div>
                                    <p className="text-xs font-black text-gray-900 uppercase tracking-widest">{session?.user?.name}</p>
                                </div>
                                <Link
                                    href="/admin/dashboard"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full flex items-center justify-center gap-3 bg-gray-50 text-gray-700 px-6 py-4 rounded-2xl text-[13px] font-black tracking-[0.2em] border border-gray-100 hover:bg-primary-green hover:text-white transition-all shadow-sm"
                                >
                                    <LayoutDashboard size={18} strokeWidth={2.5} />
                                    INGRESAR
                                </Link>
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        signOut();
                                    }}
                                    className="w-full flex items-center justify-center gap-3 bg-red-50 text-red-500 px-6 py-4 rounded-2xl text-[13px] font-black tracking-[0.2em] border border-red-100 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                >
                                    <LogOut size={18} strokeWidth={2.5} />
                                    LOGOUT
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/admin"
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-primary-green transition-colors p-2 flex items-center justify-center border border-gray-50 rounded-xl"
                                title="Iniciar Sesión"
                            >
                                <User size={22} strokeWidth={2.5} />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
