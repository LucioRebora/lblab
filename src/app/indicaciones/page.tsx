"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
    Plus,
    Minus,
    Info,
    Calendar,
    ArrowRight,
    Check,
    X as CloseIcon
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
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-primary-green font-black text-[10px] uppercase tracking-widest">
                                            <Check size={14} /> Recomendaciones
                                        </div>
                                        <ul className="space-y-3">
                                            {[
                                                "Ayuno previo de 8 horas",
                                                "Beber únicamente agua, hasta un máximo de 300 mL durante el ayuno",
                                                "Evitar beber en la última hora antes de la extracción",
                                                "Respetar la medicación habitual indicada por su médico",
                                                "Presentarse en el horario asignado, preferentemente entre las 07:00 y las 09:00 h",
                                                "Permanecer 15 minutos en reposo (sentado) antes de la extracción"
                                            ].map((text, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-gray-600 font-medium">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary-green mt-1.5 flex-shrink-0" />
                                                    {text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-primary-burgundy font-black text-[10px] uppercase tracking-widest">
                                            <CloseIcon size={14} /> Evitar
                                        </div>
                                        <ul className="space-y-3">
                                            {[
                                                "No realizar actividad física intensa durante al menos 8 horas previas",
                                                "No fumar ni vapear en las 8 horas previas",
                                                "No consumir alcohol ni drogas de consumo problemático en las 24 horas previas"
                                            ].map((text, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-gray-600 font-medium">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary-burgundy mt-1.5 flex-shrink-0" />
                                                    {text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </AccordionItem>

                            <AccordionItem title="PREPARACION EXTRACCION DE SANGRE (PEDIATRIA)">
                                <div className="space-y-8">
                                    <div className="bg-primary-green/5 p-6 rounded-2xl border border-primary-green/10">
                                        <div className="flex items-start gap-3 text-primary-green font-black text-[10px] uppercase tracking-widest mb-3">
                                            <Info size={14} className="mt-0.5" /> Indicaciones para pacientes pediátricos
                                        </div>
                                        <p className="text-sm text-gray-600 leading-relaxed italic">
                                            Los tiempos de ayuno deben adaptarse a la edad y al ritmo natural de alimentación del niño. Siempre que sea posible, programar la extracción <strong>justo antes de la siguiente toma de leche</strong> (materna o mamadera).
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-primary-green font-black text-[10px] uppercase tracking-widest">
                                            <Check size={14} /> Recomendaciones según la edad
                                        </div>
                                        <ul className="space-y-3">
                                            <li className="flex gap-3 text-sm text-gray-700 font-bold">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary-green mt-1.5 flex-shrink-0" />
                                                Lactantes (&lt;1 año): ayuno de 3 horas
                                            </li>
                                            <li className="flex gap-3 text-sm text-gray-700 font-bold">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary-green mt-1.5 flex-shrink-0" />
                                                Niños pequeños (1 a 4 años): ayuno de 3 a 6 horas
                                            </li>
                                            <li className="flex gap-3 text-sm text-gray-700 font-bold">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary-green mt-1.5 flex-shrink-0" />
                                                Niños mayores (≥4 años): ayuno de 8 horas
                                            </li>
                                            {[
                                                "Mantener hidratación habitual con agua, sin forzar la ingesta",
                                                "Respetar la medicación indicada por el pediatra",
                                                "Acudir en el horario asignado para minimizar esperas"
                                            ].map((text, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-gray-600 font-medium">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 flex-shrink-0" />
                                                    {text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-primary-burgundy font-black text-[10px] uppercase tracking-widest">
                                            <CloseIcon size={14} /> Evitar
                                        </div>
                                        <ul className="space-y-3">
                                            {[
                                                "No ofrecer alimentos ni bebidas calóricas durante el ayuno",
                                                "No realizar juegos o actividad física intensa antes de la extracción",
                                                "No administrar golosinas, jugos o leche para \"calmar\" antes del estudio"
                                            ].map((text, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-gray-600 font-medium">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary-burgundy mt-1.5 flex-shrink-0" />
                                                    {text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </AccordionItem>

                            <AccordionItem title="ORINA AL AZAR">
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-gray-400 font-black text-[10px] uppercase tracking-widest">
                                            <Info size={14} /> Preparación previa
                                        </div>
                                        <ul className="space-y-2">
                                            <li className="text-sm text-gray-600 font-medium">Evite <strong>actividad física intensa</strong> antes de la toma.</li>
                                            <li className="text-sm text-gray-600 font-medium">Mantenga una <strong>ingesta normal de líquidos</strong> (ni exceso ni falta).</li>
                                            <li className="text-sm text-gray-600 font-medium italic text-gray-400">Algunos alimentos como la remolacha o colorantes pueden cambiar el color de la orina.</li>
                                        </ul>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-primary-green font-black text-[10px] uppercase tracking-widest">
                                            <Check size={14} /> Tipo de muestra
                                        </div>
                                        <ul className="space-y-3 pl-2">
                                            {[
                                                "Se recomienda la primera orina de la mañana, después del descanso nocturno.",
                                                "Si no es posible, asegure al menos 4 horas de retención en la vejiga.",
                                                "Siempre recolectar el chorro medio.",
                                                "Descartar el primer chorro.",
                                                "Juntar la parte central en el vasito plástico nuevo provisto por el laboratorio. Una vez recolectada, trasvasar la muestra al tubo cónico estéril con tapa provisto por el laboratorio.",
                                                "Desechar el final de la micción.",
                                                "En niños pequeños pueden usarse bolsas colectoras especiales (provistas por el laboratorio)."
                                            ].map((text, i) => (
                                                <li key={i} className="flex gap-4 text-sm text-gray-700 font-medium bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                                                    <span className="font-black text-primary-green">{i + 1}.</span>
                                                    {text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="bg-primary-green/5 p-6 rounded-2xl border border-primary-green/10">
                                        <div className="flex items-center gap-2 text-primary-green font-black text-[10px] uppercase tracking-widest mb-4">
                                            <Calendar size={14} /> Conservación y entrega
                                        </div>
                                        <ul className="space-y-2 text-sm text-gray-600 font-medium">
                                            <li>Lleve la muestra al laboratorio <strong>lo antes posible.</strong></li>
                                            <li>Lo ideal es analizarla dentro de las <strong>2 a 4 horas</strong> posteriores a la recolección.</li>
                                            <li>Si no puede entregarla en ese tiempo:</li>
                                            <li className="pl-4 flex items-center gap-2">• Conservar en <strong>heladera (2-8°C).</strong></li>
                                            <li className="pl-4 flex items-center gap-2">• Entregar dentro de las <strong>6 horas.</strong></li>
                                            <li className="pt-2 text-primary-burgundy font-bold text-xs uppercase italic">No congelar la muestra.</li>
                                        </ul>
                                    </div>
                                </div>
                            </AccordionItem>

                            <AccordionItem title="PARASITOLÓGICO SERIADO">
                                <div className="space-y-8">
                                    <div className="space-y-6">
                                        <div className="bg-primary-green/5 p-4 rounded-xl inline-block font-black text-[10px] uppercase tracking-widest text-primary-green">
                                            Parasitológico Seriados
                                        </div>
                                        <div className="space-y-4">
                                            <h4 className="text-xs font-black text-gray-800 uppercase tracking-wider">Toma de muestra</h4>
                                            <ul className="space-y-3">
                                                <li className="text-sm text-gray-600 font-medium">• Durante <strong>3 días consecutivos</strong>, recolectar de cada deposición una porción de materia fecal del tamaño de la cuchara provista.</li>
                                                <li className="text-sm text-gray-600 font-medium">• Colocar todas las muestras en el <strong>mismo frasco estéril</strong> provisto por el laboratorio.</li>
                                                <li className="text-sm text-gray-600 font-medium">• En caso de que un día no defeque, prolongar la recolección un día más.</li>
                                                <li className="text-sm text-primary-burgundy font-bold italic pl-4">! No recolectar directamente del inodoro.</li>
                                            </ul>
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="text-xs font-black text-gray-800 uppercase tracking-wider">Conservación</h4>
                                            <p className="text-sm text-gray-600 font-medium">• Mantener el recipiente bien cerrado y <strong>refrigerado (2-8°C)</strong> durante todo el período.</p>
                                            <p className="text-sm text-gray-600 font-medium">• No congelar la muestra.</p>
                                        </div>
                                    </div>

                                    <div className="h-px bg-gray-100" />

                                    <div className="space-y-6">
                                        <div className="bg-primary-burgundy/5 p-4 rounded-xl inline-block font-black text-[10px] uppercase tracking-widest text-primary-burgundy">
                                            Test de Graham (Escobillado Perianal)
                                        </div>
                                        <div className="space-y-4">
                                            <h4 className="text-xs font-black text-gray-800 uppercase tracking-wider">Toma de muestra</h4>
                                            <p className="text-sm text-gray-500 italic mb-4">Durante 5 mañanas consecutivas, antes de levantarse de la cama:</p>
                                            <ol className="space-y-3">
                                                {[
                                                    "Colocar un trozo de cinta adhesiva tipo scotch sobre la zona perianal.",
                                                    "Retirar la cinta cuidadosamente.",
                                                    "Adherir la cinta a uno de los vidrios provistos por el laboratorio.",
                                                    "Utilizar un vidrio distinto cada día."
                                                ].map((text, i) => (
                                                    <li key={i} className="flex gap-4 text-sm text-gray-700 font-medium">
                                                        <span className="font-black text-primary-burgundy">{i + 1}.</span>
                                                        {text}
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="text-xs font-black text-gray-800 uppercase tracking-wider">Conservación</h4>
                                            <p className="text-sm text-gray-600 font-medium">• Mantener los vidrios a <strong>temperatura ambiente</strong>, protegidos del polvo.</p>
                                            <p className="text-sm text-gray-600 font-medium">• Remitirlos al laboratorio inmediatamente después de completar la serie.</p>
                                        </div>
                                    </div>
                                </div>
                            </AccordionItem>

                            <AccordionItem title="COPROCULTIVO">
                                <div className="space-y-10">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <div className="font-black text-[10px] uppercase tracking-widest text-primary-green bg-primary-green/5 p-3 rounded-lg flex items-center gap-2">
                                                <Check size={14} /> Convencional
                                            </div>
                                            <ul className="space-y-3 text-sm text-gray-600 font-medium">
                                                <li>• Recoger una pequeña cantidad en el frasco estéril.</li>
                                                <li className="text-primary-burgundy font-bold italic">• ! No recolectar del inodoro.</li>
                                                <li>• Remitir la muestra <strong>inmediatamente.</strong></li>
                                                <li>• Caso contrario, conservar en <strong>heladera (2-8°C).</strong></li>
                                            </ul>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="font-black text-[10px] uppercase tracking-widest text-primary-burgundy bg-primary-burgundy/5 p-3 rounded-lg flex items-center gap-2">
                                                <Check size={14} /> Pacientes con Pañales
                                            </div>
                                            <ul className="space-y-3 text-sm text-gray-600 font-medium">
                                                <li>• Obtener la muestra mediante el de <strong>hisopo estéril.</strong></li>
                                                <li>• Tomar de la zona con mayor concentración de materia fecal.</li>
                                                <li>• Depositar en el medio de transporte.</li>
                                                <li className="text-primary-burgundy font-bold italic">• ! No se aceptará el pañal como muestra.</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 flex flex-col md:flex-row gap-8">
                                        <div className="flex-1 space-y-3">
                                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Conservación</h4>
                                            <p className="text-sm font-bold text-gray-700">Mantener a temperatura ambiente y entregar lo antes posible.</p>
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Importante</h4>
                                            <p className="text-xs text-gray-500 italic">No abrir el frasco hasta el momento de recolectar. No exceder la capacidad del recipiente.</p>
                                        </div>
                                    </div>
                                </div>
                            </AccordionItem>

                            <AccordionItem title="ORINA DE 24 HS.">
                                <div className="space-y-10">
                                    <div className="bg-primary-burgundy/5 p-6 rounded-2xl border border-primary-burgundy/10 text-center">
                                        <p className="text-sm font-black text-primary-burgundy uppercase tracking-tighter">
                                            Recolección de muestra urinaria para estudios cuantitativos
                                        </p>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-10">
                                        <div className="space-y-6">
                                            <div className="space-y-4">
                                                <h4 className="font-black text-[10px] uppercase tracking-widest text-gray-900 border-l-4 border-primary-green pl-3">Inicio de la recolección</h4>
                                                <ul className="space-y-2 text-sm text-gray-600 font-medium">
                                                    <li>• Descartar la primera orina de la mañana.</li>
                                                    <li>• A partir de ahí, recolectar <strong>TODAS</strong> las micciones del día y la noche.</li>
                                                    <li>• Incluir la primera del día siguiente.</li>
                                                </ul>
                                            </div>
                                            <div className="space-y-4">
                                                <h4 className="font-black text-[10px] uppercase tracking-widest text-gray-900 border-l-4 border-primary-green pl-3">Modo de recolección</h4>
                                                <p className="text-sm text-gray-600 font-medium">Utilizar el recipiente provisto por el laboratorio. Recolectar la totalidad sin pérdidas.</p>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-4">
                                                <h4 className="font-black text-[10px] uppercase tracking-widest text-gray-900 border-l-4 border-primary-burgundy pl-3">Conservación</h4>
                                                <p className="text-sm text-gray-600 font-medium">Mantener <strong>refrigerado (2-8°C)</strong> durante todo el proceso. No exponer al calor.</p>
                                            </div>
                                            <div className="space-y-4">
                                                <h4 className="font-black text-[10px] uppercase tracking-widest text-gray-900 border-l-4 border-primary-burgundy pl-3">Identificación</h4>
                                                <p className="text-xs text-gray-500 italic">Rotular con Nombre, Fecha/Hora de inicio y Fecha/Hora de finalización.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-primary-green text-white p-6 rounded-2xl flex items-center justify-between gap-6 shadow-xl shadow-green-100">
                                        <div className="flex items-center gap-4">
                                            <Calendar size={24} />
                                            <div>
                                                <h4 className="font-black text-[10px] uppercase tracking-widest opacity-80">Entrega</h4>
                                                <p className="text-sm font-bold">Presentarse con la muestra completa al finalizar la serie.</p>
                                            </div>
                                        </div>
                                        <ArrowRight size={20} className="hidden sm:block" />
                                    </div>
                                </div>
                            </AccordionItem>

                            <AccordionItem title="UROCULTIVO">
                                <div className="space-y-10 text-gray-700">
                                    <div className="bg-primary-green/5 p-6 rounded-2xl border border-primary-green/10">
                                        <p className="text-sm font-bold text-primary-green uppercase tracking-tight mb-2">Recolección de muestra de orina para cultivo bacteriano</p>
                                        <p className="text-sm italic text-gray-500">Para obtener resultados confiables, siga cuidadosamente estas indicaciones según su condición.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                            <Info size={14} /> Tipo de muestra
                                        </div>
                                        <ul className="grid sm:grid-cols-2 gap-4">
                                            <li className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-sm font-medium">
                                                <span className="text-primary-green font-black block text-[10px] uppercase mb-1">Preferente</span>
                                                Primera orina de la mañana
                                            </li>
                                            <li className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-sm font-medium">
                                                <span className="text-gray-400 font-black block text-[10px] uppercase mb-1">Alternativa</span>
                                                Retención vesical de al menos 3 horas
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="space-y-6">
                                            <h4 className="flex items-center gap-3 text-sm font-black text-gray-900 border-l-4 border-primary-green pl-4 uppercase tracking-tight">
                                                1. Pacientes que controlan esfínteres
                                            </h4>

                                            <div className="grid md:grid-cols-2 gap-8 pl-5">
                                                <div className="space-y-4">
                                                    <span className="font-black text-[10px] uppercase tracking-widest text-primary-green">Hombres</span>
                                                    <ul className="space-y-2 text-sm font-medium text-gray-600 list-decimal pl-4">
                                                        <li>Retraer el prepucio.</li>
                                                        <li>Higienizar el glande con agua y jabón neutro.</li>
                                                        <li>Enjuagar completamente.</li>
                                                        <li>Repetir el procedimiento una vez más.</li>
                                                    </ul>
                                                </div>
                                                <div className="space-y-4">
                                                    <span className="font-black text-[10px] uppercase tracking-widest text-primary-burgundy">Mujeres</span>
                                                    <ul className="space-y-2 text-sm font-medium text-gray-600 list-decimal pl-4">
                                                        <li>Separar los labios mayores.</li>
                                                        <li>Higienizar la zona genital con agua y jabón desde adelante hacia atrás.</li>
                                                        <li>Enjuagar cuidadosamente y repetir.</li>
                                                        <li>En caso de flujo vaginal, colocar un tampón y realizar nuevamente el lavado.</li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 ml-5">
                                                <span className="font-black text-[10px] uppercase tracking-widest text-gray-400 block mb-3">Recolección</span>
                                                <p className="text-sm font-bold text-gray-700">Descartar el primer chorro de orina. Recolectar la fracción media en frasco estéril. Desechar el final.</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="flex items-center gap-3 text-sm font-black text-gray-900 border-l-4 border-primary-green pl-4 uppercase tracking-tight">
                                                2. Lactantes o sin control de esfínteres
                                            </h4>
                                            <p className="text-sm font-medium text-gray-600 pl-5">
                                                Realizar higiene genital profunda. Tomar la muestra <strong className="text-gray-900">"al asecho"</strong> en frasco estéril, evitando cualquier tipo de contaminación.
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="flex items-center gap-3 text-sm font-black text-gray-900 border-l-4 border-primary-burgundy pl-4 uppercase tracking-tight">
                                                3. Pacientes sondados
                                            </h4>
                                            <ul className="space-y-2 text-sm font-medium text-gray-600 pl-5 list-disc">
                                                <li>Pinzar la sonda unos minutos para permitir acumulación.</li>
                                                <li>Desinfectar el sitio de punción.</li>
                                                <li>Extraer la muestra a <strong className="text-gray-900">10 cm del meato</strong> con técnica estéril.</li>
                                                <li>Remitir en jeringa estéril sellada con tapón de goma.</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="bg-primary-green text-white p-8 rounded-[2rem] shadow-xl shadow-green-100 space-y-4">
                                        <div className="flex items-center gap-3 font-black text-[10px] uppercase tracking-widest">
                                            <Calendar size={16} /> Entrega de la muestra
                                        </div>
                                        <div className="space-y-3">
                                            <p className="text-sm font-bold">Ideal: entregar dentro de los 30 a 60 minutos posteriores.</p>
                                            <div className="pt-2 border-t border-white/20 space-y-2 opacity-90">
                                                <p className="text-xs font-medium">• Conservar en heladera (2-8°C) si hay demora.</p>
                                                <p className="text-xs font-medium">• Máximo 6 horas de refrigeración. NO CONGELAR.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
                                        <div className="bg-primary-burgundy/10 p-2 rounded-lg text-primary-burgundy">
                                            <Info size={20} />
                                        </div>
                                        <div className="space-y-2">
                                            <span className="font-black text-[10px] uppercase tracking-widest text-primary-burgundy">Importante</span>
                                            <ul className="text-xs font-bold text-gray-600 space-y-1 list-disc pl-4">
                                                <li>Evitar antimicrobianos 72 hs previas (o informar nombre).</li>
                                                <li>No ingerir diuréticos antes de la toma.</li>
                                                <li>No destapar el frasco hasta el momento de la recolección.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </AccordionItem>

                            <AccordionItem title="SANGRE OCULTA EN MATERIA FECAL">
                                <div className="space-y-8 text-gray-700">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#d97706]">
                                                <Info size={14} /> Modo de recolección
                                            </div>
                                            <ul className="space-y-3 text-sm font-medium text-gray-600">
                                                <li>• Recolectar en <strong>frasco estéril con tapa a rosca</strong>.</li>
                                                <li>• Utilizar paleta o espátula limpia (tamaño de una nuez).</li>
                                                <li>• Evitar mezclar con orina, agua del inodoro o papel.</li>
                                                <li>• Cerrar bien el frasco inmediatamente.</li>
                                            </ul>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary-green">
                                                <Calendar size={14} /> Lugar de recolección
                                            </div>
                                            <ul className="space-y-3 text-sm font-medium text-gray-600">
                                                <li>• Puede realizarse en <strong>domicilio</strong>.</li>
                                                <li>• Entregar dentro de las <strong>2 horas</strong> posteriores.</li>
                                                <li>• En heladera (2-8°C) hasta <strong>12 horas</strong> si hay demora.</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col md:flex-row gap-6">
                                        <div className="flex-1 space-y-2">
                                            <span className="font-black text-[10px] uppercase tracking-widest text-gray-400">Identificación</span>
                                            <p className="text-xs font-bold text-gray-600 italic">Nombre completo, fecha y hora de recolección.</p>
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <span className="font-black text-[10px] uppercase tracking-widest text-primary-burgundy">Importante</span>
                                            <p className="text-xs font-bold text-primary-burgundy">No se aceptan muestras en papel o bolsas. Informar si hay sangrado activo.</p>
                                        </div>
                                    </div>
                                </div>
                            </AccordionItem>

                            <AccordionItem title="CURVA DE TOLERANCIA ORAL A LA GLUCOSA">
                                <div className="space-y-10 text-gray-700">
                                    <div className="bg-primary-burgundy/5 p-6 rounded-2xl border border-primary-burgundy/10">
                                        <p className="text-sm font-bold text-primary-burgundy uppercase tracking-tight mb-2">Prueba de Tolerancia Oral a la Glucosa (PTOG)</p>
                                        <div className="flex flex-wrap gap-4 text-xs font-black text-gray-500 uppercase tracking-widest">
                                            <span className="flex items-center gap-1"><Calendar size={12} /> Lun a Vie: 07:00 a 08:00 hs</span>
                                            <span className="flex items-center gap-1"><Calendar size={12} /> Sáb: 08:00 hs</span>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">1. Preparación previa</h4>
                                            <p className="text-sm font-medium bg-white p-4 rounded-xl border border-gray-100 shadow-sm inline-block">
                                                Presentarse con <strong>8 horas de ayuno</strong>. Solo agua permitida.
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">2. Etapas del estudio</h4>
                                            <div className="space-y-4">
                                                {[
                                                    "Primera extracción de sangre al llegar.",
                                                    "Ingesta de 300ml de solución de glucosa (puede mezclarse con té negro).",
                                                    "Reposo obligatorio de 2 horas (sin caminar ni actividad física).",
                                                    "Segunda extracción de sangre finalizado el reposo."
                                                ].map((step, i) => (
                                                    <div key={i} className="flex gap-4 items-start">
                                                        <span className="bg-primary-green text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                                                        <p className="text-sm font-medium text-gray-700">{step}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-primary-burgundy text-white p-6 rounded-2xl flex items-start gap-4">
                                        <Info size={20} className="flex-shrink-0" />
                                        <p className="text-xs font-bold leading-relaxed">
                                            Durante la espera no se debe caminar ni consumir alimentos. Si presenta náuseas o mareos, informar inmediatamente al personal.
                                        </p>
                                    </div>
                                </div>
                            </AccordionItem>

                            <AccordionItem title="ESPERMOGRAMA">
                                <div className="space-y-8 text-gray-700">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary-burgundy">Antes de la recolección</h4>
                                            <ul className="space-y-3 text-sm font-medium text-gray-600">
                                                <li className="flex gap-2"><Check size={14} className="text-primary-green" /> Abstinencia sexual: <strong>2 a 7 días</strong>.</li>
                                                <li className="flex gap-2"><CloseIcon size={14} className="text-primary-burgundy" /> Evitar alcohol, fiebre o medicamentos.</li>
                                                <li className="flex gap-2"><CloseIcon size={14} className="text-primary-burgundy" /> No usar lubricantes ni preservativos.</li>
                                            </ul>
                                        </div>
                                        <div className="space-y-4">
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary-green">Modo y lugar</h4>
                                            <ul className="space-y-3 text-sm font-medium text-gray-600">
                                                <li>• Higiene previa de manos y genitales.</li>
                                                <li>• Recolección por <strong>masturbación directa</strong>.</li>
                                                <li>• En domicilio: entrega en <strong>clínica &lt; 1 hora</strong>.</li>
                                                <li>• Transportar a <strong>temperatura corporal</strong>.</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Importante</p>
                                        <p className="text-sm font-medium text-gray-600">Evitar la pérdida de la primera fracción del eyaculado. Si ocurre, informar al laboratorio.</p>
                                    </div>
                                </div>
                            </AccordionItem>

                            <AccordionItem title="ACIDO VAINILLIN MANDELICO">
                                <div className="space-y-8 text-gray-700">
                                    <div className="space-y-4">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-primary-burgundy">Dieta estricta (4 días)</h4>
                                        <div className="bg-primary-burgundy/5 p-6 rounded-2xl border border-primary-burgundy/10">
                                            <p className="text-sm font-bold text-gray-700 mb-4">NO ingerir alimentos que contengan vainilla o sus derivados:</p>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                {["Banana", "Tomate", "Chocolate", "Cacao", "Cremas", "Tortas", "Helados"].map(food => (
                                                    <div key={food} className="flex items-center gap-2 text-xs font-black text-primary-burgundy bg-white px-3 py-2 rounded-lg border border-primary-burgundy/20">
                                                        <CloseIcon size={12} /> {food}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Medicamentos y Bebidas</h4>
                                            <ul className="space-y-2 text-sm font-medium text-gray-600">
                                                <li>• No ingerir <strong>Aspirinas</strong>.</li>
                                                <li>• Beber solamente agua.</li>
                                                <li>• Evitar té, café y mate.</li>
                                            </ul>
                                        </div>
                                        <div className="space-y-4">
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Día de recolección (4to día)</h4>
                                            <ul className="space-y-2 text-sm font-medium text-gray-600">
                                                <li>• Recolectar orina según indicaciones.</li>
                                                <li>• No ingerir diuréticos ni fumar.</li>
                                                <li>• Evitar stress, ejercicio y dolor.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </AccordionItem>

                            <AccordionItem title="PLASMA RICO EN PLAQUETAS">
                                <div className="space-y-8 text-gray-700">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary-green">Requisitos</h4>
                                            <ul className="space-y-2 text-sm font-medium text-gray-600">
                                                <li>• Orden médica con hemograma/plaquetas.</li>
                                                <li>• Consentimiento informado (en Lab).</li>
                                                <li>• Extracción con sistema <strong>Vacutainer</strong>.</li>
                                            </ul>
                                        </div>
                                        <div className="space-y-4">
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary-burgundy">Tiempos y Condiciones</h4>
                                            <ul className="space-y-2 text-sm font-medium text-gray-600">
                                                <li>• Preparación: <strong>20-25 minutos</strong>.</li>
                                                <li>• Aplicación: dentro de las <strong>2 horas</strong>.</li>
                                                <li>• Conservación: temperatura ambiente.</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="bg-primary-green text-white p-6 rounded-[2rem] shadow-xl shadow-green-100 flex flex-col md:flex-row gap-6 items-center text-center md:text-left">
                                        <Info size={32} />
                                        <div>
                                            <h4 className="text-xs font-black uppercase tracking-widest opacity-80 mb-1">Informe al médico</h4>
                                            <p className="text-sm font-bold">Se envía por PDF (Mail/WhatsApp): Hemograma basal, recuento plaquetas e informe celular del PRP.</p>
                                        </div>
                                    </div>
                                </div>
                            </AccordionItem>

                            <AccordionItem title="ROTAVIRUS - ADENOVIRUS">
                                <div className="space-y-6 text-gray-700">
                                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                        <p className="text-sm font-medium text-gray-600">
                                            Recolectar muestra de materia fecal en frasco estéril. Remitir al laboratorio lo antes posible (dentro de las 2 horas). Caso contrario conservar en heladera.
                                        </p>
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
