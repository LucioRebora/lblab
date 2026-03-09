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
    ShieldCheck,
    Calendar,
    Upload
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/admin/Sidebar";

export default function UsersPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "USER",
        canAccessVeterinaria: false,
        canAccessDerivaciones: false,
        canAccessPRP: false
    });
    const [editingUser, setEditingUser] = useState<any | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState("");
    const [formSuccess, setFormSuccess] = useState(false);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin");
        } else if (status === "authenticated" && session?.user?.role !== 'ADMIN') {
            router.push("/admin/dashboard");
        }
    }, [status, router, session]);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormError("");
        setFormSuccess(false);

        try {
            const url = "/api/admin/users";
            const method = editingUser ? "PATCH" : "POST";
            const body = editingUser
                ? { id: editingUser.id, ...formData }
                : formData;

            // If editing and password is empty, don't send it
            if (editingUser && !formData.password) {
                delete (body as any).password;
            }

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                setFormSuccess(true);
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    role: "USER",
                    canAccessVeterinaria: false,
                    canAccessDerivaciones: false,
                    canAccessPRP: false
                });
                setEditingUser(null);
                fetchUsers();
                setTimeout(() => {
                    setIsModalOpen(false);
                    setFormSuccess(false);
                }, 1000);
            } else {
                const data = await response.json();
                setFormError(data.error || `Error al ${editingUser ? "actualizar" : "crear"} usuario`);
            }
        } catch (error) {
            setFormError("Error de conexión");
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleUserStatus = async (id: string, currentStatus: boolean) => {
        try {
            const response = await fetch("/api/admin/users", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, active: !currentStatus }),
            });

            if (response.ok) {
                fetchUsers();
            } else {
                alert("Error al cambiar el estado del usuario");
            }
        } catch (error) {
            console.error("Error toggling user status:", error);
        }
    };

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
            <Sidebar />

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
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="relative flex-grow md:flex-grow-0">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Buscar por nombre o email..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full md:w-64 bg-white border border-gray-100 rounded-xl py-3 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-primary-green outline-none shadow-sm transition-all"
                                />
                            </div>
                            <button
                                onClick={() => {
                                    setEditingUser(null);
                                    setFormData({
                                        name: "",
                                        email: "",
                                        password: "",
                                        role: "USER",
                                        canAccessVeterinaria: false,
                                        canAccessDerivaciones: false,
                                        canAccessPRP: false
                                    });
                                    setIsModalOpen(true);
                                }}
                                className="bg-primary-green text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary-green/20 hover:scale-105 transition-all flex items-center gap-2 whitespace-nowrap"
                            >
                                <UserPlus size={18} />
                                Nuevo Usuario
                            </button>
                        </div>
                    </div>

                    {/* Users Table */}
                    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Usuario</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Email</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Rol</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Estado</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Fecha de Alta</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-400 font-bold uppercase text-xs animate-pulse">
                                            Cargando usuarios...
                                        </td>
                                    </tr>
                                ) : filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-400 font-bold uppercase text-xs">
                                            No se encontraron usuarios
                                        </td>
                                    </tr>
                                ) : filteredUsers.map((user) => (
                                    <tr key={user.id} className={`hover:bg-gray-50 transition-colors ${user.active === false ? 'bg-gray-50/50' : ''}`}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${user.active !== false ? 'bg-gray-100 text-gray-400' : 'bg-red-50 text-red-300'}`}>
                                                    <UserIcon size={16} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className={`font-bold text-sm ${user.active === false ? 'text-gray-400 line-through' : ''}`}>
                                                        {user.name || "Sin nombre"}
                                                    </span>
                                                    {user.active === false && <span className="text-[9px] text-red-500 font-black uppercase">Usuario Suspendido</span>}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-500">{user.email}</td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-widest ${user.role === 'ADMIN'
                                                ? 'bg-primary-burgundy/10 text-primary-burgundy'
                                                : user.role === 'SECRETARY'
                                                    ? 'bg-amber-100 text-amber-600'
                                                    : 'bg-blue-100 text-blue-600'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-widest ${user.active !== false
                                                ? 'bg-green-100 text-primary-green'
                                                : 'bg-red-100 text-red-600'
                                                }`}>
                                                {user.active !== false ? 'Activo' : 'Inactivo'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => toggleUserStatus(user.id, user.active)}
                                                className={`px-3 py-1 font-bold text-[10px] uppercase tracking-widest rounded-lg transition-all ${user.active !== false
                                                    ? 'text-red-500 hover:bg-red-50 border border-red-100'
                                                    : 'text-primary-green hover:bg-green-50 border border-green-100'}`}
                                            >
                                                {user.active !== false ? 'Inactivar' : 'Activar'}
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setEditingUser(user);
                                                    setFormData({
                                                        name: user.name || "",
                                                        email: user.email || "",
                                                        password: "",
                                                        role: user.role || "USER",
                                                        canAccessVeterinaria: user.canAccessVeterinaria || false,
                                                        canAccessDerivaciones: user.canAccessDerivaciones || false,
                                                        canAccessPRP: user.canAccessPRP || false,
                                                    });
                                                    setIsModalOpen(true);
                                                }}
                                                className="text-gray-400 hover:text-gray-600 transition-colors px-2 py-1 font-bold text-[10px] uppercase tracking-widest"
                                            >
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
                            onClick={() => {
                                setIsModalOpen(false);
                                setEditingUser(null);
                            }}
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
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setEditingUser(null);
                                    }}
                                    className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                                <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 backdrop-blur-md">
                                    {editingUser ? <Settings size={32} /> : <UserPlus size={32} />}
                                </div>
                                <h3 className="text-xl font-black text-white uppercase tracking-tight">
                                    {editingUser ? "Editar Usuario" : "Nuevo Administrador"}
                                </h3>
                                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mt-1">
                                    {editingUser ? "Modificar accesos" : "Crear acceso al sistema"}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 space-y-4">
                                {formSuccess ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-green-50 text-primary-green p-8 rounded-3xl text-center flex flex-col items-center gap-4"
                                    >
                                        <CheckCircle2 size={48} />
                                        <div className="font-black uppercase tracking-widest text-sm">
                                            Usuario {editingUser ? "actualizado" : "creado"} con éxito
                                        </div>
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
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">
                                                Contraseña {editingUser && "(Dejar en blanco para no cambiar)"}
                                            </label>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <input
                                                    type="password"
                                                    required={!editingUser}
                                                    value={formData.password}
                                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                    placeholder={editingUser ? "•••••••• (Opcional)" : "••••••••"}
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
                                                    className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-10 text-sm font-bold focus:ring-2 focus:ring-primary-green outline-none text-black appearance-none cursor-pointer"
                                                >
                                                    <option value="USER">USUARIO (Accesos limitados)</option>
                                                    <option value="SECRETARY">SECRETARIA (Gestión operativa)</option>
                                                    <option value="ADMIN">ADMINISTRADOR (Acceso total)</option>
                                                </select>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                                </div>
                                            </div>
                                        </div>

                                        {formData.role === 'USER' && (
                                            <div className="bg-gray-50 p-6 rounded-3xl space-y-4">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-primary-burgundy block mb-2">Permisos de Acceso</label>

                                                <div className="flex items-center justify-between group cursor-pointer" onClick={() => setFormData({ ...formData, canAccessVeterinaria: !formData.canAccessVeterinaria })}>
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${formData.canAccessVeterinaria ? 'bg-primary-green text-white shadow-lg shadow-primary-green/20' : 'bg-white text-gray-400 border border-gray-100'}`}>
                                                            <Upload size={18} />
                                                        </div>
                                                        <span className="text-sm font-bold text-gray-700">Veterinarias</span>
                                                    </div>
                                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${formData.canAccessVeterinaria ? 'bg-primary-green border-primary-green' : 'border-gray-200'}`}>
                                                        {formData.canAccessVeterinaria && <CheckCircle2 size={14} className="text-white" />}
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between group cursor-pointer" onClick={() => setFormData({ ...formData, canAccessDerivaciones: !formData.canAccessDerivaciones })}>
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${formData.canAccessDerivaciones ? 'bg-primary-green text-white shadow-lg shadow-primary-green/20' : 'bg-white text-gray-400 border border-gray-100'}`}>
                                                            <Upload size={18} />
                                                        </div>
                                                        <span className="text-sm font-bold text-gray-700">Derivaciones</span>
                                                    </div>
                                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${formData.canAccessDerivaciones ? 'bg-primary-green border-primary-green' : 'border-gray-200'}`}>
                                                        {formData.canAccessDerivaciones && <CheckCircle2 size={14} className="text-white" />}
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between group cursor-pointer" onClick={() => setFormData({ ...formData, canAccessPRP: !formData.canAccessPRP })}>
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${formData.canAccessPRP ? 'bg-primary-green text-white shadow-lg shadow-primary-green/20' : 'bg-white text-gray-400 border border-gray-100'}`}>
                                                            <Calendar size={18} />
                                                        </div>
                                                        <span className="text-sm font-bold text-gray-700">Turnos PRP</span>
                                                    </div>
                                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${formData.canAccessPRP ? 'bg-primary-green border-primary-green' : 'border-gray-200'}`}>
                                                        {formData.canAccessPRP && <CheckCircle2 size={14} className="text-white" />}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {formError && (
                                            <div className="text-red-500 text-[10px] font-black uppercase tracking-widest text-center animate-shake">
                                                {formError}
                                            </div>
                                        )}

                                        <button
                                            disabled={isSubmitting}
                                            className="w-full bg-primary-green text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary-green/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
                                        >
                                            {isSubmitting ? (
                                                <Loader2 className="animate-spin" size={18} />
                                            ) : (
                                                editingUser ? "Guardar Cambios" : "Crear Usuario"
                                            )}
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
