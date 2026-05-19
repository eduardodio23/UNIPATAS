import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@/api.js';
import { z } from 'zod';
import Button from '@/components/ui/Button.jsx';
import Card from '@/components/ui/Card.jsx';
import Select from '@/components/ui/Select.jsx';
import Input from '@/components/ui/Input.jsx';
import Loader from '@/components/ui/Loader.jsx';
import EmptyState from '@/components/ui/EmptyState.jsx';

const saleSchema = z.object({
    productId: z.number().positive('Selecione um produto'),
    quantity: z.number().int().positive('Quantidade deve ser maior que zero'),
    reason: z.string().min(3, 'Motivo obrigatório')
});

export default function Saidas() {
    const [products, setProducts] = useState([]);
    const [movements, setMovements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({ resolver: zodResolver(saleSchema), defaultValues: { productId: 0, quantity: 1, reason: '' } });

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            try {
                const [productList, stockMovements] = await Promise.all([api.getProdutos(), api.getMovimentacoes()]);
                setProducts(productList);
                setMovements(stockMovements.filter((item) => item.tipo === 'saida').slice(0, 8));
            } catch (error) {
                setProducts([]);
                setMovements([]);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const onSubmit = async (values) => {
        try {
            await api.stockSaida({ produto_id: values.productId, quantidade: values.quantity, motivo: values.reason });
            setStatus('Saída registrada com sucesso.');
            reset();
        } catch (error) {
            setStatus('Erro ao registrar a saída.');
        }
    };

    return (
        <div className="space-y-8">
            <Card className="border-slate-200/80">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-brand">Saídas / Vendas</p>
                        <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">Registrar saída de produtos</h2>
                        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                            Automatize as baixas de estoque durante vendas e acompanhe as movimentações recentes em tempo real.
                        </p>
                    </div>
                    <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                        <p className="text-sm uppercase tracking-[0.22em] text-slate-500">Dica</p>
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Utilize o campo motivo para vincular saídas a vendas ou descarte.</p>
                    </div>
                </div>
            </Card>

            <Card className="grid gap-6 lg:grid-cols-[1fr_0.9fr] border-slate-200/80">
                <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4">
                        <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                            Produto
                            <Select {...register('productId')}>
                                <option value={0}>Selecione</option>
                                {products.map((product) => (
                                    <option key={product.id} value={product.id}>{product.nome}</option>
                                ))}
                            </Select>
                            {errors.productId && <span className="text-sm text-rose-500">{errors.productId.message}</span>}
                        </label>
                        <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                            Quantidade
                            <Input type="number" min="1" {...register('quantity', { valueAsNumber: true })} />
                            {errors.quantity && <span className="text-sm text-rose-500">{errors.quantity.message}</span>}
                        </label>
                        <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                            Motivo
                            <Input placeholder="Venda de loja" {...register('reason')} />
                            {errors.reason && <span className="text-sm text-rose-500">{errors.reason.message}</span>}
                        </label>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button type="submit">Confirmar saída</Button>
                        {status && <span className="text-sm text-brand">{status}</span>}
                    </div>
                </form>

                <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
                    <p className="text-sm uppercase tracking-[0.22em] text-brand">Movimentações recentes</p>
                    {loading ? (
                        <Loader />
                    ) : movements.length === 0 ? (
                        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Nenhuma saída registrada recentemente.</p>
                    ) : (
                        <div className="mt-5 space-y-4">
                            {movements.map((movement) => (
                                <div key={movement.id} className="rounded-[1.75rem] border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <p className="font-semibold text-slate-900 dark:text-slate-100">{movement.produto_nome}</p>
                                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{movement.motivo || 'Saída de estoque'}</p>
                                        </div>
                                        <span className="rounded-2xl bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">- {movement.quantidade}</span>
                                    </div>
                                    <p className="mt-3 text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">{new Date(movement.criado_em).toLocaleString('pt-BR')}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}
