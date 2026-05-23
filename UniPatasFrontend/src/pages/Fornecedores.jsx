import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@/api.js';
import { supplierSchema } from '@/schemas/supplierSchema.js';
import { sanitizeFormValues } from '@/utils/sanitize.js';
import Button from '@/components/ui/Button.jsx';
import Card from '@/components/ui/Card.jsx';
import Input from '@/components/ui/Input.jsx';
import Select from '@/components/ui/Select.jsx';
import Loader from '@/components/ui/Loader.jsx';
import EmptyState from '@/components/ui/EmptyState.jsx';
import SearchBar from '@/components/ui/SearchBar.jsx';

export default function Fornecedores() {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');
    const [query, setQuery] = useState('');
    const [formOpen, setFormOpen] = useState(true);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(supplierSchema),
        defaultValues: { name: '', contact: '', email: '', status: 'Ativo' }
    });

    useEffect(() => {
        async function loadSuppliers() {
            setLoading(true);
            try {
                const response = await api.getFornecedores();
                setSuppliers(response);
            } catch (error) {
                setSuppliers([]);
            } finally {
                setLoading(false);
            }
        }

        loadSuppliers();
    }, []);

    const filteredSuppliers = useMemo(() => {
        const normalized = query.trim().toLowerCase();
        if (!normalized) return suppliers;

        return suppliers.filter((supplier) => {
            const terms = [supplier.nome, supplier.contato, supplier.email]
                .filter(Boolean)
                .map((value) => String(value).toLowerCase());
            return terms.some((value) => value.includes(normalized));
        });
    }, [suppliers, query]);

    const onSubmit = async (values) => {
        try {
            const sanitized = sanitizeFormValues(values);
            const created = await api.createFornecedor({
                nome: sanitized.name,
                contato: sanitized.contact,
                email: sanitized.email,
                status: sanitized.status
            });
            setSuppliers((prev) => [created, ...prev]);
            reset();
            setStatus('Fornecedor cadastrado com sucesso.');
        } catch (error) {
            setStatus('Não foi possível cadastrar o fornecedor.');
        }
    };

    return (
        <div className="space-y-8">
            <Card className="border-slate-200/80">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-brand">Fornecedores</p>
                        <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">Rede de parceiros</h2>
                        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                            Analise fornecedores e garanta entregas mais ágeis para manter o estoque abastecido.
                        </p>
                    </div>
                    <Button variant="secondary" onClick={() => setFormOpen((prev) => !prev)}>
                        {formOpen ? 'Ocultar formulário' : 'Adicionar fornecedor'}
                    </Button>
                </div>
            </Card>

            {formOpen && (
                <Card className="border-slate-200/80">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Cadastro de fornecedor</h3>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Registre parceiros confiáveis para abastecimento rápido e controle de entregas.
                    </p>

                    <form className="mt-6 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-4 md:grid-cols-3">
                            <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                                Nome do fornecedor
                                <Input placeholder="Beagle Distribuidora" {...register('name')} />
                                {errors.name && <span className="text-sm text-rose-500">{errors.name.message}</span>}
                            </label>
                            <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                                Contato
                                <Input placeholder="contato@beagle.com.br" {...register('contact')} />
                                {errors.contact && <span className="text-sm text-rose-500">{errors.contact.message}</span>}
                            </label>
                            <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                                Situação
                                <Select {...register('status')}>
                                    <option value="Ativo">Ativo</option>
                                    <option value="Atenção">Atenção</option>
                                </Select>
                                {errors.status && <span className="text-sm text-rose-500">{errors.status.message}</span>}
                            </label>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                                Email
                                <Input type="email" placeholder="vendas@beagle.com.br" {...register('email')} />
                                {errors.email && <span className="text-sm text-rose-500">{errors.email.message}</span>}
                            </label>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <Button type="submit">Salvar fornecedor</Button>
                            {status ? <p className="text-sm text-brand">{status}</p> : null}
                        </div>
                    </form>
                </Card>
            )}

            <Card className="border-slate-200/80">
                <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Fornecedores ativos</h3>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Busque parceiros por nome, contato ou email.</p>
                    </div>
                    <div className="max-w-sm w-full">
                        <SearchBar
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Buscar por fornecedor, contato ou email"
                        />
                    </div>
                </div>

                {loading ? (
                    <Loader />
                ) : filteredSuppliers.length === 0 ? (
                    <EmptyState title="Nenhum fornecedor encontrado" description="Tente outro termo ou adicione um novo parceiro." />
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredSuppliers.map((supplier) => (
                            <Card key={supplier.id} className="border-slate-200/80">
                                <p className="text-sm uppercase tracking-[0.22em] text-brand">{supplier.nome}</p>
                                <p className="mt-4 text-3xl font-semibold text-slate-900 dark:text-slate-100">{supplier.status}</p>
                                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{supplier.contato}</p>
                                {supplier.email ? <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{supplier.email}</p> : null}
                            </Card>
                        ))}
                    </div>
                )}
            </Card>

            <Card className="border-slate-200/80">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Fornecedores com entregas ágeis</h3>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredSuppliers.map((supplier) => (
                        <div key={supplier.id} className="rounded-[1.75rem] border border-slate-200 p-5 dark:border-slate-800">
                            <p className="text-sm uppercase tracking-[0.22em] text-brand">{supplier.nome}</p>
                            <p className="mt-4 text-3xl font-semibold text-slate-900 dark:text-slate-100">
                                {supplier.status === 'Ativo' ? 'Disponível' : 'Atenção'}
                            </p>
                            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{supplier.contato}</p>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
