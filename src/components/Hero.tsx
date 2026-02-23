"use client";

import { MapPin, FileText, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

const images = [
    "/img/princ1.jpeg",
    "/img/princ2.jpg",
    "/img/princ3.jpeg",
    "/img/princ4.jpg",
];

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="inicio" className="relative pt-20 overflow-hidden">
            {/* Background Slider */}
            <div className="relative h-[650px] w-full overflow-hidden bg-gray-900">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 1.25 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 3, ease: "linear" }}
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url('${images[currentIndex]}')` }}
                    />
                </AnimatePresence>

                {/* Darker Overlay for readability */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-black/20 backdrop-blur-md p-10 rounded-[3rem] border border-white/10 shadow-2xl max-w-4xl"
                    >
                        <h1 className="text-4xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl leading-tight">
                            LB Lab <br />
                            <span className="text-white/80 font-medium text-2xl md:text-3xl block mt-2 border-t border-white/20 pt-4 uppercase tracking-[0.3em]">
                                Laboratorio de Bioanálisis
                            </span>
                        </h1>
                        <p className="text-lg md:text-2xl text-white font-light max-w-2xl drop-shadow-lg italic">
                            Resultados confiables, tecnología y compromiso con tu salud
                        </p>
                    </motion.div>
                </div>

                {/* Slider dots */}
                <div className="absolute bottom-24 left-0 right-0 flex justify-center gap-2 z-10">
                    {images.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1.5 transition-all duration-500 rounded-full ${i === currentIndex ? "w-8 bg-white" : "w-1.5 bg-white/40"}`}
                        />
                    ))}
                </div>
            </div>

            {/* Schedule Section (Horizontal overlap) */}
            <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-20">
                <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="bg-white border-2 border-primary-green/20 rounded-2xl p-8 shadow-2xl flex items-start gap-6 group hover:border-primary-green transition-all"
                    >
                        <div className="bg-primary-green/10 p-4 rounded-full text-primary-green group-hover:scale-110 transition-transform">
                            <Clock size={32} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-primary-green mb-4 uppercase tracking-wider flex items-center gap-2">
                                Horarios de Atención
                            </h3>
                            <div className="space-y-2 text-sm">
                                <p className="font-bold border-b border-gray-100 pb-1">Lunes a Viernes</p>
                                <p className="text-gray-600">07:00 a 12:30 hs.</p>
                                <p className="text-gray-600">16:00 a 20:00 hs.</p>
                                <p className="font-bold border-b border-gray-100 pb-1 pt-2">Sábados</p>
                                <p className="text-gray-600">08:00 a 12:00 hs.</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="bg-white border-2 border-primary-burgundy/20 rounded-2xl p-8 shadow-2xl flex items-start gap-6 group hover:border-primary-burgundy transition-all"
                    >
                        <div className="bg-primary-burgundy/10 p-4 rounded-full text-primary-burgundy group-hover:scale-110 transition-transform">
                            <Clock size={32} strokeWidth={3} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-primary-burgundy mb-4 uppercase tracking-wider">
                                Horarios de Extracciones
                            </h3>
                            <div className="space-y-2 text-sm">
                                <p className="font-bold border-b border-gray-100 pb-1">Lunes a Viernes</p>
                                <p className="text-gray-600">07:00 a 10:00 hs.</p>
                                <p className="font-bold border-b border-gray-100 pb-1 pt-2">Sábados</p>
                                <p className="text-gray-600">08:00 a 10:00 hs.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
