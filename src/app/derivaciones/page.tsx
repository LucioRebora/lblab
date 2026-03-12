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
    Search,
    ChevronRight
} from "lucide-react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import * as XLSX from "xlsx";
import "react-day-picker/dist/style.css";
import { useSession } from "next-auth/react";

type TabType = "INSTRUCCIONES" | "SOLICITUD" | "RESULTADOS";

export default function DerivacionesPage() {
    const { data: session } = useSession();
    const [activeTab, setActiveTab] = useState<TabType>("INSTRUCCIONES");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        labName: "",
        protocoloExterno: "",
        protocolo: "",
        patient: "",
        observaciones: "",
        date: "",
        time: "",
        analysisType: [] as string[],
        otherAnalysis: ""
    });
    const [bookedSlots, setBookedSlots] = useState<string[]>([]);

    useEffect(() => {
        if (session?.user) {
            setFormData(prev => ({
                ...prev,
                email: session.user?.email ?? prev.email,
                labName: session.user?.name ?? prev.labName
            }));
        }
    }, [session]);



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
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.analysisType.length === 0 && !formData.otherAnalysis.trim()) {
            alert("Por favor selecciona al menos un estudio o especifica otro.");
            return;
        }

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
                    email: session?.user?.email || "",
                    labName: session?.user?.name || "",
                    protocolo: "",
                    protocoloExterno: "",
                    patient: "",
                    observaciones: "",
                    date: "",
                    time: "",
                    analysisType: [] as string[],
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
                <div className="flex flex-col items-center justify-center mb-20 px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left"
                    >
                        <div className="bg-primary-green/5 p-5 rounded-[2rem] text-primary-green shadow-sm border border-gray-100">
                            <Upload size={40} strokeWidth={2.5} />
                        </div>
                        <div className="space-y-1">
                            <h1 className="lb-title-xl text-[#1a2b3c]">
                                Centro de <br className="hidden md:block" />
                                <span className="text-primary-green">Derivaciones</span>
                            </h1>
                        </div>
                    </motion.div>
                </div>

                {/* Tabs Section */}
                <div className="mb-16 flex justify-center px-4 overflow-x-auto">
                    <div className="bg-sage-bg p-2 rounded-[2rem] flex gap-1 min-w-max border border-white shadow-sm">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    setSubmitted(false);
                                }}
                                className={`px-8 py-5 rounded-2xl font-black text-[10px] tracking-[0.3em] transition-all flex items-center gap-4 ${activeTab === tab.id
                                    ? "bg-primary-green text-white shadow-lg shadow-primary-green/20 scale-105"
                                    : "text-gray-400 hover:text-gray-600 hover:bg-white"
                                    }`}
                            >
                                <tab.icon size={16} strokeWidth={3} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="max-w-5xl mx-auto px-6">
                    <AnimatePresence mode="wait">
                        {activeTab === "INSTRUCCIONES" && (
                            <motion.div
                                key="instrucciones"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-12"
                            >
                                <div className="bg-white rounded-[2.5rem] border border-gray-100 p-12 shadow-xl shadow-gray-100/50 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-primary-green group-hover:opacity-[0.05] transition-opacity duration-700">
                                        <Info size={160} />
                                    </div>
                                    <div className="space-y-4 mb-12">
                                        <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter flex items-center gap-4">
                                            <div className="w-2 h-10 bg-primary-green rounded-full shadow-sm shadow-primary-green/20" />
                                            Guía para profesionales
                                        </h2>
                                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs italic">Información esencial para el envío de muestras.</p>
                                    </div>

                                    <div className="grid lg:grid-cols-2 gap-12 relative z-10">
                                        <div className="space-y-10">
                                            <div className="flex gap-6 items-start group/item">
                                                <div className="w-12 h-12 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center flex-shrink-0 font-black text-primary-green group-hover/item:bg-primary-green group-hover/item:text-white transition-all duration-300">1</div>
                                                <div className="space-y-2">
                                                    <h3 className="font-black text-gray-900 uppercase text-xs tracking-widest">Solicitud de análisis</h3>
                                                    <p className="text-sm text-gray-500 leading-relaxed italic font-medium uppercase tracking-tight">
                                                        Completar el formulario desde la solapa <strong className="text-primary-green">"SOLICITUD DE ANALISIS"</strong> antes de enviar cualquier muestra para asegurar la trazabilidad.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex gap-6 items-start group/item">
                                                <div className="w-12 h-12 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center flex-shrink-0 font-black text-primary-green group-hover/item:bg-primary-green group-hover/item:text-white transition-all duration-300">2</div>
                                                <div className="space-y-2">
                                                    <h3 className="font-black text-gray-900 uppercase text-xs tracking-widest">Informes</h3>
                                                    <p className="text-sm text-gray-500 leading-relaxed italic font-medium uppercase tracking-tight">
                                                        Los resultados pueden consultarse en tiempo real desde la solapa <strong className="text-primary-green">"RESULTADOS"</strong> con su usuario y contraseña.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex gap-6 items-start group/item">
                                                <div className="w-12 h-12 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center flex-shrink-0 font-black text-primary-green group-hover/item:bg-primary-green group-hover/item:text-white transition-all duration-300">3</div>
                                                <div className="space-y-2">
                                                    <h3 className="font-black text-gray-900 uppercase text-xs tracking-widest">Lista de precios</h3>
                                                    <p className="text-sm text-gray-500 leading-relaxed italic font-medium uppercase tracking-tight">
                                                        Valores actualizados y convertidor NBU disponibles en <strong className="text-primary-green">"LISTA DE PRECIOS"</strong>.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-8">
                                            {/* Reception Hours */}
                                            <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100 space-y-8 group/card">
                                                <div className="space-y-2">
                                                    <h3 className="font-black text-gray-900 uppercase text-[10px] tracking-[0.3em] flex items-center gap-3">
                                                        <Clock className="text-primary-green group-hover/card:rotate-12 transition-transform" size={18} strokeWidth={3} />
                                                        Recepción de muestras
                                                    </h3>
                                                    <div className="h-1 w-12 bg-primary-green/20 rounded-full" />
                                                </div>
                                                <div className="space-y-4">
                                                    <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                                                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Lunes a Viernes</span>
                                                        <span className="text-xs font-black text-gray-900 text-right">7:00 - 11:00 hs <br /> 16:00 - 19:00 hs</span>
                                                    </div>
                                                    <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                                                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Sábados</span>
                                                        <span className="text-xs font-black text-gray-900">8:00 - 11:00 hs</span>
                                                    </div>
                                                    <p className="text-[10px] font-black text-primary-green uppercase tracking-[0.2em] leading-relaxed italic mt-6 opacity-60">
                                                        Urgencias reales que no puedan esperar, consultar previamente.
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Shipping Info */}
                                            <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100 space-y-8">
                                                <div className="space-y-2">
                                                    <h3 className="font-black text-gray-900 uppercase text-[10px] tracking-[0.3em] flex items-center gap-3">
                                                        <Upload className="text-primary-green" size={18} strokeWidth={3} />
                                                        Requisitos de envío
                                                    </h3>
                                                    <div className="h-1 w-12 bg-primary-green/20 rounded-full" />
                                                </div>
                                                <ul className="space-y-4">
                                                    {[
                                                        "Rotular correctamente todos los tubos.",
                                                        "Adjuntar orden de prácticas del laboratorio.",
                                                        "Remitir mediante cadete con embalaje seguro.",
                                                        "Dirección: Bolívar 1002 (Esq. Chacabuco)."
                                                    ].map((item, idx) => (
                                                        <li key={idx} className="flex gap-4 items-center">
                                                            <div className="w-2 h-2 rounded-full bg-primary-green shrink-0 shadow-sm shadow-primary-green/40" />
                                                            <span className="text-[11px] font-black text-gray-500 uppercase tracking-tight">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-center">
                                    <button
                                        onClick={() => setActiveTab("SOLICITUD")}
                                        className="bg-primary-green text-white px-12 py-5 rounded-full font-black text-[10px] tracking-[0.4em] uppercase shadow-2xl shadow-primary-green/20 hover:scale-105 transition-all flex items-center gap-4 group"
                                    >
                                        Comenzar Solicitud
                                        <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" strokeWidth={3} />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "SOLICITUD" && (
                            <motion.div
                                key="solicitud"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white rounded-[3rem] border border-gray-100 p-12 md:p-20 shadow-xl shadow-gray-100/50"
                            >
                                <div className="mb-14 space-y-4 text-center">
                                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter">Formulario de <span className="text-primary-green">Derivación</span></h2>
                                    <div className="h-1.5 w-24 bg-primary-green mx-auto rounded-full" />
                                    <p className="text-gray-400 text-lg font-bold italic uppercase tracking-wider max-w-2xl mx-auto text-sm">
                                        Completa los datos de la muestra para generar el protocolo de recepción. recibirás una copia en tu mail.
                                    </p>
                                </div>

                                {submitted ? (
                                    <div className="text-center py-20 space-y-10">
                                        <div className="w-24 h-24 bg-primary-green text-white rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-primary-green/30 animate-bounce">
                                            <Check size={48} strokeWidth={4} />
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">¡Solicitud Exitosa!</h3>
                                            <p className="text-gray-500 font-medium italic uppercase tracking-widest text-sm">Hemos recibido la información de la muestra correctamente.</p>
                                        </div>
                                        <button
                                            onClick={() => setSubmitted(false)}
                                            className="px-10 py-5 bg-white border border-gray-100 text-gray-900 rounded-full font-black text-[10px] uppercase tracking-[0.3em] shadow-lg hover:shadow-primary-green/20 transition-all"
                                        >
                                            Nueva Solicitud
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-10">
                                        {/* Field Group */}
                                        {/* Field Group 1: Lab and Email */}
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-4 italic">Laboratorio Originante *</label>
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="Nombre del laboratorio"
                                                    className="scroll-mt-[200px] w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5 outline-none focus:ring-4 focus:ring-primary-green/5 focus:border-primary-green text-sm font-black text-gray-900 placeholder:text-gray-300 transition-all"
                                                    value={formData.labName}
                                                    onChange={(e) => setFormData({ ...formData, labName: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-4 italic">Correo Electrónico *</label>
                                                <input
                                                    required
                                                    type="email"
                                                    placeholder="ejemplo@correo.com"
                                                    readOnly={!!session?.user?.email}
                                                    className={`scroll-mt-[200px] w-full border border-gray-100 rounded-2xl px-6 py-5 outline-none transition-all text-sm font-black placeholder:text-gray-300 ${session?.user?.email
                                                        ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                                                        : "bg-gray-50 text-gray-900 focus:ring-4 focus:ring-primary-green/5 focus:border-primary-green"
                                                        }`}
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        {/* Field Group 2: Protocolo Externo and Patient */}
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-4 italic">N° Protocolo *</label>
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="0000"
                                                    className="scroll-mt-[200px] w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5 outline-none focus:ring-4 focus:ring-primary-green/5 focus:border-primary-green text-sm font-black text-gray-900 placeholder:text-gray-300 transition-all"
                                                    value={formData.protocoloExterno}
                                                    onChange={(e) => setFormData({ ...formData, protocoloExterno: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-4 italic">Paciente *</label>
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="Nombre completo del paciente"
                                                    className="scroll-mt-[200px] w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5 outline-none focus:ring-4 focus:ring-primary-green/5 focus:border-primary-green text-sm font-black text-gray-900 placeholder:text-gray-300 transition-all font-black"
                                                    value={formData.patient}
                                                    onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-4 italic">Observaciones</label>
                                            <textarea
                                                placeholder="Notas adicionales relevantes para el análisis"
                                                rows={2}
                                                className="scroll-mt-[300px] w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5 outline-none focus:ring-4 focus:ring-primary-green/5 focus:border-primary-green text-sm font-black text-gray-900 placeholder:text-gray-300 transition-all resize-none"
                                                value={formData.observaciones}
                                                onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                                            />
                                        </div>

                                        {/* Determinaciones Section */}
                                        <div className="bg-gray-50/50 rounded-[2rem] p-8 md:p-12 border border-gray-100 space-y-10">
                                            <div className="space-y-2">
                                                <h3 className="font-black text-gray-900 uppercase text-xs tracking-[0.4em] flex items-center gap-4">
                                                    <div className="w-1.5 h-6 bg-primary-green rounded-full shadow-sm shadow-primary-green/20" />
                                                    Estudios Solicitados
                                                </h3>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12">
                                                {[
                                                    "ANTIBIOGRAMA", "BACILOSCOPIA", "COPROCULTIVO",
                                                    "CULTIVO", "CULTIVO B.A.A.R.", "HEMOCULTIVO",
                                                    "ESTADO ACIDO BASE", "ESPERMOCULTIVO", "ESPERMOGRAMA",
                                                    "FLUJO VAGINAL", "STREPTO B - HIS. ANAL", "STREPTO B - HIS. VAGINAL",
                                                    "MICOLOGICO", "MICROALBUMINURIA 24 HS", "PROTEINURIA 24 HS",
                                                    "RAC", "UREAPLASMA / MICOPLASMA", "UROCULTIVO", "PCR"
                                                ].map(opt => (
                                                    <label key={opt} className="flex items-center gap-4 cursor-pointer group select-none">
                                                        <div className={`w-5 h-5 rounded-lg border-2 transition-all flex items-center justify-center shrink-0 ${formData.analysisType.includes(opt) ? 'bg-primary-green border-primary-green' : 'bg-white border-gray-100 group-hover:border-primary-green/40'}`}>
                                                            {formData.analysisType.includes(opt) && <Check size={12} className="text-white" strokeWidth={4} />}
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
                                                        <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${formData.analysisType.includes(opt) ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600'}`}>{opt}</span>
                                                    </label>
                                                ))}
                                            </div>

                                            <div className="pt-8 border-t border-gray-100">
                                                <div className="flex items-center gap-6">
                                                    <div className="flex-shrink-0 flex items-center gap-3">
                                                        <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${formData.otherAnalysis ? 'bg-primary-green border-primary-green' : 'bg-white border-gray-100'}`}>
                                                            {formData.otherAnalysis && <Check size={12} className="text-white" strokeWidth={4} />}
                                                        </div>
                                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">OTRO ESTUDIO:</span>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        placeholder="Especificar aquí..."
                                                        className="flex-grow bg-transparent border-b-2 border-gray-100 py-2 outline-none text-[10px] font-black text-gray-900 placeholder:text-gray-200 focus:border-primary-green transition-colors uppercase tracking-widest"
                                                        value={formData.otherAnalysis}
                                                        onChange={(e) => setFormData({ ...formData, otherAnalysis: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-6">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full sm:w-fit bg-primary-green text-white px-16 py-6 rounded-full font-black text-[10px] tracking-[0.4em] uppercase shadow-xl shadow-green-100 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                                            >
                                                {isSubmitting ? "PROCESANDO..." : "ENVIAR SOLICITUD"}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setFormData({
                                                    email: session?.user?.email ?? "",
                                                    labName: session?.user?.name ?? "",
                                                    protocolo: "",
                                                    protocoloExterno: "",
                                                    patient: "",
                                                    observaciones: "",
                                                    date: "",
                                                    time: "",
                                                    analysisType: [] as string[],
                                                    otherAnalysis: ""
                                                })}
                                                className="text-gray-400 font-bold text-[10px] tracking-[0.2em] uppercase hover:text-primary-burgundy transition-colors flex items-center gap-2 italic"
                                            >
                                                <Clock size={14} />
                                                LIMPIAR FORMULARIO
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
                                className="bg-white rounded-[3rem] p-12 lg:p-20 shadow-2xl shadow-primary-green/5 border border-gray-100 text-center space-y-8"
                            >
                                <div className="w-24 h-24 bg-primary-burgundy/5 rounded-[2rem] flex items-center justify-center mx-auto text-primary-burgundy">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-4xl lg:text-5xl font-black text-gray-900 uppercase tracking-tight leading-tight">
                                        Visualización de <br /><span className="text-primary-green">Resultados Online</span>
                                    </h2>
                                    <p className="text-gray-500 text-lg font-medium max-w-xl mx-auto">
                                        Para una mayor comodidad y seguridad en el manejo de su información académica y médica, acceda a nuestro sistema de autogestión de pacientes.
                                    </p>
                                </div>

                                <div className="pt-6">
                                    <a
                                        href="https://redlab.com.ar/lblab"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-primary-burgundy text-white px-12 py-5 rounded-full font-black text-[10px] tracking-[0.4em] uppercase shadow-xl hover:shadow-primary-burgundy/30 hover:scale-105 transition-all flex items-center gap-4 group w-fit mx-auto"
                                    >
                                        RESULTADOS
                                        <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" strokeWidth={4} />
                                    </a>
                                </div>

                                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest pt-8">
                                    Será redirigido a: <span className="text-gray-500 underline">redlab.com.ar/lblab</span>
                                </p>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </main>

            <Footer />
        </div>
    );
}
