"use client";

import { Check, X, Baby, Droplets } from "lucide-react";
import { motion } from "framer-motion";

export default function Indications() {
    return (
        <section id="indicaciones" className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-gray-900">
                        Información <span className="text-primary-green">para tu visita</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-xl font-light italic uppercase tracking-wider">
                        Seguí estas recomendaciones para asegurar que tus muestras sean procesadas con la mayor precisión.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Main Indications Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100 flex flex-col"
                    >
                        <div className="bg-primary-green p-10 text-center">
                            <div className="inline-flex items-center justify-center p-4 bg-white/20 rounded-2xl mb-4 shadow-inner">
                                <Droplets className="text-white" size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                                Indicaciones para tu análisis
                            </h3>
                        </div>

                        <div className="p-10 lg:p-12 space-y-8 flex-1">
                            <ul className="space-y-5">
                                {[
                                    "Ayuno de 8 horas",
                                    "Podés tomar solo agua (máx. 300 mL)",
                                    "Concurrí en el horario asignado (07 a 09 h)",
                                    "Reposo 15 minutos antes de la extracción",
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4 items-center group">
                                        <div className="bg-sage-bg p-2 rounded-full text-primary-green group-hover:bg-primary-green group-hover:text-white transition-all shadow-sm">
                                            <Check size={18} strokeWidth={3} />
                                        </div>
                                        <span className="text-gray-700 font-bold uppercase text-xs tracking-widest">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="h-px bg-gray-100 w-full" />

                            <div className="space-y-4">
                                <h4 className="flex items-center gap-2 text-primary-burgundy font-black uppercase tracking-widest text-xs">
                                    <X size={18} strokeWidth={3} /> Evitar:
                                </h4>
                                <ul className="grid grid-cols-1 gap-3 ml-10">
                                    {["Ejercicio intenso 8 h antes", "Fumar o vapear 8 h antes", "Alcohol 24 h antes"].map((item, i) => (
                                        <li key={i} className="text-gray-500 text-xs uppercase font-bold tracking-widest list-disc">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                    {/* Pediatric Indications Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100 flex flex-col"
                    >
                        <div className="bg-primary-burgundy p-10 text-center">
                            <div className="inline-flex items-center justify-center p-4 bg-white/20 rounded-2xl mb-4 shadow-inner">
                                <Baby className="text-white" size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-tight">
                                Indicaciones Preanalíticas <br /> Pediátricas
                            </h3>
                        </div>

                        <div className="p-10 lg:p-12 space-y-8 flex-1">
                            <div className="bg-sage-bg/50 p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                                <h4 className="text-primary-burgundy font-black uppercase tracking-widest text-xs mb-6 flex items-center gap-3">
                                    <Check size={18} strokeWidth={3} className="bg-white p-1 rounded-full shadow-sm" /> Recomendaciones de Ayuno:
                                </h4>
                                <div className="space-y-4 font-black text-gray-800">
                                    <div className="flex justify-between items-center bg-white py-4 px-6 rounded-2xl shadow-sm border border-gray-100">
                                        <span className="text-xs uppercase tracking-widest text-gray-400">Menos de 1 año</span>
                                        <span className="text-primary-burgundy text-sm">Ayuno 3 h</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-white py-4 px-6 rounded-2xl shadow-sm border border-gray-100">
                                        <span className="text-xs uppercase tracking-widest text-gray-400">1 a 4 años</span>
                                        <span className="text-primary-burgundy text-sm">3 a 6 h</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-white py-4 px-6 rounded-2xl shadow-sm border border-gray-100">
                                        <span className="text-xs uppercase tracking-widest text-gray-400">Más de 4 años</span>
                                        <span className="text-primary-burgundy text-sm">8 h</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest text-center italic">
                                Creemos un espacio pediátrico cálido para que los niños se sientan seguros.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
