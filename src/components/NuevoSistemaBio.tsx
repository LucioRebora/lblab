"use client";

import { Zap, ShieldCheck, CreditCard, QrCode, Activity, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        icon: <Zap size={28} />,
        title: "Presupuestos al instante",
        description: "Sabés cuánto es tu estudio en el momento.",
        color: "bg-primary-green",
    },
    {
        icon: <ShieldCheck size={28} />,
        title: "Obras sociales en el momento",
        description: "Ingreso y auditoría de tu cobertura mientras te atendemos.",
        color: "bg-primary-burgundy",
    },
    {
        icon: <CreditCard size={28} />,
        title: "Mercado Pago y ARCA",
        description: "BiO está integrado con Mercado Pago y ARCA para que el pago y la facturación sean más ágiles.",
        color: "bg-primary-green",
    },
    {
        icon: <QrCode size={28} />,
        title: "Resultados con QR",
        description: "Escaneá el QR impreso en tu ticket: ahí están las indicaciones para entrar al portal de resultados.",
        color: "bg-primary-burgundy",
    },
    {
        icon: <Activity size={28} />,
        title: "Resultados parciales en vivo",
        description: "Los ves a medida que el bioquímico va validando tus análisis.",
        color: "bg-primary-green",
    },
    {
        icon: <Stethoscope size={28} />,
        title: "Tu médico, un paso adelante",
        description: "Si así lo indicás, el médico que pidió tus análisis también los ve antes de que vayas a la consulta.",
        color: "bg-primary-burgundy",
    },
];

export default function NuevoSistemaBio() {
    return (
        <section id="bio" className="py-24 bg-sage-bg relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16 space-y-4">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block bg-primary-green text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-lg"
                    >
                        Novedad · Desde noviembre
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter leading-none"
                    >
                        Trabajamos con <br />
                        <span className="text-primary-green normal-case">BiO</span>, nuestro nuevo sistema
                    </motion.h2>
                    <div className="h-2 w-32 bg-primary-burgundy mx-auto rounded-full shadow-sm shadow-primary-burgundy/20" />
                    <p className="text-gray-600 max-w-3xl mx-auto text-lg font-light italic uppercase tracking-wider">
                        Estrenamos una nueva plataforma de gestión para atenderte mejor, más rápido y con más información.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08 }}
                            className="group bg-white rounded-[2rem] p-8 shadow-lg border border-gray-100 hover:border-primary-green/30 hover:shadow-2xl transition-all flex flex-col gap-5"
                        >
                            <div className={`${item.color} text-white p-4 rounded-2xl w-fit shadow-lg group-hover:scale-110 transition-transform`}>
                                {item.icon}
                            </div>
                            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight leading-tight group-hover:text-primary-green transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed font-medium">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-2 h-full bg-primary-burgundy" />
                    <p className="text-primary-burgundy font-black uppercase tracking-[0.2em] text-xs text-center">
                        Gracias por acompañarnos en esta etapa. ¿Dudas sobre cómo ver tus resultados? Escribinos por WhatsApp.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
