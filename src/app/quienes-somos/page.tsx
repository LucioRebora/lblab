"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Users, Target, Heart, ShieldCheck, Microscope, Award } from "lucide-react";
import Image from "next/image";

export default function QuienesSomosPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="pt-24">
                {/* Hero Section */}
                <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0">
                        <Image
                            src="/img/princ2.jpg"
                            alt="Laboratorio"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />
                    </div>

                    <div className="relative z-10 text-center space-y-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-black tracking-tight uppercase"
                        >
                            <span className="text-primary-burgundy">Somos</span> <br />
                            <span className="text-primary-green">LB LAB</span>
                        </motion.h1>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="h-1.5 w-32 bg-primary-green mx-auto rounded-full"
                        />
                    </div>
                </section>

                {/* Historia Section */}
                <section className="py-24 bg-[#fff9f8]">
                    <div className="max-w-4xl mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-12"
                        >
                            <div className="flex items-center gap-6">
                                <div className="bg-primary-burgundy w-2 h-16 rounded-full" />
                                <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase">Nuestra Historia</h2>
                            </div>

                            <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-medium">
                                <p>
                                    <span className="text-primary-burgundy font-black text-2xl">LB LAB</span> nació en junio de 2015, fundado por las Bioquímicas <strong className="text-gray-900">Renata Lambruschini</strong> y <strong className="text-gray-900">Judith Brandner</strong>, con el propósito de brindar un servicio diagnóstico confiable, cercano y profesional.
                                </p>
                                <p>
                                    En <strong className="text-gray-900">octubre de 2016</strong> se incorporó el Bioquímico <strong className="text-gray-900">Emiliano Tommasi</strong>, marcando el inicio de una etapa de expansión que permitió ampliar nuestras áreas de trabajo y acompañar a más instituciones y pacientes.
                                </p>
                                <p>
                                    Con el tiempo, el laboratorio sumó nuevos servicios como internaciones, guardias médicas, controles preocupacionales, ART y análisis veterinarios, consolidando un crecimiento sostenido basado en la calidad y la innovación.
                                </p>
                                <p>
                                    Nuestro desarrollo ha sido posible gracias a la incorporación de <strong className="text-gray-900">equipamiento de última generación</strong>, sistemas de respaldo que garantizan continuidad operativa y un equipo humano en constante formación. Hoy contamos con técnicos en análisis clínicos, bioquímicos, personal administrativo y secretarías, todos comprometidos con un mismo objetivo: ofrecer resultados precisos y un trato humano en cada etapa del proceso.
                                </p>
                                <p>
                                    Recientemente se sumó al staff el Bioquímico <strong className="text-gray-900">Iván Pérez Duarte</strong>, responsable del área de Microbiología, fortaleciendo aún más nuestra capacidad diagnóstica.
                                </p>
                                <p>
                                    En <span className="text-primary-green font-black">LB LAB</span> creemos que cada paciente es único, y que su salud merece atención personalizada, respeto y profesionalismo. Por eso trabajamos con controles de calidad internos y externos en todas las áreas, asegurando excelencia, seguridad y confianza en cada resultado.
                                </p>
                                <p className="text-primary-green font-black italic">
                                    Seguimos creciendo, innovando y acompañando a nuestra comunidad con el mismo compromiso que nos vio nacer.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Mision & Vision Section */}
                <section className="py-24">
                    <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-100/50 space-y-6"
                        >
                            <div className="w-16 h-16 bg-primary-green/10 text-primary-green rounded-2xl flex items-center justify-center">
                                <Target size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-gray-800 uppercase tracking-tight">Nuestra Misión</h3>
                            <p className="text-gray-600 leading-relaxed italic text-lg">
                                "Ofrecer resultados confiables y un trato humano, combinando tecnología moderna con atención profesional."
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-100/50 space-y-6"
                        >
                            <div className="w-16 h-16 bg-primary-burgundy/10 text-primary-burgundy rounded-2xl flex items-center justify-center">
                                <Users size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-gray-800 uppercase tracking-tight">Nuestra Visión</h3>
                            <p className="text-gray-600 leading-relaxed italic text-lg">
                                "Ser un laboratorio de referencia en la región, creciendo con innovación, calidad y cercanía con la comunidad."
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Valores Section */}
                <section className="py-24 bg-gray-50 border-y border-gray-100">
                    <div className="max-w-6xl mx-auto px-6 text-center space-y-16">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-black text-gray-900 uppercase tracking-[0.2em]">Nuestros Valores</h2>
                            <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Los pilares que guían nuestro trabajo diario</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                            {[
                                { icon: Heart, title: "Humanidad", text: "Trato cercano y respetuoso." },
                                { icon: Award, title: "Calidad", text: "Excelencia en cada proceso." },
                                { icon: ShieldCheck, title: "Profesionalismo", text: "Ética y rigor científico." },
                                { icon: Microscope, title: "Innovación", text: "Tecnología de vanguardia." },
                                { icon: Target, title: "Compromiso", text: "Con la salud y la comunidad." },
                                { icon: Users, title: "Trabajo en equipo", text: "Unidad para mejores resultados." },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="space-y-4"
                                >
                                    <div className="mx-auto w-16 h-16 bg-white rounded-3xl shadow-md border border-gray-100 flex items-center justify-center text-primary-green">
                                        <item.icon size={28} />
                                    </div>
                                    <h4 className="font-black text-gray-800 uppercase text-xs tracking-widest">{item.title}</h4>
                                    <p className="text-sm text-gray-500 font-medium leading-tight">{item.text}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Staff Section */}
                <section className="py-24">
                    <div className="max-w-6xl mx-auto px-6 space-y-16">
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl font-black text-gray-900 uppercase tracking-[0.2em]">Nuestro Staff</h2>
                            <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">El equipo profesional detrás de cada diagnóstico</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-12">
                            {/* Renata Lambruschini */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-6 border border-gray-100 shadow-xl group-hover:shadow-2xl transition-all duration-500">
                                    <Image
                                        src="/img/renata.jpg"
                                        alt="Renata Lambruschini"
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                                        <p className="text-white text-[10px] leading-relaxed font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 italic">
                                            Fundadora de LB LAB. Bioquímica con amplia trayectoria en diagnóstico clínico y gestión de calidad.
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-4 text-center">
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Renata Lambruschini</h3>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-primary-green font-black text-[10px] uppercase tracking-[0.2em]">Bioquímica – MP</span>
                                            <span className="text-gray-400 font-bold text-xs uppercase">Socio Propietario – LB LAB</span>
                                        </div>
                                    </div>
                                    <p className="text-[11px] text-gray-500 leading-relaxed px-4 italic line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
                                        Cofundadora del laboratorio en 2015. Lidera la visión estratégica y el compromiso con la excelencia institucional de LB LAB.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Emiliano Tommasi */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="group"
                            >
                                <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-6 border border-gray-100 shadow-xl group-hover:shadow-2xl transition-all duration-500">
                                    <Image
                                        src="/img/emiliano.jpg"
                                        alt="Emiliano Tommasi"
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                                        <p className="text-white text-[10px] leading-relaxed font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 italic">
                                            Bioquímico (UNR) con residencia en Hospital Italiano. 24 años de experiencia en bioanálisis e innovación.
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-4 text-center">
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Emiliano Tommasi</h3>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-primary-green font-black text-[10px] uppercase tracking-[0.2em]">Bioquímico – MP 902</span>
                                            <span className="text-gray-400 font-bold text-xs uppercase">Socio Propietario – LB LAB</span>
                                        </div>
                                    </div>
                                    <p className="text-[11px] text-gray-500 leading-relaxed px-4 italic line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
                                        Egresado de la UNR. Trayectoria en el Hospital Italiano y Sanatorio Julio Corso. Actualmente bioquímico en Hospital Centenario y Socio en LB LAB.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Ivan Perez Duarte */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="group"
                            >
                                <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-6 border border-gray-100 shadow-xl group-hover:shadow-2xl transition-all duration-500">
                                    <Image
                                        src="/img/ivan.png"
                                        alt="Ivan Perez Duarte"
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                                        <p className="text-white text-[10px] leading-relaxed font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 italic">
                                            Bioquímico especialista en Microbiología. Aporta innovación y rigor técnico al equipo de profesionales.
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-4 text-center">
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Ivan Perez Duarte</h3>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-primary-green font-black text-[10px] uppercase tracking-[0.2em]">Bioquímico – MP</span>
                                            <span className="text-gray-400 font-bold text-xs uppercase">Socio Propietario – LB LAB</span>
                                        </div>
                                    </div>
                                    <p className="text-[11px] text-gray-500 leading-relaxed px-4 italic line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
                                        Responsable del área de Microbiología. Comprometido con la excelencia diagnóstica y la atención personalizada de cada paciente.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
