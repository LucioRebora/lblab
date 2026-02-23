"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function Veterinary() {
    return (
        <section id="veterinaria" className="py-24 bg-soft-bg relative">
            <div className="max-w-7xl mx-auto px-4">
                <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row items-stretch">
                    <div className="md:w-1/2 p-12 lg:p-20 space-y-8 flex flex-col justify-center items-center md:items-start text-center md:text-left">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 uppercase tracking-tighter leading-none">
                            Análisis <br />
                            <span className="text-primary-green">Veterinarios</span>
                        </h2>
                        <div className="h-1.5 w-32 bg-primary-burgundy rounded-full" />
                        <p className="text-gray-600 text-lg leading-relaxed max-w-md italic">
                            Brindamos el mismo nivel de precisión y tecnología para el cuidado de los más pequeños de la familia.
                        </p>
                        <button className="bg-white text-gray-900 border-2 border-gray-100 px-8 py-4 rounded-full font-black text-xs tracking-[0.3em] uppercase shadow-xl hover:shadow-2xl hover:border-primary-green transition-all flex items-center gap-4 group mt-4">
                            <ChevronRight size={18} className="text-primary-green group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                            Ver Más
                        </button>
                    </div>

                    <div className="md:w-1/2 relative min-h-[500px] w-full">
                        <Image
                            src="/img/cachorro.jpg"
                            alt="Veterinary Services"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-l from-primary-green/10 to-transparent" />
                    </div>
                </div>
            </div>
        </section>
    );
}
