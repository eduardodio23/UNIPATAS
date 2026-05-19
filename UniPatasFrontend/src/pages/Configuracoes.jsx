import { useMemo } from 'react';
import Card from '@/components/ui/Card.jsx';
import Button from '@/components/ui/Button.jsx';
import { useUIStore } from '@/store/uiStore.js';
import { useAuth } from '@/context/AuthContext.jsx';

export default function Configuracoes() {
    const { theme, toggleTheme } = useUIStore();
    const { user, logout } = useAuth();

    const themeLabel = useMemo(() => (theme === 'light' ? 'Claro' : 'Escuro'), [theme]);

    return (
        <div className="space-y-8">
            <Card className="border-slate-200/80">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-brand">Configurações</p>
                        <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">Personalize sua experiência</h2>
                        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                            Ajuste temas, preferências e informações da conta para administrar o petshop de modo inteligente.
                        </p>
                    </div>
                    <Button variant="secondary" onClick={logout}>Encerrar sessão</Button>
                </div>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border-slate-200/80">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Preferências de visual</h3>
                    <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Escolha um tema que combine com seu ambiente de gestão.</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Button variant={theme === 'light' ? 'primary' : 'secondary'} onClick={toggleTheme}>{theme === 'light' ? 'Tema claro ativo' : 'Ativar tema escuro'}</Button>
                    </div>
                </Card>

                <Card className="border-slate-200/80">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Conta</h3>
                    <div className="mt-5 space-y-4 text-sm text-slate-500 dark:text-slate-400">
                        <div className="rounded-[1.75rem] bg-slate-50 p-5 dark:bg-slate-950">
                            <p className="font-semibold text-slate-900 dark:text-slate-100">Usuário</p>
                            <p className="mt-2">{user?.name}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{user?.email}</p>
                        </div>
                        <div className="rounded-[1.75rem] bg-slate-50 p-5 dark:bg-slate-950">
                            <p className="font-semibold text-slate-900 dark:text-slate-100">Tema</p>
                            <p className="mt-2">{themeLabel}</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
