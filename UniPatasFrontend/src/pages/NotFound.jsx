import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button.jsx';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 rounded-[2rem] border border-slate-200 bg-slate-50 p-10 text-center shadow-soft dark:border-slate-800 dark:bg-slate-950">
            <p className="text-7xl font-bold text-brand">404</p>
            <div>
                <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">Página não encontrada</h2>
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">O link que você tentou acessar não existe ou foi removido.</p>
            </div>
            <Button onClick={() => navigate('/dashboard')}>Voltar ao painel</Button>
        </div>
    );
}
