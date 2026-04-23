"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
    Calendar, 
    Mail, 
    Stethoscope, 
    User, 
    Clock, 
    CheckCircle2, 
    X 
} from "lucide-react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import "react-day-picker/dist/style.css";
import { useSession } from "next-auth/react";

interface PRPFormProps {
    onSuccess?: () => void;
}

export default function PRPForm({ onSuccess }: PRPFormProps) {
    const { data: session } = useSession();
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
        const today = new Date();
        const dayOfWeek = today.getDay();
        let initialDate = today;

        if (dayOfWeek === 0) { // Domingo
            initialDate = new Date(today);
            initialDate.setDate(today.getDate() + 1);
        } else if (dayOfWeek === 6) { // Sábado
            initialDate = new Date(today);
            initialDate.setDate(today.getDate() + 2);
        }

        setFormData(prev => ({ ...prev, date: format(initialDate, "yyyy-MM-dd") }));
    }, []);

    useEffect(() => {
        if (session?.user?.email) {
            setFormData(prev => ({ ...prev, email: session.user.email ?? "" }));
        }
    }, [session]);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.date || !formData.time) {
            alert("Por favor selecciona el día y la hora para el turno.");
            return;
        }

        if (formData.preparation.length === 0 && !formData.otherPreparation.trim()) {
            alert("Por favor selecciona al menos un tipo de preparación o especifica otro.");
            return;
        }

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
                if (onSuccess) setTimeout(onSuccess, 2000);
            } else if (response.status === 409) {
                alert("Su turno ya no se encuentra disponible, por favor seleccione una nueva opción");
                setBookedSlots([...bookedSlots, formData.time]);
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

    if (submitted) {
        return (
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
                    <p className="text-gray-500 italic">El turno ha sido agendado correctamente.</p>
                </div>
            </motion.div>
        );
    }

    return (
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
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Profesional *</label>
                    <div className="relative">
                        <Stethoscope className="absolute left-5 top-1/2 -translate-y-1/2 text-primary-green/40" size={18} />
                        <input
                            required
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
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Paciente *</label>
                <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-primary-green/40" size={18} />
                    <input
                        required
                        type="text"
                        placeholder="Nombre completo"
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-14 pr-6 outline-none focus:ring-2 focus:ring-primary-green transition-all font-bold text-gray-800"
                        value={formData.patient}
                        onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
                    />
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-start py-6 border-y border-gray-50">
                <div className="space-y-6">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">1. Seleccionar Día</label>
                    <div className="flex justify-center bg-gray-50/50 p-4 rounded-[2rem] border border-gray-100 scale-90">
                        <DayPicker
                            mode="single"
                            required
                            selected={formData.date ? new Date(formData.date + "T12:00:00") : undefined}
                            onSelect={(day) => {
                                if (day) setFormData({ ...formData, date: format(day, "yyyy-MM-dd") });
                            }}
                            locale={es}
                            disabled={[
                                { before: new Date(new Date().setHours(0, 0, 0, 0)) },
                                { dayOfWeek: [0, 6] }
                            ]}
                            modifiersClassNames={{
                                selected: "!bg-primary-green !text-white rounded-xl shadow-lg",
                                today: "font-black text-primary-green underline decoration-2 offset-4"
                            }}
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2 block">2. Seleccionar Hora</label>
                    <div className="grid grid-cols-3 gap-2 bg-gray-50/50 p-4 rounded-[2rem] border border-gray-100">
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
                                    className={`py-2 text-[10px] font-black rounded-lg border-2 transition-all ${formData.time === t
                                        ? "bg-primary-green text-white border-primary-green shadow-lg"
                                        : isDisabled
                                            ? "bg-gray-100 text-gray-200 border-gray-100 cursor-not-allowed opacity-50"
                                            : "bg-white text-gray-400 border-gray-100 hover:border-primary-green/20 hover:text-primary-green"
                                        }`}
                                >
                                    {t}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Preparación:</label>
                <div className="grid sm:grid-cols-2 gap-4">
                    {["PRP 3 ML + PPP 4 ML", "PRP 6 ML + PPP 8 ML"].map(opt => (
                        <label key={opt} className={`flex items-center gap-4 cursor-pointer p-4 rounded-2xl border transition-all ${formData.preparation.includes(opt)
                            ? "bg-white border-primary-green/30 text-primary-green shadow-sm"
                            : "bg-gray-50/50 border-gray-100 text-gray-400 hover:bg-white"
                            }`}>
                            <input
                                type="checkbox"
                                className="h-5 w-5 rounded border border-gray-300 checked:bg-primary-green"
                                checked={formData.preparation.includes(opt)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setFormData({ ...formData, preparation: [...formData.preparation, opt] });
                                    } else {
                                        setFormData({ ...formData, preparation: formData.preparation.filter(p => p !== opt) });
                                    }
                                }}
                            />
                            <span className="text-[11px] font-bold uppercase">{opt}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-8 border-t border-gray-50">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-fit bg-primary-green text-white px-12 py-5 rounded-full font-black text-[10px] tracking-[0.4em] uppercase shadow-xl hover:scale-105 transition-all disabled:opacity-50"
                >
                    {isSubmitting ? "ENVIANDO..." : "SOLICITAR TURNO"}
                </button>
            </div>
        </form>
    );
}
