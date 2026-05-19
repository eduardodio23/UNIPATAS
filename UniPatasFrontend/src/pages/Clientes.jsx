import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@/api.js';
import { customerSchema } from '@/schemas/customerSchema.js';
import Button from '@/components/ui/Button.jsx';
import Card from '@/components/ui/Card.jsx';
import Input from '@/components/ui/Input.jsx';
import Loader from '@/components/ui/Loader.jsx';
import EmptyState from '@/components/ui/EmptyState.jsx';

export default function Clientes() {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({ resolver: zodResolver(customerSchema) });

    useEffect(() => {
        async function loadClients() {
            setLoading(true);
            try {
                const response = await api.getClientes();
                setClients(response);
            } catch (error) {
                setClients([]);
            } finally {
                setLoading(false);
            }
        }

        loadClients();
    }, []);

    const onSubmit = async (values) => {
        try {
            const created = await api.createCliente({ nome: values.name, email: values.email, telefone: values.phone, endereco: values.address });
            setClients((prev) => [created, ...prev]);
            reset();
            setStatus('Cliente adicionado com sucesso.');
        } catch (error) {
            setStatus('Não foi possível cadastrar o cliente.');
        }
    };

    return (
        <div className="space-y-8">
            <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
                <Card className="border-slate-200/80">
                    <div className="mb-5">
                        <span className="inline-flex rounded-full bg-brand/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-brand">
                            Clientes / Tutores
                        </span>
                        <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-slate-100">Cadastro e CRM</h2>
                        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                            Gerencie tutores e mantenha os dados de contato e histórico de atendimento centralizados.
                        </p>
                    </div>

                    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-4 md:grid-cols-2">
                            <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                                Nome
                                <Input placeholder="Nome do cliente" {...register('name')} />
                                {errors.name && <span className="text-sm text-rose-500">{errors.name.message}</span>}
                            </label>
                            <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                                Email
                                <Input type="email" placeholder="email@dominio.com" {...register('email')} />
                                {errors.email && <span className="text-sm text-rose-500">{errors.email.message}</span>}
                            </label>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                                Telefone
                                <Input placeholder="(11) 99999-9999" {...register('phone')} />
                                {errors.phone && <span className="text-sm text-rose-500">{errors.phone.message}</span>}
                            </label>
                            <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                                Endereço
                                <Input placeholder="Rua das Petúnia, 123" {...register('address')} />
                                {errors.address && <span className="text-sm text-rose-500">{errors.address.message}</span>}
                            </label>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button type="submit">Salvar cliente</Button>
                            {status ? <p className="text-sm text-brand">{status}</p> : null}
                        </div>
                    </form>
                </Card>

                <Card className="border-slate-200/80 bg-brand/5 dark:bg-brand/10">
                    <div className="space-y-5">
                        <div>
                            <p className="text-sm uppercase tracking-[0.22em] text-brand">Resumo</p>
                            <h3 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">{clients.length}</h3>
                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">clientes cadastrados</p>
                        </div>
                        <div className="grid gap-4 rounded-[1.75rem] bg-white p-5 dark:bg-slate-950">
                            <p className="text-sm text-slate-500 dark:text-slate-400">Cliente mais recente</p>
                            <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">{clients[0]?.nome ?? 'Nenhum cliente'}</p>
                        </div>
                    </div>
                </Card>
            </div>

            <Card className="border-slate-200/80">
                <div className="mb-5 flex items-center justify-between gap-4">
                    <div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Lista de clientes</h3>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Visualize os dados rapidamente e prepare atendimentos à distância.</p>
                    </div>
                </div>

                {loading ? (
                    <Loader />
                ) : clients.length === 0 ? (
                    <EmptyState title="Nenhum cliente encontrado" description="Adicione clientes para começar a operar seu petshop." />
                ) : (
                    <div className="overflow-x-auto rounded-[2rem] border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
                        <table className="min-w-full text-left text-sm text-slate-700 dark:text-slate-200">
                            <thead className="bg-slate-100 uppercase tracking-[0.22em] text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                                <tr>
                                    <th className="px-6 py-4">Nome</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Telefone</th>
                                    <th className="px-6 py-4">Endereço</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients.map((client) => (
                                    <tr key={client.id} className="border-t border-slate-200 hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-900">
                                        <td className="px-6 py-5 font-semibold text-slate-900 dark:text-slate-100">{client.nome}</td>
                                        <td className="px-6 py-5">{client.email || '-'}</td>
                                        <td className="px-6 py-5">{client.telefone || '-'}</td>
                                        <td className="px-6 py-5">{client.endereco || '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>
        </div>
    );
}
