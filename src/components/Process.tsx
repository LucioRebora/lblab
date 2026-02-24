"use client";

import { MessageSquare, ClipboardCheck, Microscope, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const steps = [
    {
        icon: <MessageSquare size={24} />,
        title: "1. Envíanos tu orden médica",
        description: "Por WhatsApp o acercala al laboratorio. Revisamos la indicación y verificamos qué estudios necesitás.",
        color: "bg-primary-green",
    },
    {
        icon: <ClipboardCheck size={24} />,
        title: "2. Codificación e indicaciones",
        description: "Te informamos cómo prepararte según cada estudio, para garantizar resultados precisos.",
        color: "bg-primary-burgundy",
    },
    {
        icon: <Microscope size={24} />,
        title: "3. Concurrí al laboratorio",
        description: "Te esperamos en los horarios de extracción para realizar la toma de muestra de manera rápida y segura.",
        color: "bg-primary-green",
    },
    {
        icon: <Mail size={24} />,
        title: "4. Recibí tus resultados",
        description: "Te enviamos el informe digital por mail o WhatsApp en PDF para que no tengas que volver a retirarlo.",
        color: "bg-primary-burgundy",
    },
];

export default function Process() {
    return (
        <section id="proceso" className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-12"
                    >
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-gray-900 leading-none">
                                Pasos para realizar <br />
                                <span className="text-primary-green">tus análisis</span>
                            </h2>
                            <div className="h-2 w-24 bg-primary-burgundy rounded-full shadow-sm shadow-primary-burgundy/20" />
                        </div>

                        <div className="space-y-10">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex gap-8 group"
                                >
                                    <div className={`${step.color} text-white p-5 rounded-2xl h-fit shadow-lg group-hover:scale-110 transition-transform shadow-current/10`}>
                                        {step.icon}
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-lg font-black text-gray-900 group-hover:text-primary-green transition-colors uppercase tracking-tight">
                                            {step.title}
                                        </h4>
                                        <p className="text-gray-500 leading-relaxed max-w-md italic text-sm uppercase font-bold tracking-widest opacity-80">
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="pt-4">
                            <div className="bg-sage-bg p-8 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-2 h-full bg-primary-burgundy" />
                                <p className="text-primary-burgundy font-black uppercase tracking-[0.2em] text-xs text-center">
                                    Siguiendo estos pasos... solo nos visitás una vez.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                            <Image
                                src="/img/pasos.jpeg"
                                alt="Pasos para tus análisis"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-green/40 via-transparent to-transparent" />
                        </div>

                        {/* Decal Card */}
                        <div className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl max-w-xs border border-white flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-1 bg-primary-green rounded-full" />
                                <p className="text-[10px] font-black text-primary-green uppercase tracking-[0.3em] italic">Compromiso</p>
                            </div>
                            <p className="text-sm text-gray-800 leading-relaxed font-bold uppercase tracking-tight">
                                Más comodidad, menos tiempo de espera y una experiencia más simple para vos.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
