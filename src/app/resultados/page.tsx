import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronRight } from "lucide-react";

export default function ResultadosPage() {
    return (
        <main className="min-h-screen flex flex-col">
            <Navbar />

            {/* Main content area - Redirect section */}
            <div className="flex-grow flex items-center pt-24 pb-20 bg-gray-50/50">
                <div className="max-w-4xl mx-auto px-6 lg:px-8 w-full">
                    <div className="bg-white rounded-[3rem] p-12 lg:p-20 shadow-2xl shadow-primary-green/5 border border-gray-100 text-center space-y-8">
                        <div className="w-24 h-24 bg-primary-burgundy/5 rounded-[2rem] flex items-center justify-center mx-auto text-primary-burgundy">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 uppercase tracking-tight leading-tight">
                                Visualización de <br /><span className="text-primary-green">Resultados Online</span>
                            </h1>
                            <p className="text-gray-500 text-lg font-medium max-w-xl mx-auto">
                                Para una mayor comodidad y seguridad en el manejo de su información académica y médica, acceda a nuestro sistema de autogestión de pacientes.
                            </p>
                        </div>

                        <div className="pt-6">
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

                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest pt-8">
                            Será redirigido a: <span className="text-gray-500 underline">redlab.com.ar/lblab</span>
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
