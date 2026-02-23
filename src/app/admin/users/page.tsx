"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    Settings,
    BarChart3,
    MessageSquare,
    Bell,
    LogOut,
    Search,
    Plus,
    X,
    UserPlus,
    Mail,
    Lock,
    User as UserIcon,
    ExternalLink,
    Loader2,
    CheckCircle2,
    ShieldCheck
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function UsersPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form state
    const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "USER" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState("");
    const [formSuccess, setFormSuccess] = useState(false);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin");
        }
    }, [status, router]);

    const fetchUsers = async () => {
        try {
            const response = await fetch("/api/admin/users");
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (session) {
            fetchUsers();
        }
    }, [session]);

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormError("");
        setFormSuccess(false);

        try {
            const response = await fetch("/api/admin/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormSuccess(true);
                setFormData({ name: "", email: "", password: "", role: "USER" });
                fetchUsers();
                setTimeout(() => {
                    setIsModalOpen(false);
                    setFormSuccess(false);
                }, 2000);
            } else {
                const data = await response.json();
                setFormError(data.error || "Error al crear usuario");
            }
        } catch (error) {
            setFormError("Error de conexión");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center font-black uppercase tracking-widest text-primary-burgundy animate-pulse">
                Cargando Panel...
            </div>
        );
    }

    if (!session) return null;

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-black text-primary-burgundy uppercase tracking-tighter">
                        LB Lab <span className="text-gray-400 font-light">Admin</span>
                    </h2>
                </div>

                <nav className="flex-grow p-4 space-y-2">
                    <Link href="/admin/dashboard" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-100 transition-all">
                        <BarChart3 size={18} />
                        Dashboard
                    </Link>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-100 transition-all">
                        <MessageSquare size={18} />
                        Consultas
                    </button>
                    <Link href="/admin/users" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold bg-primary-burgundy text-white shadow-lg shadow-primary-burgundy/20 transition-all">
                        <Users size={18} />
                        Usuarios
                    </Link>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-100 transition-all">
                        <Settings size={18} />
                        Configuración
                    </button>

                    <div className="pt-4 mt-4 border-t border-gray-100">
                        <Link href="/" target="_blank" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-primary-green hover:bg-green-50 transition-all group">
                            <ExternalLink size={18} className="group-hover:scale-110 transition-transform" />
                            Ver sitio web
                        </Link>
                    </div>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button onClick={() => signOut({ callbackUrl: "/admin" })} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all">
                        <LogOut size={18} />
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow overflow-y-auto">
                <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
                    <h1 className="text-lg font-black text-gray-900 uppercase tracking-tight">Gestión de Usuarios</h1>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl">
                            <div className="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center text-white font-bold text-xs uppercase">
                                {session.user?.name?.substring(0, 2)}
                            </div>
                            <p className="text-sm font-bold text-gray-900">{session.user?.name}</p>
                        </div>
                    </div>
                </header>

                <div className="p-8 space-y-8 text-black">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Usuarios</h2>
                            <p className="text-gray-500 text-sm font-medium">Administra quienes tienen acceso al panel.</p>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-primary-green text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary-green/20 hover:scale-105 transition-all flex items-center gap-2"
                        >
                            <UserPlus size={18} />
                            Nuevo Usuario
                        </button>
                    </div>

                    {/* Users Table */}
                    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Usuario</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Email</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Rol</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Fecha de Alta</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-400 font-bold uppercase text-xs animate-pulse">
                                            Cargando usuarios...
                                        </td>
                                    </tr>
                                ) : users.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                                                    <UserIcon size={16} />
                                                </div>
                                                <span className="font-bold text-sm">{user.name || "Sin nombre"}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-500">{user.email}</td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-widest ${user.role === 'ADMIN'
                                                ? 'bg-primary-burgundy/10 text-primary-burgundy'
                                                : 'bg-blue-100 text-blue-600'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-gray-400 hover:text-primary-burgundy transition-colors px-2 py-1 font-bold text-[10px] uppercase tracking-widest">
                                                Editar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Create User Modal */}
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
                            className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden"
                        >
                            <div className="bg-primary-burgundy p-8 text-center relative">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                                <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 backdrop-blur-md">
                                    <UserPlus size={32} />
                                </div>
                                <h3 className="text-xl font-black text-white uppercase tracking-tight">Nuevo Administrador</h3>
                                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mt-1">Crear acceso al sistema</p>
                            </div>

                            <form onSubmit={handleCreateUser} className="p-8 space-y-4">
                                {formSuccess ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-green-50 text-primary-green p-8 rounded-3xl text-center flex flex-col items-center gap-4"
                                    >
                                        <CheckCircle2 size={48} />
                                        <div className="font-black uppercase tracking-widest text-sm">Usuario creado con éxito</div>
                                    </motion.div>
                                ) : (
                                    <>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Nombre Completo</label>
                                            <div className="relative">
                                                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder="Ej: Juan Pérez"
                                                    className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-primary-green outline-none text-black"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1 text-black">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Email</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <input
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    placeholder="nombre@lblab.com"
                                                    className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-primary-green outline-none text-black"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Contraseña</label>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <input
                                                    type="password"
                                                    required
                                                    value={formData.password}
                                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                    placeholder="••••••••"
                                                    className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-primary-green outline-none text-black"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Rol del Usuario</label>
                                            <div className="relative">
                                                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <select
                                                    value={formData.role}
                                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                                    className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-primary-green outline-none text-black appearance-none"
                                                >
                                                    <option value="USER">USUARIO (Solo lectura)</option>
                                                    <option value="ADMIN">ADMINISTRADOR (Acceso total)</option>
                                                </select>
                                            </div>
                                        </div>

                                        {formError && (
                                            <div className="text-red-500 text-[10px] font-black uppercase tracking-widest text-center animate-shake">
                                                {formError}
                                            </div>
                                        )}

                                        <button
                                            disabled={isSubmitting}
                                            className="w-full bg-primary-green text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary-green/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
                                        >
                                            {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : "Crear Usuario"}
                                        </button>
                                    </>
                                )}
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
