import { MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#FFF5F2] pt-20 pb-12 border-t border-orange-100/50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Top: Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 mb-20">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <h4 className="text-gray-900 font-black text-[15px] tracking-tight">
                            LB LAB – Laboratorio de Bioanálisis.
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed max-w-xs font-medium">
                            Compromiso, precisión y calidez humana en cada estudio.
                        </p>
                    </div>

                    {/* Contact Column */}
                    <div className="space-y-4 px-0 md:px-8">
                        <h4 className="text-gray-900 font-black text-[15px] tracking-tight">
                            Datos de contacto
                        </h4>
                        <div className="space-y-3">
                            <p className="text-gray-600 text-sm">
                                WhatsApp: <span className="font-bold text-gray-800 tracking-wide">+ 54 9 3446 330365</span>
                            </p>
                            <p className="text-gray-600 text-sm">
                                Telefono: <span className="font-bold text-gray-800 tracking-wide">3446 434574</span>
                            </p>
                        </div>
                    </div>

                    {/* Address Column */}
                    <div className="space-y-4">
                        <div className="space-y-4">
                            <h4 className="text-gray-900 font-black text-[15px] tracking-tight">
                                Dirección
                            </h4>
                            <a
                                href="#mapa"
                                className="flex items-start gap-2 group hover:opacity-80 transition-opacity"
                            >
                                <MapPin size={18} className="text-primary-burgundy mt-0.5 shrink-0" />
                                <p className="text-primary-burgundy font-bold text-sm leading-relaxed hover:underline decoration-primary-burgundy/30 cursor-pointer">
                                    Bolívar 1002, Gualeguaychú, Entre Ríos, Argentina
                                </p>
                            </a>
                        </div>


                    </div>
                </div>

                {/* Bottom Section: Separator and Footer Credits */}
                <div className="pt-10 border-t border-orange-200/40 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                    {/* Left side: Copyright */}
                    <div className="space-y-1">
                        <p className="text-gray-500 text-[10px] font-black tracking-widest uppercase">
                            © 2026 LB LAB – LABORATORIO DE BIOANÁLISIS. TODOS LOS DERECHOS RESERVADOS.
                        </p>
                        <p className="text-gray-400 text-[9px] font-bold tracking-[0.2em] uppercase flex items-center gap-2">
                            POWERED BY <a href="https://itia.ar/" target="_blank" rel="noopener noreferrer" className="text-primary-green hover:underline">ITIA.AR</a>
                            <span className="text-gray-300">|</span>
                            <a href="/admin" className="hover:text-primary-burgundy transition-colors">Admin</a>
                        </p>
                    </div>


                </div>
            </div>
        </footer>
    );
}
