"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
    ClipboardList,
    FileText,
    CheckCircle2,
    Mail,
    User,
    Clock,
    Calendar,
    Microscope,
    Upload,
    DollarSign,
    Info,
    ArrowRight,
    Building2,
    Check,
    Search
} from "lucide-react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import "react-day-picker/dist/style.css";

type TabType = "INSTRUCCIONES" | "SOLICITUD" | "RESULTADOS" | "PRECIOS";

export default function DerivacionesPage() {
    const [activeTab, setActiveTab] = useState<TabType>("INSTRUCCIONES");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        labName: "",
        patient: "",
        date: "",
        time: "",
        analysisType: [] as string[],
        otherAnalysis: ""
    });
    const [bookedSlots, setBookedSlots] = useState<string[]>([]);

    // Prices State
    const [prices, setPrices] = useState<any[]>([]);
    const [nbuValue, setNbuValue] = useState<number>(0);
    const [validity, setValidity] = useState<string>("");
    const [loadingPrices, setLoadingPrices] = useState(true);
    const [priceSearch, setPriceSearch] = useState("");

    useEffect(() => {
        const fetchPricesData = async () => {
            setLoadingPrices(true);
            try {
                const [pricesRes, configRes] = await Promise.all([
                    fetch("/api/admin/config/prices"),
                    fetch("/api/admin/config/global")
                ]);

                if (pricesRes.ok) {
                    const data = await pricesRes.json();
                    setPrices(data);
                }

                if (configRes.ok) {
                    const configs = await configRes.json();
                    const nbuConfig = configs.find((c: any) => c.key === "NBU_VALUE");
                    const validityConfig = configs.find((c: any) => c.key === "VIGENCIA");
                    if (nbuConfig) setNbuValue(parseFloat(nbuConfig.value));
                    if (validityConfig) setValidity(validityConfig.value);
                }
            } catch (error) {
                console.error("Error fetching prices:", error);
            } finally {
                setLoadingPrices(false);
            }
        };

        fetchPricesData();
    }, []);

    useEffect(() => {
        if (formData.date) {
            const fetchBookedSlots = async () => {
                try {
                    const response = await fetch(`/api/derivaciones?date=${formData.date}`);
                    if (response.ok) {
                        const data = await response.json();
                        setBookedSlots(data);
                    }
                } catch (error) {
                    console.error("Error fetching slots:", error);
                }
            };
            fetchBookedSlots();
        } else {
            setBookedSlots([]);
        }
    }, [formData.date]);

    const tabs: { id: TabType; label: string; icon: any }[] = [
        { id: "INSTRUCCIONES", label: "INSTRUCCIONES", icon: Info },
        { id: "SOLICITUD", label: "SOLICITUD DE ANALISIS", icon: ClipboardList },
        { id: "RESULTADOS", label: "RESULTADOS", icon: Microscope },
        { id: "PRECIOS", label: "LISTA DE PRECIOS", icon: DollarSign },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const finalAnalysis = [...formData.analysisType];
        if (formData.otherAnalysis) {
            finalAnalysis.push(formData.otherAnalysis);
        }

        try {
            const response = await fetch("/api/derivaciones", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    analysisType: finalAnalysis
                }),
            });

            if (response.ok) {
                setSubmitted(true);
                setFormData({
                    email: "",
                    labName: "",
                    patient: "",
                    date: "",
                    time: "",
                    analysisType: [],
                    otherAnalysis: ""
                });
            } else {
                alert("Error al guardar la solicitud. Por favor intenta de nuevo.");
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión.");
        } finally {
            setIsSubmitting(false);
        }
    };

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
                        <div className="bg-primary-burgundy/5 p-3 rounded-2xl">
                            <Upload className="text-primary-burgundy" size={28} />
                        </div>
                        <span>DERIVACIONES</span>
                    </motion.div>
                </div>

                {/* Tabs Section */}
                <div className="mb-12 flex justify-center px-4 overflow-x-auto">
                    <div className="bg-gray-50 p-2 rounded-2xl flex gap-1 min-w-max border border-gray-100 shadow-inner">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    setSubmitted(false);
                                }}
                                className={`px-6 py-4 rounded-xl font-black text-[10px] tracking-[0.2em] transition-all flex items-center gap-3 ${activeTab === tab.id
                                    ? "bg-[#68d378] text-white shadow-lg shadow-green-200"
                                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
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
                                className="space-y-12"
                            >
                                <div className="bg-[#fff9f8] rounded-[2.5rem] border border-red-100 p-12 shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-5">
                                        <Info size={120} />
                                    </div>
                                    <h2 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tight flex items-center gap-3">
                                        <div className="w-2 h-8 bg-primary-burgundy rounded-full" />
                                        Instrucciones rápidas
                                    </h2>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-6">
                                            <div className="flex gap-4">
                                                <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center flex-shrink-0 font-black text-primary-burgundy">1</div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900 uppercase text-sm tracking-wide mb-1">Solicitud de análisis</h3>
                                                    <p className="text-sm text-gray-500 leading-relaxed italic">
                                                        Completar el formulario desde la solapa <strong className="text-gray-900">"SOLICITUD DE ANALISIS"</strong> antes de enviar cualquier muestra.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex gap-4">
                                                <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center flex-shrink-0 font-black text-primary-burgundy">2</div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900 uppercase text-sm tracking-wide mb-1">Informes</h3>
                                                    <p className="text-sm text-gray-500 leading-relaxed italic">
                                                        Los resultados pueden consultarse en la solapa <strong className="text-gray-900">"RESULTADOS"</strong>.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex gap-4">
                                                <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center flex-shrink-0 font-black text-primary-burgundy">3</div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900 uppercase text-sm tracking-wide mb-1">Lista de precios</h3>
                                                    <p className="text-sm text-gray-500 leading-relaxed italic">
                                                        Valores actualizados disponibles en <strong className="text-gray-900">"LISTA DE PRECIOS"</strong>.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-8">
                                            {/* Reception Hours */}
                                            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
                                                <h3 className="font-black text-gray-900 uppercase text-xs tracking-[0.2em] flex items-center gap-2">
                                                    <Clock className="text-primary-green" size={16} />
                                                    Horarios de recepción
                                                </h3>
                                                <div className="space-y-3">
                                                    <p className="text-sm font-bold text-gray-700">Lunes a Viernes: 7:00 a 11:00 hs y 16:00 a 19:00 hs.</p>
                                                    <p className="text-sm font-bold text-gray-700">Sábados: 8:00 a 11:00 hs.</p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed italic mt-4">
                                                        Urgencias reales que no puedan esperar, consultar. Fines de semanas largos, coordinar.
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Shipping Info */}
                                            <div className="bg-primary-green/5 rounded-3xl p-8 border border-green-100 space-y-6">
                                                <h3 className="font-black text-gray-900 uppercase text-xs tracking-[0.2em] flex items-center gap-2">
                                                    <Upload className="text-primary-green" size={16} />
                                                    Envíos al laboratorio
                                                </h3>
                                                <ul className="space-y-3 text-sm text-gray-600 font-medium">
                                                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary-green mt-1.5 shrink-0" /> Rotular los tubos.</li>
                                                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary-green mt-1.5 shrink-0" /> Orden de prácticas facilitada por el laboratorio.</li>
                                                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary-green mt-1.5 shrink-0" /> Remitir personalmente o mediante cadete (embalar correctamente).</li>
                                                    <li className="flex gap-3 border-t border-green-100 pt-4 mt-4"><div className="w-1.5 h-1.5 rounded-full bg-primary-green mt-1.5 shrink-0" /> <strong>Dirección:</strong> Bolívar 1002 (Esq. Chacabuco).</li>
                                                    <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary-green mt-1.5 shrink-0" /> <strong>Resultados:</strong> Envío por Mail o WhatsApp a las 2 hs de recibida la muestra.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-center">
                                    <button
                                        onClick={() => setActiveTab("SOLICITUD")}
                                        className="bg-primary-burgundy text-white px-10 py-5 rounded-2xl font-black text-xs tracking-[0.2em] uppercase shadow-xl hover:shadow-primary-burgundy/20 hover:scale-105 transition-all flex items-center gap-3"
                                    >
                                        Comenzar Solicitud
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "SOLICITUD" && (
                            <motion.div
                                key="solicitud"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-12 shadow-sm"
                            >
                                <div className="mb-10 pt-10 px-12">
                                    <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight">SOLICITUD DE DERIVACION</h2>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Completa el formulario, llegara una copia de la derivacion. Envia las muestras en el horario indicado y manteniendo las condiciones de Bioseguridad correspondientes. Consulta los resultados desde la Web y ademas recibiras una copia al mail.
                                    </p>

                                </div>

                                {submitted ? (
                                    <div className="text-center py-12 space-y-6">
                                        <div className="w-20 h-20 bg-[#68d378] text-white rounded-[2rem] flex items-center justify-center mx-auto shadow-lg shadow-green-100">
                                            <Check size={40} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-gray-800 uppercase tracking-tight">Solicitud Enviada</h3>
                                            <p className="text-gray-500 mt-2">Hemos recibido los datos de la derivación correctamente.</p>
                                        </div>
                                        <button
                                            onClick={() => setSubmitted(false)}
                                            className="px-8 py-3 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-gray-50 transition-all font-black"
                                        >
                                            Nueva Solicitud
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        {/* Email Section */}
                                        <div className="space-y-4 p-6 bg-white border border-gray-100 rounded-2xl">
                                            <label className="text-sm font-bold text-gray-700">Correo electrónico *</label>
                                            <div className="relative">
                                                <input
                                                    required
                                                    type="email"
                                                    placeholder="Tu respuesta"
                                                    className="w-full border-b border-gray-200 py-3 outline-none focus:border-primary-burgundy transition-colors text-sm font-bold bg-transparent"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        {/* Laboratorio Section */}
                                        <div className="space-y-4 p-6 bg-white border border-gray-100 rounded-2xl">
                                            <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">LABORATORIO:</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    placeholder="Tu respuesta"
                                                    className="w-full border-b border-gray-200 py-3 outline-none focus:border-primary-burgundy transition-colors text-sm font-bold bg-transparent"
                                                    value={formData.labName}
                                                    onChange={(e) => setFormData({ ...formData, labName: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        {/* Protocolo/Paciente Section */}
                                        <div className="space-y-4 p-6 bg-white border border-gray-100 rounded-2xl">
                                            <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">N° DE PROTOCOLO / PACIENTE / OBSERVACIONES:</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    placeholder="Tu respuesta"
                                                    className="w-full border-b border-gray-200 py-3 outline-none focus:border-primary-burgundy transition-colors text-sm font-bold bg-transparent"
                                                    value={formData.patient}
                                                    onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
                                                />
                                            </div>
                                        </div>



                                        {/* Determinaciones Section */}
                                        <div className="space-y-6 p-6 bg-white border border-gray-100 rounded-2xl">
                                            <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">DETERMINACIONES</label>
                                            <div className="grid md:grid-cols-2 gap-y-4 gap-x-8">
                                                {[
                                                    "ANTIBIOGRAMA",
                                                    "BACILOSCOPIA",
                                                    "COPROCULTIVO",
                                                    "CULTIVO",
                                                    "CULTIVO BACILOS ÁCIDO-ALCOHOL RESISTENTES",
                                                    "HEMOCULTIVO",
                                                    "ESTADO ACIDO BASE",
                                                    "ESPERMOCULTIVO",
                                                    "ESPERMOGRAMA",
                                                    "FLUJO VAGINAL",
                                                    "HISOPADO ANAL - STREPTO B",
                                                    "HISOPADO VAGINAL - STREPTO B",
                                                    "MICOLOGICO",
                                                    "MICROALBUMINURIA 24 HS",
                                                    "PROTEINURIA 24 HS",
                                                    "RAC",
                                                    "UREAPLASMA - MICOPLASMA",
                                                    "UROCULTIVO",
                                                    "PRC"
                                                ].map(opt => (
                                                    <label key={opt} className="flex items-start gap-3 cursor-pointer group">
                                                        <div className={`w-5 h-5 rounded border-2 mt-0.5 transition-all flex items-center justify-center shrink-0 ${formData.analysisType.includes(opt) ? 'bg-primary-green border-primary-green' : 'border-gray-200 group-hover:border-green-300'}`}>
                                                            {formData.analysisType.includes(opt) && <Check size={14} className="text-white" />}
                                                        </div>
                                                        <input
                                                            type="checkbox"
                                                            className="hidden"
                                                            checked={formData.analysisType.includes(opt)}
                                                            onChange={(e) => {
                                                                if (e.target.checked) {
                                                                    setFormData({ ...formData, analysisType: [...formData.analysisType, opt] });
                                                                } else {
                                                                    setFormData({ ...formData, analysisType: formData.analysisType.filter(p => p !== opt) });
                                                                }
                                                            }}
                                                        />
                                                        <span className={`text-xs font-bold leading-tight ${formData.analysisType.includes(opt) ? 'text-gray-900 font-black' : 'text-gray-500'}`}>{opt}</span>
                                                    </label>
                                                ))}

                                                <div className="flex items-center gap-3 group focus-within:border-green-300 transition-all">
                                                    <div className={`w-5 h-5 rounded border-2 shrink-0 flex items-center justify-center ${formData.otherAnalysis ? 'bg-primary-green border-primary-green' : 'border-gray-200'}`}>
                                                        {formData.otherAnalysis && <Check size={14} className="text-white" />}
                                                    </div>
                                                    <span className="text-xs font-bold text-gray-500 min-w-max">Otro:</span>
                                                    <input
                                                        type="text"
                                                        placeholder="Tu respuesta"
                                                        className="flex-grow bg-transparent border-b border-gray-100 py-1 outline-none text-xs font-bold text-gray-900 placeholder:text-gray-300 placeholder:font-normal focus:border-primary-green transition-colors"
                                                        value={formData.otherAnalysis}
                                                        onChange={(e) => setFormData({ ...formData, otherAnalysis: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-10 border-t border-gray-50">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="bg-[#6b51c1] text-white px-10 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-purple-100 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                                            >
                                                {isSubmitting ? "Enviando..." : "Enviar"}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setFormData({
                                                    email: "",
                                                    labName: "",
                                                    patient: "",
                                                    date: "",
                                                    time: "",
                                                    analysisType: [],
                                                    otherAnalysis: ""
                                                })}
                                                className="text-primary-burgundy font-bold text-xs tracking-tight hover:underline transition-colors"
                                            >
                                                Borrar formulario
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </motion.div>
                        )}

                        {activeTab === "RESULTADOS" && (
                            <motion.div
                                key="resultados"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="flex flex-col items-center justify-center py-24 text-center space-y-8"
                            >
                                <div className="w-24 h-24 bg-blue-50 text-primary-green rounded-[2.5rem] flex items-center justify-center shadow-inner">
                                    <Microscope size={48} />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Portal de Resultados</h2>
                                    <p className="text-gray-500 mt-2 max-w-sm mx-auto">Acceda con sus credenciales para visualizar y descargar los informes de derivaciones.</p>
                                </div>

                            </motion.div>
                        )}

                        {activeTab === "PRECIOS" && (
                            <motion.div
                                key="precios"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="space-y-6"
                            >
                                <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-100 pb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-orange-50 text-orange-400 rounded-2xl flex items-center justify-center shadow-inner shrink-0">
                                            <DollarSign size={24} />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Lista de Precios</h2>
                                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                                                NBU actual: <span className="text-primary-green">$ {nbuValue}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="max-w-xs w-full relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Buscar estudio..."
                                            value={priceSearch}
                                            onChange={(e) => setPriceSearch(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-[#68d378] transition-all text-xs font-bold text-gray-800"
                                        />
                                    </div>
                                </div>

                                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full border-collapse">
                                            <thead>
                                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-left">Análisis</th>
                                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-center bg-green-50 text-[#68d378]">Precio ($)</th>
                                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Vigencia</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50">
                                                {loadingPrices ? (
                                                    <tr>
                                                        <td colSpan={3} className="px-8 py-20 text-center">
                                                            <div className="flex flex-col items-center gap-4 animate-pulse">
                                                                <div className="w-8 h-8 border-4 border-[#68d378] border-t-transparent rounded-full animate-spin" />
                                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Cargando valores...</p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ) : prices.filter(p => p.name.toLowerCase().includes(priceSearch.toLowerCase())).length === 0 ? (
                                                    <tr>
                                                        <td colSpan={3} className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs italic">
                                                            No se encontraron resultados
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    prices
                                                        .filter(p => p.name.toLowerCase().includes(priceSearch.toLowerCase()))
                                                        .map((item) => (
                                                            <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                                                <td className="px-8 py-4 font-black text-gray-800 tracking-tight uppercase text-sm">
                                                                    {item.name}
                                                                </td>
                                                                <td className="px-8 py-4 text-center font-black text-gray-900 bg-green-50/30">
                                                                    $ {(item.nbuUnits * nbuValue).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                                </td>
                                                                <td className="px-8 py-4 text-right text-[10px] font-bold text-gray-400 uppercase">
                                                                    {validity}
                                                                </td>
                                                            </tr>
                                                        ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="text-center pt-8">
                                    <button className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-black text-xs tracking-[0.2em] uppercase shadow-xl hover:bg-black hover:scale-105 transition-all flex items-center gap-3 mx-auto">
                                        <FileText size={18} />
                                        Descargar LISTA COMPLETA (PDF)
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            <Footer />
        </div>
    );
}
