"use client";

import { motion } from "framer-motion";
import { MessageCircle, Mail, MapPinned } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
    return (
        <main className="min-h-screen pt-24 bg-white">
            <Navbar />

            <section className="relative min-h-[85vh] flex flex-col items-center justify-center py-24 px-6 overflow-hidden bg-sage-bg">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-white transform -skew-x-12 translate-x-1/2 opacity-30" />

                <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">

                    {/* Left Side: Contact Info & Map */}
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h4 className="text-primary-green font-black uppercase text-[10px] tracking-[0.4em]">Canales de atención</h4>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-none uppercase tracking-tighter">
                                    Envianos tu <br />
                                    <span className="text-primary-burgundy">Orden Médica</span>
                                </h2>
                            </div>
                            <div className="h-2 w-32 bg-primary-green rounded-full shadow-sm shadow-primary-green/20" />
                            <p className="text-lg font-medium text-gray-600 italic uppercase tracking-wider max-w-md">
                                Seguí las instrucciones de nuestro asistente de WhatsApp para recibir indicaciones y presupuestos.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-8">
                            {/* WhatsApp */}
                            <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-white flex flex-col gap-4 group hover:scale-105 transition-all">
                                <div className="relative w-12 h-12">
                                    <Image
                                        src="/img/WhatsApp.svg"
                                        alt="WhatsApp"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">WhatsApp</p>
                                    <p className="text-lg font-black text-gray-900 tracking-tight">+54 9 3446 330365</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-white flex flex-col gap-4 group hover:scale-105 transition-all">
                                <div className="w-12 h-12 bg-primary-green rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary-green/20">
                                    <Mail size={24} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Email</p>
                                    <p className="text-base font-black text-gray-900 tracking-tight break-all">laboratorio@lblab.com.ar</p>
                                </div>
                            </div>
                        </div>

                        {/* Location & Map */}
                        <div className="space-y-6">
                            <div className="flex items-start gap-6 bg-white/60 p-6 rounded-[2rem] backdrop-blur-md border border-white">
                                <div className="w-12 h-12 bg-primary-burgundy rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary-burgundy/20 shrink-0">
                                    <MapPinned size={24} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Ubicación central</p>
                                    <p className="text-lg font-black text-gray-900 uppercase leading-snug tracking-tight">
                                        Bolívar 1002, Gualeguaychú, <br />Entre Ríos, Argentina
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white p-2 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white h-[300px] relative group w-full">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3393.362908233777!2d-58.514444!3d-33.008889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95baa80693a7413d%3A0xe5a3c0e3a4e9b60b!2sBol%C3%ADvar%201002%2C%20Gualeguaych%C3%BA%2C%20Entre%20R%C3%ADos!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar"
                                    className="absolute inset-0 w-full h-full border-0 rounded-[2.2rem]"
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative hidden lg:flex justify-end"
                    >
                        <div className="relative w-full max-w-[550px] aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                            <Image
                                src="/img/contactomedica.png"
                                alt="Pedido Médico"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent" />
                            <div className="absolute bottom-10 left-10 right-10">
                                <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-tight">
                                    Tecnología y compromiso <br />
                                    <span className="text-primary-green">en cada análisis.</span>
                                </h3>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
