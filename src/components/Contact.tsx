"use client";

import { motion } from "framer-motion";
import { Send, MapPin, Phone, MessageCircle } from "lucide-react";

export default function Contact() {
    return (
        <section id="contacto" className="py-24 bg-primary-burgundy/80 relative text-white">
            <div className="max-w-7xl mx-auto px-4">
                {/* Map Placeholder Header */}
                <div className="bg-white rounded-[2rem] overflow-hidden mb-16 shadow-2xl border-4 border-white/20 h-80 relative group">
                    <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                        <MapPin size={48} className="text-primary-burgundy animate-bounce" />
                        <span className="ml-4 text-gray-500 font-bold uppercase tracking-widest text-sm">UBICACIÓN: Bolívar 1002, Gualeguaychú</span>
                    </div>
                    {/* Real Map embed could go here */}
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3393.362908233777!2d-58.514444!3d-33.008889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95baa80693a7413d%3A0xe5a3c0e3a4e9b60b!2sBol%C3%ADvar%201002%2C%20Gualeguaych%C3%BA%2C%20Entre%20R%C3%ADos!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar"
                        className="absolute inset-0 w-full h-full grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
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
                            <p className="text-sm text-white/60">Tu dirección de correo electrónico no será publicada. Los campos obligatorios están marcados con *</p>

                            <form className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-80">Comentario *</label>
                                    <textarea
                                        rows={4}
                                        className="w-full bg-white/10 border-2 border-white/20 rounded-2xl p-4 text-white focus:bg-white/20 focus:border-white transition-all outline-none"
                                        required
                                    ></textarea>
                                </div>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-80">Nombre *</label>
                                        <input type="text" className="w-full bg-white/10 border-2 border-white/20 rounded-xl p-3 text-white focus:bg-white/20 focus:border-white transition-all outline-none" required />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-80">Correo electrónico *</label>
                                        <input type="email" className="w-full bg-white/10 border-2 border-white/20 rounded-xl p-3 text-white focus:bg-white/20 focus:border-white transition-all outline-none" required />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-80">Web</label>
                                        <input type="text" className="w-full bg-white/10 border-2 border-white/20 rounded-xl p-3 text-white focus:bg-white/20 focus:border-white transition-all outline-none" />
                                    </div>
                                </div>
                                <button className="bg-primary-burgundy border-2 border-white text-white px-8 py-4 rounded-full font-black text-xs tracking-[0.4em] uppercase hover:bg-white hover:text-primary-burgundy transition-all shadow-2xl flex items-center gap-4 group">
                                    Publicar el comentario
                                    <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </form>
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
                                <div className="flex items-center gap-6 group">
                                    <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-primary-green transition-colors">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xl font-bold max-w-xs leading-snug">Bolívar 1002, Gualeguaychú, Entre Ríos, Argentina</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-12 mt-12 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-8">
                            <div className="space-y-4 text-center sm:text-left">
                                <h4 className="text-[10px] font-black tracking-[0.4em] uppercase opacity-60 mb-4">Medios de pago</h4>
                                <div className="flex flex-wrap gap-4 items-center justify-center sm:justify-start grayscale opacity-60">
                                    <span className="bg-white/10 px-4 py-2 rounded-lg text-[10px] font-bold">Mercado Pago</span>
                                    <span className="bg-white/10 px-4 py-2 rounded-lg text-[10px] font-bold">Tarjetas de crédito</span>
                                    <span className="bg-white/10 px-4 py-2 rounded-lg text-[10px] font-bold">Transferencia</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
