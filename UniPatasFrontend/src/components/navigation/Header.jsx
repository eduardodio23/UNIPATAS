import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bell, Moon, SunMedium, LogOut, Search } from 'lucide-react';
import { useUIStore } from '@/store/uiStore.js';
import { useAuth } from '@/context/AuthContext.jsx';

const pageTitles = {
    '/dashboard': 'Dashboard',
    '/estoque': 'Estoque',
    '/produtos': 'Produtos',
    '/categorias': 'Categorias',
    '/fornecedores': 'Fornecedores',
    '/clientes': 'Clientes',
    '/pets': 'Pets cadastrados',
    '/entradas': 'Entradas de estoque',
    '/saidas': 'Saídas / Vendas',
    '/relatorios': 'Relatórios',
    '/financeiro': 'Financeiro',
    '/configuracoes': 'Configurações'
};

export default function Header() {
    const { theme, toggleTheme } = useUIStore();
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const title = useMemo(() => pageTitles[location.pathname] || 'UniPatas', [location.pathname]);

    return (
        <header className="flex flex-col gap-4 px-6 pb-5 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Gestão de estoque</p>
                <h1 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">{title}</h1>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                    type="button"
                    onClick={toggleTheme}
                    className="inline-flex items-center gap-2 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm font-semibold text-sky-700 shadow-sm transition hover:border-sky-300 hover:bg-sky-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-sky-400 dark:hover:bg-slate-800"
                >
                    <span className="icon-interactive">
                        {theme === 'light' ? <Moon size={18} /> : <SunMedium size={18} />}
                    </span>
                    {theme === 'light' ? 'Dark mode' : 'Light mode'}
                </button>

                <button
                    type="button"
                    onClick={() => navigate('/dashboard')}
                    className="inline-flex items-center gap-2 rounded-2xl border border-sky-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-sky-300 hover:bg-sky-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-sky-400 dark:hover:bg-slate-900"
                >
                    <span className="icon-interactive">
                        <Bell size={18} />
                    </span>
                    Notificações
                </button>

                <button
                    type="button"
                    onClick={logout}
                    className="inline-flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 transition hover:bg-red-100 dark:border-red-500/20 dark:bg-red-950/80 dark:text-red-300"
                >
                    <span className="icon-interactive">
                        <LogOut size={18} />
                    </span>
                    Sair
                </button>
            </div>
        </header>
    );
}
