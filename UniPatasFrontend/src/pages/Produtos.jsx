import { useEffect, useState } from 'react';
import { api } from '@/api.js';
import Button from '@/components/ui/Button.jsx';
import Card from '@/components/ui/Card.jsx';
import Loader from '@/components/ui/Loader.jsx';
import EmptyState from '@/components/ui/EmptyState.jsx';
import { formatCurrency } from '@/utils/format.js';

export default function Produtos() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProducts() {
            try {
                const response = await api.getProdutos();
                setProducts(response);
            } catch (error) {
                setProducts([]);
            } finally {
                setLoading(false);
            }
        }
        loadProducts();
    }, []);

    return (
        <div className="space-y-8">
            <Card className="border-slate-200/80">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-brand">Catálogo de produtos</p>
                        <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">Produtos do estoque</h2>
                        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                            Gestão completa de produtos, categorias e reposição inteligente para o petshop.
                        </p>
                    </div>
                    <Button variant="secondary">Exportar lista</Button>
                </div>
            </Card>

            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="border-slate-200/80">
                    <p className="text-sm uppercase tracking-[0.22em] text-brand">Total</p>
                    <p className="mt-3 text-4xl font-semibold text-slate-900 dark:text-slate-100">{products.length}</p>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Produtos cadastrados</p>
                </Card>
                <Card className="border-slate-200/80">
                    <p className="text-sm uppercase tracking-[0.22em] text-brand">Mais vendidos</p>
                    <p className="mt-3 text-4xl font-semibold text-slate-900 dark:text-slate-100">Ração premium</p>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Categoria alimentos</p>
                </Card>
                <Card className="border-slate-200/80">
                    <p className="text-sm uppercase tracking-[0.22em] text-brand">Repor</p>
                    <p className="mt-3 text-4xl font-semibold text-slate-900 dark:text-slate-100">47</p>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Itens abaixo do estoque ideal</p>
                </Card>
            </div>

            <Card className="border-slate-200/80">
                <div className="mb-5 flex items-center justify-between gap-4">
                    <div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Visão geral dos produtos</h3>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Uma lista organizada para acompanhar o catálogo completo.</p>
                    </div>
                </div>

                {loading ? (
                    <Loader />
                ) : products.length === 0 ? (
                    <EmptyState title="Nenhum produto disponível" description="Aguarde os dados serem carregados ou crie novos produtos." />
                ) : (
                    <div className="overflow-x-auto rounded-[2rem] border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
                        <table className="min-w-full text-left text-sm text-slate-700 dark:text-slate-200">
                            <thead className="bg-slate-100 uppercase tracking-[0.22em] text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                                <tr>
                                    <th className="px-6 py-4">ID</th>
                                    <th className="px-6 py-4">Nome</th>
                                    <th className="px-6 py-4">Preço</th>
                                    <th className="px-6 py-4">Estoque</th>
                                    <th className="px-6 py-4">Categoria</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id} className="border-t border-slate-200 hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-900">
                                        <td className="px-6 py-5 font-mono text-slate-500 dark:text-slate-400">{product.id}</td>
                                        <td className="px-6 py-5 font-semibold text-slate-900 dark:text-slate-100">{product.nome}</td>
                                        <td className="px-6 py-5">{formatCurrency(product.preco)}</td>
                                        <td className="px-6 py-5">{product.estoque}</td>
                                        <td className="px-6 py-5">Alimentos</td>
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
