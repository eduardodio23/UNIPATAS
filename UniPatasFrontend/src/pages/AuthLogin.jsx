import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/schemas/authSchema.js';
import { useAuth } from '@/context/AuthContext.jsx';
import Button from '@/components/ui/Button.jsx';
import Input from '@/components/ui/Input.jsx';

export default function Login() {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: zodResolver(loginSchema) });

    const onSubmit = (values) => {
        if (login(values)) {
            navigate('/dashboard', { replace: true });
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6 py-16 text-white">
            <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-slate-950/90 p-10 shadow-soft">
                <div className="mb-8 rounded-[1.75rem] border border-slate-800 bg-slate-900/80 p-8 text-center">
                    <p className="text-sm uppercase tracking-[0.28em] text-teal-400">UniPatas SaaS</p>
                    <h1 className="mt-4 text-3xl font-semibold">Acesse seu painel de estoque</h1>
                    <p className="mt-3 text-sm text-slate-400">Conecte-se para gerenciar estoque, vendas e clientes com uma interface premium.</p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-200">Email</label>
                        <Input type="email" placeholder="admin@unipatas.com" {...register('email')} />
                        {errors.email ? <p className="mt-2 text-sm text-rose-400">{errors.email.message}</p> : null}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-200">Senha</label>
                        <Input type="password" placeholder="••••••••" {...register('password')} />
                        {errors.password ? <p className="mt-2 text-sm text-rose-400">{errors.password.message}</p> : null}
                    </div>

                    <Button type="submit" className="w-full">Entrar no sistema</Button>
                </form>

                <div className="mt-6 rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-400">
                    <p>Use <strong>admin@unipatas.com</strong> e <strong>unipatas123</strong> para acessar.</p>
                </div>
            </div>
        </div>
    );
}
