"use client";

import { motion } from "framer-motion";
import { Activity, Beaker, Dna, Microscope, Building2, ClipboardList } from "lucide-react";

const services = [
    {
        title: "Análisis Clínicos",
        desc: "Estudios integrales para el diagnóstico y seguimiento de tu salud.",
        icon: <Activity className="text-primary-green" />,
    },
    {
        title: "Estudios de Sangre",
        desc: "Hemogramas y perfiles bioquímicos con tecnología de alta precisión.",
        icon: <Beaker className="text-primary-burgundy" />,
    },
    {
        title: "Estudios Hormonales",
        desc: "Mediciones precisas para el control endocrinológico y reproductivo.",
        icon: <Dna className="text-primary-green" />,
    },
    {
        title: "Microbiología",
        desc: "Identificación de patógenos y estudios bacteriológicos avanzados.",
        icon: <Microscope className="text-primary-burgundy" />,
    },
    {
        title: "Análisis para Empresas",
        desc: "Chequeos periódicos y preocupacionales para equipos de trabajo.",
        icon: <Building2 className="text-primary-green" />,
    },
    {
        title: "Chequeos Preventivos",
        desc: "Screening de salud personalizado para la prevención temprana.",
        icon: <ClipboardList className="text-primary-burgundy" />,
    },
];

export default function Services() {
    return (
        <section id="servicios" className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter">
                            Nuestros <br />
                            <span className="text-primary-green">Servicios</span>
                        </h2>
                        <div className="h-1.5 w-24 bg-primary-burgundy rounded-full" />
                    </div>
                    <p className="text-gray-500 max-w-md italic text-right hidden md:block">
                        Contamos con tecnología de vanguardia and un equipo profesional altamente calificado para cada tipo de estudio.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group bg-white border border-gray-100 rounded-4xl shadow-xl hover:shadow-2xl transition-all overflow-hidden flex flex-col"
                        >
                            {/* Icon Header Section */}
                            <div className={`relative h-48 w-full flex items-center justify-center p-8 transition-colors duration-500 ${i % 2 === 0 ? 'bg-green-50/50 group-hover:bg-green-100/50' : 'bg-red-50/50 group-hover:bg-red-100/50'
                                }`}>
                                <div className="scale-[2.0] group-hover:scale-[2.2] transition-transform duration-500">
                                    {service.icon}
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-10 flex flex-col items-center text-center space-y-5">
                                <h3 className="text-xl font-bold text-gray-900 uppercase tracking-widest">{service.title}</h3>
                                <div className="h-px bg-gray-100 w-20" />
                                <p className="text-gray-500 text-sm leading-relaxed font-medium italic">
                                    {service.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
