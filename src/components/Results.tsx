"use client";

import { FileText, Search, Users, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Results() {
    return (
        <section id="resultados" className="py-24 bg-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-sage-bg transform skew-x-12 translate-x-1/2 opacity-50" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-12 gap-16 items-center">
                    {/* Image Part */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-5 hidden md:block"
                    >
                        <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                            <Image
                                src="/img/resultados.jpeg"
                                alt="Consulta de resultados"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary-burgundy/30 to-transparent" />
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
                            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-gray-900 uppercase tracking-tighter leading-none">
                                Consulta tus <br />
                                <span className="text-primary-burgundy">Resultados</span>
                            </h2>
                            <div className="h-2 w-24 bg-primary-green rounded-full shadow-sm shadow-primary-green/20" />
                        </div>

                        <div className="space-y-8">
                            {[
                                {
                                    icon: <FileText className="text-primary-burgundy" />,
                                    text: "Te enviamos tus análisis por mail en formato PDF."
                                },
                                {
                                    icon: <Search className="text-primary-green" />,
                                    text: "También podés verlos desde la página con tu usuario y contraseña."
                                },
                                {
                                    icon: <Users className="text-primary-burgundy" />,
                                    text: "Si tenés familiares asociados, podrás ver todos los resultados desde una misma cuenta."
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex gap-8 items-center group"
                                >
                                    <div className="bg-sage-bg p-5 rounded-2xl shadow-sm border border-white group-hover:bg-primary-burgundy group-hover:text-white group-hover:scale-110 transition-all">
                                        {item.icon}
                                    </div>
                                    <p className="text-lg font-black text-gray-700 tracking-tight leading-7 uppercase italic max-w-lg">
                                        <span className="text-primary-burgundy mr-2">{i + 1}.</span>
                                        {item.text}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="pt-6">
                            <a
                                href="https://redlab.com.ar/lblab"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-primary-burgundy text-white px-12 py-5 rounded-full font-black text-[10px] tracking-[0.4em] uppercase shadow-xl hover:shadow-primary-burgundy/30 hover:scale-105 transition-all flex items-center gap-4 group w-fit"
                            >
                                RESULTADOS
                                <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" strokeWidth={4} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
