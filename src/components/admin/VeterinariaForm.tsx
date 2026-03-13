"use client";

import { useState } from "react";
import { Check, Clock, ClipboardList, CheckCircle2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

interface VeterinariaFormProps {
    onSuccess?: () => void;
}

export default function VeterinariaForm({ onSuccess }: VeterinariaFormProps) {
    const { data: session } = useSession();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        const data = {
            email: formData.get("email"),
            veterinaria: formData.get("veterinaria"),
            profesional: formData.get("profesional"),
            especie: formData.get("especie"),
            nombreMascota: formData.get("nombreMascota"),
            propietario: formData.get("propietario"),
            analysis: formData.getAll("analysis"),
            otro: formData.get("otro") as string,
            precio: formData.get("precio") ? parseFloat(formData.get("precio") as string) : null,
        };

        if (data.analysis.length === 0 && (!data.otro || !data.otro.trim())) {
            alert("Por favor selecciona al menos un estudio o especifica otro.");
            setIsSubmitting(false);
            return;
        }

        try {
            const res = await fetch("/api/veterinaria", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                setIsSubmitted(true);
                if (onSuccess) onSuccess();
            } else {
                alert("Error al enviar la solicitud.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Error de conexión.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center text-center space-y-6"
            >
                <div className="w-16 h-16 bg-primary-green text-white rounded-full flex items-center justify-center shadow-xl shadow-green-100">
                    <CheckCircle2 size={32} />
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-black text-gray-900 uppercase">¡Solicitud Enviada!</h3>
                    <p className="text-gray-500 text-xs italic">Pedido registrado con éxito.</p>
                </div>
                <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-primary-green font-black text-[10px] uppercase tracking-widest hover:underline pt-4"
                >
                    Enviar otra solicitud
                </button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Email</label>
                <input
                    name="email"
                    required
                    type="email"
                    defaultValue={session?.user?.email || ""}
                    readOnly={!!session?.user?.email}
                    placeholder="ejemplo@correo.com"
                    className={`w-full border border-gray-100 rounded-xl py-3 px-4 outline-none transition-all font-bold text-sm ${session?.user?.email
                        ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                        : "bg-gray-50 text-gray-800 focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                        }`}
                />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Veterinaria</label>
                    <input
                        name="veterinaria"
                        required
                        type="text"
                        defaultValue={session?.user?.name || ""}
                        placeholder="Nombre de la veterinaria"
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green transition-all font-bold text-gray-800 text-sm"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Profesional</label>
                    <input
                        name="profesional"
                        required
                        type="text"
                        placeholder="Nombre del veterinario"
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green transition-all font-bold text-gray-800 text-sm"
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Especie</label>
                    <select
                        name="especie"
                        required
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green transition-all font-bold text-gray-800 cursor-pointer appearance-none text-sm"
                    >
                        <option value="">Seleccione</option>
                        <option value="Canino">Canino</option>
                        <option value="Felino">Felino</option>
                        <option value="Equino">Equino</option>
                        <option value="Otros">Otros</option>
                    </select>
                </div>
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Mascota</label>
                    <input
                        name="nombreMascota"
                        required
                        type="text"
                        placeholder="Nombre"
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green transition-all font-bold text-gray-800 text-sm"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Propietario</label>
                    <input
                        name="propietario"
                        required
                        type="text"
                        placeholder="Nombre"
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green transition-all font-bold text-gray-800 text-sm"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Precio</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">$</span>
                        <input
                            name="precio"
                            type="number"
                            placeholder="0.00"
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-8 pr-4 py-3 outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green transition-all font-bold text-gray-800 text-sm"
                        />
                    </div>
                </div>
            </div>

            <div className="pt-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2 block mb-3">Análisis Solicitados *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                    {[
                        "HEMOGRAMA", "GLUCEMIA", "UREMIA", "CREATININA",
                        "HEPATOGRAMA", "GAMMA GT", "CALCEMIA", "FOSFATEMIA",
                        "MAGENSEMIA", "PROTEINAS TOTALES", "ALBUMIMA", "ORINA", "CULTIVO", "COAGULOGRAMA"
                    ].map((item) => (
                        <label key={item} className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center">
                                <input
                                    name="analysis"
                                    type="checkbox"
                                    value={item}
                                    className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 checked:bg-primary-green checked:border-primary-green transition-all"
                                />
                                <div className="absolute text-white transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 left-0.5">
                                    <Check size={12} strokeWidth={4} />
                                </div>
                            </div>
                            <span className="text-[10px] font-bold text-gray-600 group-hover:text-primary-green transition-colors">{item}</span>
                        </label>
                    ))}
                    <div className="sm:col-span-2 lg:col-span-3 mt-2">
                        <input
                            name="otro"
                            type="text"
                            placeholder="Otro (especificar)..."
                            className="w-full bg-transparent border-b border-gray-200 py-1 outline-none focus:border-primary-green transition-all text-[10px] font-medium italic"
                        />
                    </div>
                </div>
            </div>

            <div className="pt-4 flex items-center justify-between gap-4">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-grow bg-primary-green text-white py-4 rounded-xl font-black text-[10px] tracking-widest uppercase shadow-lg shadow-green-100 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                >
                    {isSubmitting ? "ENVIANDO..." : "ENVIAR SOLICITUD"}
                </button>
                <button
                    type="reset"
                    disabled={isSubmitting}
                    className="p-4 text-gray-400 hover:text-red-500 transition-colors"
                    title="Borrar"
                >
                    <Clock size={18} />
                </button>
            </div>
        </form>
    );
}
