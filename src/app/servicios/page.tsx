"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, ArrowRight, ChevronRight } from "lucide-react";

export default function ServiciosPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="pt-32 pb-20">
                <hr className="w-full border-gray-100 mb-10" />

                {/* Title Section */}
                <div className="flex flex-col items-center justify-center mb-10">
                    <div className="flex items-center gap-3 text-2xl md:text-3xl font-black text-[#1a2b3c] tracking-tight uppercase">
                        <span className="text-3xl">🏠</span>
                        <span>Extracciones a Domicilio</span>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 mt-12">
                    {/* Home Extractions Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl border border-white"
                    >
                        {/* Image Area */}
                        <div className="md:w-[45%] h-[400px] md:h-auto relative">
                            <img
                                src="/img/extradomi.jpeg"
                                alt="Extracciones a Domicilio"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Content Area */}
                        <div className="md:w-[55%] bg-[#c3d8e6] p-12 md:p-20 flex flex-col justify-center space-y-8">
                            <div className="flex items-center gap-4">
                                <span className="text-3xl">🏠</span>
                                <h3 className="text-2xl md:text-3xl font-black text-[#1a2b3c] uppercase tracking-tighter">
                                    Servicio de Extracciones
                                </h3>
                            </div>

                            <div className="space-y-6">
                                <p className="text-[#1a2b3c]/80 text-xl font-medium leading-relaxed italic">
                                    Realizamos extracciones a domicilio para tu comodidad y la de tu familia.
                                    Pensado para pacientes con movilidad reducida, niños o simplemente para quienes
                                    prefieren la privacidad de su hogar.
                                </p>

                                <p className="text-[#1a2b3c] font-black uppercase text-sm tracking-widest leading-relaxed">
                                    Para coordinar día y horario, podés solicitar turno directamente por WhatsApp.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <a
                                        href="https://wa.me/5493446330365"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-3 bg-white text-[#1a2b3c] px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:scale-105 transition-all"
                                    >
                                        Solicitar por WhatsApp
                                        <ArrowRight size={16} />
                                    </a>
                                    <a
                                        href="tel:+5493446330365"
                                        className="inline-flex items-center justify-center gap-3 bg-[#1a2b3c] text-white px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:scale-105 transition-all"
                                    >
                                        <Phone size={16} />
                                        Llamar ahora
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Microbiology Area Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-20 rounded-[3rem] overflow-hidden flex flex-col md:flex-row-reverse shadow-2xl border border-white"
                    >
                        {/* Image Area */}
                        <div className="md:w-[45%] h-[400px] md:h-auto relative">
                            <img
                                src="/img/areamicro.jpeg"
                                alt="Área de Microbiología"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Content Area */}
                        <div className="md:w-[55%] bg-[#b8ccd9] p-12 md:p-20 flex flex-col justify-center space-y-8">
                            <div className="flex items-center gap-4">
                                <span className="text-3xl">🧫</span>
                                <h3 className="text-2xl md:text-3xl font-black text-[#1a2b3c] uppercase tracking-tighter">
                                    Área de Microbiología
                                </h3>
                            </div>

                            <div className="space-y-6">
                                <p className="text-[#1a2b3c]/80 text-lg md:text-xl font-medium leading-relaxed italic">
                                    Nuestro sector de Microbiología realiza bacteriología de alta calidad, aplicando metodologías actualizadas y protocolos estrictos para garantizar resultados confiables.
                                </p>
                                <p className="text-[#1a2b3c]/80 text-sm md:text-base leading-relaxed">
                                    Contamos con controles de calidad internos y externos, incluyendo la participación en los programas del <strong className="text-[#1a2b3c]">Instituto Malbrán</strong>, lo que asegura precisión, trazabilidad y excelencia diagnóstica en cada estudio.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Veterinary Analysis Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-20 rounded-[3rem] overflow-hidden bg-[#c3d8e6] shadow-2xl border border-white p-12 md:p-16"
                    >
                        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                            {/* Left Image - Large Animals */}
                            <div className="w-full md:w-[30%] aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border-4 border-white">
                                <img
                                    src="/img/caballos.jpeg"
                                    alt="Veterinaria - Grandes animales"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Center Content */}
                            <div className="w-full md:w-[35%] flex flex-col items-center text-center space-y-8">
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">🐾</span>
                                    <h3 className="text-2xl md:text-3xl font-black text-[#1a2b3c] uppercase tracking-tighter">
                                        Análisis Veterinarios
                                    </h3>
                                </div>

                                <div className="space-y-6">
                                    <p className="text-[#1a2b3c]/70 text-base md:text-lg font-medium leading-relaxed italic">
                                        Si sos veterinario o necesitás traer la muestra de tu mascota, nuestro laboratorio cuenta con la experiencia y el equipamiento necesario para realizar estudios confiables.
                                    </p>
                                    <p className="text-[#1a2b3c]/70 text-sm md:text-base leading-relaxed">
                                        Trabajamos con procedimientos seguros y precisos para acompañar el cuidado de la salud animal.
                                    </p>
                                </div>
                            </div>

                            {/* Right Image - Small Animals */}
                            <div className="w-full md:w-[30%] aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border-4 border-white">
                                <img
                                    src="/img/gatos.jpeg"
                                    alt="Veterinaria - Mascotas"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Services for Veterinarians Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-20 rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl border border-white"
                    >
                        {/* Image Area */}
                        <div className="md:w-[45%] h-[400px] md:h-auto relative">
                            <img
                                src="/img/veterinariosunidos.jpeg"
                                alt="Servicios para Veterinarios"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Content Area */}
                        <div className="md:w-[55%] bg-[#b8ccd9] p-12 md:p-20 flex flex-col justify-center space-y-8">
                            <div className="flex items-center gap-4">
                                <span className="text-3xl">🐶</span>
                                <h3 className="text-2xl md:text-3xl font-black text-[#1a2b3c] uppercase tracking-tighter">
                                    Servicios para Veterinarios
                                </h3>
                            </div>

                            <div className="space-y-8">
                                <p className="text-[#1a2b3c]/80 text-lg md:text-xl font-medium leading-relaxed italic">
                                    Si sos veterinario y querés que seamos tu laboratorio de confianza, podés contactarnos para solicitar la lista de precios y conocer nuestra modalidad de trabajo.
                                </p>

                                <div className="pt-4">
                                    <Link
                                        href="/derivaciones"
                                        className="inline-flex items-center gap-3 bg-[#e31e3d] text-white px-10 py-4 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:bg-[#c41935] hover:scale-105 transition-all"
                                    >
                                        <ChevronRight size={16} />
                                        VER MAS
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Plasma Rico en Plaqueta (PRP) Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-20 rounded-[3rem] overflow-hidden flex flex-col md:flex-row-reverse shadow-2xl border border-white"
                    >
                        {/* Image Area */}
                        <div className="md:w-[45%] h-[400px] md:h-auto relative">
                            <img
                                src="/img/plasmarico.jpeg"
                                alt="Plasma Rico en Plaqueta"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Content Area */}
                        <div className="md:w-[55%] bg-[#c3d8e6] p-12 md:p-20 flex flex-col justify-center space-y-8">
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                    <span className="text-2xl">🩸</span>
                                    <span className="text-2xl text-gray-500">🔬</span>
                                </span>
                                <h3 className="text-2xl md:text-3xl font-black text-[#1a2b3c] uppercase tracking-tighter">
                                    Plasma Rico en Plaqueta
                                </h3>
                            </div>

                            <div className="space-y-6">
                                <p className="text-[#1a2b3c]/80 text-sm font-bold uppercase tracking-widest">
                                    Nueva modalidad de trabajo – LB LAB
                                </p>
                                <p className="text-[#1a2b3c]/80 text-lg md:text-xl font-medium leading-relaxed italic">
                                    Elaboramos <strong className="text-[#1a2b3c]">Plasma Rico en Plaquetas (PRP)</strong> bajo un protocolo estandarizado, seguro y reproducible, garantizando calidad celular y trazabilidad en cada preparación.
                                </p>

                                <div className="pt-4">
                                    <Link
                                        href="/prp"
                                        className="inline-flex items-center gap-3 bg-[#e31e3d] text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-[0.1em] shadow-lg hover:bg-[#c41935] hover:scale-105 transition-all"
                                    >
                                        PRP - MAS INFORMACION
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Derivaciones Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-20 rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl border border-white"
                    >
                        {/* Image Area */}
                        <div className="md:w-[45%] h-[400px] md:h-auto relative">
                            <img
                                src="/img/derivando.jpeg"
                                alt="Derivaciones Profesionales"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Content Area */}
                        <div className="md:w-[55%] bg-[#b8ccd9] p-12 md:p-20 flex flex-col justify-center space-y-8">
                            <div>
                                <h3 className="text-xl md:text-2xl font-black text-[#1a2b3c] uppercase tracking-tighter mb-8">
                                    Derivaciones
                                </h3>

                                <div className="space-y-6">
                                    <p className="text-[#1a2b3c]/80 text-lg font-medium leading-relaxed italic">
                                        En <strong className="text-[#1a2b3c]">LB LAB</strong> recibimos <strong className="text-[#1a2b3c]">derivaciones de profesionales de la salud</strong> para estudios especializados en:
                                    </p>

                                    <ul className="space-y-3 text-[#1a2b3c]/80 font-medium">
                                        <li className="flex items-center gap-3">
                                            <span>🧫</span> Bacteriología
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <span>🍄</span> Micología
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <span>🧪</span> Serología
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <span>🏥</span> Medio interno
                                        </li>
                                        <li className="flex items-center gap-3 italic">
                                            <span>🔬</span> Y otras determinaciones específicas según necesidad clínica
                                        </li>
                                    </ul>

                                    <p className="text-[#1a2b3c]/80 font-medium mt-6">
                                        Para más información, <strong className="text-[#1a2b3c]">leer más.</strong>
                                    </p>

                                    <div className="pt-4 flex justify-end">
                                        <Link
                                            href="/derivaciones"
                                            className="inline-flex items-center gap-3 bg-[#e31e3d] text-white px-10 py-4 rounded-full font-black text-xs uppercase tracking-[0.1em] shadow-lg hover:bg-[#c41935] hover:scale-105 transition-all"
                                        >
                                            LEER MAS...
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
