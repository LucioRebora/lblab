"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Droplets, Microscope, Calendar, ClipboardList, Info, ShieldCheck, FileText, CheckCircle2, Mail, Stethoscope, User, Clock, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import "react-day-picker/dist/style.css";

type TabType = "TURNOS" | "APLICACIONES" | "PREPARACION" | "CONSENTIMIENTO" | "INFORME";

export default function PRPPage() {
    const [activeTab, setActiveTab] = useState<TabType>("TURNOS");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        professional: "",
        patient: "",
        date: "",
        time: "",
        preparation: [] as string[],
        otherPreparation: ""
    });
    const [bookedSlots, setBookedSlots] = useState<string[]>([]);

    useEffect(() => {
        // Establecer la fecha de hoy al montar el componente para gatillar la carga de turnos
        setFormData(prev => ({ ...prev, date: format(new Date(), "yyyy-MM-dd") }));
    }, []);

    useEffect(() => {
        if (formData.date) {
            const fetchBookedSlots = async () => {
                try {
                    const response = await fetch(`/api/prp?date=${formData.date}`);
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

    const tabs: { id: TabType; label: string }[] = [
        { id: "TURNOS", label: "TURNOS" },
        { id: "APLICACIONES", label: "APLICACIONES" },
        { id: "PREPARACION", label: "PREPARACION" },
        { id: "CONSENTIMIENTO", label: "CONSENTIMIENTO" },
        { id: "INFORME", label: "INFORME" },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const finalPreparation = [...formData.preparation];
        if (formData.otherPreparation) {
            finalPreparation.push(formData.otherPreparation);
        }

        try {
            const response = await fetch("/api/prp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    preparation: finalPreparation
                }),
            });

            if (response.ok) {
                setSubmitted(true);
                setFormData({
                    email: "",
                    professional: "",
                    patient: "",
                    date: "",
                    time: "",
                    preparation: [],
                    otherPreparation: ""
                });
            } else {
                alert("Error al guardar el turno. Por favor intenta de nuevo.");
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
                    <div className="flex items-center gap-3 text-xl md:text-2xl font-black text-[#1a2b3c] tracking-tight">
                        <span className="flex items-center gap-2">
                            <span className="text-red-500 text-xl">🩸</span>
                            <span className="text-gray-400 text-xl">🔬</span>
                        </span>
                        <span>PLASMA RICO EN PLAQUETA</span>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="mb-10 flex justify-center px-4 overflow-x-auto">
                    <div className="bg-[#f0f2f5] p-1.5 rounded-xl flex gap-1 min-w-max border border-gray-200 shadow-sm">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    setSubmitted(false);
                                }}
                                className={`px-8 py-3 rounded-lg font-bold text-xs tracking-widest transition-all ${activeTab === tab.id
                                    ? "bg-[#68d378] text-white shadow-md"
                                    : "text-gray-500 hover:bg-gray-200"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Form / Content Container */}
                <div className="max-w-3xl mx-auto px-6">
                    <AnimatePresence mode="wait">
                        {activeTab === "TURNOS" && (
                            <motion.div
                                key="turnos"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-[#fff9f8] rounded-xl border border-red-100 p-10 shadow-sm"
                            >
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2 uppercase tracking-tight">TURNO PLASMA RICO EN PLAQUETAS</h2>
                                    <p className="text-gray-600 text-sm mb-10">
                                        El turno solicitado por medio de este formulario quedará automáticamente programado. En el caso de algún inconveniente, nos contactaremos a la brevedad. Muchas gracias.
                                    </p>

                                    {submitted ? (
                                        <div className="text-center py-10">
                                            <div className="w-16 h-16 bg-[#68d378] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                                                <CheckCircle2 size={32} />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-800">TURNO SOLICITADO</h3>
                                            <button
                                                onClick={() => setSubmitted(false)}
                                                className="mt-4 text-primary-burgundy font-bold text-sm hover:underline"
                                            >
                                                Solicitar otro
                                            </button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-8">
                                            <div className="space-y-4">
                                                <label className="block text-sm font-bold text-gray-700">Correo electrónico *</label>
                                                <input
                                                    required
                                                    type="email"
                                                    placeholder="Tu respuesta"
                                                    className="w-full border-b border-gray-300 py-2 outline-none focus:border-primary-burgundy transition-colors text-sm"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                />
                                            </div>

                                            <div className="space-y-4">
                                                <label className="block text-sm font-bold text-gray-700">PROFESIONAL:</label>
                                                <input
                                                    type="text"
                                                    placeholder="Tu respuesta"
                                                    className="w-full border-b border-gray-300 py-2 outline-none focus:border-primary-burgundy transition-colors text-sm"
                                                    value={formData.professional}
                                                    onChange={(e) => setFormData({ ...formData, professional: e.target.value })}
                                                />
                                            </div>

                                            <div className="space-y-4">
                                                <label className="block text-sm font-bold text-gray-700">PACIENTE:</label>
                                                <input
                                                    type="text"
                                                    placeholder="Tu respuesta"
                                                    className="w-full border-b border-gray-300 py-2 outline-none focus:border-primary-burgundy transition-colors text-sm"
                                                    value={formData.patient}
                                                    onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
                                                />
                                            </div>

                                            <div className="space-y-6">
                                                <div className="flex items-center justify-between">
                                                    <label className="text-sm font-bold text-gray-700">1. SELECCIONAR DÍA</label>
                                                    <button
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, date: format(new Date(), "yyyy-MM-dd") })}
                                                        className="text-[10px] font-black uppercase tracking-widest bg-white hover:bg-primary-burgundy hover:text-white px-3 py-1 rounded-full transition-all border border-gray-100 shadow-sm"
                                                    >
                                                        📅 Hoy
                                                    </button>
                                                </div>
                                                <div className="flex justify-center bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
                                                    <DayPicker
                                                        mode="single"
                                                        selected={formData.date ? new Date(formData.date + "T12:00:00") : undefined}
                                                        onSelect={(day) => setFormData({ ...formData, date: day ? format(day, "yyyy-MM-dd") : "" })}
                                                        locale={es}
                                                        disabled={{ before: new Date(new Date().setHours(0, 0, 0, 0)) }}
                                                        modifiersClassNames={{
                                                            selected: "!bg-primary-burgundy !text-white rounded-xl shadow-lg",
                                                            today: "font-black text-primary-burgundy underline"
                                                        }}
                                                        styles={{
                                                            caption: { color: "#8B2332", fontWeight: "900", textTransform: "capitalize", fontSize: "0.8rem" },
                                                            head_cell: { color: "#9CA3AF", fontSize: "0.7rem", fontWeight: "900" },
                                                            cell: { padding: "2px" }
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <label className="block text-sm font-bold text-gray-700">2. SELECCIONAR HORA</label>
                                                <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                                                    {["07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"].map((t) => {
                                                        const isBooked = bookedSlots.includes(t);
                                                        return (
                                                            <button
                                                                key={t}
                                                                type="button"
                                                                disabled={isBooked}
                                                                onClick={() => setFormData({ ...formData, time: t })}
                                                                className={`py-2 text-[11px] font-bold rounded-xl border transition-all ${formData.time === t
                                                                    ? "bg-primary-burgundy text-white border-primary-burgundy shadow-md scale-105"
                                                                    : isBooked
                                                                        ? "bg-gray-100 text-gray-300 border-gray-100 cursor-not-allowed line-through"
                                                                        : "bg-white text-gray-500 border-gray-100 hover:border-red-200 hover:bg-red-50"
                                                                    }`}
                                                            >
                                                                {t}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                                {formData.date && formData.time && (
                                                    <div className="mt-6 p-4 bg-green-50 rounded-2xl border border-green-100 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-2">
                                                        <div className="bg-white p-2 rounded-lg shadow-sm">
                                                            <Calendar size={16} className="text-green-600" />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] font-black text-green-700 uppercase tracking-widest">Turno Confirmado</p>
                                                            <p className="text-sm font-bold text-green-900">
                                                                {format(new Date(formData.date + "T12:00:00"), "EEEE d 'de' MMMM", { locale: es })} a las {formData.time} hs
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="space-y-6">
                                                <label className="block text-sm font-bold text-gray-700">PREPARACION:</label>
                                                <div className="space-y-3">
                                                    {["PRP 3 ML + PPP 4 ML", "PRP 6 ML + PPP 8 ML"].map(opt => (
                                                        <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                                                            <input
                                                                type="checkbox"
                                                                className="w-4 h-4 rounded border-gray-300 text-primary-burgundy"
                                                                checked={formData.preparation.includes(opt)}
                                                                onChange={(e) => {
                                                                    if (e.target.checked) {
                                                                        setFormData({ ...formData, preparation: [...formData.preparation, opt] });
                                                                    } else {
                                                                        setFormData({ ...formData, preparation: formData.preparation.filter(p => p !== opt) });
                                                                    }
                                                                }}
                                                            />
                                                            <span className="text-sm text-gray-600">{opt}</span>
                                                        </label>
                                                    ))}
                                                    <div className="flex items-center gap-3">
                                                        <input
                                                            type="checkbox"
                                                            className="w-4 h-4 rounded border-gray-300 text-primary-burgundy"
                                                            checked={!!formData.otherPreparation}
                                                            readOnly
                                                        />
                                                        <span className="text-sm text-gray-600">Otro:</span>
                                                        <input
                                                            type="text"
                                                            className="border-b border-gray-300 flex-grow outline-none focus:border-primary-burgundy text-sm"
                                                            value={formData.otherPreparation}
                                                            onChange={(e) => setFormData({ ...formData, otherPreparation: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between pt-6">
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="bg-primary-burgundy text-white px-8 py-3 rounded-md font-bold text-sm hover:bg-opacity-90 transition-all disabled:opacity-50"
                                                >
                                                    {isSubmitting ? "Enviando..." : "Enviar"}
                                                </button>
                                                <button
                                                    type="reset"
                                                    className="text-primary-burgundy font-bold text-sm hover:underline"
                                                >
                                                    Borrar formulario
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "APLICACIONES" && (
                            <motion.div
                                key="aplicaciones"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-12 text-gray-700 max-w-3xl mx-auto"
                            >
                                <div className="space-y-6">
                                    <p className="text-sm md:text-base leading-relaxed">
                                        El <strong className="text-primary-burgundy">Plasma Rico en Plaquetas (PRP)</strong> es un hemoderivado autólogo obtenido mediante centrifugación diferencial, que concentra plaquetas y factores de crecimiento con capacidad regenerativa, antiinflamatoria y moduladora del microambiente tisular. Su uso se ha consolidado como una herramienta terapéutica de alto valor en medicina regenerativa, traumatología, dermatología y rehabilitación.
                                    </p>
                                </div>

                                {/* Responsabilidades */}
                                <section className="space-y-6">
                                    <h3 className="flex items-center gap-3 text-lg font-black uppercase tracking-tight text-gray-900 border-l-4 border-blue-400 pl-4">
                                        Responsabilidades profesionales
                                    </h3>

                                    <div className="space-y-6 ml-4">
                                        <div className="space-y-3">
                                            <h4 className="font-bold text-gray-900 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                                                Preparación del PRP
                                            </h4>
                                            <p className="text-sm text-gray-600 pl-4">
                                                La obtención, procesamiento, concentración y activación del PRP es una <strong className="text-gray-900">competencia exclusiva del profesional bioquímico</strong>, quien garantiza:
                                            </p>
                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-500 pl-8 list-disc">
                                                <li>Condiciones de bioseguridad</li>
                                                <li>Correcta manipulación del material biológico</li>
                                                <li>Protocolos estandarizados de centrifugación</li>
                                                <li>Control de calidad del concentrado plaquetario</li>
                                                <li>Trazabilidad completa del proceso</li>
                                            </ul>
                                        </div>

                                        <div className="space-y-3">
                                            <h4 className="font-bold text-gray-900 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                                                Aplicación del PRP
                                            </h4>
                                            <p className="text-sm text-gray-600 pl-4">
                                                La administración del PRP es responsabilidad del <strong className="text-gray-900">médico especialista</strong>, quien determina:
                                            </p>
                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-500 pl-8 list-disc">
                                                <li>Indicaciones clínicas</li>
                                                <li>Técnica y sitio de aplicación</li>
                                                <li>Número de sesiones</li>
                                                <li>Integración con otras terapias</li>
                                                <li>Seguimiento y evaluación de resultados</li>
                                            </ul>
                                        </div>

                                        <p className="text-sm italic text-gray-500 border-t border-gray-100 pt-4">
                                            Esta división asegura un procedimiento seguro, reproducible y alineado con las buenas prácticas profesionales.
                                        </p>
                                    </div>
                                </section>

                                {/* Indicaciones Clínicas */}
                                <section className="space-y-6">
                                    <h3 className="flex items-center gap-3 text-lg font-black uppercase tracking-tight text-gray-900 border-l-4 border-blue-400 pl-4">
                                        Principales indicaciones clínicas
                                    </h3>
                                    <div className="ml-4 space-y-6">
                                        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">El PRP se utiliza en:</p>
                                        <div className="space-y-6">
                                            {[
                                                { title: "Patologías osteoarticulares", desc: "Tendinopatías, lesiones ligamentarias, artrosis, sinovitis, procesos inflamatorios crónicos." },
                                                { title: "Traumatología y rehabilitación", desc: "Lesiones musculares, desgarros, hematomas, recuperación postquirúrgica." },
                                                { title: "Cicatrización avanzada", desc: "Úlceras, heridas complejas, quemaduras, lesiones de difícil resolución." },
                                                { title: "Dermatología", desc: "Alopecias no cicatrizales, dermatitis crónicas, procesos inflamatorios persistentes." },
                                                { title: "Medicina regenerativa", desc: "Situaciones donde se busca mejorar la calidad tisular, modular la inflamación y acelerar la reparación." }
                                            ].map((item, i) => (
                                                <div key={i} className="space-y-1">
                                                    <h4 className="font-bold text-gray-900 flex items-center gap-2">
                                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                                                        {item.title}
                                                    </h4>
                                                    <p className="text-sm text-gray-500 pl-4 leading-relaxed">{item.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>

                                {/* Fundamento Biológico */}
                                <section className="bg-blue-50/30 rounded-2xl p-8 space-y-6">
                                    <h3 className="flex items-center gap-3 text-lg font-black uppercase tracking-tight text-gray-900 border-l-4 border-blue-400 pl-4">
                                        Fundamento biológico
                                    </h3>
                                    <div className="space-y-6 ml-4">
                                        <div className="space-y-3">
                                            <p className="text-sm font-bold text-gray-600">El concentrado plaquetario aporta:</p>
                                            <ul className="space-y-2 text-sm text-gray-500 pl-4">
                                                <li className="flex items-center gap-2 italic"><div className="w-1 h-1 bg-blue-400 rounded-full" /> Factores de crecimiento (PDGF, TGF-β, VEGF, IGF-1)</li>
                                                <li className="flex items-center gap-2 italic"><div className="w-1 h-1 bg-blue-400 rounded-full" /> Citoquinas antiinflamatorias</li>
                                                <li className="flex items-center gap-2 italic"><div className="w-1 h-1 bg-blue-400 rounded-full" /> Moléculas que estimulan angiogénesis, proliferación celular y remodelación tisular</li>
                                            </ul>
                                        </div>
                                        <div className="space-y-3">
                                            <p className="text-sm font-bold text-gray-600">Esto favorece:</p>
                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500 pl-4">
                                                <li className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm"><CheckCircle2 size={14} className="text-primary-green" /> Reducción del dolor</li>
                                                <li className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm"><CheckCircle2 size={14} className="text-primary-green" /> Disminución de la inflamación</li>
                                                <li className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm"><CheckCircle2 size={14} className="text-primary-green" /> Aceleración de la reparación tisular</li>
                                                <li className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm"><CheckCircle2 size={14} className="text-primary-green" /> Mejora de la calidad del tejido regenerado</li>
                                            </ul>
                                        </div>
                                    </div>
                                </section>
                            </motion.div>
                        )}

                        {activeTab === "PREPARACION" && (
                            <motion.div
                                key="preparacion"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-12 text-gray-700 max-w-3xl mx-auto pb-20"
                            >
                                <div className="space-y-4">
                                    <h3 className="flex items-center gap-3 text-lg font-black text-gray-900">
                                        <span className="text-red-500">🩸</span>
                                        <span className="text-gray-400">🔬</span>
                                        Plasma Rico en Plaquetas (PRP)
                                    </h3>
                                    <p className="font-bold text-gray-600">Nueva modalidad de trabajo – Laboratorio LB LAB</p>
                                    <p className="text-sm italic text-gray-500 flex items-center gap-2">
                                        📅 Actualizado al 26 de noviembre de 2025
                                    </p>
                                </div>

                                {/* Requisitos */}
                                <section className="space-y-6">
                                    <h4 className="flex items-center gap-3 font-black uppercase text-gray-900 tracking-tight">
                                        📋 Requisitos
                                    </h4>
                                    <ul className="space-y-4 ml-4">
                                        <li className="flex items-start gap-3 text-sm">
                                            <span className="text-lg">🧾</span>
                                            <span>Orden médica con <strong className="text-gray-900">hemograma y recuento de plaquetas.</strong></span>
                                        </li>
                                        <li className="flex items-start gap-3 text-sm">
                                            <span className="text-lg">✍️</span>
                                            <span><strong className="text-gray-900">Consentimiento informado</strong> previo a la extracción (se completa en el laboratorio).</span>
                                        </li>
                                    </ul>
                                </section>

                                {/* Procedimiento */}
                                <section className="space-y-6">
                                    <h4 className="flex items-center gap-3 font-black uppercase text-gray-900 tracking-tight">
                                        🧪 Procedimiento
                                    </h4>
                                    <ul className="space-y-4 ml-4">
                                        <li className="flex items-start gap-3 text-sm">
                                            <span className="text-lg">💉</span>
                                            <span>Extracción con sistema <strong className="text-gray-900">Vacutainer</strong> en tubos al vacío con anticoagulante <strong className="text-gray-900">ACD</strong>.</span>
                                        </li>
                                    </ul>
                                </section>

                                {/* Obtención */}
                                <div className="grid md:grid-cols-2 gap-10">
                                    <section className="space-y-6">
                                        <h4 className="flex items-center gap-3 font-black uppercase text-gray-900 tracking-tight text-sm">
                                            <span className="text-blue-400">🔹</span> Obtención estándar
                                        </h4>
                                        <ul className="space-y-3 ml-4">
                                            <li className="flex items-center gap-3 text-sm font-bold">
                                                <span className="text-red-500">🩸</span> 3 ml PRP <span className="text-gray-400 font-medium">(jeringa de 5 ml)</span>
                                            </li>
                                            <li className="flex items-center gap-3 text-sm font-bold">
                                                <span className="text-blue-400">💧</span> 4 ml PPP <span className="text-gray-400 font-medium">(jeringa de 10 ml)</span>
                                            </li>
                                        </ul>
                                    </section>
                                    <section className="space-y-6">
                                        <h4 className="flex items-center gap-3 font-black uppercase text-gray-900 tracking-tight text-sm">
                                            <span className="text-blue-400">🔹</span> Opción ampliada
                                        </h4>
                                        <ul className="space-y-3 ml-4">
                                            <li className="flex items-center gap-3 text-sm font-bold text-gray-900">
                                                <span className="text-red-500">🩸</span> 6 ml PRP
                                            </li>
                                            <li className="flex items-center gap-3 text-sm font-bold text-gray-900">
                                                <span className="text-blue-400">💧</span> 8 ml PPP
                                            </li>
                                        </ul>
                                    </section>
                                </div>

                                {/* Tiempos */}
                                <section className="bg-gray-50 rounded-2xl p-8 space-y-6">
                                    <h4 className="flex items-center gap-3 font-black uppercase text-gray-900 tracking-tight">
                                        ⏱️ Tiempos y condiciones
                                    </h4>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-4">
                                        <li className="flex items-center gap-3 text-sm">
                                            <span className="text-lg">🕒</span>
                                            <span><strong className="text-gray-900">Preparación:</strong> 20–25 minutos</span>
                                        </li>
                                        <li className="flex items-center gap-3 text-sm">
                                            <span className="text-lg">⏳</span>
                                            <span><strong className="text-gray-900">Aplicación:</strong> dentro de las 2 horas posteriores</span>
                                        </li>
                                        <li className="flex items-center gap-3 text-sm">
                                            <span className="text-lg">🌡️</span>
                                            <span><strong className="text-gray-900">Conservación:</strong> temperatura ambiente, sin cambios térmicos</span>
                                        </li>
                                        <li className="flex items-center gap-3 text-sm">
                                            <span className="text-lg">⚪</span>
                                            <span><strong className="text-gray-900">PRP no activado:</strong> se activa al contacto con la dermis</span>
                                        </li>
                                    </ul>
                                </section>

                                {/* Informe */}
                                <section className="space-y-6">
                                    <h4 className="flex items-center gap-3 font-black uppercase text-gray-900 tracking-tight">
                                        📑 Informe al médico tratante
                                    </h4>
                                    <div className="ml-4 space-y-4">
                                        <p className="text-sm font-medium">El profesional recibe por mail (PDF):</p>
                                        <ul className="space-y-3">
                                            <li className="flex items-center gap-3 text-sm">
                                                <span className="text-lg">📄</span>
                                                <span><strong className="text-gray-900">Hemograma basal</strong> con recuento de plaquetas</span>
                                            </li>
                                            <li className="flex items-center gap-3 text-sm">
                                                <span className="text-lg">📊</span>
                                                <span><strong className="text-gray-900">Informe celular del PRP</strong> (glóbulos blancos, rojos y plaquetas)</span>
                                            </li>
                                        </ul>
                                    </div>
                                </section>

                                <div className="pt-6 border-t border-gray-100 flex flex-col gap-4">
                                    <p className="font-black text-gray-900 flex items-center gap-3">
                                        <span className="text-lg">💰</span> Costos: Consultar.
                                    </p>
                                    <div className="space-y-4">
                                        <p className="font-black text-gray-900 flex items-center gap-3">
                                            <span className="text-lg">📞</span> Coordinación
                                        </p>
                                        <p className="text-sm leading-relaxed ml-8">
                                            Los turnos se gestionan <strong className="text-gray-900">directamente con el laboratorio</strong>, Ademas podes reservar desde el Formulario.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        {activeTab === "CONSENTIMIENTO" && (
                            <motion.div
                                key="consentimiento"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="flex flex-col items-center justify-center py-20"
                            >
                                <a
                                    href="/docs/Consentimiento informado PRP.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white text-gray-900 border-2 border-gray-100 px-10 py-5 rounded-full font-black text-xs tracking-[0.2em] uppercase shadow-xl hover:shadow-2xl hover:border-primary-burgundy transition-all flex items-center gap-4 group"
                                >
                                    Descargar Consentimiento
                                    <div className="bg-primary-burgundy p-1 rounded-md text-white group-hover:translate-x-1 transition-transform">
                                        <FileText size={14} strokeWidth={3} />
                                    </div>
                                </a>
                            </motion.div>
                        )}

                        {activeTab === "INFORME" && (
                            <motion.div
                                key="informe"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="flex flex-col items-center justify-center py-20"
                            >
                                <Link
                                    href="/admin/dashboard"
                                    className="bg-white text-gray-900 border-2 border-gray-100 px-10 py-5 rounded-full font-black text-xs tracking-[0.3em] uppercase shadow-xl hover:shadow-2xl hover:border-primary-burgundy transition-all flex items-center gap-4 group"
                                >
                                    Resultados
                                    <div className="bg-primary-burgundy p-1 rounded-md text-white group-hover:translate-x-1 transition-transform">
                                        <ChevronRight size={14} strokeWidth={3} />
                                    </div>
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            <Footer />
        </div>
    );
}
