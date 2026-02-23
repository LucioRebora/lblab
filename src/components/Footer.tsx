import { MapPin, CreditCard, Landmark, Smartphone } from "lucide-react";

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
                        <h4 className="text-gray-900 font-black text-[15px] tracking-tight">
                            Dirección
                        </h4>
                        <div className="flex items-start gap-2 group">
                            <MapPin size={18} className="text-primary-burgundy mt-0.5 shrink-0" />
                            <p className="text-primary-burgundy font-bold text-sm leading-relaxed hover:underline decoration-primary-burgundy/30 cursor-pointer">
                                Bolívar 1002, Gualeguaychú, Entre Ríos, Argentina
                            </p>
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
                        <p className="text-gray-400 text-[9px] font-bold tracking-[0.2em] uppercase">
                            POWERED BY <a href="https://itia.ar/" target="_blank" rel="noopener noreferrer" className="text-primary-green hover:underline">ITIA.AR</a>
                        </p>
                    </div>

                    {/* Right side: Payment Methods */}
                    <div className="flex flex-col items-end gap-4 min-w-[200px]">
                        <h4 className="text-gray-900 font-black text-[12px] tracking-widest uppercase mb-1">
                            Medios de pago
                        </h4>
                        <div className="space-y-2.5">
                            <div className="flex items-center justify-end gap-3 text-gray-700 text-[11px] font-bold tracking-tight">
                                <span className="order-1 uppercase">Tarjetas de débito</span>
                                <CreditCard size={14} className="text-orange-500" strokeWidth={2.5} />
                            </div>
                            <div className="flex items-center justify-end gap-3 text-gray-700 text-[11px] font-bold tracking-tight">
                                <span className="order-1 uppercase">Mercado Pago</span>
                                <img src="/img/mercadopago.png" alt="Mercado Pago" className="w-5 h-auto opacity-80" />
                            </div>
                            <div className="flex items-center justify-end gap-3 text-gray-700 text-[11px] font-bold tracking-tight">
                                <span className="order-1 uppercase">Tarjetas de crédito</span>
                                <CreditCard size={14} className="text-orange-500" strokeWidth={2.5} />
                            </div>
                            <div className="flex items-center justify-end gap-3 text-gray-700 text-[11px] font-bold tracking-tight">
                                <span className="order-1 uppercase">Transferencia bancaria</span>
                                <Landmark size={14} className="text-gray-500" strokeWidth={2.5} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
