"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
    const { data: session, status } = useSession();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/admin/dashboard");
        }
    }, [status, router, session]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError(true);
                setTimeout(() => setError(false), 3000);
            } else {
                router.push("/admin/dashboard");
                router.refresh();
            }
        } catch (err) {
            console.error(err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FFF5F2] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Decorative Orbs */}
            <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary-green/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary-burgundy/5 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="bg-white rounded-3xl shadow-2xl border border-orange-100 overflow-hidden">
                    {/* Header */}
                    <div className="bg-primary-burgundy p-8 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/10" />

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="relative z-10 inline-flex items-center justify-center bg-white/20 p-4 rounded-2xl backdrop-blur-md mb-4"
                        >
                            <ShieldCheck className="text-white" size={32} />
                        </motion.div>
                        <h1 className="text-white text-2xl font-black uppercase tracking-widest relative z-10">
                            Admin Access
                        </h1>
                        <p className="text-white/60 text-xs font-bold uppercase tracking-[0.2em] mt-2 relative z-10">
                            LB Lab Management Portal
                        </p>
                    </div>

                    {/* Form */}
                    <div className="p-10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-red-50 text-red-500 text-[10px] font-bold uppercase tracking-widest p-3 rounded-xl text-center border border-red-100"
                                >
                                    Credenciales incorrectas
                                </motion.div>
                            )}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                                    Correo Electrónico
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-green transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:bg-white focus:border-primary-green outline-none transition-all placeholder:text-gray-300"
                                        placeholder="admin@lblab.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                                    Contraseña
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-burgundy transition-colors">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:bg-white focus:border-primary-burgundy outline-none transition-all placeholder:text-gray-300"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary-burgundy focus:ring-primary-burgundy" />
                                    <span className="text-xs text-gray-500 font-medium">Recordarme</span>
                                </label>
                                <a href="#" className="text-xs text-primary-burgundy font-bold hover:underline">
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Ingresando..." : "Ingresar al Panel"}
                                {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                            </motion.button>
                        </form>

                        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                    Powered by
                                </span>
                                <a href="https://itia.ar/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black text-primary-green uppercase tracking-widest hover:underline">
                                    ITIA.AR
                                </a>
                            </div>
                        </div>
                    </div>
                </div>


            </motion.div>
        </div>
    );
}
