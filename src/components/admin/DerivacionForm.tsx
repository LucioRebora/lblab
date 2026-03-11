"use client";

import { useState, useEffect } from "react";
import { Check, Clock, AlertCircle } from "lucide-react";
import { useSession } from "next-auth/react";

interface DerivacionFormProps {
    onSuccess?: () => void;
}

export default function DerivacionForm({ onSuccess }: DerivacionFormProps) {
    const { data: session } = useSession();
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

    useEffect(() => {
        if (session?.user) {
            setFormData(prev => ({
                ...prev,
                email: session.user?.email ?? prev.email,
                labName: session.user?.name ?? prev.labName
            }));
        }
    }, [session]);

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
                if (onSuccess) onSuccess();
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

    if (submitted) {
        return (
            <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 bg-primary-green text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <Check size={32} strokeWidth={4} />
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-black text-gray-900 uppercase">¡Solicitud Exitosa!</h3>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-widest">Recibida correctamente.</p>
                </div>
                <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 bg-gray-50 text-gray-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all border border-gray-100"
                >
                    Nueva Solicitud
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Lab. Originante</label>
                    <input
                        required
                        type="text"
                        placeholder="Nombre del laboratorio"
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green text-sm font-bold text-gray-900 placeholder:text-gray-300 transition-all"
                        value={formData.labName}
                        onChange={(e) => setFormData({ ...formData, labName: e.target.value })}
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Email</label>
                    <input
                        required
                        type="email"
                        placeholder="ejemplo@correo.com"
                        readOnly={!!session?.user?.email}
                        className={`w-full border border-gray-100 rounded-xl px-4 py-3 outline-none transition-all text-sm font-bold ${session?.user?.email
                            ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                            : "bg-gray-50 text-gray-900 focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                            }`}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">N° Protocolo</label>
                    <input
                        required
                        type="text"
                        placeholder="0000"
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green text-sm font-bold text-gray-900 placeholder:text-gray-300 transition-all"
                        value={formData.protocoloExterno}
                        onChange={(e) => setFormData({ ...formData, protocoloExterno: e.target.value })}
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Paciente</label>
                    <input
                        required
                        type="text"
                        placeholder="Nombre completo"
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green text-sm font-bold text-gray-900 placeholder:text-gray-300 transition-all"
                        value={formData.patient}
                        onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
                    />
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Observaciones</label>
                <textarea
                    placeholder="Notas relevantes..."
                    rows={2}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green text-sm font-bold text-gray-900 placeholder:text-gray-300 transition-all resize-none"
                    value={formData.observaciones}
                    onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                />
            </div>

            <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Estudios Solicitados</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                        "ANTIBIOGRAMA", "BACILOSCOPIA", "COPROCULTIVO",
                        "CULTIVO", "CULTIVO B.A.A.R.", "HEMOCULTIVO",
                        "ESTADO ACIDO BASE", "ESPERMOCULTIVO", "ESPERMOGRAMA",
                        "FLUJO VAGINAL", "STREPTO B - HIS. ANAL", "STREPTO B - HIS. VAGINAL",
                        "MICOLOGICO", "MICROALBUMINURIA 24 HS", "PROTEINURIA 24 HS",
                        "RAC", "UREAPLASMA / MICOPLASMA", "UROCULTIVO", "PCR"
                    ].map(opt => (
                        <label key={opt} className="flex items-center gap-3 cursor-pointer group select-none">
                            <div className={`w-4 h-4 rounded border transition-all flex items-center justify-center shrink-0 ${formData.analysisType.includes(opt) ? 'bg-primary-green border-primary-green' : 'bg-white border-gray-200'}`}>
                                {formData.analysisType.includes(opt) && <Check size={10} className="text-white" strokeWidth={4} />}
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
                            <span className={`text-[10px] font-bold uppercase transition-colors ${formData.analysisType.includes(opt) ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600'}`}>{opt}</span>
                        </label>
                    ))}
                    <div className="sm:col-span-2 pt-3 border-t border-gray-100 mt-2">
                        <input
                            type="text"
                            placeholder="OTRO ESTUDIO..."
                            className="w-full bg-transparent border-b border-gray-200 py-1 outline-none text-[10px] font-black text-gray-900 placeholder:text-gray-300 focus:border-primary-green transition-colors uppercase"
                            value={formData.otherAnalysis}
                            onChange={(e) => setFormData({ ...formData, otherAnalysis: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between gap-4 pt-2">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-grow bg-primary-green text-white py-4 rounded-xl font-black text-[10px] tracking-widest uppercase shadow-lg shadow-green-100 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                >
                    {isSubmitting ? "ENVIANDO..." : "ENVIAR SOLICITUD"}
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
                    className="p-4 text-gray-400 hover:text-red-500 transition-colors"
                    title="Limpiar"
                >
                    <Clock size={18} />
                </button>
            </div>
        </form>
    );
}
