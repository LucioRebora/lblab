"use client";

import { Check, X, Baby, Droplets } from "lucide-react";
import { motion } from "framer-motion";

export default function Indications() {
    return (
        <section id="indicaciones" className="py-24 gradient-bg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter">
                        Información <span className="text-primary-green">para tu visita</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Seguí estas recomendaciones para asegurar que tus muestras sean procesadas con la mayor precisión.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
                    {/* Main Indications Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-4xl shadow-2xl overflow-hidden border border-gray-100"
                    >
                        <div className="bg-primary-green p-8 text-center">
                            <div className="inline-flex items-center justify-center p-3 bg-white/20 rounded-2xl mb-4">
                                <Droplets className="text-white" size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-white uppercase tracking-wider">
                                Indicaciones para tu análisis
                            </h3>
                        </div>

                        <div className="p-8 lg:p-12 space-y-6">
                            <ul className="space-y-4">
                                {[
                                    "Ayuno de 8 horas",
                                    "Podés tomar solo agua (máx. 300 mL)",
                                    "Concurrí en el horario asignado (07 a 09 h)",
                                    "Reposo 15 minutos antes de la extracción",
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4 items-center">
                                        <div className="bg-green-100 p-1 rounded-full text-green-600">
                                            <Check size={18} strokeWidth={3} />
                                        </div>
                                        <span className="text-gray-700 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="h-px bg-gray-100 w-full" />

                            <div className="space-y-4">
                                <h4 className="flex items-center gap-2 text-primary-burgundy font-bold uppercase tracking-widest text-sm">
                                    <X size={18} strokeWidth={3} /> Evitar:
                                </h4>
                                <ul className="grid grid-cols-1 gap-3 ml-6">
                                    {["Ejercicio intenso 8 h antes", "Fumar o vapear 8 h antes", "Alcohol 24 h antes"].map((item, i) => (
                                        <li key={i} className="text-gray-500 text-sm list-disc">
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
                        className="bg-white rounded-4xl shadow-2xl overflow-hidden border border-gray-100"
                    >
                        <div className="bg-primary-burgundy p-8 text-center">
                            <div className="inline-flex items-center justify-center p-3 bg-white/20 rounded-2xl mb-4">
                                <Baby className="text-white" size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-white uppercase tracking-wider leading-tight">
                                Indicaciones Preanalíticas <br /> Pediátricas
                            </h3>
                        </div>

                        <div className="p-8 lg:p-12">
                            <div className="space-y-8">
                                <div className="bg-soft-bg p-6 rounded-3xl border border-primary-burgundy/10">
                                    <h4 className="text-primary-burgundy font-bold uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
                                        <Check size={18} strokeWidth={3} /> Recomendaciones de Ayuno:
                                    </h4>
                                    <div className="space-y-4 font-bold text-gray-800">
                                        <div className="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm">
                                            <span>-1 año</span>
                                            <span className="text-primary-burgundy">Ayuno 3 h</span>
                                        </div>
                                        <div className="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm">
                                            <span>-1 a 4 años</span>
                                            <span className="text-primary-burgundy">3 a 6 h</span>
                                        </div>
                                        <div className="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm">
                                            <span>≥4 años</span>
                                            <span className="text-primary-burgundy">8 h</span>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-500 text-sm italic text-center">
                                    Creemos un espacio pediátrico cálido para que los niños se sientan seguros.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
