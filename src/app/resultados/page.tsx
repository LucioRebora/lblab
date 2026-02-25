import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
                                className="inline-flex items-center gap-3 bg-primary-burgundy text-white px-10 py-5 rounded-2xl text-[15px] font-black tracking-widest hover:bg-opacity-95 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary-burgundy/20 uppercase"
                            >
                                Ingresar al Portal de Resultados
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
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
