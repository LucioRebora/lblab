"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, MapPin, Phone, MessageCircle, CreditCard, Landmark, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        comment: "",
        web: ""
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", comment: "", web: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    return (
        <section id="contacto" className="py-24 bg-primary-burgundy/80 relative text-white">
            <div className="max-w-7xl mx-auto px-4">
                {/* ... existing map code ... */}
                <div id="mapa" className="bg-white rounded-[2rem] overflow-hidden mb-16 shadow-2xl border-4 border-white/20 h-80 relative group scroll-mt-24">
                    <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                        <MapPin size={48} className="text-primary-burgundy animate-bounce" />
                        <span className="ml-4 text-gray-500 font-bold uppercase tracking-widest text-sm">UBICACIÓN: Bolívar 1002, Gualeguaychú</span>
                    </div>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3393.362908233777!2d-58.514444!3d-33.008889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95baa80693a7413d%3A0xe5a3c0e3a4e9b60b!2sBol%C3%ADvar%201002%2C%20Gualeguaych%C3%BA%2C%20Entre%20R%C3%ADos!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar"
                        className="absolute inset-0 w-full h-full border-0"
                        loading="lazy"
                    ></iframe>
                </div>

                <div className="grid lg:grid-cols-2 gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
                                Tecnología y compromiso <br />
                                en cada análisis.
                            </h2>
                            <p className="text-white/80 text-xl font-light italic uppercase tracking-wider">
                                Un laboratorio moderno con atención personalizada.
                            </p>
                        </div>

                        <div className="space-y-6 pt-8">
                            <h3 className="text-xl font-bold uppercase tracking-[0.2em] border-b border-white/20 pb-4">Deja una respuesta</h3>

                            {status === "success" ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border-2 border-primary-green flex flex-col items-center text-center gap-4"
                                >
                                    <div className="bg-primary-green p-3 rounded-full">
                                        <CheckCircle2 size={32} />
                                    </div>
                                    <div>
                                        <p className="text-xl font-bold uppercase tracking-tight">¡Mensaje enviado!</p>
                                        <p className="text-white/60 text-sm mt-1 uppercase font-bold tracking-widest">Gracias por contactarte con LB Lab.</p>
                                    </div>
                                    <button
                                        onClick={() => setStatus("idle")}
                                        className="text-xs font-black uppercase tracking-[.3em] underline decoration-white/20 hover:decoration-white mt-2"
                                    >
                                        Enviar otro mensaje
                                    </button>
                                </motion.div>
                            ) : (
                                <>
                                    <p className="text-sm text-white/60 uppercase font-bold tracking-widest">Los campos marcados con * son obligatorios</p>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {status === "error" && (
                                            <div className="bg-red-500/20 border-2 border-red-500/50 p-4 rounded-xl flex items-center gap-3 text-sm font-bold uppercase tracking-wider">
                                                <AlertCircle size={18} />
                                                Error al enviar. Intente más tarde.
                                            </div>
                                        )}
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">Comentario *</label>
                                            <textarea
                                                rows={4}
                                                value={formData.comment}
                                                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                                                className="w-full bg-white/10 border-2 border-white/20 rounded-2xl p-4 text-white focus:bg-white/20 focus:border-white transition-all outline-none"
                                                required
                                            ></textarea>
                                        </div>
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">Nombre *</label>
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full bg-white/10 border-2 border-white/20 rounded-xl p-3 text-white focus:bg-white/20 focus:border-white transition-all outline-none text-sm"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">WhatsApp / Correo *</label>
                                                <input
                                                    type="text"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full bg-white/10 border-2 border-white/20 rounded-xl p-3 text-white focus:bg-white/20 focus:border-white transition-all outline-none text-sm"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">Empresa (Opcional)</label>
                                                <input
                                                    type="text"
                                                    value={formData.web}
                                                    onChange={(e) => setFormData({ ...formData, web: e.target.value })}
                                                    className="w-full bg-white/10 border-2 border-white/20 rounded-xl p-3 text-white focus:bg-white/20 focus:border-white transition-all outline-none text-sm"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            disabled={status === "loading"}
                                            className="bg-primary-burgundy border-2 border-white text-white px-8 py-4 rounded-full font-black text-xs tracking-[0.4em] uppercase hover:bg-white hover:text-primary-burgundy transition-all shadow-2xl flex items-center gap-4 group disabled:opacity-50"
                                        >
                                            {status === "loading" ? (
                                                <>Enviando... <Loader2 size={14} className="animate-spin" /></>
                                            ) : (
                                                <>Enviar <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                                            )}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white/10 backdrop-blur-md rounded-[3rem] p-12 border border-white/10 flex flex-col justify-between"
                    >
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <h4 className="text-xs font-black tracking-[0.3em] uppercase opacity-60">Datos de contacto</h4>
                                <div className="flex items-center gap-6 group">
                                    <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-primary-green transition-colors">
                                        <MessageCircle size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">WhatsApp</p>
                                        <p className="text-xl font-bold">+54 9 3446 330365</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 group">
                                    <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-primary-burgundy transition-colors">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">Teléfono</p>
                                        <p className="text-xl font-bold">3446 434574</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-xs font-black tracking-[0.3em] uppercase opacity-60">Dirección</h4>
                                <a
                                    href="#mapa"
                                    className="flex items-center gap-6 group hover:opacity-80 transition-opacity"
                                >
                                    <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-primary-green transition-colors">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xl font-bold max-w-xs leading-snug">Bolívar 1002, Gualeguaychú, Entre Ríos, Argentina</p>
                                    </div>
                                </a>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-xs font-black tracking-[0.3em] uppercase opacity-60">Medios de pago</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="bg-white/10 px-3 py-2 rounded-xl flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                                        <CreditCard size={14} className="text-white/80" />
                                        Tarjeta de Débito
                                    </div>
                                    <div className="bg-white/10 px-3 py-2 rounded-xl flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                                        <CreditCard size={14} className="text-white/80" />
                                        Tarjeta de Crédito
                                    </div>
                                    <div className="bg-white/10 px-3 py-2 rounded-xl flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                                        <img src="/img/mercadopago.png" alt="Mercado Pago" className="w-5 h-auto" />
                                        Mercado Pago
                                    </div>
                                    <div className="bg-white/10 px-3 py-2 rounded-xl flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                                        <Landmark size={14} className="text-white/80" />
                                        Transferencia
                                    </div>
                                </div>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
}
