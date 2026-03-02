"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Droplets, Microscope, Calendar, ClipboardList, Info, ShieldCheck, FileText, CheckCircle2, Mail, Stethoscope, User, Clock, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Phone } from "lucide-react";
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

    const tabs: { id: TabType; label: string; icon: any }[] = [
        { id: "TURNOS", label: "TURNOS", icon: Calendar },
        { id: "APLICACIONES", label: "APLICACIONES", icon: Microscope },
        { id: "PREPARACION", label: "PREPARACIÓN", icon: ClipboardList },
        { id: "CONSENTIMIENTO", label: "CONSENTIMIENTO", icon: ShieldCheck },
        { id: "INFORME", label: "INFORME", icon: FileText },
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
                <div className="flex flex-col items-center justify-center mb-20 px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left"
                    >
                        <div className="bg-primary-green/5 p-5 rounded-[2rem] text-primary-green shadow-sm border border-gray-100">
                            <Droplets size={40} strokeWidth={2.5} />
                        </div>
                        <div className="space-y-1">
                            <h1 className="lb-title-xl text-[#1a2b3c]">
                                Plasma Rico <br className="hidden md:block" />
                                <span className="text-primary-green">en Plaquetas</span>
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
                        {activeTab === "TURNOS" && (
                            <motion.div
                                key="turnos"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-12 shadow-xl shadow-gray-100/50 relative overflow-hidden"
                            >
                                <div>
                                    <div className="flex flex-col items-center text-center mb-10">
                                        <div className="w-16 h-16 bg-primary-green/10 text-primary-green rounded-2xl flex items-center justify-center mb-4">
                                            <Calendar size={32} />
                                        </div>
                                        <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Solicitud de Turno PRP</h3>
                                        <p className="text-gray-500 text-sm italic mt-2 leading-relaxed max-w-lg mx-auto">
                                            El turno solicitado quedará automáticamente programado.
                                            <span className="text-primary-green font-black block mt-1 uppercase text-[10px] tracking-widest">Nos contactaremos ante cualquier inconveniente.</span>
                                        </p>
                                    </div>

                                    {submitted ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="py-12 flex flex-col items-center text-center space-y-6"
                                        >
                                            <div className="w-20 h-20 bg-primary-green text-white rounded-full flex items-center justify-center shadow-xl shadow-green-100">
                                                <CheckCircle2 size={40} />
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="text-2xl font-black text-gray-900 uppercase">¡Turno Solicitado!</h3>
                                                <p className="text-gray-500 italic">Gracias por confiar en el equipo de LB Lab.</p>
                                            </div>
                                            <button
                                                onClick={() => setSubmitted(false)}
                                                className="text-primary-green font-black text-[10px] uppercase tracking-widest hover:underline pt-4"
                                            >
                                                Solicitar otro turno
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-8">
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Correo electrónico *</label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-primary-green/40" size={18} />
                                                        <input
                                                            required
                                                            type="email"
                                                            placeholder="ejemplo@correo.com"
                                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-14 pr-6 outline-none focus:ring-2 focus:ring-primary-green transition-all font-bold text-gray-800"
                                                            value={formData.email}
                                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Profesional:</label>
                                                    <div className="relative">
                                                        <Stethoscope className="absolute left-5 top-1/2 -translate-y-1/2 text-primary-green/40" size={18} />
                                                        <input
                                                            type="text"
                                                            placeholder="Nombre del médico"
                                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-14 pr-6 outline-none focus:ring-2 focus:ring-primary-green transition-all font-bold text-gray-800"
                                                            value={formData.professional}
                                                            onChange={(e) => setFormData({ ...formData, professional: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Paciente:</label>
                                                <div className="relative">
                                                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-primary-green/40" size={18} />
                                                    <input
                                                        type="text"
                                                        placeholder="Nombre completo"
                                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-14 pr-6 outline-none focus:ring-2 focus:ring-primary-green transition-all font-bold text-gray-800"
                                                        value={formData.patient}
                                                        onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid lg:grid-cols-2 gap-12 items-start py-6 border-y border-gray-50">
                                                <div className="space-y-6">
                                                    <div className="flex items-center justify-between">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">1. Seleccionar Día</label>
                                                        <button
                                                            type="button"
                                                            onClick={() => setFormData({ ...formData, date: format(new Date(), "yyyy-MM-dd") })}
                                                            className="text-[10px] font-black uppercase tracking-widest bg-gray-50 hover:bg-primary-green hover:text-white px-4 py-2 rounded-full transition-all border border-gray-100 shadow-sm"
                                                        >
                                                            📅 Hoy
                                                        </button>
                                                    </div>
                                                    <div className="flex justify-center bg-gray-50/50 p-6 rounded-[2.5rem] border border-gray-100">
                                                        <DayPicker
                                                            mode="single"
                                                            required
                                                            selected={formData.date ? new Date(formData.date + "T12:00:00") : undefined}
                                                            onSelect={(day) => {
                                                                if (day) setFormData({ ...formData, date: format(day, "yyyy-MM-dd") });
                                                            }}
                                                            locale={es}
                                                            disabled={{ before: new Date(new Date().setHours(0, 0, 0, 0)) }}
                                                            modifiersClassNames={{
                                                                selected: "!bg-primary-green !text-white rounded-xl shadow-lg",
                                                                today: "font-black text-primary-green underline decoration-2 offset-4"
                                                            }}
                                                            styles={{
                                                                caption: { color: "#1a5f42", fontWeight: "900", textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "0.2em" },
                                                                head_cell: { color: "#9CA3AF", fontSize: "0.7rem", fontWeight: "900", textTransform: "uppercase", letterSpacing: "0.1em" },
                                                                cell: { padding: "4px" }
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-6">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2 block">2. Seleccionar Hora</label>
                                                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 bg-gray-50/50 p-6 rounded-[2.5rem] border border-gray-100">
                                                        {["07:00", "07:20", "07:40", "08:00", "08:20", "08:40", "09:00", "09:20", "09:40", "10:00", "10:20", "10:40", "11:00", "11:20", "11:40"].map((t) => {
                                                            const isBooked = bookedSlots.includes(t);
                                                            const isPast = formData.date === format(new Date(), "yyyy-MM-dd") && t < format(new Date(), "HH:mm");
                                                            const isDisabled = isBooked || isPast;

                                                            return (
                                                                <button
                                                                    key={t}
                                                                    type="button"
                                                                    disabled={isDisabled}
                                                                    onClick={() => setFormData({ ...formData, time: t })}
                                                                    className={`py-3 text-[11px] font-black rounded-xl border-2 transition-all ${formData.time === t
                                                                        ? "bg-primary-green text-white border-primary-green shadow-lg scale-105"
                                                                        : isDisabled
                                                                            ? "bg-gray-100 text-gray-300 border-gray-100 cursor-not-allowed line-through opacity-50"
                                                                            : "bg-white text-gray-400 border-gray-100 hover:border-primary-green/20 hover:text-primary-green hover:bg-primary-green/5"
                                                                        }`}
                                                                >
                                                                    {t}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                    {formData.date && formData.time && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="p-5 bg-white rounded-3xl border border-primary-green/20 flex items-center gap-5 shadow-lg"
                                                        >
                                                            <div className="bg-primary-green/10 p-3 rounded-2xl text-primary-green">
                                                                <Clock size={20} />
                                                            </div>
                                                            <div>
                                                                <p className="text-[9px] font-black text-primary-green uppercase tracking-[0.2em] mb-1">Confirmación de Horario</p>
                                                                <p className="text-sm font-black text-gray-900 uppercase tracking-tight">
                                                                    {format(new Date(formData.date + "T12:00:00"), "EEEE d 'de' MMMM", { locale: es })} <span className="text-primary-green mx-1 opacity-20">|</span> {formData.time} hs
                                                                </p>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Preparación:</label>
                                                <div className="grid sm:grid-cols-2 gap-4 bg-gray-50/50 p-6 rounded-[2rem] border border-gray-100">
                                                    {["PRP 3 ML + PPP 4 ML", "PRP 6 ML + PPP 8 ML"].map(opt => (
                                                        <label key={opt} className={`flex items-center gap-4 cursor-pointer p-4 rounded-2xl border transition-all ${formData.preparation.includes(opt)
                                                            ? "bg-white border-primary-green/30 text-primary-green shadow-sm"
                                                            : "bg-white/50 border-gray-100 text-gray-400 hover:bg-white"
                                                            }`}>
                                                            <div className="relative flex items-center">
                                                                <input
                                                                    type="checkbox"
                                                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 checked:bg-primary-green checked:border-primary-green transition-all"
                                                                    checked={formData.preparation.includes(opt)}
                                                                    onChange={(e) => {
                                                                        if (e.target.checked) {
                                                                            setFormData({ ...formData, preparation: [...formData.preparation, opt] });
                                                                        } else {
                                                                            setFormData({ ...formData, preparation: formData.preparation.filter(p => p !== opt) });
                                                                        }
                                                                    }}
                                                                />
                                                                <div className="absolute text-white transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 left-1">
                                                                    <div className="w-2.5 h-2.5 bg-white rounded-full scale-0 peer-checked:scale-100 transition-transform" />
                                                                </div>
                                                            </div>
                                                            <span className="text-[11px] font-bold uppercase tracking-tight">{opt}</span>
                                                        </label>
                                                    ))}
                                                    <div className="sm:col-span-2 pt-4">
                                                        <input
                                                            type="text"
                                                            placeholder="Otro detalle (especificar aquí)..."
                                                            className="w-full bg-transparent border-b border-gray-200 py-2 outline-none focus:border-primary-green transition-all text-sm font-medium italic"
                                                            value={formData.otherPreparation}
                                                            onChange={(e) => setFormData({ ...formData, otherPreparation: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-8 border-t border-gray-50">
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full sm:w-fit bg-primary-green text-white px-16 py-6 rounded-full font-black text-[10px] tracking-[0.4em] uppercase shadow-xl shadow-green-100 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                                                >
                                                    {isSubmitting ? "ENVIANDO..." : "SOLICITAR TURNO"}
                                                </button>
                                                <button
                                                    type="reset"
                                                    disabled={isSubmitting}
                                                    onClick={() => setFormData({
                                                        email: "",
                                                        professional: "",
                                                        patient: "",
                                                        date: "",
                                                        time: "",
                                                        preparation: [],
                                                        otherPreparation: ""
                                                    })}
                                                    className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-red-500 transition-colors"
                                                >
                                                    BORRAR FORMULARIO
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
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-16 text-gray-700 max-w-4xl mx-auto pb-20"
                            >
                                <div className="bg-white rounded-[2.5rem] p-10 md:p-16 border border-gray-100 shadow-xl shadow-gray-100/50 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-primary-green group-hover:opacity-[0.05] transition-opacity duration-700">
                                        <Microscope size={160} />
                                    </div>

                                    <div className="relative z-10 space-y-8">
                                        <div className="space-y-4">
                                            <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter flex items-center gap-4">
                                                <div className="w-2 h-10 bg-primary-green rounded-full shadow-sm shadow-primary-green/20" />
                                                ¿Qué es el PRP?
                                            </h2>
                                            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs italic">Información para el profesional médico.</p>
                                        </div>

                                        <p className="text-lg md:text-xl leading-relaxed text-gray-600 font-medium italic uppercase tracking-wider">
                                            El <strong className="text-primary-green font-black">Plasma Rico en Plaquetas (PRP)</strong> es un hemoderivado autólogo obtenido mediante centrifugación diferencial, que concentra plaquetas y factores de crecimiento con capacidad regenerativa y antiinflamatoria.
                                        </p>

                                        <p className="text-sm md:text-base leading-relaxed text-gray-500 font-medium">
                                            Su uso se ha consolidado como una herramienta terapéutica de alto valor en <strong className="text-gray-900">medicina regenerativa, traumatología, dermatología y rehabilitación.</strong>
                                        </p>
                                    </div>
                                </div>

                                {/* Responsabilidades Grid */}
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl hover:shadow-2xl transition-all">
                                        <h3 className="text-xl font-black uppercase tracking-tighter text-gray-900 mb-8 flex items-center gap-4">
                                            <div className="w-10 h-10 bg-primary-green/5 rounded-xl flex items-center justify-center text-primary-green font-black">1</div>
                                            Preparación
                                        </h3>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-green mb-6 italic">Competencia Bioquímica</p>
                                        <ul className="space-y-4">
                                            {[
                                                "Condiciones de bioseguridad",
                                                "Correcta manipulación del material",
                                                "Protocolos estandarizados",
                                                "Control de calidad del concentrado",
                                                "Trazabilidad completa"
                                            ].map((text, i) => (
                                                <li key={i} className="flex items-center gap-4 text-[11px] font-black uppercase tracking-tight text-gray-400">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary-green" />
                                                    {text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl hover:shadow-2xl transition-all">
                                        <h3 className="text-xl font-black uppercase tracking-tighter text-gray-900 mb-8 flex items-center gap-4">
                                            <div className="w-10 h-10 bg-primary-green/5 rounded-xl flex items-center justify-center text-primary-green font-black">2</div>
                                            Aplicación
                                        </h3>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-green mb-6 italic">Responsabilidad Médica</p>
                                        <ul className="space-y-4">
                                            {[
                                                "Indicaciones clínicas",
                                                "Técnica y sitio de aplicación",
                                                "Número de sesiones",
                                                "Integración con otras terapias",
                                                "Seguimiento de resultados"
                                            ].map((text, i) => (
                                                <li key={i} className="flex items-center gap-4 text-[11px] font-black uppercase tracking-tight text-gray-400">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary-green" />
                                                    {text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Indicaciones Clínicas */}
                                <section className="space-y-10">
                                    <div className="text-center space-y-2">
                                        <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-gray-900">Indicaciones Clínicas</h3>
                                        <div className="h-1.5 w-24 bg-primary-green mx-auto rounded-full" />
                                    </div>

                                    <div className="grid gap-4">
                                        {[
                                            { title: "Patologías osteoarticulares", desc: "Tendinopatías, lesiones ligamentarias, artrosis, sinovitis, procesos inflamatorios crónicos.", icon: "🦴" },
                                            { title: "Traumatología y rehabilitación", desc: "Lesiones musculares, desgarros, hematomas, recuperación postquirúrgica.", icon: "💪" },
                                            { title: "Cicatrización avanzada", desc: "Úlceras, heridas complejas, quemaduras, lesiones de difícil resolución.", icon: "🩹" },
                                            { title: "Dermatología", desc: "Alopecias no cicatrizales, dermatitis crónicas, procesos inflamatorios persistentes.", icon: "✨" },
                                            { title: "Medicina regenerativa", desc: "Situaciones donde se busca mejorar la calidad tisular y acelerar la reparación.", icon: "🧬" }
                                        ].map((item, i) => (
                                            <div key={i} className="bg-white group hover:bg-gray-50 p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-start gap-8">
                                                <div className="text-4xl grayscale group-hover:grayscale-0 transition-all">{item.icon}</div>
                                                <div className="space-y-1">
                                                    <h4 className="text-lg font-black text-gray-900 uppercase tracking-tight">{item.title}</h4>
                                                    <p className="text-sm text-gray-400 font-bold uppercase italic tracking-tight leading-relaxed">{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Fundamento Biológico */}
                                <section className="bg-primary-green rounded-[2.5rem] p-10 md:p-16 text-white shadow-2xl shadow-primary-green/20 relative overflow-hidden">
                                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-y-32 translate-x-32 blur-3xl" />
                                    <div className="relative z-10 grid lg:grid-cols-2 gap-12">
                                        <div className="space-y-6">
                                            <h3 className="text-3xl font-black uppercase tracking-tighter leading-none mb-8">Fundamento <br /> Biológico</h3>
                                            <p className="text-primary-green-light font-medium italic uppercase tracking-wider text-green-100/80">
                                                El concentrado plaquetario aporta factores de crecimiento (PDGF, TGF-β, VEGF) y citoquinas antiinflamatorias.
                                            </p>
                                        </div>
                                        <div className="grid gap-3">
                                            {[
                                                "Reducción significativa del dolor",
                                                "Disminución de la inflamación",
                                                "Aceleración de reparación tisular",
                                                "Mejora de calidad del tejido"
                                            ].map((text, i) => (
                                                <div key={i} className="bg-white/10 backdrop-blur-md p-4 rounded-2xl flex items-center gap-4 border border-white/10">
                                                    <CheckCircle2 size={18} className="text-green-300" />
                                                    <span className="text-xs font-black uppercase tracking-widest leading-none">{text}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            </motion.div>
                        )}

                        {activeTab === "PREPARACION" && (
                            <motion.div
                                key="preparacion"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                className="space-y-12 max-w-5xl mx-auto pb-20"
                            >
                                <div className="bg-white rounded-[2.5rem] p-10 md:p-16 border border-gray-100 shadow-xl shadow-gray-100/50 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-green/5 rounded-full -translate-y-20 translate-x-20 blur-3xl" />

                                    <div className="flex flex-col md:flex-row items-center gap-8 mb-16 relative z-10">
                                        <div className="bg-primary-green/10 p-5 rounded-[2.5rem] text-primary-green">
                                            <ClipboardList size={40} strokeWidth={2.5} />
                                        </div>
                                        <div className="text-center md:text-left space-y-2">
                                            <h3 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tighter leading-none">Protocolo de <br className="hidden md:block" /> Preparación</h3>
                                            <p className="text-primary-green font-black uppercase text-[10px] tracking-[0.3em]">Nueva modalidad de trabajo – Laboratorio LB LAB</p>
                                        </div>
                                    </div>

                                    <div className="grid lg:grid-cols-2 gap-8 relative z-10">
                                        <div className="space-y-8">
                                            {/* Requisitos */}
                                            <div className="bg-white rounded-[2rem] p-10 border border-gray-100 shadow-xl hover:shadow-2xl transition-all">
                                                <h4 className="flex items-center gap-4 text-xl font-black uppercase tracking-tighter text-gray-900 mb-8 border-b border-gray-50 pb-6">
                                                    <div className="w-10 h-10 bg-primary-green/10 rounded-xl flex items-center justify-center text-primary-green">
                                                        <FileText size={20} />
                                                    </div>
                                                    Requisitos
                                                </h4>
                                                <ul className="space-y-6">
                                                    <li className="flex items-start gap-4 text-sm font-medium text-gray-500 italic leading-relaxed">
                                                        <CheckCircle2 size={18} className="text-primary-green shrink-0 mt-1" />
                                                        <span>Orden médica con <strong className="text-gray-900 font-black">hemograma y recuento de plaquetas</strong> actualizado.</span>
                                                    </li>
                                                    <li className="flex items-start gap-4 text-sm font-medium text-gray-500 italic leading-relaxed">
                                                        <CheckCircle2 size={18} className="text-primary-green shrink-0 mt-1" />
                                                        <span><strong className="text-gray-900 font-black uppercase">Consentimiento informado</strong> firmado previo a la toma de muestra biológica.</span>
                                                    </li>
                                                </ul>
                                            </div>

                                            {/* Procedimiento */}
                                            <div className="bg-primary-green rounded-[2rem] p-10 text-white shadow-xl shadow-green-100 relative overflow-hidden group">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-10 translate-x-10 blur-2xl group-hover:bg-white/10 transition-colors" />
                                                <h4 className="text-xl font-black uppercase tracking-tighter mb-6 flex items-center gap-4">
                                                    <Microscope size={24} />
                                                    Procedimiento
                                                </h4>
                                                <p className="text-sm font-medium leading-relaxed italic opacity-90 uppercase tracking-wider">
                                                    Utilizamos el avanzado sistema de extracción <strong className="font-black text-white px-2 py-0.5 bg-white/10 rounded">VACUTAINER</strong> en tubos al vacío con anticoagulante <strong className="font-black">ACD</strong> certificado, garantizando la máxima viabilidad plaquetaria.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-8">
                                            {/* Obtención */}
                                            <div className="bg-white rounded-[2rem] p-10 border border-gray-100 shadow-xl">
                                                <h4 className="text-lg font-black uppercase tracking-tighter text-gray-900 mb-8 flex items-center justify-between">
                                                    Opciones de Obtención
                                                    <Droplets className="text-primary-green" size={20} />
                                                </h4>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 space-y-3">
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-primary-green">Estándar</p>
                                                        <div className="space-y-1">
                                                            <p className="text-lg font-black text-gray-900">3 ml PRP</p>
                                                            <p className="text-xs font-bold text-gray-400">Jeringa 5 ml</p>
                                                        </div>
                                                        <div className="h-0.5 w-8 bg-primary-green/30" />
                                                        <p className="text-lg font-black text-gray-900">4 ml PPP</p>
                                                    </div>
                                                    <div className="p-6 rounded-2xl bg-primary-green text-white space-y-3 shadow-lg shadow-green-100">
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-green-200">Ampliada</p>
                                                        <div className="space-y-1">
                                                            <p className="text-lg font-black">6 ml PRP</p>
                                                            <p className="text-xs font-medium opacity-80">Concentrado+</p>
                                                        </div>
                                                        <div className="h-0.5 w-8 bg-white/30" />
                                                        <p className="text-lg font-black">8 ml PPP</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Tiempos */}
                                            <div className="bg-white rounded-[2rem] p-10 border border-gray-100 shadow-xl space-y-6">
                                                <h4 className="text-lg font-black uppercase tracking-tighter text-gray-900 mb-6 flex items-center gap-3">
                                                    <Clock size={20} className="text-primary-green" />
                                                    Tiempos & Condiciones
                                                </h4>
                                                <div className="grid gap-4">
                                                    {[
                                                        { label: "Preparación Técnica", value: "20–25 Minutos", icon: "🕒" },
                                                        { label: "Ventana de Aplicación", value: "Máx. 2 Horas", icon: "⏳" },
                                                        { label: "Conservación", value: "Tº Ambiente", icon: "🌡️" }
                                                    ].map((item, i) => (
                                                        <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-primary-green/20 transition-all">
                                                            <div className="flex items-center gap-4">
                                                                <span className="text-xl grayscale group-hover:grayscale-0 transition-all">{item.icon}</span>
                                                                <span className="text-xs font-black uppercase tracking-widest text-gray-400">{item.label}</span>
                                                            </div>
                                                            <span className="text-sm font-black text-gray-900">{item.value}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer Info */}
                                    <div className="mt-12 pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                                        <div className="flex items-center gap-4 bg-gray-50 p-4 pl-6 pr-8 rounded-full border border-gray-100 shadow-sm">
                                            <span className="w-3 h-3 bg-primary-green rounded-full animate-pulse" />
                                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 italic leading-none">
                                                Actualizado al 26 de Noviembre de 2025
                                            </p>
                                        </div>
                                        <div className="flex gap-6">
                                            <div className="text-right">
                                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-green mb-1">Costos & Turnos</p>
                                                <p className="text-xl font-black text-gray-900 uppercase tracking-tighter">Consultar Tarifario</p>
                                            </div>
                                            <div className="bg-primary-green/10 p-4 rounded-2xl text-primary-green">
                                                <Phone size={24} strokeWidth={2.5} />
                                            </div>
                                        </div>
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
                                className="flex flex-col items-center justify-center py-24"
                            >
                                <div className="max-w-md w-full text-center space-y-10">
                                    <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-100/50 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-green/5 rounded-full -translate-y-12 translate-x-12 blur-2xl group-hover:bg-primary-green/10 transition-colors" />
                                        <div className="relative z-10 space-y-6">
                                            <div className="bg-primary-green/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto text-primary-green shadow-sm">
                                                <ShieldCheck size={40} strokeWidth={2} />
                                            </div>
                                            <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter leading-none">
                                                Consentimiento <br /> Informado PRP
                                            </h3>
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest leading-relaxed">
                                                Documento obligatorio para pacientes. <br /> Descargue aquí para su revisión.
                                            </p>
                                        </div>
                                    </div>
                                    <a
                                        href="/docs/Consentimiento informado PRP.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-6 bg-primary-green text-white px-12 py-6 rounded-full font-black text-[10px] tracking-[0.4em] uppercase shadow-xl shadow-green-100 hover:scale-105 transition-all group"
                                    >
                                        VER DOCUMENTACIÓN PDF
                                        <div className="bg-white/20 p-2 rounded-lg text-white group-hover:bg-white group-hover:text-primary-green transition-all">
                                            <FileText size={16} strokeWidth={3} />
                                        </div>
                                    </a>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "INFORME" && (
                            <motion.div
                                key="informe"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="flex flex-col items-center justify-center py-24"
                            >
                                <div className="max-w-md w-full text-center space-y-10">
                                    <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-100/50 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-green/5 rounded-full -translate-y-12 translate-x-12 blur-2xl group-hover:bg-primary-green/10 transition-colors" />
                                        <div className="relative z-10 space-y-6">
                                            <div className="bg-primary-green/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto text-primary-green shadow-sm">
                                                <Microscope size={40} strokeWidth={2} />
                                            </div>
                                            <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter leading-none">
                                                Resultados & <br /> Informes Digitales
                                            </h3>
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest leading-relaxed">
                                                Seguimiento celular completo del PRP <br /> y hemogramas basales.
                                            </p>
                                        </div>
                                    </div>
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
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            <Footer />
        </div>
    );
}
