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
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState(false);
    const [accessError, setAccessError] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/admin/dashboard");
        }

        // Handle AccessDenied from NextAuth Google Login
        if (typeof window !== "undefined") {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get("error") === "AccessDenied") {
                setAccessError(true);
                setTimeout(() => setAccessError(false), 5000);
                window.history.replaceState({}, document.title, window.location.pathname);
            }
        }
    }, [status, router, session]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Set rememberMe cookie to be picked up by NextAuth route handler
        if (rememberMe) {
            document.cookie = `rememberMe=true; path=/; max-age=${30 * 24 * 60 * 60}`; // 30 days
        } else {
            document.cookie = `rememberMe=; path=/; max-age=0`; // Delete
        }

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

    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            await signIn("google", { callbackUrl: "/admin/dashboard" });
        } catch (err) {
            console.error(err);
            setError(true);
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
                            {(error || accessError) && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-red-50 text-red-500 text-[10px] font-bold uppercase tracking-widest p-3 rounded-xl text-center border border-red-100"
                                >
                                    {accessError ? "Tu cuenta no existe o está inactiva" : "Credenciales incorrectas"}
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
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 rounded border-gray-300 text-primary-burgundy focus:ring-primary-burgundy"
                                    />
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

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500 text-[10px] font-bold uppercase tracking-widest">O continuar con</span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleGoogleSignIn}
                                    disabled={loading}
                                    type="button"
                                    className="w-full bg-white text-gray-700 border border-gray-200 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                                        <path
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            fill="#EA4335"
                                        />
                                    </svg>
                                    Google
                                </motion.button>
                            </div>
                        </div>

                    </div>
                </div>


            </motion.div>

            {/* Footer Text */}
            <div className="absolute bottom-4 right-6 pointer-events-none">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                    Hecho con <span className="text-primary-burgundy">♡</span> en{" "}
                    <a href="https://itia.ar/" target="_blank" rel="noopener noreferrer" className="pointer-events-auto text-primary-burgundy hover:underline">
                        itia.ar
                    </a>
                </span>
            </div>
        </div>
    );
}
