"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Veterinary() {
    return (
        <section id="veterinaria" className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="bg-sage-bg rounded-[3rem] overflow-hidden shadow-xl border border-white flex flex-col md:flex-row items-stretch group hover:shadow-2xl transition-all duration-500">
                    <div className="md:w-1/2 p-12 lg:p-24 space-y-10 flex flex-col justify-center items-center md:items-start text-center md:text-left relative z-10">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-gray-900 uppercase tracking-tighter leading-none">
                                Análisis <br />
                                <span className="text-primary-green">Veterinarios</span>
                            </h2>
                            <div className="h-2 w-32 bg-primary-burgundy rounded-full shadow-sm shadow-primary-burgundy/20" />
                        </div>

                        <p className="text-gray-600 text-xl leading-relaxed max-w-md italic font-light uppercase tracking-wider">
                            Brindamos el mismo nivel de precisión y tecnología para el cuidado de los más pequeños de la familia.
                        </p>

                        <Link
                            href="/veterinaria"
                            className="bg-white text-gray-900 border border-gray-100 px-10 py-5 rounded-full font-black text-[10px] tracking-[0.4em] uppercase shadow-lg hover:shadow-primary-green/20 hover:border-primary-green transition-all flex items-center gap-4 group mt-6 w-fit"
                        >
                            <ChevronRight size={18} className="text-primary-green group-hover:translate-x-2 transition-transform" strokeWidth={4} />
                            Ver servicios
                        </Link>
                    </div>

                    <div className="md:w-1/2 relative min-h-[600px] w-full overflow-hidden">
                        <Image
                            src="/img/cachorro.jpg"
                            alt="Veterinary Services"
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-1000 shadow-inner"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-sage-bg via-sage-bg/20 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary-green/20 to-transparent" />
                    </div>
                </div>
            </div>
        </section>
    );
}
