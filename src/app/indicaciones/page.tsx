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
        <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left"
            >
                <div className="flex items-center gap-4">
                    <div className="bg-gray-50 p-2 rounded-lg text-gray-400">
                        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </div>
                    <span className="font-black text-gray-800 text-xs tracking-widest uppercase">{title}</span>
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-8 pt-0 pl-16">
                            {children || (
                                <p className="text-sm text-gray-500 italic">
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
                <div className="flex flex-col items-center justify-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-4 text-2xl md:text-3xl font-black text-[#1a2b3c] tracking-tighter uppercase"
                    >
                        <div className="bg-primary-burgundy/5 p-3 rounded-2xl">
                            <Info className="text-primary-burgundy" size={28} />
                        </div>
                        <span>INDICACIONES PARA ESTUDIOS DE LABORATORIO</span>
                    </motion.div>
                </div>

                <div className="max-w-4xl mx-auto px-6 space-y-12">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                    >
                        <div className="space-y-3 mb-10">
                            <AccordionItem title="ANALISIS DE SANGRE DE RUTINA (ADULTOS)">
                                <div className="space-y-10">
                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">Recomendaciones</h4>
                                        <ul className="space-y-4">
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
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">Evitar</h4>
                                        <ul className="space-y-4">
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
                                        <p className="text-sm text-gray-600 leading-relaxed font-medium italic border-l-4 border-primary-green pl-4">
                                            Los tiempos de ayuno deben adaptarse a la edad y al ritmo natural de alimentación del niño. Siempre que sea posible, programar la extracción justo antes de la siguiente toma de leche (materna o mamadera).
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">✔️</span> Recomendaciones según la edad
                                        </h4>
                                        <ul className="space-y-4 pl-4">
                                            {[
                                                { text: "Lactantes (<1 año): ayuno de 3 horas", icon: "🟢" },
                                                { text: "Niños pequeños (1 a 4 años): ayuno de 3 a 6 horas", icon: "🟢" },
                                                { text: "Niños mayores (≥4 años): ayuno de 8 horas", icon: "🟢" },
                                                { text: "Mantener hidratación habitual con agua, sin forzar la ingesta", icon: "🟢" },
                                                { text: "Respetar la medicación habitual indicada por su médico", icon: "🟢" },
                                                { text: "Acudir en el horario asignado para minimizar esperas", icon: "🟢" }
                                            ].map((item, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-gray-600 font-medium">
                                                    <span className="shrink-0">{item.icon}</span>
                                                    {item.text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-6 border-t border-gray-100 pt-8">
                                        <h4 className="text-xs font-black text-primary-burgundy uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-burgundy text-sm">❌</span> Evitar
                                        </h4>
                                        <ul className="space-y-4 pl-4">
                                            {[
                                                "No ofrecer alimentos ni bebidas calóricas durante el ayuno",
                                                "No realizar juegos o actividad física intensa antes de la extracción",
                                                "No administrar golosinas, jugos o leche para “calmar” antes del estudio"
                                            ].map((text, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-gray-600 font-medium italic">
                                                    <span className="shrink-0">🔴</span>
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
                                            <li className="flex gap-3 text-sm text-gray-500 italic">
                                                <div className="w-1 h-1 rounded-full bg-gray-300 mt-2 shrink-0" />
                                                Algunos alimentos como la remolacha o colorantes pueden cambiar el color de la orina.
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Tipo de muestra */}
                                    <div className="space-y-6 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">🕒</span> Tipo de muestra
                                        </h4>
                                        <div className="space-y-6">
                                            <ul className="space-y-4 text-sm text-gray-600 font-medium pl-4">
                                                <li className="flex gap-3">
                                                    <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                    Se recomienda la <strong>primera orina de la mañana</strong>, después del descanso nocturno.
                                                </li>
                                                <li className="flex gap-3 italic">
                                                    <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                    Si no es posible, asegure al menos 4 horas de retención en la vejiga.
                                                </li>
                                            </ul>

                                            <div className="space-y-4 pt-4 border-t border-gray-200">
                                                <p className="text-[10px] font-black text-primary-green uppercase tracking-tighter ml-4">Siempre recolectar el chorro medio:</p>
                                                <ul className="space-y-3 pl-8">
                                                    <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                        <span className="font-bold text-primary-green w-4">1.</span>
                                                        Descartar el primer chorro.
                                                    </li>
                                                    <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                        <span className="font-bold text-primary-green w-4">2.</span>
                                                        <span>
                                                            Juntar la parte central en el vasito plástico nuevo provisto por el laboratorio.
                                                            <span className="block mt-1 text-xs text-gray-500 italic">
                                                                Una vez recolectada, trasvasar la muestra al tubo cónico estéril con tapa provisto por el laboratorio. Remitir al laboratorio el tubo cónico correctamente tapado e identificado.
                                                            </span>
                                                        </span>
                                                    </li>
                                                    <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                        <span className="font-bold text-primary-green w-4">3.</span>
                                                        Desechar el final de la micción.
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="pt-4 border-t border-gray-100/50">
                                                <p className="text-xs text-gray-500 italic flex items-center gap-2">
                                                    <span className="text-primary-green text-sm">👶</span>
                                                    En niños pequeños pueden usarse bolsas colectoras especiales (provistas por el laboratorio).
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Conservación y entrega */}
                                    <div className="space-y-6 pl-4 font-medium">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">❄️</span> Conservación y entrega
                                        </h4>
                                        <ul className="space-y-4">
                                            <li className="flex gap-3 text-sm text-gray-700">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                Lleve la muestra al laboratorio lo antes posible.
                                            </li>
                                            <li className="flex gap-3 text-sm text-gray-600 italic">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                Lo ideal es analizarla dentro de las <strong>2 a 4 horas</strong> posteriores a la recolección.
                                            </li>
                                        </ul>

                                        <div className="mt-6 bg-primary-burgundy/5 p-5 rounded-2xl border border-primary-burgundy/10 space-y-4">
                                            <p className="text-[10px] font-black text-primary-burgundy uppercase tracking-wider">Si no puede entregarla en ese tiempo:</p>
                                            <ul className="space-y-2 text-sm text-gray-600">
                                                <li className="flex items-center gap-3">
                                                    <div className="w-1 h-1 rounded-full bg-primary-burgundy shrink-0" />
                                                    Conservar en heladera (2–8 °C).
                                                </li>
                                                <li className="flex items-center gap-3">
                                                    <div className="w-1 h-1 rounded-full bg-primary-burgundy shrink-0" />
                                                    Entregar dentro de las 6 horas.
                                                </li>
                                                <li className="flex items-center gap-3 text-primary-burgundy font-bold underline decoration-2 underline-offset-4 decoration-primary-burgundy/20">
                                                    <div className="w-1 h-1 rounded-full bg-primary-burgundy shrink-0" />
                                                    No congelar la muestra.
                                                </li>
                                            </ul>
                                        </div>
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

                                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Conservación</p>
                                                <ul className="space-y-2 text-sm text-gray-600 font-medium">
                                                    <li className="flex gap-3">
                                                        <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                        Mantener el recipiente bien cerrado y refrigerado (2–8 °C) durante todo el período de recolección.
                                                    </li>
                                                    <li className="flex gap-3">
                                                        <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                        No congelar la muestra.
                                                    </li>
                                                    <li className="flex gap-3 italic text-gray-500">
                                                        <div className="w-1 h-1 rounded-full bg-primary-burgundy mt-2 shrink-0" />
                                                        Al finalizar, entregar el frasco completo en el laboratorio.
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Test de Graham */}
                                    <div className="space-y-6 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green text-sm">🧾</span> Test de Graham (Escobillado Perianal)
                                        </h4>

                                        <div className="space-y-6">
                                            <div className="space-y-4">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Toma de muestra</p>
                                                <p className="text-sm text-gray-500 italic">Durante 5 mañanas consecutivas, antes de levantarse de la cama:</p>
                                                <ul className="space-y-2">
                                                    {[
                                                        "Colocar un trozo de cinta adhesiva tipo scotch sobre la zona perianal.",
                                                        "Retirar la cinta cuidadosamente.",
                                                        "Adherir la cinta a uno de los vidrios provistos por el laboratorio.",
                                                        "Utilizar un vidrio distinto cada día."
                                                    ].map((text, i) => (
                                                        <li key={i} className="flex gap-3 text-sm text-gray-600 font-medium">
                                                            <span className="font-bold text-primary-burgundy w-4">{i + 1}.</span>
                                                            {text}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="space-y-4 pt-4 border-t border-gray-200">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Conservación</p>
                                                <ul className="space-y-2 text-sm text-gray-600 font-medium">
                                                    <li>• Mantener los vidrios a temperatura ambiente, protegidos del polvo y la humedad.</li>
                                                    <li>• Remitirlos al laboratorio inmediatamente después de completar la serie.</li>
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
                                                {[
                                                    "Recoger una pequeña cantidad de materia fecal en el frasco estéril provisto por el laboratorio.",
                                                    "⚠️ No recolectar directamente del inodoro.",
                                                    "Remitir la muestra inmediatamente al laboratorio.",
                                                    "En caso de no poder hacerlo, conservar el frasco en heladera (2–8 °C), bien cerrado y envuelto, hasta su envío.",
                                                    "No congelar la muestra."
                                                ].map((text, i) => (
                                                    <li key={i} className="flex gap-3 text-sm text-gray-600 font-medium">
                                                        <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                        {text}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="space-y-6 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                                        <div className="space-y-1">
                                            <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                                <span className="text-primary-green text-sm">👶</span> Coprocultivo en pacientes con pañales
                                            </h4>
                                            <p className="text-[10px] font-medium text-gray-500 italic ml-7">(bebés, adultos mayores, personas con discapacidad, etc.)</p>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-4">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Toma de muestra</p>
                                                <ul className="space-y-2 text-sm text-gray-600 font-medium">
                                                    <li>• Obtener la muestra de materia fecal mediante el hisopo estéril provisto por el laboratorio.</li>
                                                    <li>• Tomar la muestra en la zona del pañal donde se observe mayor concentración de materia fecal.</li>
                                                    <li>• Depositar el hisopo en el medio de transporte correspondiente.</li>
                                                    <li className="text-xs font-bold text-primary-burgundy tracking-tight">⚠️ No se aceptará el pañal como muestra.</li>
                                                </ul>
                                            </div>

                                            <div className="space-y-4 pt-4 border-t border-gray-200">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Conservación</p>
                                                <ul className="space-y-2 text-sm text-gray-600 font-medium">
                                                    <li>• Mantener la muestra a temperatura ambiente.</li>
                                                    <li>• Remitir al laboratorio lo antes posible.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6 border-t border-gray-100 pt-8">
                                        <h4 className="text-xs font-black text-primary-burgundy uppercase tracking-widest">Recomendaciones generales</h4>
                                        <ul className="space-y-3 pl-4">
                                            {[
                                                "No abrir el frasco hasta el momento de la recolección.",
                                                "No exceder la capacidad del recipiente.",
                                                "Informar al laboratorio si hubo dificultades en la toma de muestra."
                                            ].map((text, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-gray-500 italic">
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
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest italic">Recolección de muestra urinaria para estudios cuantitativos</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed font-medium italic border-l-4 border-primary-green pl-4">
                                            Para obtener resultados confiables en su estudio de orina de 24 horas, le solicitamos seguir cuidadosamente estas indicaciones.
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">Inicio de la recolección</h4>
                                        <ul className="space-y-4">
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
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">Modo de recolección</h4>
                                        <ul className="space-y-4">
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

                                    <div className="space-y-6 border-l-2 border-primary-green/20 pl-6 bg-gray-50/50 p-6 rounded-2xl">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-primary-green">❄️</span> Conservación de la muestra
                                        </h4>
                                        <ul className="space-y-4">
                                            {[
                                                "Mantener el recipiente refrigerado durante todo el proceso (entre 2 y 8 °C).",
                                                "No congelar ni exponer al calor.",
                                                "Guardar el recipiente en heladera o en conservadora con hielo."
                                            ].map((text, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-gray-600 font-medium italic">
                                                    <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                    {text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">Entrega y extracción de sangre</h4>
                                        <p className="text-sm text-gray-600 font-medium pl-4">
                                            Al finalizar la recolección (tras incluir la primera orina del segundo día), presentarse en el laboratorio con la muestra completa.
                                            Si se le indicó extracción de sangre, se realizará en ese momento.
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">Identificación del recipiente</h4>
                                        <div className="space-y-2 pl-4">
                                            <p className="text-sm text-gray-900 font-bold">Rotular el frasco con:</p>
                                            <ul className="space-y-1 text-sm text-gray-500 italic">
                                                <li>• Nombre completo</li>
                                                <li>• Fecha y hora de inicio de recolección</li>
                                                <li>• Fecha y hora de finalización</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="space-y-6 border-t border-gray-100 pt-8">
                                        <h4 className="text-xs font-black text-primary-burgundy uppercase tracking-widest">Recomendaciones generales</h4>
                                        <ul className="space-y-3 pl-4">
                                            {[
                                                "No olvidar incluir la primera orina del segundo día.",
                                                "No omitir ninguna micción durante el período.",
                                                "No agregar conservantes ni líquidos al recipiente.",
                                                "Informar al laboratorio si hubo pérdidas o dificultades durante la recolección."
                                            ].map((text, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-gray-500 italic">
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
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest italic">Recolección de muestra de orina para cultivo bacteriano</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed font-medium italic border-l-4 border-primary-green pl-4">
                                            Para obtener resultados confiables en su estudio de urocultivo, le solicitamos seguir cuidadosamente estas indicaciones según su condición.
                                        </p>
                                    </div>

                                    {/* Tipo de muestra */}
                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">Tipo de muestra</h4>
                                        <ul className="space-y-4">
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
                                    <div className="space-y-8 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="bg-primary-green text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">1</span>
                                            Pacientes que controlan esfínteres
                                        </h4>

                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-4">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Preparación Hombres</p>
                                                <ul className="space-y-2 text-sm text-gray-600 font-medium">
                                                    <li>• Retraer el prepucio.</li>
                                                    <li>• Higienizar el glande con agua y jabón neutro.</li>
                                                    <li>• Enjuagar completamente.</li>
                                                    <li>• Repetir el procedimiento una vez más.</li>
                                                </ul>
                                            </div>
                                            <div className="space-y-4">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Preparación Mujeres</p>
                                                <ul className="space-y-2 text-sm text-gray-600 font-medium">
                                                    <li>• Separar los labios mayores.</li>
                                                    <li>• Higienizar la zona genital con agua y jabón desde adelante hacia atrás.</li>
                                                    <li>• Enjuagar cuidadosamente.</li>
                                                    <li>• Repetir el procedimiento una vez más.</li>
                                                    <li className="text-xs italic text-gray-500">• En caso de flujo vaginal, colocar un tampón y realizar nuevamente el lavado.</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="space-y-4 pt-4 border-t border-gray-200">
                                            <p className="text-[10px] font-black text-primary-green uppercase tracking-tighter">Recolección de la muestra</p>
                                            <ul className="space-y-2 text-sm text-gray-600 font-medium">
                                                <li className="flex gap-3"><span className="text-primary-green font-bold">1.</span> Descartar el primer chorro de orina.</li>
                                                <li className="flex gap-3"><span className="text-primary-green font-bold">2.</span> Recolectar la fracción media en frasco estéril.</li>
                                                <li className="flex gap-3"><span className="text-primary-green font-bold">3.</span> Desechar el final de la micción.</li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* 2. Pacientes lactantes */}
                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="bg-primary-green text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">2</span>
                                            Pacientes lactantes o que no controlan esfínteres
                                        </h4>
                                        <div className="pl-7 space-y-4">
                                            <p className="text-sm text-gray-600 font-medium">• Garantizar el máximo tiempo posible de retención urinaria.</p>
                                            <p className="text-sm text-gray-600 font-medium">• Realizar higiene genital siguiendo las indicaciones anteriores según sexo.</p>
                                            <div className="p-4 bg-primary-green/5 rounded-xl">
                                                <p className="text-sm text-gray-700 font-bold">Recolección: <span className="font-normal italic">Tomar la muestra “al asecho” en frasco estéril, evitando contaminación.</span></p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 3. Pacientes sondados */}
                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <span className="bg-primary-green text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">3</span>
                                            Pacientes sondados
                                        </h4>
                                        <ul className="pl-7 space-y-4 text-sm text-gray-600 font-medium">
                                            <li>• Pinzar la sonda durante unos minutos para permitir acumulación de orina.</li>
                                            <li>• Desinfectar el sitio de punción.</li>
                                            <li>• Extraer la muestra a 10 cm del meato, utilizando técnica estéril.</li>
                                            <li className="italic text-primary-burgundy">• Remitir la muestra en jeringa estéril sellada con tapón de goma.</li>
                                        </ul>
                                    </div>

                                    {/* Entrega */}
                                    <div className="space-y-6 bg-primary-burgundy/5 p-6 rounded-2xl border border-primary-burgundy/10">
                                        <h4 className="text-xs font-black text-primary-burgundy uppercase tracking-widest">Entrega de la muestra al laboratorio</h4>
                                        <div className="space-y-4">
                                            <p className="text-sm text-gray-700 font-bold italic">Ideal: entregar la muestra dentro de los 30 a 60 minutos posteriores a la recolección.</p>
                                            <div className="space-y-2">
                                                <p className="text-xs font-black text-gray-500 uppercase">En caso de horarios atípicos:</p>
                                                <ul className="text-sm text-gray-600 font-medium space-y-1">
                                                    <li>• Conservar la muestra en heladera (2–8 ℃).</li>
                                                    <li>• No exceder las 6 horas de refrigeración antes de su entrega.</li>
                                                    <li className="font-bold text-red-600">• No congelar la muestra bajo ningún concepto.</li>
                                                </ul>
                                            </div>
                                            <p className="text-xs text-gray-500 font-bold border-t border-primary-burgundy/10 pt-4 italic">📌 Asegurarse de que el frasco esté bien cerrado y rotulado correctamente.</p>
                                        </div>
                                    </div>

                                    {/* Recomendaciones generales */}
                                    <div className="space-y-6 border-t border-gray-100 pt-8">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">Recomendaciones generales</h4>
                                        <ul className="space-y-4 pl-4">
                                            <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                <span>Evitar la administración de antimicrobianos durante las 72 horas previas. <strong>Si los recibió, informar el nombre del medicamento.</strong></span>
                                            </li>
                                            <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                No ingerir diuréticos antes de la toma.
                                            </li>
                                            <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                No destapar el frasco hasta el momento inmediato de la recolección.
                                            </li>
                                            <li className="flex flex-col gap-2 pt-4">
                                                <p className="text-xs font-black text-gray-900 uppercase tracking-widest">Etiquetado correcto:</p>
                                                <ul className="pl-4 space-y-1 text-sm text-gray-500 italic">
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
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">Modo de recolección</h4>
                                        <ul className="space-y-4">
                                            {[
                                                "Recolectar la muestra en frasco estéril con tapa a rosca, provisto por el laboratorio.",
                                                "Utilizar paleta o espátula limpia para tomar una porción de materia fecal (del tamaño de una nuez).",
                                                "Evitar que la muestra se mezcle con orina, agua del inodoro o papel higiénico.",
                                                "Cerrar bien el frasco inmediatamente después."
                                            ].map((text, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-gray-600 font-medium">
                                                    <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                    {text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">Lugar de recolección</h4>
                                        <ul className="space-y-4">
                                            {[
                                                "Puede realizarse en domicilio.",
                                                "Entregar la muestra en el laboratorio dentro de las 2 horas posteriores a la recolección.",
                                                "Si no puede entregarla en ese tiempo, conservar en heladera (2–8 °C) y entregar dentro de las 12 horas."
                                            ].map((text, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-gray-600 font-medium">
                                                    <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                    {text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">Identificación del frasco</h4>
                                        <div className="space-y-2 pl-4">
                                            <p className="text-sm text-gray-900 font-bold">Por favor rotule el frasco con:</p>
                                            <ul className="space-y-1 text-sm text-gray-500 italic">
                                                <li>• Nombre completo</li>
                                                <li>• Fecha y hora de recolección</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="space-y-6 border-t border-gray-100 pt-8">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest text-primary-burgundy">Importante</h4>
                                        <ul className="space-y-4 list-disc pl-8 text-sm text-gray-600 font-medium italic">
                                            <li>No se aceptan muestras recolectadas en papel, bolsas, frascos no estériles o con tapa rota.</li>
                                            <li>Si presenta sangrado activo, informar al laboratorio antes de realizar la.</li>
                                        </ul>
                                    </div>
                                </div>
                            </AccordionItem>

                            <AccordionItem title="CURVA DE TOLERANCIA ORAL A LA GLUCOSA">
                                <div className="space-y-10 text-gray-700">
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest italic">Prueba de Tolerancia Oral a la Glucosa</h4>
                                        <p className="text-sm text-gray-400 font-bold">(PTOG – Glucemia post carga)</p>
                                        <p className="text-sm text-gray-600 leading-relaxed font-medium italic border-l-4 border-primary-green pl-4">
                                            Para obtener resultados confiables en su estudio de glucemia post carga, le solicitamos seguir cuidadosamente estas indicaciones.
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">Días y horarios de realización</h4>
                                        <ul className="space-y-4">
                                            <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                Lunes a Viernes: entre 07:00 y 08:00 hs
                                            </li>
                                            <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                Sábados: a las 08:00 hs
                                            </li>
                                            <li className="flex gap-3 text-sm text-primary-burgundy font-bold italic">
                                                <div className="w-1 h-1 rounded-full bg-primary-burgundy mt-2 shrink-0" />
                                                No se realiza fuera de este horario por requerimientos técnicos del procedimiento.
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">Preparación previa</h4>
                                        <ul className="space-y-4">
                                            <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                Presentarse en el laboratorio tras 8 horas de ayuno.
                                            </li>
                                            <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                <div className="w-1 h-1 rounded-full bg-primary-burgundy mt-2 shrink-0" />
                                                No ingerir alimentos, bebidas (excepto agua) ni medicamentos sin indicación médica.
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">Etapas del estudio</h4>
                                        <ul className="space-y-8">
                                            {[
                                                { t: "Primera extracción de sangre", c: "Se realiza al llegar al laboratorio." },
                                                { t: "Ingesta de glucosa", c: "Se administra la dosis de glucosa proporcionada por el laboratorio. Se mezcla en una taza de aproximadamente 300 ml con agua caliente y se puede agregar té negro. El té puede consumirse en el laboratorio o en el domicilio." },
                                                { t: "Reposo obligatorio", c: "Durante 2 horas, sin actividad física ni ingesta adicional." },
                                                { t: "Segunda extracción de sangre", c: "Al finalizar el período de reposo, regresar al laboratorio para completar el estudio." }
                                            ].map((step, i) => (
                                                <li key={i} className="flex gap-4 text-sm text-gray-600 font-medium">
                                                    <span className="font-bold text-primary-green w-4 shrink-0">{i + 1}.</span>
                                                    <div className="space-y-1">
                                                        <p className="font-black text-gray-900 uppercase text-[10px] tracking-wider">{step.t}</p>
                                                        <p className="leading-relaxed">{step.c}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-6 border-t border-gray-100 pt-8">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest text-primary-burgundy">Indicaciones importantes</h4>
                                        <ul className="space-y-4 list-disc pl-8 text-sm text-gray-600 font-medium italic">
                                            <li>No se debe caminar, realizar actividad física ni consumir alimentos durante el período de espera.</li>
                                            <li>Si presenta náuseas, mareos o malestar, informar al personal del laboratorio.</li>
                                        </ul>
                                    </div>
                                </div>
                            </AccordionItem>

                            <AccordionItem title="ESPERMOGRAMA">
                                <div className="space-y-10 text-gray-700">
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest italic">Recolección de muestra seminal</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed font-medium italic border-l-4 border-primary-green pl-4">
                                            Para garantizar resultados confiables en su estudio seminal, le solicitamos seguir cuidadosamente estas indicaciones.
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">Antes de la recolección</h4>
                                        <ul className="space-y-4">
                                            {[
                                                "Mantener abstinencia sexual entre 2 y 7 días.",
                                                "Evitar alcohol, fiebre o medicamentos que puedan afectar la calidad seminal.",
                                                "No usar lubricantes ni preservativos para la recolección."
                                            ].map((text, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-gray-600 font-medium">
                                                    <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                    {text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">Modo de recolección</h4>
                                        <ul className="space-y-4">
                                            {[
                                                "Recolectar la muestra por masturbación directa, en frasco estéril provisto por el laboratorio.",
                                                "Lavar previamente manos y genitales con agua y jabón neutro.",
                                                "Evitar pérdida de la primera fracción del eyaculado.",
                                                "Cerrar bien el frasco inmediatamente después."
                                            ].map((text, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-gray-600 font-medium">
                                                    <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                    {text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">Lugar de recolección</h4>
                                        <div className="space-y-4 pl-4">
                                            <p className="text-sm text-gray-900 font-bold">Si se realiza en domicilio:</p>
                                            <ul className="space-y-4">
                                                {[
                                                    "Entregar la muestra en menos de 1 hora.",
                                                    "Transportarla a temperatura corporal (ej. en bolsillo interno de campera).",
                                                    "No refrigerar ni exponer al calor."
                                                ].map((text, i) => (
                                                    <li key={i} className="flex gap-3 text-sm text-gray-600 font-medium italic">
                                                        <div className="w-1 h-1 rounded-full bg-primary-burgundy mt-2 shrink-0" />
                                                        {text}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="space-y-6 border-t border-gray-100 pt-8">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest text-[#2563eb]">Identificación y Avisos</h4>
                                        <div className="space-y-6 pl-4">
                                            <div className="space-y-2">
                                                <p className="text-sm text-gray-900 font-bold">Por favor rotule el frasco con:</p>
                                                <p className="text-sm text-gray-500 italic">• Nombre completo</p>
                                            </div>
                                            <div className="space-y-4 border-l-2 border-primary-burgundy/20 pl-4">
                                                <p className="text-xs font-black text-primary-burgundy uppercase tracking-wider">Importante</p>
                                                <ul className="space-y-2">
                                                    <li className="text-sm text-gray-600 font-medium italic">• Si se pierde parte de la muestra, informar al laboratorio.</li>
                                                    <li className="text-sm text-gray-600 font-medium italic">• Si tiene dificultades para recolectar, consulte con el personal.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AccordionItem>

                            <AccordionItem title="ACIDO VAINILLIN MANDELICO">
                                <div className="space-y-10 text-gray-700">
                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">Indicaciones al paciente</h4>
                                        <div className="space-y-6">
                                            {[
                                                "Durante 4 días no ingerir banana, tomate, chocolate, cacao, cremas, tortas, helados o cualquier alimento que pueda contener vainilla.",
                                                "No ingerir aspirinas. Beber solamente agua. Se debe evitar la ingesta de té, café y mate. Evitar el stress, el ejercicio y el dolor.",
                                                "Durante el 4to día recolectar la orina. No ingerir diuréticos durante la recolección. No fumar."
                                            ].map((text, i) => (
                                                <div key={i} className="flex gap-4 text-sm font-medium">
                                                    <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                    <p className="text-gray-600 leading-relaxed">{text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </AccordionItem>

                            <AccordionItem title="PLASMA RICO EN PLAQUETAS">
                                <div className="space-y-10 text-gray-700">
                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">Requisitos</h4>
                                        <ul className="space-y-4">
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
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">Procedimiento</h4>
                                        <ul className="space-y-4">
                                            <li className="flex gap-3 text-sm text-gray-600 font-medium">
                                                <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                Extracción con sistema Vacutainer en tubos al vacío con anticoagulante ACD.
                                            </li>
                                            <li className="flex flex-col gap-2 text-sm text-gray-600 font-medium">
                                                <div className="flex gap-3">
                                                    <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                    <span>Obtención estándar:</span>
                                                </div>
                                                <ul className="pl-8 space-y-1 text-xs text-gray-500">
                                                    <li>• 3 ml PRP (jeringa 5 ml)</li>
                                                    <li>• 4 ml PPP (jeringa 10 ml)</li>
                                                </ul>
                                            </li>
                                            <li className="flex flex-col gap-2 text-sm text-gray-600 font-medium">
                                                <div className="flex gap-3">
                                                    <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                    <span>Opción ampliada:</span>
                                                </div>
                                                <ul className="pl-8 space-y-1 text-xs text-gray-500">
                                                    <li>• 6 ml PRP</li>
                                                    <li>• 8 ml PPP</li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">Tiempos y condiciones</h4>
                                        <ul className="space-y-4">
                                            {[
                                                "Preparación: 20–25 minutos.",
                                                "Aplicación: dentro de 2 horas posteriores.",
                                                "Conservación: temperatura ambiente, sin cambios térmicos.",
                                                "PRP no activado: se activa al contacto con la dermis."
                                            ].map((text, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-gray-600 font-medium">
                                                    <div className="w-1 h-1 rounded-full bg-primary-green mt-2 shrink-0" />
                                                    {text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-6 border-t border-gray-100 pt-8">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest text-primary-burgundy">Informe al médico tratante</h4>
                                        <div className="space-y-4 pl-4">
                                            <p className="text-sm text-gray-600 font-medium">Envío en PDF vía mail:</p>
                                            <ul className="space-y-2">
                                                {[
                                                    "Hemograma basal con recuento de plaquetas.",
                                                    "Informe celular del PRP (blancos, rojos y plaquetas)."
                                                ].map((text, i) => (
                                                    <li key={i} className="flex gap-3 text-sm text-gray-500 italic">
                                                        <div className="w-1 h-1 rounded-full bg-primary-burgundy mt-2 shrink-0" />
                                                        {text}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </AccordionItem>

                            <AccordionItem title="ROTAVIRUS - ADENOVIRUS">
                                <div className="space-y-10 text-gray-700">
                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">Instrucciones de Uso y Muestreo</h4>
                                        <div className="space-y-6">
                                            {[
                                                "Humasis Rota/ Adeno está diseñado sólo para uso con muestras fecales humanas.",
                                                "La detección viral se mejora mediante la recopilación de las muestras en el inicio de los síntomas. Se ha informado de que la excreción máxima de rotavirus en las heces de pacientes con gastroenteritis se produce 3-5 días después de la aparición de los síntomas. Si las muestras se recogen mucho después de la aparición de los síntomas diarreicos, la cantidad de antígeno puede no ser suficiente para obtener una reacción positiva o los antígenos detectados no puede estar relacionado con el episodio diarreico.",
                                                "Realice la prueba inmediatamente después de la recogida de muestras. No deje las muestras a temperatura ambiente por períodos prolongados. Las muestras pueden almacenarse a 2-8 ℃ hasta 72 horas.",
                                                "Traer muestras a temperatura ambiente antes de la prueba.",
                                                "Embale los especímenes en el cumplimiento de la normativa aplicable para el transporte de agentes etiológicos, en caso de que necesiten para ser enviado."
                                            ].map((text, i) => (
                                                <div key={i} className="flex gap-4 text-sm font-medium">
                                                    <span className="font-bold text-primary-green shrink-0 w-4">{i + 1}.</span>
                                                    <p className="text-gray-600 leading-relaxed">{text}</p>
                                                </div>
                                            ))}
                                        </div>
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
