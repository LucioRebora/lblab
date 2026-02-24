"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
    Info,
    ClipboardList,
    Microscope,
    DollarSign,
    Dog,
    Cat,
    Phone,
    ArrowRight,
    CheckCircle2,
    Calendar,
    Search,
    Plus,
    Minus
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

type TabType = "INSTRUCCIONES" | "SOLICITUD" | "PRECIOS";

function AccordionItem({ title }: { title: string }) {
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
                    <span className="font-black text-gray-800 text-[11px] tracking-widest uppercase">{title}</span>
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
                        <div className="p-6 pt-0 text-sm text-gray-500 italic pl-16">
                            Indicaciones específicas para este estudio próximamente.
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function VeterinariaPage() {
    const [activeTab, setActiveTab] = useState<TabType>("INSTRUCCIONES");
    const [priceSearch, setPriceSearch] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [prices, setPrices] = useState<any[]>([]);
    const [nbuValue, setNbuValue] = useState<number>(1);
    const [validity, setValidity] = useState<string>("");
    const [loadingPrices, setLoadingPrices] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchPrices = async () => {
            setLoadingPrices(true);
            try {
                const res = await fetch("/api/admin/config/prices?category=VETERINARIA");
                if (res.ok) {
                    const data = await res.json();
                    setPrices(data);
                }

                const configRes = await fetch("/api/admin/config/global");
                if (configRes.ok) {
                    const configs = await configRes.json();
                    const nbuConfig = configs.find((c: any) => c.key === "NBU_VALUE_VET");
                    const validityConfig = configs.find((c: any) => c.key === "VIGENCIA_VET");
                    if (nbuConfig) setNbuValue(parseFloat(nbuConfig.value));
                    if (validityConfig) setValidity(validityConfig.value);
                }
            } catch (error) {
                console.error("Error fetching prices:", error);
            } finally {
                setLoadingPrices(false);
            }
        };

        if (activeTab === "PRECIOS") {
            fetchPrices();
        }
    }, [activeTab]);

    const tabs: { id: TabType; label: string; icon: any }[] = [
        { id: "INSTRUCCIONES", label: "TOMA DE MUESTRAS", icon: Info },
        { id: "SOLICITUD", label: "SOLICITAR TURNO", icon: ClipboardList },
        { id: "PRECIOS", label: "LISTA DE PRECIOS", icon: DollarSign },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="pt-32 pb-20">
                <hr className="w-full border-gray-100 mb-10" />

                {/* Title Section */}
                <div className="flex flex-col items-center justify-center mb-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-4 text-2xl md:text-3xl font-black text-[#1a2b3c] tracking-tighter uppercase"
                    >
                        <div className="bg-primary-green/5 p-3 rounded-2xl">
                            <Dog className="text-primary-green" size={28} />
                        </div>
                        <span>ANÁLISIS VETERINARIOS</span>
                    </motion.div>
                </div>

                {/* Tabs Section */}
                <div className="mb-12 flex justify-center px-4 overflow-x-auto">
                    <div className="bg-sage-bg p-2 rounded-[2rem] flex gap-1 min-w-max border border-white shadow-sm">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    setIsSubmitted(false);
                                }}
                                className={`px-6 py-4 rounded-xl font-black text-[10px] tracking-[0.2em] transition-all flex items-center gap-3 ${activeTab === tab.id
                                    ? "bg-primary-green text-white shadow-lg shadow-primary-green/20"
                                    : "text-gray-400 hover:text-gray-600 hover:bg-white"
                                    }`}
                            >
                                <tab.icon size={16} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-6">
                    <AnimatePresence mode="wait">
                        {activeTab === "INSTRUCCIONES" && (
                            <motion.div
                                key="instrucciones"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-10"
                            >
                                <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-12 shadow-xl shadow-gray-100/50">
                                    <h2 className="text-2xl font-black text-primary-green mb-10 uppercase tracking-tight flex items-center gap-3">
                                        <div className="w-2 h-8 bg-primary-green rounded-full shadow-sm shadow-primary-green/20" />
                                        Indicaciones para toma de muestras
                                    </h2>

                                    {/* Tube Specifications */}
                                    <div className="space-y-8 mb-12">
                                        {/* EDTA */}
                                        <div className="group">
                                            <div className="bg-[#E0D7E5] px-6 py-3 rounded-xl border border-[#c5b4cf] inline-block mb-4 shadow-sm group-hover:shadow-md transition-all">
                                                <h3 className="font-black text-[#4A2B5E] uppercase text-xs tracking-widest leading-none">
                                                    TUBO TAPA LILA: (EDTA)
                                                </h3>
                                            </div>
                                            <p className="text-sm text-gray-600 leading-relaxed font-medium pl-2 border-l-2 border-[#E0D7E5]">
                                                HEMOGRAMA, PLAQUETAS. CARGAR 2.5 ML, HOMOGENIZAR SUAVEMENTE. REFRIGERAR HASTA EL ENVIO AL LABORATORIO. ROTULAR. EN UNA EXTRACCION DIFICULTOSA CARGAR TUBOS PEDIATRICOS HASTA LA MARCA.
                                            </p>
                                        </div>

                                        {/* HEPARINA */}
                                        <div className="group">
                                            <div className="bg-[#FF0000] px-6 py-3 rounded-xl border border-red-700 inline-block mb-4 shadow-sm group-hover:shadow-md transition-all">
                                                <h3 className="font-black text-white uppercase text-xs tracking-widest leading-none">
                                                    TUBO TAPA ROJA: (HEPARINA)
                                                </h3>
                                            </div>
                                            <p className="text-sm text-gray-600 leading-relaxed font-medium pl-2 border-l-2 border-red-500">
                                                QUIMICA (UREA, CREATININA, HEPATOGRAMA, CPK, ETC.) CARGAR 3 ML. HOMOGENIZAR. REFRIGERAR. EN EL CASO DE SOLICITAR GLUCEMIA ESTA DEBERA SER PROCESADA INMEDIATAMENTE. ROTULAR.
                                            </p>
                                        </div>

                                        {/* CITRATO */}
                                        <div className="group">
                                            <div className="bg-[#00B0F0] px-6 py-3 rounded-xl border border-blue-600 inline-block mb-4 shadow-sm group-hover:shadow-md transition-all">
                                                <h3 className="font-black text-white uppercase text-xs tracking-widest leading-none">
                                                    TUBO TAPA CELESTE: (CITRATO)
                                                </h3>
                                            </div>
                                            <p className="text-sm text-gray-600 leading-relaxed font-medium pl-2 border-l-2 border-blue-500">
                                                COAGULOGRAMA, CARGAR HASTA LA MARCA, 2.5 ML; (o TUBO CHICO 1.0 ML). HOMOGENIZAR SUAVEMENTE. REFRIGERAR HASTA EL ENVIO. SE DEBE PROCESAR LO MAS RAPIDO POSIBLE. ROTULAR. EN UNA EXTRACCION DIFICULTOSA CARGAR TUBOS PEDIATRICOS HASTA LA MARCA.
                                            </p>
                                        </div>

                                        {/* SIN ANTICOAGULANTE */}
                                        <div className="group">
                                            <div className="bg-[#D99594] px-6 py-3 rounded-xl border border-[#c07d7c] inline-block mb-4 shadow-sm group-hover:shadow-md transition-all">
                                                <h3 className="font-black text-[#1a2b3c] uppercase text-xs tracking-widest leading-none">
                                                    TUBO TAPA AMARILLA CON GEL: (SIN ANTICOAGULANTE)
                                                </h3>
                                            </div>
                                            <p className="text-sm text-gray-600 leading-relaxed font-medium pl-2 border-l-2 border-[#D99594]">
                                                PARA ESTUDIOS ESPECIALES, CONSULTAR.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Reception Hours */}
                                    <div className="bg-sage-bg/50 rounded-[2rem] p-8 border border-white mb-8 shadow-sm">
                                        <div className="flex items-center gap-3 mb-6">
                                            <Calendar className="text-primary-green" size={20} />
                                            <h3 className="font-black text-gray-900 uppercase text-[10px] tracking-[0.2em]">Horarios de recepción</h3>
                                        </div>
                                        <div className="space-y-3 pl-8">
                                            <p className="text-sm font-bold text-gray-700">Lunes a Viernes: 7:00 a 11:00 hs y 16:00 a 19:00 hs.</p>
                                            <p className="text-sm font-bold text-gray-700">Sábados: 8:00 a 11:00 hs.</p>
                                            <p className="text-xs text-gray-500 italic mt-4">Urgencias reales que no puedan esperar, consultar. Fines de semanas largos, coordinar.</p>
                                        </div>
                                    </div>

                                    {/* Shipping Info */}
                                    <div className="bg-sage-bg rounded-[2rem] p-8 border border-white shadow-sm">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="bg-primary-green w-1.5 h-6 rounded-full" />
                                            <h3 className="font-black text-gray-900 uppercase text-[10px] tracking-[0.2em]">Envíos al laboratorio</h3>
                                        </div>
                                        <ul className="space-y-3 text-sm text-gray-600 font-medium list-none pl-4">
                                            <li className="flex items-start gap-4">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary-green mt-1.5 flex-shrink-0" />
                                                <span>Rotular los tubos.</span>
                                            </li>
                                            <li className="flex items-start gap-4">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary-green mt-1.5 flex-shrink-0" />
                                                <span>Orden de prácticas facilitada por el laboratorio.</span>
                                            </li>
                                            <li className="flex items-start gap-4">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary-green mt-1.5 flex-shrink-0" />
                                                <p>Remitir al laboratorio personalmente o mediante cadete (embalar correctamente las muestras para evitar derrame y asegurar un traslado seguro).</p>
                                            </li>
                                            <li className="flex items-start gap-4">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary-green mt-1.5 flex-shrink-0" />
                                                <p><strong className="text-gray-900">Dirección:</strong> Bolívar 1002 (Esq. Chacabuco). Gualeguaychú, Entre Ríos.</p>
                                            </li>
                                            <li className="flex items-start gap-4 italic border-t border-primary-green/10 pt-4 mt-4">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary-green mt-1.5 flex-shrink-0" />
                                                <p><strong className="text-gray-900">Resultados:</strong> Envío por Mail o WhatsApp a las 2 hs de recibida la muestra.</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "SOLICITUD" && (
                            <motion.div
                                key="solicitud"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-12 shadow-xl shadow-gray-100/50"
                            >
                                {isSubmitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-12 flex flex-col items-center text-center space-y-6"
                                    >
                                        <div className="w-20 h-20 bg-primary-green text-white rounded-full flex items-center justify-center shadow-xl shadow-green-100">
                                            <CheckCircle2 size={40} />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-black text-gray-900 uppercase">¡Solicitud Enviada!</h3>
                                            <p className="text-gray-500 italic">Tu pedido ha sido registrado con éxito. Nos pondremos en contacto a la brevedad.</p>
                                        </div>
                                        <button
                                            onClick={() => setIsSubmitted(false)}
                                            className="text-primary-green font-black text-[10px] uppercase tracking-widest hover:underline pt-4"
                                        >
                                            Enviar otra solicitud
                                        </button>
                                    </motion.div>
                                ) : (
                                    <>
                                        <div className="flex flex-col items-center text-center mb-10">
                                            <div className="w-16 h-16 bg-primary-green/10 text-primary-green rounded-2xl flex items-center justify-center mb-4">
                                                <ClipboardList size={32} />
                                            </div>
                                            <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Solicitud de Análisis Veterinarios</h3>
                                            <p className="text-gray-500 text-sm italic mt-2">Complete el formulario para solicitar el pedido médico.</p>
                                        </div>

                                        <form
                                            onSubmit={async (e) => {
                                                e.preventDefault();
                                                setIsSubmitting(true);
                                                const formData = new FormData(e.currentTarget);
                                                const data = {
                                                    email: formData.get("email"),
                                                    veterinaria: formData.get("veterinaria"),
                                                    profesional: formData.get("profesional"),
                                                    paciente: formData.get("paciente"),
                                                    analysis: formData.getAll("analysis"),
                                                    otro: formData.get("otro"),
                                                };

                                                try {
                                                    const res = await fetch("/api/veterinaria", {
                                                        method: "POST",
                                                        headers: { "Content-Type": "application/json" },
                                                        body: JSON.stringify(data),
                                                    });
                                                    if (res.ok) {
                                                        setIsSubmitted(true);
                                                    }
                                                } catch (error) {
                                                    console.error("Error submitting form:", error);
                                                } finally {
                                                    setIsSubmitting(false);
                                                }
                                            }}
                                            className="space-y-6"
                                        >
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Correo electrónico</label>
                                                <input
                                                    name="email"
                                                    required
                                                    type="email"
                                                    placeholder="ejemplo@correo.com"
                                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-primary-green transition-all font-bold text-gray-800"
                                                />
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Veterinaria</label>
                                                    <input
                                                        name="veterinaria"
                                                        required
                                                        type="text"
                                                        placeholder="Nombre de la veterinaria"
                                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-primary-green transition-all font-bold text-gray-800"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Profesional</label>
                                                    <input
                                                        name="profesional"
                                                        required
                                                        type="text"
                                                        placeholder="Nombre del veterinario"
                                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-primary-green transition-all font-bold text-gray-800"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Especie, Nombre, Propietario</label>
                                                <input
                                                    name="paciente"
                                                    required
                                                    type="text"
                                                    placeholder="Ej: Canino, 'Paco', Juan Perez"
                                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-primary-green transition-all font-bold text-gray-800"
                                                />
                                            </div>

                                            <div className="pt-6">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2 block mb-4">Análisis Solicitados *</label>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 bg-gray-50/50 p-6 rounded-[2rem] border border-gray-100">
                                                    {[
                                                        "HEMOGRAMA", "GLUCEMIA", "UREMIA", "CREATININA",
                                                        "HEPATOGRAMA", "GAMMA GT", "CALCEMIA", "FOSFATEMIA",
                                                        "MAGENSEMIA", "PROTEINAS TOTALES", "ALBUMIMA", "ORINA", "CULTIVO"
                                                    ].map((item) => (
                                                        <label key={item} className="flex items-center gap-3 cursor-pointer group">
                                                            <div className="relative flex items-center">
                                                                <input
                                                                    name="analysis"
                                                                    type="checkbox"
                                                                    value={item}
                                                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 checked:bg-primary-green checked:border-primary-green transition-all"
                                                                />
                                                                <div className="absolute text-white transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 left-1">
                                                                    <div className="w-3 h-3 bg-white rounded-full scale-0 peer-checked:scale-100 transition-transform" />
                                                                </div>
                                                            </div>
                                                            <span className="text-[11px] font-bold text-gray-600 group-hover:text-primary-green transition-colors">{item}</span>
                                                        </label>
                                                    ))}
                                                    <div className="sm:col-span-2 lg:col-span-3 mt-4">
                                                        <input
                                                            name="otro"
                                                            type="text"
                                                            placeholder="Otro (especificar)..."
                                                            className="w-full bg-white border-b border-gray-200 py-2 outline-none focus:border-primary-green transition-all text-sm font-medium italic"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-8 flex flex-col sm:flex-row gap-4">
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="flex-1 bg-primary-green text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                                >
                                                    {isSubmitting ? "ENVIANDO..." : "ENVIAR"}
                                                </button>
                                                <button
                                                    type="reset"
                                                    className="px-8 py-5 rounded-2xl font-black text-[10px] text-gray-400 uppercase tracking-widest hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100"
                                                >
                                                    BORRAR FORMULARIO
                                                </button>
                                            </div>
                                        </form>
                                    </>
                                )}
                            </motion.div>
                        )}

                        {activeTab === "PRECIOS" && (
                            <motion.div
                                key="precios"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-6"
                            >
                                <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-100 pb-6">
                                    <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Lista de Precios Veterinaria</h2>
                                    <div className="max-w-xs w-full relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Buscar estudio..."
                                            value={priceSearch}
                                            onChange={(e) => setPriceSearch(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary-green transition-all text-xs font-bold text-gray-800"
                                        />
                                    </div>
                                </div>
                                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full border-collapse">
                                            <thead>
                                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-left">Análisis</th>
                                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-center">Cant. NBU</th>
                                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-center bg-green-50 text-primary-green">Precio ($)</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50">
                                                {loadingPrices ? (
                                                    <tr>
                                                        <td colSpan={3} className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs animate-pulse">
                                                            Cargando precios...
                                                        </td>
                                                    </tr>
                                                ) : prices.filter(p => p.name.toLowerCase().includes(priceSearch.toLowerCase())).length === 0 ? (
                                                    <tr>
                                                        <td colSpan={3} className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs italic">
                                                            {priceSearch ? "No se encontraron resultados para tu búsqueda." : "Lista no disponible momentáneamente."}
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    prices
                                                        .filter(p => p.name.toLowerCase().includes(priceSearch.toLowerCase()))
                                                        .map((item) => (
                                                            <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                                                                <td className="px-8 py-4 font-black text-gray-800 tracking-tight uppercase text-xs">
                                                                    {item.name}
                                                                </td>
                                                                <td className="px-8 py-4 text-center font-bold text-gray-500 text-xs">
                                                                    {item.nbuUnits}
                                                                </td>
                                                                <td className="px-8 py-4 text-center font-black text-gray-900 bg-green-50/30 text-xs">
                                                                    $ {(item.nbuUnits * nbuValue).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                                </td>
                                                            </tr>
                                                        ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    {validity && (
                                        <div className="bg-gray-50 px-8 py-3 border-t border-gray-100 flex justify-between items-center">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Vigencia: {validity}</span>
                                            <span className="text-[10px] font-black text-primary-green uppercase tracking-widest">Valores actualizados</span>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div >
            </main >

            <Footer />
        </div >
    );
}
