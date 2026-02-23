"use client";

import { FileText, Search, Users, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Results() {
    return (
        <section id="resultados" className="py-24 gradient-bg relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-burgundy/5 transform skew-x-12 translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    {/* Image Part */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-5 hidden md:block"
                    >
                        <div className="relative aspect-[4/5] rounded-4xl overflow-hidden shadow-2xl border-8 border-white">
                            <Image
                                src="/img/resultados.jpeg"
                                alt="Consulta de resultados"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary-burgundy/20 to-transparent" />
                        </div>
                    </motion.div>

                    {/* Content Part */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-7 space-y-12"
                    >
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter">
                                Consulta tus <br />
                                <span className="text-primary-burgundy underline decoration-primary-burgundy/20 decoration-8 underline-offset-8">Resultados</span>
                            </h2>
                            <div className="h-1.5 w-24 bg-primary-green rounded-full" />
                        </div>

                        <div className="space-y-8">
                            {[
                                {
                                    icon: <FileText className="text-primary-burgundy" />,
                                    text: "Te enviamos tus análisis por mail en formato PDF."
                                },
                                {
                                    icon: <Search className="text-primary-green" />,
                                    text: "También podés verlos desde la página, usando el usuario y contraseña que te mandamos."
                                },
                                {
                                    icon: <Users className="text-primary-burgundy" />,
                                    text: "Si tenés familiares asociados, vas a poder ver todos los resultados desde la misma cuenta."
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex gap-6 items-center group"
                                >
                                    <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                    <p className="text-lg font-bold text-gray-700 tracking-tight leading-7 uppercase italic">
                                        <span className="text-primary-burgundy mr-2">{i + 1}-</span>
                                        {item.text}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="pt-6">
                            <button className="bg-white text-gray-900 border-2 border-gray-100 px-10 py-5 rounded-full font-black text-xs tracking-[0.3em] uppercase shadow-xl hover:shadow-2xl hover:border-primary-burgundy transition-all flex items-center gap-4 group">
                                Resultados
                                <div className="bg-primary-burgundy p-1 rounded-md text-white group-hover:translate-x-1 transition-transform">
                                    <ChevronRight size={14} strokeWidth={3} />
                                </div>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
