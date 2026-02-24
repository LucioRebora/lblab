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
        <section id="contacto" className="py-24 bg-sage-bg relative text-gray-900 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4">

                <div id="mapa" className="bg-white rounded-[2.5rem] overflow-hidden mb-16 shadow-xl border-4 border-white h-80 relative group scroll-mt-24">
                    <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
                        <MapPin size={48} className="text-primary-green animate-bounce" />
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
                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-primary-green">
                                Tecnología y compromiso <br />
                                en cada análisis.
                            </h2>
                            <p className="text-gray-600 text-xl font-light italic uppercase tracking-wider">
                                Un laboratorio moderno con atención personalizada.
                            </p>
                        </div>

                        <div className="space-y-6 pt-8">
                            <h3 className="text-xl font-bold uppercase tracking-[0.2em] border-b border-primary-green/10 text-primary-green pb-4">Deja una respuesta</h3>

                            {status === "success" ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-white p-8 rounded-[2rem] border-2 border-primary-green flex flex-col items-center text-center gap-4 shadow-xl"
                                >
                                    <div className="bg-primary-green p-3 rounded-full text-white">
                                        <CheckCircle2 size={32} />
                                    </div>
                                    <div>
                                        <p className="text-xl font-bold uppercase tracking-tight text-primary-green">¡Mensaje enviado!</p>
                                        <p className="text-gray-500 text-sm mt-1 uppercase font-bold tracking-widest">Gracias por contactarte con LB Lab.</p>
                                    </div>
                                    <button
                                        onClick={() => setStatus("idle")}
                                        className="text-xs font-black uppercase tracking-[.3em] underline decoration-primary-green/20 hover:decoration-primary-green mt-2 text-primary-green"
                                    >
                                        Enviar otro mensaje
                                    </button>
                                </motion.div>
                            ) : (
                                <>
                                    <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Los campos marcados con * son obligatorios</p>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {status === "error" && (
                                            <div className="bg-red-50 text-red-500 border border-red-100 p-4 rounded-xl flex items-center gap-3 text-sm font-bold uppercase tracking-wider">
                                                <AlertCircle size={18} />
                                                Error al enviar. Intente más tarde.
                                            </div>
                                        )}
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-primary-green/60">Comentario *</label>
                                            <textarea
                                                rows={4}
                                                value={formData.comment}
                                                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                                                className="w-full bg-white border border-gray-200 rounded-2xl p-4 text-gray-900 focus:border-primary-green transition-all outline-none shadow-sm"
                                                required
                                            ></textarea>
                                        </div>
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-primary-green/60">Nombre *</label>
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full bg-white border border-gray-200 rounded-xl p-3 text-gray-900 focus:border-primary-green transition-all outline-none text-sm shadow-sm"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-primary-green/60">WhatsApp / Correo *</label>
                                                <input
                                                    type="text"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full bg-white border border-gray-200 rounded-xl p-3 text-gray-900 focus:border-primary-green transition-all outline-none text-sm shadow-sm"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-primary-green/60">Empresa (Opcional)</label>
                                                <input
                                                    type="text"
                                                    value={formData.web}
                                                    onChange={(e) => setFormData({ ...formData, web: e.target.value })}
                                                    className="w-full bg-white border border-gray-200 rounded-xl p-3 text-gray-900 focus:border-primary-green transition-all outline-none text-sm shadow-sm"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            disabled={status === "loading"}
                                            className="bg-primary-burgundy text-white px-8 py-4 rounded-full font-black text-xs tracking-[0.4em] uppercase hover:bg-opacity-90 transition-all shadow-xl shadow-primary-burgundy/10 flex items-center gap-4 group disabled:opacity-50"
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
                        className="bg-white rounded-[2.5rem] p-12 border border-gray-100 flex flex-col justify-between shadow-xl"
                    >
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-primary-green/40">Datos de contacto</h4>
                                <div className="flex items-center gap-6 group">
                                    <div className="bg-sage-bg p-4 rounded-2xl text-primary-green group-hover:bg-primary-green group-hover:text-white transition-all shadow-sm">
                                        <MessageCircle size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">WhatsApp</p>
                                        <p className="text-xl font-bold text-gray-900 tracking-tight">+54 9 3446 330365</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 group">
                                    <div className="bg-sage-bg p-4 rounded-2xl text-primary-burgundy group-hover:bg-primary-burgundy group-hover:text-white transition-all shadow-sm">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Teléfono</p>
                                        <p className="text-xl font-bold text-gray-900 tracking-tight">3446 434574</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-primary-green/40">Dirección</h4>
                                <a
                                    href="#mapa"
                                    className="flex items-center gap-6 group hover:opacity-80 transition-opacity"
                                >
                                    <div className="bg-sage-bg p-4 rounded-2xl text-primary-green group-hover:bg-primary-green group-hover:text-white transition-all shadow-sm">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xl font-bold text-gray-900 leading-snug">Bolívar 1002, Gualeguaychú, Entre Ríos, Argentina</p>
                                    </div>
                                </a>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-primary-green/40">Medios de pago</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-sage-bg/50 px-4 py-3 rounded-xl flex items-center gap-3 text-[10px] font-black uppercase tracking-wider text-gray-600 border border-gray-100">
                                        <CreditCard size={14} className="text-primary-green" />
                                        Tarjeta de Débito
                                    </div>
                                    <div className="bg-sage-bg/50 px-4 py-3 rounded-xl flex items-center gap-3 text-[10px] font-black uppercase tracking-wider text-gray-600 border border-gray-100">
                                        <CreditCard size={14} className="text-primary-green" />
                                        Tarjeta de Crédito
                                    </div>
                                    <div className="bg-sage-bg/50 px-4 py-3 rounded-xl flex items-center gap-3 text-[10px] font-black uppercase tracking-wider text-gray-600 border border-gray-100">
                                        <img src="/img/mercadopago.png" alt="Mercado Pago" className="w-5 h-auto grayscale group-hover:grayscale-0 transition-all text-primary-green" />
                                        Mercado Pago
                                    </div>
                                    <div className="bg-sage-bg/50 px-4 py-3 rounded-xl flex items-center gap-3 text-[10px] font-black uppercase tracking-wider text-gray-600 border border-gray-100">
                                        <Landmark size={14} className="text-primary-green" />
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
