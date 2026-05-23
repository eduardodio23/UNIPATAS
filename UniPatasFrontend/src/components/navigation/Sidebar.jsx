import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import {
    BarChart3,
    Package,
    Home,
    Tag,
    Truck,
    Users,
    PawPrint,
    ArrowDownCircle,
    ArrowUpCircle,
    Wallet,
    Settings,
    Sparkles
} from 'lucide-react';
import { useUIStore } from '@/store/uiStore.js';

const menuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: Home },
    { label: 'Estoque', path: '/estoque', icon: Package },
    { label: 'Produtos', path: '/produtos', icon: Tag },
    { label: 'Categorias', path: '/categorias', icon: Sparkles },
    { label: 'Fornecedores', path: '/fornecedores', icon: Truck },
    { label: 'Clientes', path: '/clientes', icon: Users },
    { label: 'Pets', path: '/pets', icon: PawPrint },
    { label: 'Entradas', path: '/entradas', icon: ArrowDownCircle },
    { label: 'Saídas', path: '/saidas', icon: ArrowUpCircle },
    { label: 'Relatórios', path: '/relatorios', icon: BarChart3 },
    { label: 'Financeiro', path: '/financeiro', icon: Wallet },
    { label: 'Configurações', path: '/configuracoes', icon: Settings }
];

export default function Sidebar() {
    const { sidebarCollapsed, toggleSidebar } = useUIStore();

    return (
        <aside
            className={`sticky top-0 z-20 h-screen min-h-screen border-r border-sky-100 bg-gradient-to-b from-sky-50 via-white to-blue-50 p-4 backdrop-blur-xl transition-all duration-300 dark:border-slate-800 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 ${sidebarCollapsed ? 'w-20' : 'w-72'
                }`}
            aria-label="Barra lateral de navegação"
        >
            <div className="flex h-full flex-col gap-6">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-white shadow-soft">
                            <Sparkles size={22} />
                        </div>
                        {!sidebarCollapsed && (
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                                    UniPatas
                                </p>
                                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                    Gestão pet premium
                                </p>
                            </div>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={toggleSidebar}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                        aria-label="Alternar sidebar"
                    >
                        <span className="text-xl">≡</span>
                    </button>
                </div>

                <nav className="flex flex-1 flex-col gap-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end
                                className={({ isActive }) =>
                                    `group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all duration-200 ${isActive
                                        ? 'bg-brand/10 text-brand shadow-soft dark:bg-brand/15 dark:text-brand'
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white'
                                    }`
                                }
                            >
                                <motion.span whileHover={{ x: 4, scale: 1.06 }} whileTap={{ scale: 0.96 }} className="icon-interactive text-inherit rounded-md p-1">
                                    <Icon size={18} />
                                </motion.span>
                                {!sidebarCollapsed && item.label}
                            </NavLink>
                        );
                    })}
                </nav>

                <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-4 text-sm dark:border-slate-800 dark:bg-slate-900">
                    {!sidebarCollapsed ? (
                        <>
                            <span className="block text-slate-500">Dica de gestão</span>
                            <p className="mt-2 text-slate-900 dark:text-slate-100">
                                Revise entradas e saídas semanalmente para evitar rupturas no estoque.
                            </p>
                        </>
                    ) : (
                        <span className="block text-center text-xs text-slate-500">Dica</span>
                    )}
                </div>
            </div>
        </aside>
    );
}
