"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import {
    FileText,
    Search,
    Plus,
    Trash2,
    Edit2,
    Save,
    X,
    ChevronRight,
    DollarSign,
    Activity,
    Calendar as CalendarIcon,
    AlertCircle,
    Dog
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AnalysisPrice {
    id: string;
    name: string;
    nbuUnits: number;
    category: string;
}

export default function PreciosVeterinariasPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [prices, setPrices] = useState<AnalysisPrice[]>([]);
    const [nbuValue, setNbuValue] = useState<number>(1);
    const [validity, setValidity] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [isSavingNbu, setIsSavingNbu] = useState(false);
    const [isSavingValidity, setIsSavingValidity] = useState(false);

    // Form state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<AnalysisPrice | null>(null);
    const [formData, setFormData] = useState({ name: "", nbuUnits: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin");
        }
    }, [status, router]);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch Prices for Veterinarias
            const pricesRes = await fetch("/api/admin/config/prices?category=VETERINARIA");
            if (pricesRes.ok) {
                const data = await pricesRes.json();
                setPrices(data);
            }

            // Fetch Global Config for Veterinarias
            const configRes = await fetch("/api/admin/config/global");
            if (configRes.ok) {
                const configs = await configRes.json();
                const nbuConfig = configs.find((c: any) => c.key === "NBU_VALUE_VET");
                const validityConfig = configs.find((c: any) => c.key === "VIGENCIA_VET");

                // Defaults if not found
                if (nbuConfig) setNbuValue(parseFloat(nbuConfig.value));
                else setNbuValue(500); // Default placeholder

                if (validityConfig) setValidity(validityConfig.value);
                else setValidity("A definir"); // Default placeholder
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (session) fetchData();
    }, [session]);

    const handleSaveGlobal = async (key: string, value: string) => {
        if (key === "NBU_VALUE_VET") setIsSavingNbu(true);
        else setIsSavingValidity(true);

        try {
            const res = await fetch("/api/admin/config/global", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ key, value })
            });
            if (!res.ok) alert("Error al guardar configuración");
        } catch (error) {
            console.error(error);
        } finally {
            setIsSavingNbu(false);
            setIsSavingValidity(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const url = "/api/admin/config/prices";
            const method = editingItem ? "PATCH" : "POST";
            const body = editingItem
                ? { ...formData, id: editingItem.id, category: "VETERINARIA" }
                : { ...formData, category: "VETERINARIA" };

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (res.ok) {
                setIsModalOpen(false);
                setEditingItem(null);
                setFormData({ name: "", nbuUnits: "" });
                fetchData();
            } else {
                const data = await res.json();
                alert(data.error || "Error al guardar el item");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`¿Estás seguro de eliminar "${name}"?`)) return;
        try {
            const res = await fetch(`/api/admin/config/prices?id=${id}`, { method: "DELETE" });
            if (res.ok) fetchData();
        } catch (error) {
            console.error(error);
        }
    };

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center font-black uppercase tracking-widest text-primary-burgundy animate-pulse">
                Cargando...
            </div>
        );
    }

    if (!session) return null;

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />

            <main className="flex-grow overflow-y-auto font-sans">
                <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
                    <div className="relative w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Buscar análisis veterinario..."
                            className="w-full bg-gray-50 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary-green outline-none text-black"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-gray-900">{session.user?.name}</p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none text-black">Admin</p>
                            </div>
                            <div className="w-10 h-10 bg-primary-green rounded-full flex items-center justify-center text-white font-bold text-sm shadow-inner uppercase">
                                {session.user?.name?.substring(0, 2)}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-8 space-y-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="flex items-center gap-3">
                                <Dog className="text-primary-green" size={24} />
                                <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Lista Precios Veterinarias</h1>
                            </div>
                            <p className="text-gray-500 text-sm font-medium">Gestión de valores para estudios veterinarios.</p>
                        </div>
                        <button
                            onClick={() => {
                                setEditingItem(null);
                                setFormData({ name: "", nbuUnits: "" });
                                setIsModalOpen(true);
                            }}
                            className="bg-primary-green text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-green-200 hover:scale-105 transition-all flex items-center gap-2"
                        >
                            <Plus size={18} />
                            Nuevo Análisis Vet
                        </button>
                    </div>

                    {/* Global Config Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-4">
                            <div className="flex items-center gap-3 text-primary-green">
                                <Activity size={20} />
                                <h3 className="font-black text-xs uppercase tracking-widest">Valor NBU Veterinario</h3>
                            </div>
                            <div className="flex gap-4">
                                <div className="relative flex-grow">
                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input
                                        type="number"
                                        value={nbuValue}
                                        onChange={(e) => setNbuValue(parseFloat(e.target.value))}
                                        className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-10 pr-4 text-lg font-black text-gray-800 focus:ring-2 focus:ring-primary-green outline-none"
                                    />
                                </div>
                                <button
                                    onClick={() => handleSaveGlobal("NBU_VALUE_VET", nbuValue.toString())}
                                    disabled={isSavingNbu}
                                    className="bg-primary-green text-white px-6 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-green-600 transition-all disabled:opacity-50"
                                >
                                    {isSavingNbu ? "..." : "Actualizar"}
                                </button>
                            </div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest pl-2">
                                Este valor se utiliza para calcular el precio final ($) de los análisis veterinarios.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-4">
                            <div className="flex items-center gap-3 text-blue-500">
                                <CalendarIcon size={20} />
                                <h3 className="font-black text-xs uppercase tracking-widest">Vigencia Vet</h3>
                            </div>
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    value={validity}
                                    onChange={(e) => setValidity(e.target.value)}
                                    placeholder="Ej: Marzo 2026"
                                    className="flex-grow bg-gray-50 border-none rounded-2xl py-3 px-6 text-lg font-black text-gray-800 focus:ring-2 focus:ring-blue-400 outline-none"
                                />
                                <button
                                    onClick={() => handleSaveGlobal("VIGENCIA_VET", validity)}
                                    disabled={isSavingValidity}
                                    className="bg-blue-500 text-white px-6 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-blue-600 transition-all disabled:opacity-50"
                                >
                                    {isSavingValidity ? "..." : "Actualizar"}
                                </button>
                            </div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest pl-2">
                                Fecha informativa para la lista de precios veterinaria.
                            </p>
                        </div>
                    </div>

                    {/* Prices Table */}
                    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden text-black">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-100">
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-left">Análisis Veterinario</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-center">Cant. NBU</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-center bg-green-50 text-primary-green">Precio ($)</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-center">Vigencia</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {prices.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs italic">
                                                {searchQuery ? "No se encontraron análisis veterinarios." : "No hay análisis veterinarios cargados."}
                                            </td>
                                        </tr>
                                    ) : (
                                        prices
                                            .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                            .map((item) => (
                                                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                                                    <td className="px-8 py-4 font-black text-gray-800 tracking-tight uppercase text-sm">
                                                        {item.name}
                                                    </td>
                                                    <td className="px-8 py-4 text-center font-bold text-gray-500">
                                                        {item.nbuUnits}
                                                    </td>
                                                    <td className="px-8 py-4 text-center font-black text-gray-900 bg-green-50/30">
                                                        $ {(item.nbuUnits * nbuValue).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </td>
                                                    <td className="px-8 py-4 text-center text-[10px] font-bold text-gray-400 uppercase">
                                                        {validity}
                                                    </td>
                                                    <td className="px-8 py-4 text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <button
                                                                onClick={() => {
                                                                    setEditingItem(item);
                                                                    setFormData({ name: item.name, nbuUnits: item.nbuUnits.toString() });
                                                                    setIsModalOpen(true);
                                                                }}
                                                                className="p-2 text-gray-300 hover:text-blue-500 rounded-lg transition-all"
                                                            >
                                                                <Edit2 size={16} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(item.id, item.name)}
                                                                className="p-2 text-gray-300 hover:text-red-500 rounded-lg transition-all"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>

            {/* Modal Form */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden"
                        >
                            <div className="bg-primary-green p-8 text-center relative border-b border-white/10">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                                <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 backdrop-blur-md">
                                    <Dog size={32} />
                                </div>
                                <h3 className="text-xl font-black text-white uppercase tracking-tight">
                                    {editingItem ? "Editar Análisis Vet" : "Nuevo Análisis Veterinario"}
                                </h3>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Nombre del Análisis</label>
                                    <input
                                        required
                                        autoFocus
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-primary-green outline-none text-black uppercase"
                                        placeholder="Ej: HEMOGRAMA VETERINARIO"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Unidades NBU</label>
                                    <input
                                        required
                                        type="number"
                                        step="0.01"
                                        value={formData.nbuUnits}
                                        onChange={(e) => setFormData({ ...formData, nbuUnits: e.target.value })}
                                        className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-primary-green outline-none text-black"
                                        placeholder="Ej: 15"
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 bg-gray-100 text-gray-400 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-all"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-[2] bg-primary-green text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-green-200 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        <Save size={16} />
                                        {isSubmitting ? "Guardando..." : "Guardar Cambios"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
