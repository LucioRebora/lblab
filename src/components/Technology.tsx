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
        <section id="tecnologia" className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-20 space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black text-gray-900 mb-6 uppercase tracking-tighter leading-none"
                    >
                        Un Laboratorio <br />
                        <span className="text-primary-green">Pensado Para Vos</span>
                    </motion.h2>
                    <div className="h-2 w-32 bg-primary-burgundy mx-auto rounded-full mb-8 shadow-sm shadow-primary-burgundy/20" />
                    <p className="text-gray-600 max-w-3xl mx-auto text-xl font-light italic uppercase tracking-wider">
                        En LB LAB combinamos tecnología, precisión y atención humana para brindarte resultados confiables y una experiencia clara y acompañada en cada estudio.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* IA Section Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="group relative bg-white border border-gray-100 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all overflow-hidden flex flex-col min-h-[650px]"
                    >
                        <div className="relative h-72 w-full bg-sage-bg/30 flex items-center justify-center p-8 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-green/5 to-transparent" />
                            <Image
                                src="/img/lblab-ia-sf.png"
                                alt="IA LB Lab"
                                width={320}
                                height={160}
                                className="object-contain group-hover:scale-105 transition-transform duration-700 translate-y-8 z-10"
                            />
                        </div>
                        <div className="p-12 flex flex-col items-center text-center space-y-8 flex-grow justify-center relative bg-white">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-2xl shadow-lg border border-gray-50 text-primary-green">
                                <Cpu size={32} />
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tight text-primary-green">IA Aplicada al Laboratorio</h3>
                            <div className="h-px bg-gray-100 w-24" />
                            <p className="text-gray-500 text-sm leading-relaxed max-w-md font-bold uppercase tracking-widest italic opacity-80">
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
                        className="group relative bg-white border border-gray-100 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all overflow-hidden flex flex-col min-h-[650px]"
                    >
                        <div className="relative h-[380px] w-full">
                            <Image
                                src="/img/espacioseguro.jpg"
                                alt="Espacio seguro y amigable"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                        <div className="p-12 flex flex-col items-center text-center space-y-8 flex-grow justify-center relative bg-white">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-2xl shadow-lg border border-gray-50 text-primary-burgundy">
                                <ShieldCheck size={32} />
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tight text-gray-900">Cuidamos cada detalle</h3>
                            <div className="h-px bg-gray-100 w-24" />
                            <p className="text-gray-500 text-sm leading-relaxed max-w-sm font-bold uppercase tracking-widest italic opacity-80">
                                Creamos un espacio pediátrico cálido para que los niños se sientan seguros y tranquilos durante su visita al laboratorio.
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
                            title: "Resultados más rápidos y precisos",
                            desc: "La incorporación del contador hematológico S30 mejora la velocidad y confiabilidad de nuestros análisis, y se complementa con un segundo equipo C19.",
                            img: "/img/presicion.jpg"
                        },
                        {
                            model: "CM260i",
                            type: "Autoanalizador de Química",
                            title: "Laboratorio más ágil y confiable",
                            desc: "El autoanalizador CM260i amplía nuestra capacidad de procesamiento y mejora la precisión. Se complementa con nuestro CM200.",
                            img: "/img/agilidad.jpg"
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 group transition-all hover:border-primary-green/30"
                        >
                            <div className="relative h-72 overflow-hidden">
                                <Image src={item.img} alt={item.model} fill className="object-cover group-hover:scale-110 transition-transform duration-700 shadow-inner" />
                                <div className="absolute top-6 right-6 bg-primary-green text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                                    EQUIPO {item.model}
                                </div>
                            </div>
                            <div className="p-10 space-y-4">
                                <h4 className="text-primary-green font-black uppercase text-[10px] tracking-[0.2em]">{item.type}</h4>
                                <h3 className="text-xl font-black text-gray-900 leading-tight uppercase tracking-tight">{item.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
