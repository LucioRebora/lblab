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
        <section id="proceso" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="space-y-2">
                            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-gray-900">
                                Pasos para realizar <br />
                                <span className="text-primary-green">tus análisis</span>
                            </h2>
                            <div className="h-1.5 w-24 bg-primary-burgundy rounded-full" />
                        </div>

                        <div className="space-y-8">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex gap-6 group"
                                >
                                    <div className={`${step.color} text-white p-4 rounded-2xl h-fit shadow-lg group-hover:scale-110 transition-transform`}>
                                        {step.icon}
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-lg font-bold text-gray-900 group-hover:text-primary-green transition-colors uppercase">
                                            {step.title}
                                        </h4>
                                        <p className="text-gray-600 leading-relaxed max-w-md italic">
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="pt-4">
                            <div className="bg-soft-bg p-6 rounded-3xl border border-primary-burgundy/10">
                                <p className="text-primary-burgundy font-bold uppercase tracking-widest text-sm text-center">
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
                        <div className="aspect-square relative rounded-4xl overflow-hidden shadow-2xl">
                            <Image
                                src="/img/pasos.jpeg"
                                alt="Pasos para tus análisis"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-green/20 to-transparent" />
                        </div>

                        {/* Decal Card */}
                        <div className="absolute -bottom-8 -left-8 glass-card p-8 rounded-3xl shadow-2xl max-w-xs border-primary-green/20">
                            <p className="text-xs font-bold text-primary-green uppercase tracking-widest mb-2 italic">Compromiso</p>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                Más comodidad, menos tiempo de espera y una experiencia más simple para vos.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
