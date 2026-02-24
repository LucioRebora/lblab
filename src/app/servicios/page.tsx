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

                <div className="max-w-7xl mx-auto px-6 mt-12">
                    {/* Home Extractions Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-xl border border-gray-100 bg-white group hover:shadow-2xl transition-all duration-500"
                    >
                        {/* Image Area */}
                        <div className="md:w-[45%] h-[400px] md:h-auto relative overflow-hidden">
                            <img
                                src="/img/extradomi.jpeg"
                                alt="Extracciones a Domicilio"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                        </div>

                        {/* Content Area */}
                        <div className="md:w-[55%] bg-sage-bg p-12 md:p-20 flex flex-col justify-center space-y-8 relative">
                            <div className="absolute top-10 right-10 opacity-10">
                                <span className="text-8xl">🏠</span>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter leading-none">
                                    Extracciones a <br />
                                    <span className="text-primary-green">Domicilio</span>
                                </h3>
                                <div className="h-2 w-24 bg-primary-burgundy rounded-full shadow-sm shadow-primary-burgundy/20" />
                            </div>

                            <div className="space-y-6">
                                <p className="text-gray-600 text-xl font-light leading-relaxed italic uppercase tracking-wider">
                                    Realizamos extracciones a domicilio para tu comodidad y la de tu familia.
                                    Pensado para pacientes con movilidad reducida, niños o simplemente para quienes
                                    prefieren la privacidad de su hogar.
                                </p>

                                <p className="text-primary-green font-black uppercase text-[10px] tracking-[0.3em] leading-relaxed">
                                    Para coordinar día y horario, podés solicitar turno directamente por WhatsApp.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <a
                                        href="https://wa.me/5493446330365"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-3 bg-white text-gray-900 px-8 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-lg hover:shadow-primary-green/20 hover:border-primary-green border border-gray-100 transition-all font-bold"
                                    >
                                        Solicitar por WhatsApp
                                        <ArrowRight size={14} className="text-primary-green" strokeWidth={3} />
                                    </a>
                                    <a
                                        href="tel:+5493446330365"
                                        className="inline-flex items-center justify-center gap-3 bg-primary-green text-white px-8 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-lg hover:shadow-primary-green/30 transition-all"
                                    >
                                        <Phone size={14} strokeWidth={3} />
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
                        className="mt-20 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row-reverse shadow-xl border border-gray-100 bg-white group hover:shadow-2xl transition-all duration-500"
                    >
                        {/* Image Area */}
                        <div className="md:w-[45%] h-[400px] md:h-auto relative overflow-hidden">
                            <img
                                src="/img/areamicro.jpeg"
                                alt="Área de Microbiología"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent" />
                        </div>

                        {/* Content Area */}
                        <div className="md:w-[55%] bg-sage-bg p-12 md:p-20 flex flex-col justify-center space-y-8 relative text-right md:text-left">
                            <div className="absolute top-10 left-10 opacity-10 hidden md:block">
                                <span className="text-8xl">🧫</span>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter leading-none">
                                    Área de <br />
                                    <span className="text-primary-burgundy">Microbiología</span>
                                </h3>
                                <div className="h-2 w-24 bg-primary-green rounded-full shadow-sm shadow-primary-green/20 ml-auto md:ml-0" />
                            </div>

                            <div className="space-y-6">
                                <p className="text-gray-600 text-lg md:text-xl font-light leading-relaxed italic uppercase tracking-wider">
                                    Nuestro sector de Microbiología realiza bacteriología de alta calidad, aplicando metodologías actualizadas y protocolos estrictos para garantizar resultados confiables.
                                </p>
                                <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium">
                                    Contamos con controles de calidad internos y externos, incluyendo la participación en los programas del <strong className="text-gray-900 font-black">Instituto Malbrán</strong>, lo que asegura precisión, trazabilidad y excelencia diagnóstica en cada estudio.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Veterinary Analysis Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-20 rounded-[2.5rem] overflow-hidden bg-sage-bg shadow-xl border border-white p-12 md:p-20 group hover:shadow-2xl transition-all duration-500"
                    >
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                            {/* Left Image - Large Animals */}
                            <div className="w-full lg:w-[30%] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                                <img
                                    src="/img/caballos.jpeg"
                                    alt="Veterinaria - Grandes animales"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                />
                            </div>

                            {/* Center Content */}
                            <div className="w-full lg:w-[40%] flex flex-col items-center text-center space-y-10">
                                <div className="space-y-4">
                                    <h3 className="text-3xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter leading-none">
                                        Análisis <br />
                                        <span className="text-primary-green">Veterinarios</span>
                                    </h3>
                                    <div className="h-2 w-32 bg-primary-burgundy mx-auto rounded-full shadow-sm shadow-primary-burgundy/20" />
                                </div>

                                <div className="space-y-6">
                                    <p className="text-gray-600 text-lg md:text-xl font-light leading-relaxed italic uppercase tracking-wider">
                                        Si sos veterinario o necesitás traer la muestra de tu mascota, nuestro laboratorio cuenta con la experiencia y el equipamiento necesario para realizar estudios confiables.
                                    </p>
                                    <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium">
                                        Trabajamos con procedimientos seguros y precisos para acompañar el cuidado de la salud animal.
                                    </p>
                                </div>
                            </div>

                            {/* Right Image - Small Animals */}
                            <div className="w-full lg:w-[30%] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                                <img
                                    src="/img/gatos.jpeg"
                                    alt="Veterinaria - Mascotas"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Services for Veterinarians Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-20 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-xl border border-gray-100 bg-white group hover:shadow-2xl transition-all duration-500"
                    >
                        {/* Image Area */}
                        <div className="md:w-[45%] h-[400px] md:h-auto relative overflow-hidden">
                            <img
                                src="/img/veterinariosunidos.jpeg"
                                alt="Servicios para Veterinarios"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                        </div>

                        {/* Content Area */}
                        <div className="md:w-[55%] bg-sage-bg p-12 md:p-20 flex flex-col justify-center space-y-8 relative">
                            <div className="absolute top-10 right-10 opacity-10">
                                <span className="text-8xl">🐶</span>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter leading-none">
                                    Servicios para <br />
                                    <span className="text-primary-green">Veterinarios</span>
                                </h3>
                                <div className="h-2 w-24 bg-primary-burgundy rounded-full shadow-sm shadow-primary-burgundy/20" />
                            </div>

                            <div className="space-y-8">
                                <p className="text-gray-600 text-lg md:text-xl font-light leading-relaxed italic uppercase tracking-wider">
                                    Si sos veterinario y querés que seamos tu laboratorio de confianza, podés contactarnos para solicitar la lista de precios y conocer nuestra modalidad de trabajo.
                                </p>

                                <div className="pt-4">
                                    <Link
                                        href="/veterinaria"
                                        className="inline-flex items-center gap-4 bg-primary-burgundy text-white px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] shadow-xl hover:shadow-primary-burgundy/30 hover:scale-105 transition-all"
                                    >
                                        VER MAS INFORMACIÓN
                                        <ChevronRight size={16} strokeWidth={4} />
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
                        className="mt-20 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row-reverse shadow-xl border border-gray-100 bg-white group hover:shadow-2xl transition-all duration-500"
                    >
                        {/* Image Area */}
                        <div className="md:w-[45%] h-[400px] md:h-auto relative overflow-hidden">
                            <img
                                src="/img/plasmarico.jpeg"
                                alt="Plasma Rico en Plaqueta"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent" />
                        </div>

                        {/* Content Area */}
                        <div className="md:w-[55%] bg-sage-bg p-12 md:p-20 flex flex-col justify-center space-y-8 relative text-right md:text-left">
                            <div className="absolute top-10 left-10 opacity-10 hidden md:block">
                                <span className="text-8xl">🩸</span>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter leading-none">
                                    Plasma Rico <br />
                                    <span className="text-primary-burgundy">en Plaqueta</span>
                                </h3>
                                <div className="h-2 w-24 bg-primary-green rounded-full shadow-sm shadow-primary-green/20 ml-auto md:ml-0" />
                            </div>

                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <p className="text-primary-green font-black uppercase text-[10px] tracking-[0.3em]">
                                        Nueva modalidad de trabajo – LB LAB
                                    </p>
                                    <p className="text-gray-600 text-lg md:text-xl font-light leading-relaxed italic uppercase tracking-wider">
                                        Elaboramos <strong className="text-gray-900 font-black">Plasma Rico en Plaquetas (PRP)</strong> bajo un protocolo estandarizado, seguro y reproducible, garantizando calidad celular y trazabilidad en cada preparación.
                                    </p>
                                </div>

                                <div className="pt-4">
                                    <Link
                                        href="/prp"
                                        className="inline-flex items-center gap-4 bg-primary-burgundy text-white px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] shadow-xl hover:shadow-primary-burgundy/30 hover:scale-105 transition-all"
                                    >
                                        PRP - MAS INFORMACIÓN
                                        <ChevronRight size={16} strokeWidth={4} />
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
                        className="mt-20 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-xl border border-gray-100 bg-white group hover:shadow-2xl transition-all duration-500"
                    >
                        {/* Image Area */}
                        <div className="md:w-[45%] h-[400px] md:h-auto relative overflow-hidden">
                            <img
                                src="/img/derivando.jpeg"
                                alt="Derivaciones Profesionales"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                        </div>

                        {/* Content Area */}
                        <div className="md:w-[55%] bg-sage-bg p-12 md:p-20 flex flex-col justify-center space-y-10 relative">
                            <div className="absolute top-10 right-10 opacity-10">
                                <span className="text-8xl">🔬</span>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-2xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter leading-none">
                                    Derivaciones <br />
                                    <span className="text-primary-green">Profesionales</span>
                                </h3>
                                <div className="h-2 w-24 bg-primary-burgundy rounded-full shadow-sm shadow-primary-burgundy/20" />
                            </div>

                            <div className="space-y-8">
                                <p className="text-gray-600 text-lg font-light leading-relaxed italic uppercase tracking-wider">
                                    En <strong className="text-gray-900 font-black">LB LAB</strong> recibimos <strong className="text-gray-900 font-black">derivaciones de profesionales de la salud</strong> para estudios especializados en:
                                </p>

                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-500 font-black text-[10px] uppercase tracking-[0.2em]">
                                    <li className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                                        <span className="text-2xl">🧫</span> Bacteriología
                                    </li>
                                    <li className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                                        <span className="text-2xl">🍄</span> Micología
                                    </li>
                                    <li className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                                        <span className="text-2xl">🧪</span> Serología
                                    </li>
                                    <li className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                                        <span className="text-2xl">🏥</span> Medio interno
                                    </li>
                                </ul>

                                <div className="pt-6 flex justify-end">
                                    <Link
                                        href="/derivaciones"
                                        className="inline-flex items-center gap-4 bg-primary-burgundy text-white px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] shadow-xl hover:shadow-primary-burgundy/30 hover:scale-105 transition-all"
                                    >
                                        LEER MÁS DETALLES
                                        <ChevronRight size={16} strokeWidth={4} />
                                    </Link>
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
