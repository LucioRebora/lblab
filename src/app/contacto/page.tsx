"use client";

import { motion } from "framer-motion";
import { MessageCircle, Mail, MapPinned } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
    return (
        <main className="min-h-screen pt-24">
            <Navbar />

            <section className="relative min-h-[70vh] flex flex-col items-center justify-center py-20 px-6 overflow-hidden bg-gradient-to-br from-[#f2b5c0] via-[#dec0d5] to-[#7dbce4]">
                <div className="max-w-[1400px] w-full mx-auto grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Side: Contact Info & Map */}
                    <div className="space-y-8 z-10">
                        <div className="space-y-2">
                            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-gray-800">
                                NUESTRAS VIAS DE COMUNICACION
                            </p>
                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight uppercase max-w-lg">
                                ENVIANOS LA FOTO DE LA ORDEN MEDICA PARA INDICACIONES.
                            </h2>
                            <p className="text-sm font-medium text-gray-700 italic">
                                Seguí las instrucciones de nuestro asistente de WhatsApp.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* WhatsApp */}
                            <div className="flex items-center gap-5 group">
                                <div className="relative w-11 h-11 shrink-0">
                                    <Image
                                        src="/img/WhatsApp.svg"
                                        alt="WhatsApp"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div>
                                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-800/60 mb-1">WhatsApp</p>
                                    <p className="text-xl font-medium text-gray-900 tracking-tight">+54 9 3446 330365</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-center gap-5">
                                <div className="w-11 h-11 bg-gray-900 rounded-2xl flex items-center justify-center shrink-0">
                                    <Mail size={22} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-800/60 mb-1">Correo Electrónico</p>
                                    <p className="text-xl font-medium text-gray-900 tracking-tight">laboratorio@lblab.com.ar</p>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="flex items-center gap-5">
                                <div className="w-11 h-11 bg-[#e21b1b] rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-red-500/20">
                                    <MapPinned size={22} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-800/60 mb-1">Ubicación</p>
                                    <p className="text-sm font-medium text-gray-900 uppercase leading-snug">
                                        Bolívar 1002, Gualeguaychú, <br />Entre Ríos, Argentina
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Google Map Section */}
                        <div className="bg-white/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-white/40 h-[240px] relative group w-full lg:max-w-2xl">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3393.362908233777!2d-58.514444!3d-33.008889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95baa80693a7413d%3A0xe5a3c0e3a4e9b60b!2sBol%C3%ADvar%201002%2C%20Gualeguaych%C3%BA%2C%20Entre%20R%C3%ADos!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar"
                                className="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>

                    {/* Right Side: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative flex justify-center lg:justify-end"
                    >
                        <div className="relative w-full max-w-[600px] aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/20">
                            <Image
                                src="/img/contactomedica.png"
                                alt="Pedido Médico"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Slogan */}
                <div className="mt-20 border-t border-black/10 pt-10 w-full text-center">
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tighter">
                        TECNOLOGÍA Y COMPROMISO EN CADA ANÁLISIS.
                    </h3>
                </div>
            </section>

            <Footer />
        </main>
    );
}
