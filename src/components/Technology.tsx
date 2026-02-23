"use client";

import { Cpu, Microscope, Zap, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const techItems = [
    {
        title: "IA AL SERVICIO DE LA SALUD",
        subtitle: "IA APLICADA AL LABORATORIO",
        description: "La integración de IA en LB LAB impulsa procesos más ágiles y confiables: presupuestos automáticos que eliminan errores manuales, control inteligente de stock y respuestas instantáneas.",
        icon: <Cpu size={32} />,
        color: "text-primary-green",
        bgColor: "bg-green-50",
    },
    {
        title: "TECNOLOGÍA DE PUNTA",
        subtitle: "PARA RESULTADOS MÁS RÁPIDOS",
        description: "Contador hematológico S30 y autoanalizador químico CM260i. Equipos que garantizan continuidad operativa y resultados consistentes incluso en alta demanda.",
        icon: <Zap size={32} />,
        color: "text-primary-burgundy",
        bgColor: "bg-red-50",
    }
];

export default function Technology() {
    return (
        <section id="tecnologia" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 uppercase tracking-tight"
                    >
                        Un Laboratorio <br />
                        <span className="text-primary-green">Pensado Para Vos</span>
                    </motion.h2>
                    <div className="h-1.5 w-32 bg-primary-burgundy mx-auto rounded-full mb-8" />
                    <p className="text-gray-600 max-w-3xl mx-auto text-lg italic">
                        En LB LAB combinamos tecnología, precisión y atención humana para brindarte resultados confiables y una experiencia clara y acompañada en cada estudio.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* IA Section Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="group relative bg-white border border-gray-100 rounded-4xl p-10 shadow-xl hover:shadow-2xl transition-all overflow-hidden min-h-[500px] flex items-center justify-center"
                    >
                        <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity flex items-center justify-center p-12">
                            <Image
                                src="/img/lblab-ia-sf.png"
                                alt="IA LB Lab"
                                width={400}
                                height={200}
                                className="object-contain"
                            />
                        </div>
                        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                            <h3 className="text-2xl font-black uppercase tracking-widest text-primary-green">IA Aplicada al Laboratorio</h3>
                            <div className="h-px bg-gray-100 w-24" />
                            <p className="text-gray-600 text-base leading-relaxed max-w-md font-medium">
                                La integración de IA en LB LAB impulsa procesos más ágiles y confiables: presupuestos automáticos que eliminan errores manuales, control inteligente del stock de reactivos y respuestas instantáneas. Un avance real hacia un laboratorio más humano.
                            </p>
                        </div>
                    </motion.div>

                    {/* Kids Section/Space */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="group relative bg-white border border-gray-100 rounded-4xl p-10 shadow-xl hover:shadow-2xl transition-all overflow-hidden min-h-[500px] flex items-center justify-center"
                    >
                        <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Image
                                src="/img/espacioseguro.jpg"
                                alt="Espacio seguro y amigable"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                            <h3 className="text-2xl font-black uppercase tracking-widest text-gray-800">Cuidamos cada detalle para que se sientan seguros</h3>
                            <div className="h-px bg-gray-100 w-24" />
                            <p className="text-gray-600 text-base leading-relaxed max-w-md font-medium">
                                Creamos un espacio pediátrico cálido para que los niños se sientan seguros.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Equipment Cards Section */}
                <div className="mt-20 grid md:grid-cols-2 gap-8">
                    {[
                        {
                            model: "S30",
                            type: "Contador Hematológico",
                            title: "Tecnología para resultados más rápidos y precisos",
                            desc: "La incorporación del contador hematológico S30 mejora la velocidad y confiabilidad de nuestros análisis, y se complementa con un segundo equipo C19.",
                            img: "/img/presicion.jpg"
                        },
                        {
                            model: "CM260i",
                            type: "Autoanalizador de Química",
                            title: "Tecnología para un laboratorio más ágil y confiable",
                            desc: "El autoanalizador CM260i amplía nuestra capacidad de procesamiento y mejora la precisión. Se complementa con nuestro CM200.",
                            img: "/img/agilidad.jpg"
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-50 group transition-all hover:-translate-y-2"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <Image src={item.img} alt={item.model} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-4 right-4 bg-primary-green text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                                    EQUIPO {item.model}
                                </div>
                            </div>
                            <div className="p-8 space-y-4">
                                <h4 className="text-primary-green font-black uppercase text-xs tracking-widest">{item.type}</h4>
                                <h3 className="text-xl font-bold text-gray-900 leading-tight uppercase tracking-tight">{item.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
