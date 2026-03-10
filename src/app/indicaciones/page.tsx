"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
    Plus,
    Minus,
    Info
} from "lucide-react";

function AccordionItem({ title, children }: { title: string; children?: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={`border rounded-[2rem] overflow-hidden transition-all duration-300 ${isOpen ? 'border-primary-green/20 shadow-lg bg-white' : 'border-gray-100 bg-sage-bg/30 hover:bg-white shadow-sm'}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-8 text-left"
            >
                <div className="flex items-center gap-6">
                    <div className={`p-3 rounded-2xl transition-all duration-300 ${isOpen ? 'bg-primary-green text-white shadow-lg' : 'bg-white text-gray-400 border border-gray-100'}`}>
                        {isOpen ? <Minus size={18} strokeWidth={3} /> : <Plus size={18} strokeWidth={3} />}
                    </div>
                    <span className={`font-black text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${isOpen ? 'text-primary-green' : 'text-gray-700'}`}>{title}</span>
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="p-10 pt-0 pl-24">
                            {children || (
                                <p className="text-sm text-gray-500 font-medium italic uppercase tracking-widest">
                                    Indicaciones específicas para este estudio próximamente.
                                </p>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function IndicacionesPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="pt-32 pb-20">
                <hr className="w-full border-gray-100 mb-10" />

                {/* Title Section */}
                <div className="flex flex-col items-center justify-center mb-20 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left"
                    >
                        <div className="bg-sage-bg p-5 rounded-[2rem] text-primary-burgundy shadow-inner shadow-primary-burgundy/5 border border-white">
                            <Info className="" size={40} strokeWidth={2.5} />
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none">
                                Indicaciones para <br className="hidden md:block" />
                                <span className="text-primary-green">estudios de laboratorio</span>
                            </h1>
                        </div>
                    </motion.div>
                    <div className="h-2 w-32 bg-primary-burgundy mt-8 rounded-full shadow-sm shadow-primary-burgundy/20" />
                </div>

                <div className="max-w-4xl mx-auto px-6 space-y-12">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                    >
                        <div className="space-y-3 mb-10">
                            <AccordionItem title="ANALISIS DE SANGRE DE RUTINA (ADULTOS)">
                                <div className="space-y-10 text-gray-700">
                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">🧾</span> Recomendaciones
                                        </h4>
                                        <ul className="space-y-4 pl-4">
                                            {[
                                                "Ayuno previo de 8 horas",
                                                "Beber únicamente agua, hasta un máximo de 300 mL durante el ayuno",
                                                "Evitar beber en la última hora antes de la extracción",
                                                "Respetar la medicación habitual indicada por su médico",
                                                "Presentarse en el horario asignado, preferentemente entre las 07:00 y las 09:00 h",
                                                "Permanecer 15 minutos en reposo (sentado) antes de la extracción"
                                            ].map((text, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-gray-600 font-medium">
                                                    <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                    {text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-primary-burgundy uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-burgundy text-sm">❌</span> Evitar
                                        </h4>
                                        <ul className="space-y-4 pl-4">
                                            {[
                                                "No realizar actividad física intensa durante al menos 8 horas previas",
                                                "No fumar ni vapear en las 8 horas previas",
                                                "No consumir alcohol ni drogas de consumo problemático en las 24 horas previas"
                                            ].map((text, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-gray-600 font-medium">
                                                    <div className="w-1 h-1 rounded-full bg-primary-burgundy mt-2 shrink-0" />
                                                    {text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </AccordionItem>

                            <AccordionItem title="PREPARACION EXTRACCION DE SANGRE (PEDIATRIA)">
                                <div className="space-y-10 text-gray-700">
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">👶</span> Indicaciones para pacientes pediátricos
                                        </h4>
                                        <p className="text-sm text-gray-600 leading-relaxed font-medium border-l-4 border-primary-green pl-4">
                                            Los tiempos de ayuno deben adaptarse a la edad y al ritmo natural de alimentación del niño. Siempre que sea posible, programar la extracción justo antes de la siguiente toma de leche (materna o mamadera).
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">✔️</span> Recomendaciones según la edad
                                        </h4>
                                        <ul className="space-y-4 pl-4">
                                            {[
                                                "Lactantes (<1 año): ayuno de 3 horas",
                                                "Niños pequeños (1 a 4 años): ayuno de 3 a 6 horas",
                                                "Niños mayores (≥4 años): ayuno de 8 horas",
                                                "Mantener hidratación habitual con agua, sin forzar la ingesta",
                                                "Respetar la medicación habitual indicada por su médico",
                                                "Acudir en el horario asignado para minimizar esperas"
                                            ].map((text, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-gray-600 font-medium">
                                                    <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                    {text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-primary-burgundy uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-burgundy text-sm">❌</span> Evitar
                                        </h4>
                                        <ul className="space-y-4 pl-4">
                                            {[
                                                "No ofrecer alimentos ni bebidas calóricas durante el ayuno",
                                                "No realizar juegos o actividad física intensa antes de la extracción",
                                                "No administrar golosinas, jugos o leche para “calmar” antes del estudio"
                                            ].map((text, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-gray-600 font-medium">
                                                    <div className="w-1 h-1 rounded-full bg-primary-burgundy mt-2 shrink-0" />
                                                    {text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </AccordionItem>

                            <AccordionItem title="ORINA AL AZAR">
                                <div className="space-y-10 text-gray-700">
                                    {/* Preparación previa */}
                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">🧾</span> Preparación previa
                                        </h4>
                                        <ul className="space-y-4 pl-4">
                                            <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                Evite <strong>actividad física intensa</strong> antes de la toma: puede alterar los resultados.
                                            </li>
                                            <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                Mantenga una <strong>ingesta normal de líquidos</strong> (ni exceso ni falta).
                                            </li>
                                            <li className="flex gap-3 text-sm text-gray-500">
                                                <div className="w-1 h-1 rounded-full bg-gray-300 mt-2 shrink-0" />
                                                Algunos alimentos como la remolacha o colorantes pueden cambiar el color de la orina.
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Tipo de muestra */}
                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">🕒</span> Tipo de muestra
                                        </h4>
                                        <ul className="space-y-4 pl-4">
                                            <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                Se recomienda la <strong>primera orina de la mañana</strong>, después del descanso nocturno.
                                            </li>
                                            <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                Si no es posible, asegure al menos 4 horas de retención en la vejiga.
                                            </li>
                                            <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                <div>
                                                    <p className="font-bold text-gray-900 mb-2">Siempre recolectar el chorro medio:</p>
                                                    <ul className="space-y-2 mt-2">
                                                        <li>• Descartar el primer chorro.</li>
                                                        <li>
                                                            • Juntar la parte central en el vasito plástico nuevo provisto por el laboratorio.
                                                            <span className="block mt-1 text-gray-500 font-normal">
                                                                Una vez recolectada, trasvasar la muestra al tubo cónico estéril con tapa provisto por el laboratorio. Remitir al laboratorio el tubo cónico correctamente tapado e identificado.
                                                            </span>
                                                        </li>
                                                        <li>• Desechar el final de la micción.</li>
                                                    </ul>
                                                </div>
                                            </li>
                                            <li className="flex gap-3 text-sm text-gray-500 font-medium">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                En niños pequeños pueden usarse bolsas colectoras especiales (provistas por el laboratorio).
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Conservación y entrega */}
                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">❄️</span> Conservación y entrega
                                        </h4>
                                        <ul className="space-y-4 pl-4">
                                            <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                Lleve la muestra al laboratorio lo antes posible.
                                            </li>
                                            <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                Lo ideal es analizarla dentro de las 2 a 4 horas posteriores a la recolección.
                                            </li>
                                            <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                <div className="w-1 h-1 rounded-full bg-primary-burgundy mt-2 shrink-0" />
                                                <div>
                                                    <p className="font-bold text-primary-burgundy mb-2">Si no puede entregarla en ese tiempo:</p>
                                                    <ul className="space-y-2 mt-2">
                                                        <li>• Conservar en heladera (2–8 °C).</li>
                                                        <li>• Entregar dentro de las 6 horas.</li>
                                                        <li className="font-bold text-primary-burgundy underline decoration-2 underline-offset-4 decoration-primary-burgundy/20">• No congelar la muestra.</li>
                                                    </ul>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </AccordionItem>

                            <AccordionItem title="PARASITOLÓGICO SERIADO">
                                <div className="space-y-10 text-gray-700">
                                    {/* Parasitológico Seriado */}
                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">🧾</span> Parasitológico Seriado
                                        </h4>

                                        <div className="space-y-6 pl-4">
                                            <div className="space-y-4">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Toma de muestra</p>
                                                <ul className="space-y-2">
                                                    {[
                                                        "Durante 3 días consecutivos, recolectar de cada deposición una porción de materia fecal del tamaño de la cuchara provista junto con el recipiente.",
                                                        "Colocar todas las muestras en el mismo frasco estéril provisto por el laboratorio.",
                                                        "En caso de que un día no defeque, prolongar la recolección un día más, hasta completar 3 muestras.",
                                                        "⚠️ No recolectar directamente del inodoro."
                                                    ].map((text, i) => (
                                                        <li key={i} className="flex gap-3 text-sm text-gray-600 font-medium">
                                                            <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                            {text}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="space-y-4 pt-4">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Conservación</p>
                                                <ul className="space-y-4 text-sm text-gray-600 font-medium">
                                                    <li className="flex gap-3">
                                                        <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                        Mantener el recipiente bien cerrado y refrigerado (2–8 °C) durante todo el período de recolección.
                                                    </li>
                                                    <li className="flex gap-3">
                                                        <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                        No congelar la muestra.
                                                    </li>
                                                    <li className="flex gap-3 text-gray-500">
                                                        <div className="w-1 h-1 rounded-full bg-primary-burgundy mt-2 shrink-0" />
                                                        Al finalizar, entregar el frasco completo en el laboratorio.
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Test de Graham */}
                                    <div className="space-y-6 border-t border-gray-100 pt-10">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">🧾</span> Test de Graham (Escobillado Perianal)
                                        </h4>

                                        <div className="space-y-6 pl-4">
                                            <div className="space-y-4">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Toma de muestra</p>
                                                <p className="text-sm text-gray-500">Durante 5 mañanas consecutivas, antes de levantarse de la cama:</p>
                                                <ul className="space-y-3">
                                                    {[
                                                        "Colocar un trozo de cinta adhesiva tipo scotch sobre la zona perianal.",
                                                        "Retirar la cinta cuidadosamente.",
                                                        "Adherir la cinta a uno de los vidrios provistos por el laboratorio.",
                                                        "Utilizar un vidrio distinto cada día."
                                                    ].map((text, i) => (
                                                        <li key={i} className="flex gap-3 text-sm text-gray-600 font-medium">
                                                            <span className="font-bold text-primary-burgundy w-4 shrink-0">{i + 1}.</span>
                                                            <p>{text}</p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="space-y-4 pt-4">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Conservación</p>
                                                <ul className="space-y-4 text-sm text-gray-600 font-medium">
                                                    <li className="flex gap-3">
                                                        <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                        Mantener los vidrios a temperatura ambiente, protegidos del polvo y la humedad.
                                                    </li>
                                                    <li className="flex gap-3">
                                                        <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                        Remitirlos al laboratorio inmediatamente después de completar la serie.
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AccordionItem>

                            <AccordionItem title="COPROCULTIVO">
                                <div className="space-y-10 text-gray-700">
                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">🧾</span> Coprocultivo Convencional
                                        </h4>
                                        <div className="space-y-4 pl-4">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Toma de muestra</p>
                                            <ul className="space-y-2">
                                                <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                    <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                    Recoger una pequeña cantidad de materia fecal en el frasco estéril provisto por el laboratorio.
                                                </li>
                                                <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                    <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                    ⚠️ No recolectar directamente del inodoro.
                                                </li>
                                                <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                    <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                    Remitir la muestra inmediatamente al laboratorio.
                                                </li>
                                                <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                    <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                    En caso de no poder hacerlo, conservar el frasco en heladera (2–8 °C), bien cerrado y envuelto, hasta su envío.
                                                </li>
                                                <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                    <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                    No congelar la muestra.
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">👶</span> Coprocultivo en pacientes con pañales
                                        </h4>
                                        <div className="space-y-4 pl-4">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Toma de muestra</p>
                                            <ul className="space-y-4 text-sm text-gray-600 font-medium">
                                                <li className="flex gap-3">
                                                    <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                    Obtener la muestra de materia fecal mediante el hisopo estéril provisto por el laboratorio.
                                                </li>
                                                <li className="flex gap-3">
                                                    <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                    Tomar la muestra en la zona del pañal donde se observe mayor concentración de materia fecal.
                                                </li>
                                                <li className="flex gap-3">
                                                    <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                    Depositar el hisopo en el medio de transporte correspondiente.
                                                </li>
                                                <li className="text-xs font-bold text-primary-burgundy tracking-tight flex gap-3">
                                                    <span className="shrink-0">⚠️</span>
                                                    <span>No se aceptará el pañal como muestra.</span>
                                                </li>
                                            </ul>

                                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Conservación</p>
                                                <ul className="space-y-4 text-sm text-gray-600 font-medium">
                                                    <li className="flex gap-3">
                                                        <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                        Mantener la muestra a temperatura ambiente.
                                                    </li>
                                                    <li className="flex gap-3">
                                                        <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                        Remitir al laboratorio lo antes posible.
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-primary-burgundy uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-sm">⚠️</span> Recomendaciones generales
                                        </h4>
                                        <ul className="space-y-4 pl-4">
                                            {[
                                                "No abrir el frasco hasta el momento de la recolección.",
                                                "No exceder la capacidad del recipiente.",
                                                "Informar al laboratorio si hubo dificultades en la toma de muestra."
                                            ].map((text, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-gray-600 font-medium">
                                                    <div className="w-1 h-1 rounded-full bg-primary-burgundy mt-2 shrink-0" />
                                                    {text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </AccordionItem>

                            <AccordionItem title="ORINA DE 24 HS.">
                                <div className="space-y-10 text-gray-700">
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">🧪</span> Recolección de muestra urinaria para estudios cuantitativos
                                        </h4>
                                        <p className="text-sm text-gray-600 leading-relaxed font-medium border-l-4 border-primary-green pl-4">
                                            Para obtener resultados confiables en su estudio de orina de 24 horas, le solicitamos seguir cuidadosamente estas indicaciones.
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">🕒</span> Inicio de la recolección
                                        </h4>
                                        <ul className="space-y-4 pl-4">
                                            {[
                                                "Comenzar por descartar la primera orina de la mañana (no se incluye).",
                                                "A partir de ese momento, recolectar TODAS las micciones realizadas durante el día y la noche.",
                                                "Incluir también la primera orina de la mañana del día siguiente en el mismo recipiente."
                                            ].map((text, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-gray-600 font-medium">
                                                    <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                    {text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">🧾</span> Modo de recolección
                                        </h4>
                                        <ul className="space-y-4 pl-4">
                                            {[
                                                "Utilizar el recipiente provisto por el laboratorio (de boca ancha y tapa segura).",
                                                "Recolectar la totalidad de cada emisión urinaria, sin pérdidas.",
                                                "Si necesita orinar fuera de casa, llevar un recipiente auxiliar limpio y luego transferir al frasco principal."
                                            ].map((text, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-gray-600 font-medium">
                                                    <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                    {text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">❄️</span> Conservación de la muestra
                                        </h4>
                                        <ul className="space-y-4 pl-4">
                                            {[
                                                "Mantener el recipiente refrigerado durante todo el proceso (entre 2 and 8 °C).",
                                                "No congelar ni exponer al calor.",
                                                "Guardar el recipiente en heladera o en conservadora con hielo."
                                            ].map((text, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-gray-600 font-medium">
                                                    <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                    {text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">📍</span> Entrega y extracción de sangre
                                        </h4>
                                        <ul className="space-y-4 pl-4">
                                            <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                Al finalizar la recolección (tras incluir la primera orina del segundo día), presentarse en el laboratorio con la muestra completa.
                                            </li>
                                            <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                Si se le indicó extracción de sangre, se realizará en ese momento.
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">🏷️</span> Identificación del recipiente
                                        </h4>
                                        <div className="space-y-2 pl-4">
                                            <p className="text-sm text-gray-900 font-bold">Rotular el frasco con:</p>
                                            <ul className="space-y-1 text-sm text-gray-600 font-medium">
                                                <li className="flex gap-3"><div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />Nombre completo</li>
                                                <li className="flex gap-3"><div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />Fecha y hora de inicio de recolección</li>
                                                <li className="flex gap-3"><div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />Fecha y hora de finalización</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-primary-burgundy uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-burgundy text-sm">⚠️</span> Recomendaciones generales
                                        </h4>
                                        <ul className="space-y-3 pl-4">
                                            {[
                                                "No olvidar incluir la primera orina del segundo día.",
                                                "No omitir ninguna micción durante el período.",
                                                "No agregar conservantes ni líquidos al recipiente.",
                                                "Informar al laboratorio si hubo pérdidas o dificultades durante la recolección."
                                            ].map((text, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-gray-600 font-medium">
                                                    <div className="w-1 h-1 rounded-full bg-primary-burgundy mt-2 shrink-0" />
                                                    {text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </AccordionItem>

                            <AccordionItem title="UROCULTIVO">
                                <div className="space-y-10 text-gray-700">
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">🧪</span> Recolección de muestra de orina para cultivo bacteriano
                                        </h4>
                                        <p className="text-sm text-gray-600 leading-relaxed font-medium border-l-4 border-primary-green pl-4">
                                            Para obtener resultados confiables en su estudio de urocultivo, le solicitamos seguir cuidadosamente estas indicaciones según su condición.
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">🧾</span> Preparación previa
                                        </h4>
                                        <ul className="space-y-4 pl-4">
                                            <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                <span><strong>Preferente:</strong> Primera orina de la mañana</span>
                                            </li>
                                            <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                <span><strong>Alternativa:</strong> Orina recolectada tras al menos 3 horas de retención vesical</span>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* 1. Pacientes que controlan esfínteres */}
                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">1️⃣</span> Pacientes que controlan esfínteres
                                        </h4>

                                        <div className="space-y-8 pl-4">
                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div className="space-y-4">
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Hombres</p>
                                                    <ul className="space-y-2 text-sm text-gray-600 font-medium">
                                                        <li className="flex gap-2"><span>•</span> Retraer el prepucio.</li>
                                                        <li className="flex gap-2"><span>•</span> Higienizar el glande con agua y jabón neutro.</li>
                                                        <li className="flex gap-2"><span>•</span> Enjuagar completamente.</li>
                                                        <li className="flex gap-2"><span>•</span> Repetir el procedimiento una vez más.</li>
                                                    </ul>
                                                </div>
                                                <div className="space-y-4">
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Mujeres</p>
                                                    <ul className="space-y-2 text-sm text-gray-600 font-medium">
                                                        <li className="flex gap-2"><span>•</span> Separar los labios mayores.</li>
                                                        <li className="flex gap-2"><span>•</span> Higienizar la zona genital con agua y jabón (adelante hacia atrás).</li>
                                                        <li className="flex gap-2"><span>•</span> Enjuagar cuidadosamente.</li>
                                                        <li className="flex gap-2"><span>•</span> Repetir el procedimiento una vez más.</li>
                                                        <li className="text-xs text-gray-500 flex gap-2"><span>•</span> Flujo vaginal: colocar un tampón y lavar nuevamente.</li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <p className="text-[10px] font-black text-primary-green uppercase tracking-widest">Recolección de la muestra:</p>
                                                <ul className="space-y-3 pl-4">
                                                    <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                        <span className="text-primary-green font-bold w-4 shrink-0">1.</span>
                                                        Descartar el primer chorro de orina.
                                                    </li>
                                                    <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                        <span className="text-primary-green font-bold w-4 shrink-0">2.</span>
                                                        Recolectar la fracción media en frasco estéril.
                                                    </li>
                                                    <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                        <span className="text-primary-green font-bold w-4 shrink-0">3.</span>
                                                        Desechar el final de la micción.
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 2. Pacientes lactantes */}
                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">2️⃣</span> Lactantes o que no controlan esfínteres
                                        </h4>
                                        <ul className="space-y-4 pl-4">
                                            {[
                                                "Garantizar el máximo tiempo posible de retención urinaria.",
                                                "Realizar higiene genital siguiendo las indicaciones anteriores según sexo.",
                                                "Recolección: Tomar la muestra “al asecho” en frasco estéril, evitando contaminación."
                                            ].map((text, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-gray-600 font-medium">
                                                    <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                    {text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* 3. Pacientes sondados */}
                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">3️⃣</span> Pacientes sondados
                                        </h4>
                                        <ul className="space-y-4 pl-4">
                                            <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                Pinzar la sonda durante unos minutos para permitir acumulación de orina.
                                            </li>
                                            <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                Desinfectar el sitio de punción.
                                            </li>
                                            <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                Extraer la muestra a 10 cm del meato, utilizando técnica estéril.
                                            </li>
                                            <li className="flex gap-3 text-sm text-primary-burgundy font-bold">
                                                <div className="w-1 h-1 rounded-full bg-primary-burgundy mt-2 shrink-0" />
                                                Remitir la muestra en jeringa estéril sellada con tapón de goma.
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Conservación y entrega */}
                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">❄️</span> Conservación y entrega
                                        </h4>
                                        <ul className="space-y-4 pl-4">
                                            <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                Llevar al laboratorio dentro de los 30 a 60 minutos posteriores a la recolección.
                                            </li>
                                            <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                <div className="w-1 h-1 rounded-full bg-primary-burgundy mt-2 shrink-0" />
                                                <div>
                                                    <p className="font-bold text-primary-burgundy mb-2">Si no se entrega inmediatamente:</p>
                                                    <ul className="space-y-2 mt-2">
                                                        <li>• Conservar en heladera (2–8 ℃).</li>
                                                        <li>• No exceder las 6 horas de refrigeración.</li>
                                                        <li className="font-bold text-primary-burgundy underline decoration-2 underline-offset-4 decoration-primary-burgundy/20">• No congelar la muestra.</li>
                                                    </ul>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Recomendaciones generales */}
                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">⚠️</span> Recomendaciones generales
                                        </h4>
                                        <ul className="space-y-4 pl-4">
                                            <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                <span>Evitar antimicrobianos 72h previas. <strong>Si los recibió, informar el nombre.</strong></span>
                                            </li>
                                            <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                No ingerir diuréticos antes de la toma.
                                            </li>
                                            <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                No destapar el frasco hasta el momento de la recolección.
                                            </li>
                                            <li className="flex flex-col gap-2 pt-4">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Etiquetado correcto:</p>
                                                <ul className="pl-4 space-y-1 text-sm text-gray-500">
                                                    <li>• Nombre completo</li>
                                                    <li>• Fecha y hora de recolección</li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </AccordionItem>

                            <AccordionItem title="SANGRE OCULTA EN MATERIA FECAL">
                                <div className="space-y-10 text-gray-700">
                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">🧾</span> Modo de recolección
                                        </h4>
                                        <ul className="space-y-4 pl-4 text-sm text-gray-600 font-medium">
                                            {[
                                                "Recolectar en frasco estéril con tapa a rosca provisto por el laboratorio.",
                                                "Utilizar paleta limpia para tomar una porción (tamaño nuez).",
                                                "Evitar mezcla con orina, agua o papel higiénico.",
                                                "Cerrar bien inmediatamente."
                                            ].map((text, i) => (
                                                <li key={i} className="flex gap-3">
                                                    <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                    {text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">❄️</span> Conservación y entrega
                                        </h4>
                                        <ul className="space-y-4 pl-4 text-sm text-gray-600 font-medium">
                                            <li className="flex gap-3">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                Entregar en menos de 2 horas.
                                            </li>
                                            <li className="flex gap-3 text-primary-burgundy font-bold">
                                                <div className="w-1 h-1 rounded-full bg-primary-burgundy mt-2 shrink-0" />
                                                Si demora: conservar en heladera (2–8 °C) y entregar antes de 12 horas.
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">🏷️</span> Identificación
                                        </h4>
                                        <ul className="space-y-2 pl-4 text-sm text-gray-500 font-medium">
                                            <li className="flex gap-3"><div className="w-1 h-1 rounded-full bg-gray-300 mt-2 shrink-0" />Nombre completo</li>
                                            <li className="flex gap-3"><div className="w-1 h-1 rounded-full bg-gray-300 mt-2 shrink-0" />Fecha y hora</li>
                                        </ul>
                                    </div>
                                </div>
                            </AccordionItem>

                            <AccordionItem title="CURVA DE TOLERANCIA ORAL A LA GLUCOSA">
                                <div className="space-y-10 text-gray-700">
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">🧪</span> Prueba de Tolerancia Oral
                                        </h4>
                                        <p className="text-sm text-gray-600 leading-relaxed font-medium border-l-4 border-primary-green pl-4">
                                            Este estudio evalúa la respuesta a una carga de glucosa. El procedimiento requiere tiempo y tranquilidad.
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">🕒</span> Horarios
                                        </h4>
                                        <ul className="space-y-4 pl-4 text-sm text-gray-600 font-medium">
                                            <li className="flex gap-3">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                Lunes a Viernes: 07:00 a 08:00 hs
                                            </li>
                                            <li className="flex gap-3">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                Sábados: 08:00 hs
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">📍</span> Etapas del estudio
                                        </h4>
                                        <ul className="space-y-8 pl-4">
                                            {[
                                                { t: "1. Basal", c: "Extracción inicial en ayunas." },
                                                { t: "2. Carga", c: "Ingesta de solución de glucosa (provista). Beber en menos de 5 min." },
                                                { t: "3. Reposo", c: "Debe permanecer 2h sentado en la sala, sin actividad ni fumar." },
                                                { t: "4. Final", c: "Segunda extracción al completar el tiempo." }
                                            ].map((step, i) => (
                                                <li key={i} className="flex gap-4 text-sm text-gray-600 font-medium">
                                                    <div className="space-y-1">
                                                        <p className="font-black text-gray-900 uppercase text-[10px] tracking-wider">{step.t}</p>
                                                        <p className="leading-relaxed">{step.c}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-primary-burgundy uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-burgundy text-sm">⚠️</span> Importante
                                        </h4>
                                        <ul className="space-y-4 pl-4 text-sm text-gray-600 font-medium">
                                            <li className="flex gap-3">
                                                <div className="w-1 h-1 rounded-full bg-primary-burgundy mt-2 shrink-0" />
                                                Ayuno previo de 8 horas. No ingerir nada excepto agua.
                                            </li>
                                            <li className="flex gap-3">
                                                <div className="w-1 h-1 rounded-full bg-primary-burgundy mt-2 shrink-0" />
                                                Informar náuseas o malestar inmediatamente.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </AccordionItem>

                            <AccordionItem title="ESPERMOGRAMA">
                                <div className="space-y-10 text-gray-700">
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">🧪</span> Recolección de muestra seminal
                                        </h4>
                                        <p className="text-sm text-gray-600 leading-relaxed font-medium border-l-4 border-primary-green pl-4">
                                            Para garantizar resultados confiables en su estudio seminal, le solicitamos seguir cuidadosamente estas indicaciones.
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">🕒</span> Antes de la recolección
                                        </h4>
                                        <ul className="space-y-4 pl-4 text-sm text-gray-600 font-medium">
                                            {[
                                                "Mantener abstinencia sexual entre 2 y 7 días.",
                                                "Evitar alcohol, fiebre o medicamentos que puedan afectar la calidad seminal.",
                                                "No usar lubricantes ni preservativos para la recolección."
                                            ].map((text, i) => (
                                                <li key={i} className="flex gap-3">
                                                    <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                    {text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">🧾</span> Modo de recolección
                                        </h4>
                                        <ul className="space-y-4 pl-4 text-sm text-gray-600 font-medium">
                                            {[
                                                "Recolectar la muestra por masturbación directa, en frasco estéril provisto.",
                                                "Lavar previamente manos y genitales con agua y jabón neutro.",
                                                "Evitar pérdida de la primera fracción del eyaculado.",
                                                "Cerrar bien el frasco inmediatamente después."
                                            ].map((text, i) => (
                                                <li key={i} className="flex gap-3">
                                                    <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                    {text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">📍</span> Entrega Domiciliaria
                                        </h4>
                                        <ul className="space-y-4 pl-4 text-sm text-gray-600 font-medium">
                                            {[
                                                "Entregar la muestra en menos de 1 hora.",
                                                "Transportarla a temperatura corporal (ej. en bolsillo interno).",
                                                "No refrigerar ni exponer al calor.",
                                                "Informar al laboratorio si hubo pérdida de muestra."
                                            ].map((text, i) => (
                                                <li key={i} className="flex gap-3">
                                                    <div className="w-1 h-1 rounded-full bg-primary-burgundy mt-2 shrink-0" />
                                                    {text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">🏷️</span> Identificación
                                        </h4>
                                        <ul className="space-y-2 pl-4 text-sm text-gray-500 font-medium">
                                            <li className="flex gap-3"><div className="w-1 h-1 rounded-full bg-gray-300 mt-2 shrink-0" />Nombre completo</li>
                                            <li className="flex gap-3"><div className="w-1 h-1 rounded-full bg-gray-300 mt-2 shrink-0" />Fecha y hora</li>
                                        </ul>
                                    </div>
                                </div>
                            </AccordionItem>

                            <AccordionItem title="ACIDO VAINILLIN MANDELICO">
                                <div className="space-y-10 text-gray-700">
                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">🧪</span> Dieta de 4 días
                                        </h4>
                                        <ul className="space-y-4 pl-4 text-sm text-gray-600 font-medium">
                                            <li className="flex gap-3">
                                                <div className="w-1 h-1 rounded-full bg-primary-burgundy mt-2 shrink-0" />
                                                <div>
                                                    <p className="font-bold text-primary-burgundy mb-2">Prohibiciones (4 días):</p>
                                                    <p>No ingerir banana, tomate, chocolate, vainilla, té, café ni mate. No fumar.</p>
                                                </div>
                                            </li>
                                            <li className="flex gap-3">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                Ingerir únicamente agua. Evitar stress y ejercicio físico.
                                            </li>
                                            <li className="flex gap-3">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                Durante el 4to día recolectar orina de 24 hs (ver indicaciones específicas de Orina 24h).
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </AccordionItem>

                            <AccordionItem title="PLASMA RICO EN PLAQUETAS">
                                <div className="space-y-10 text-gray-700">
                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">🔍</span> Requisitos
                                        </h4>
                                        <ul className="space-y-4 pl-4">
                                            {[
                                                "Orden médica con hemograma y recuento de plaquetas.",
                                                "Consentimiento informado previo a la extracción. En el Laboratorio."
                                            ].map((text, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-gray-600 font-medium">
                                                    <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                    {text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">⚙️</span> Procedimiento
                                        </h4>
                                        <ul className="space-y-4 pl-4 text-sm text-gray-600 font-medium">
                                            <li className="flex gap-3">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                Extracción con sistema Vacutainer en tubos al vacío.
                                            </li>
                                            <li className="flex gap-3">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                <div>
                                                    <p className="text-xs font-black text-gray-400 mb-1">Volúmenes Estándar:</p>
                                                    <p>• 3 ml PRP / 4 ml PPP</p>
                                                </div>
                                            </li>
                                            <li className="flex gap-3">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                <div>
                                                    <p className="text-xs font-black text-gray-400 mb-1">Tiempos:</p>
                                                    <p>Preparación: 25 min. Aplicación: dentro de 2hs.</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-primary-burgundy uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-burgundy text-sm">📄</span> Informe al médico
                                        </h4>
                                        <ul className="space-y-4 pl-4 text-sm text-gray-600 font-medium">
                                            <li className="flex gap-3">
                                                <div className="w-1 h-1 rounded-full bg-primary-burgundy mt-2 shrink-0" />
                                                Envío en PDF: Hemograma basal e Informe celular del PRP.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </AccordionItem>

                            <AccordionItem title="ROTAVIRUS - ADENOVIRUS">
                                <div className="space-y-10 text-gray-700">
                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">🧪</span> Instrucciones de Muestreo
                                        </h4>
                                        <ul className="space-y-6 pl-4 text-sm text-gray-600 font-medium leading-relaxed">
                                            {[
                                                "Detección óptima: Recolectar muestras 3-5 días después del inicio de síntomas.",
                                                "Inmediatez: Realice la prueba tras la recogida. Si demora, conservar en heladera (2-8 ℃) hasta 72 horas.",
                                                "Temperatura: Traer muestras a temperatura ambiente antes de la prueba.",
                                                "Transporte: Embalar según normativa para agentes etiológicos."
                                            ].map((text, i) => (
                                                <li key={i} className="flex gap-3">
                                                    <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                    {text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </AccordionItem>

                            <AccordionItem title="MICOLOGICOS">
                                <div className="space-y-10 text-gray-700">
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">🧪</span> Recolección de muestras de piel, uñas y cuero cabelludo
                                        </h4>
                                        <p className="text-sm text-gray-600 leading-relaxed font-medium border-l-4 border-primary-green pl-4">
                                            📍 Estimado paciente: Para obtener resultados confiables en su estudio micológico, siga cuidadosamente estas indicaciones según la zona a estudiar.
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-primary-burgundy uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-burgundy text-sm">🛑</span> Antes de la toma de muestra
                                        </h4>
                                        <ul className="space-y-4 pl-4 text-sm text-gray-600 font-medium">
                                            <li className="flex gap-3">
                                                <div className="w-1 h-1 rounded-full bg-primary-burgundy mt-2 shrink-0" />
                                                Suspender todo medicamento antifúngico, tanto local como sistémico, 5 días antes de la toma.
                                            </li>
                                            <li className="flex gap-3">
                                                <div className="w-1 h-1 rounded-full bg-primary-burgundy mt-2 shrink-0" />
                                                No aplicar cremas, lociones, talcos ni esmaltes durante ese período.
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">🧴</span> Lesiones o manchas de la piel
                                        </h4>
                                        <div className="pl-4 space-y-4">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Preparación previa (el día anterior):</p>
                                            <ul className="space-y-2 text-sm text-gray-600 font-medium">
                                                <li className="flex gap-3"><div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />Lavar la zona con agua y jabón blanco.</li>
                                                <li className="flex gap-3"><div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />Realizar 3 baños de la zona afectada con agua tibia y sal.</li>
                                            </ul>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">El día de la toma:</p>
                                            <ul className="space-y-2 text-sm text-gray-600 font-medium">
                                                <li className="flex gap-3"><div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />No aplicar cremas, maquillaje ni productos tópicos.</li>
                                                <li className="flex gap-3"><div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />Mantener la zona limpia y seca.</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">💅</span> Uñas (Manos y Pies)
                                        </h4>
                                        <div className="pl-4 space-y-4">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Preparación previa:</p>
                                            <ul className="space-y-2 text-sm text-gray-600 font-medium">
                                                <li className="flex gap-3"><div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />No cortar las uñas durante la semana previa.</li>
                                                <li className="flex gap-3"><div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />Cepillar las uñas 3 veces al día durante 3 días con agua y jabón blanco.</li>
                                                <li className="flex gap-3"><div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />No usar esmalte de uñas durante los 3 días previos.</li>
                                                <li className="flex gap-3"><div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />El día anterior, realizar un baño de agua con sal en las uñas.</li>
                                            </ul>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Específico para Uñas de los pies:</p>
                                            <ul className="space-y-2 text-sm text-gray-600 font-medium">
                                                <li className="flex gap-3"><div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />Concurrir con calzado cerrado y medias de algodón limpias.</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">🧑‍🦱</span> Cuero cabelludo
                                        </h4>
                                        <div className="pl-4 space-y-4">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Preparación previa:</p>
                                            <ul className="space-y-2 text-sm text-gray-600 font-medium">
                                                <li className="flex gap-3"><div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />No utilizar shampoo con antimicótico durante los 5 días previos.</li>
                                                <li className="flex gap-3"><div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />Evitar lociones, aceites o productos capilares el día de la toma.</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">🏷️</span> Recomendaciones generales
                                        </h4>
                                        <ul className="space-y-4 pl-4 text-sm text-gray-600 font-medium">
                                            <li className="flex gap-3">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                No lavar la zona inmediatamente antes de concurrir al laboratorio.
                                            </li>
                                            <li className="flex gap-3">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                Informar si hubo tratamientos recientes o dificultades para cumplir las indicaciones.
                                            </li>
                                            <li className="flex gap-3">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                Mantener las zonas afectadas sin cremas ni medicamentos el día de la toma.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </AccordionItem>


                        </div>

                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
