"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
    DollarSign,
    Search,
    FileText,
    ArrowLeft
} from "lucide-react";
import Link from "next/link";

export default function ListaPreciosPage() {
    // Prices State
    const [prices, setPrices] = useState<any[]>([]);
    const [nbuValue, setNbuValue] = useState<number>(0);
    const [validity, setValidity] = useState<string>("");
    const [loadingPrices, setLoadingPrices] = useState(true);
    const [priceSearch, setPriceSearch] = useState("");

    useEffect(() => {
        const fetchPricesData = async () => {
            setLoadingPrices(true);
            try {
                const [pricesRes, configRes] = await Promise.all([
                    fetch("/api/admin/config/prices"),
                    fetch("/api/admin/config/global")
                ]);

                if (pricesRes.ok) {
                    const data = await pricesRes.json();
                    setPrices(data);
                }

                if (configRes.ok) {
                    const configs = await configRes.json();
                    const nbuConfig = configs.find((c: any) => c.key === "NBU_VALUE");
                    const validityConfig = configs.find((c: any) => c.key === "VIGENCIA");
                    if (nbuConfig) setNbuValue(parseFloat(nbuConfig.value));
                    if (validityConfig) setValidity(validityConfig.value);
                }
            } catch (error) {
                console.error("Error fetching prices:", error);
            } finally {
                setLoadingPrices(false);
            }
        };

        fetchPricesData();
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="pt-24 pb-12">
                <div className="max-w-4xl mx-auto px-6">
                    <Link
                        href="/derivaciones"
                        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-primary-burgundy transition-colors mb-6"
                    >
                        <ArrowLeft size={14} />
                        Volver a Derivaciones
                    </Link>

                    <div className="space-y-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-100 pb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-orange-50 text-orange-400 rounded-2xl flex items-center justify-center shadow-inner shrink-0">
                                    <DollarSign size={24} />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Lista de Precios</h1>
                                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                                        NBU actual: <span className="text-primary-green">$ {nbuValue}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="max-w-xs w-full relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Buscar estudio..."
                                    value={priceSearch}
                                    onChange={(e) => setPriceSearch(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-[#68d378] transition-all text-xs font-bold text-gray-800"
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50/50 border-b border-gray-100">
                                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-left">Análisis</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-center bg-green-50 text-primary-green">Precio ($)</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Vigencia</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {loadingPrices ? (
                                            <tr>
                                                <td colSpan={3} className="px-8 py-20 text-center">
                                                    <div className="flex flex-col items-center gap-4 animate-pulse">
                                                        <div className="w-8 h-8 border-4 border-primary-green border-t-transparent rounded-full animate-spin" />
                                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Cargando valores...</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : prices.filter(p => p.name.toLowerCase().includes(priceSearch.toLowerCase())).length === 0 ? (
                                            <tr>
                                                <td colSpan={3} className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs italic">
                                                    No se encontraron resultados
                                                </td>
                                            </tr>
                                        ) : (
                                            prices
                                                .filter(p => p.name.toLowerCase().includes(priceSearch.toLowerCase()))
                                                .map((item) => (
                                                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                                                        <td className="px-8 py-6 font-black text-gray-800 tracking-tight uppercase text-sm">
                                                            {item.name}
                                                        </td>
                                                        <td className="px-8 py-6 text-center font-black text-gray-900 bg-green-50/30">
                                                            $ {(item.nbuUnits * nbuValue).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                        </td>
                                                        <td className="px-8 py-6 text-right text-[10px] font-bold text-gray-400 uppercase">
                                                            {validity}
                                                        </td>
                                                    </tr>
                                                ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-4 pt-8">
                            <button className="bg-gray-900 text-white px-10 py-5 rounded-2xl font-black text-xs tracking-[0.2em] uppercase shadow-xl hover:bg-black hover:scale-105 transition-all flex items-center gap-3">
                                <FileText size={18} />
                                Descargar Lista PDF
                            </button>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                El valor total puede variar según convenios específicos.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
