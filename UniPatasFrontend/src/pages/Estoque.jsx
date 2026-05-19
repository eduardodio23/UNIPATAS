import { useEffect, useMemo, useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { api } from '@/api.js';
import Button from '@/components/ui/Button.jsx';
import Card from '@/components/ui/Card.jsx';
import Badge from '@/components/ui/Badge.jsx';
import SearchBar from '@/components/ui/SearchBar.jsx';
import Loader from '@/components/ui/Loader.jsx';
import EmptyState from '@/components/ui/EmptyState.jsx';
import Pagination from '@/components/ui/Pagination.jsx';
import ProductModal from '@/components/product/ProductModal.jsx';
import { categories, suppliers, mockProductDetails } from '@/data/inventoryData.js';
import { formatCurrency, formatDate } from '@/utils/format.js';

const PAGE_SIZE = 8;

export default function Estoque() {
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        async function loadInventory() {
            setLoading(true);
            try {
                const response = await api.getProdutos();
                const mapped = response.map((item) => {
                    const details = mockProductDetails.find((detail) => detail.id === item.id) || {};
                    return {
                        id: item.id,
                        name: item.nome,
                        category: details.category || 'Alimentos',
                        supplier: details.supplier || 'Beagle Distribuidora',
                        stock: item.estoque,
                        price: item.preco,
                        barcode: details.barcode || '7890000000001',
                        expiry: details.expiry || '2025-12-30',
                        status: item.estoque <= 10 ? 'danger' : item.estoque <= 30 ? 'warning' : 'success',
                        image: details.image || ''
                    };
                });
                setProducts(mapped);
            } catch (error) {
                setProducts([]);
            } finally {
                setLoading(false);
            }
        }

        loadInventory();
    }, []);

    const filtered = useMemo(() => {
        return products
            .filter((product) => product.name.toLowerCase().includes(query.toLowerCase()) || product.barcode.includes(query))
            .filter((product) => statusFilter === 'all' || product.status === statusFilter)
            .sort((a, b) => {
                if (sortBy === 'stock') return b.stock - a.stock;
                if (sortBy === 'price') return b.price - a.price;
                return a.name.localeCompare(b.name, 'pt-BR');
            });
    }, [products, query, statusFilter, sortBy]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);
    const visibleItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    const handleSave = async (product) => {
        if (product.id) {
            setProducts((prev) => prev.map((item) => (item.id === product.id ? { ...item, ...product } : item)));
            return;
        }
        try {
            const created = await api.createProduto({ nome: product.name, descricao: product.description, preco: product.price, estoque: product.stock });
            setProducts((prev) => [
                {
                    id: created.id,
                    name: created.nome,
                    category: product.category,
                    supplier: product.supplier,
                    stock: created.estoque,
                    price: created.preco,
                    barcode: product.barcode,
                    expiry: product.expiry,
                    status: created.estoque <= 10 ? 'danger' : created.estoque <= 30 ? 'warning' : 'success',
                    image: product.image
                },
                ...prev
            ]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-y-8">
            <div className="grid gap-6 xl:grid-cols-[1.8fr_1fr]">
                <Card className="border-slate-200/80">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand">Controle de estoque</p>
                            <h2 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-100">Inventário detalhado</h2>
                            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                                Acompanhe níveis de estoque, validade, código de barras e fornecedores com alertas visuais para itens críticos.
                            </p>
                        </div>
                        <Button onClick={() => { setEditingProduct(null); setModalOpen(true); }}>
                            <Plus size={18} /> Novo produto
                        </Button>
                    </div>
                </Card>

                <Card className="border-slate-200/80 bg-brand/5 dark:bg-brand/10">
                    <div className="space-y-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm uppercase tracking-[0.22em] text-brand">Visão rápida</p>
                            <Badge variant="success">Operacional</Badge>
                        </div>
                        <div className="grid gap-4 text-slate-800 dark:text-slate-100 sm:grid-cols-2">
                            <div className="rounded-[1.75rem] bg-white p-5 shadow-sm dark:bg-slate-950">
                                <p className="text-sm text-slate-500 dark:text-slate-400">Produtos totais</p>
                                <p className="mt-3 text-3xl font-semibold">{products.length}</p>
                            </div>
                            <div className="rounded-[1.75rem] bg-white p-5 shadow-sm dark:bg-slate-950">
                                <p className="text-sm text-slate-500 dark:text-slate-400">Itens críticos</p>
                                <p className="mt-3 text-3xl font-semibold">{products.filter((item) => item.status === 'danger').length}</p>
                            </div>
                        </div>
                        <div className="rounded-[1.75rem] bg-white p-5 shadow-sm dark:bg-slate-950">
                            <p className="text-sm text-slate-500 dark:text-slate-400">Filtrar por status</p>
                            <div className="mt-3 flex flex-wrap gap-3">
                                {['all', 'success', 'warning', 'danger'].map((value) => (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => setStatusFilter(value)}
                                        className={`rounded-2xl px-4 py-2 text-sm transition ${statusFilter === value ? 'bg-brand text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-300'}`}
                                    >
                                        {value === 'all' ? 'Todos' : value === 'success' ? 'Estável' : value === 'warning' ? 'Atenção' : 'Crítico'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            <Card className="border-slate-200/80">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Tabela de produtos</h3>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            Pesquisa em tempo real, ordenação e alertas vermelhos para baixa disponibilidade.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <SearchBar
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Buscar por produto, fornecedor ou código"
                        />
                        <Button variant="secondary" className="gap-2">
                            <Filter size={18} /> Filtros avançados
                        </Button>
                    </div>
                </div>

                <div className="mt-6 overflow-x-auto rounded-[2rem] border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
                    {loading ? (
                        <Loader />
                    ) : visibleItems.length === 0 ? (
                        <EmptyState title="Nenhum produto encontrado" description="Ajuste os filtros ou adicione um item ao estoque." />
                    ) : (
                        <table className="min-w-full border-separate border-spacing-0 text-sm text-slate-700 dark:text-slate-200">
                            <thead className="bg-slate-100 text-left text-xs uppercase tracking-[0.22em] text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                                <tr>
                                    <th className="px-6 py-4">Produto</th>
                                    <th className="px-6 py-4">Categoria</th>
                                    <th className="px-6 py-4">Fornecedor</th>
                                    <th className="px-6 py-4">Quantidade</th>
                                    <th className="px-6 py-4">Validade</th>
                                    <th className="px-6 py-4">Código</th>
                                    <th className="px-6 py-4">Preço</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {visibleItems.map((product) => (
                                    <tr key={product.id} className="border-t border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="h-12 w-12 overflow-hidden rounded-3xl bg-slate-200 dark:bg-slate-800">
                                                    {product.image ? (
                                                        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                                                    ) : (
                                                        <div className="flex h-full items-center justify-center text-slate-500">Foto</div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-900 dark:text-slate-100">{product.name}</p>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400">SKU atualizado</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">{product.category}</td>
                                        <td className="px-6 py-5">{product.supplier}</td>
                                        <td className="px-6 py-5 font-semibold">{product.stock}</td>
                                        <td className="px-6 py-5">{formatDate(product.expiry)}</td>
                                        <td className="px-6 py-5 font-mono text-slate-500">{product.barcode}</td>
                                        <td className="px-6 py-5">{formatCurrency(product.price)}</td>
                                        <td className="px-6 py-5">
                                            <Badge variant={product.status}>{product.status === 'success' ? 'Estável' : product.status === 'warning' ? 'Atenção' : 'Crítico'}</Badge>
                                        </td>
                                        <td className="px-6 py-5">
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                                                onClick={() => {
                                                    setEditingProduct(product);
                                                    setModalOpen(true);
                                                }}
                                            >
                                                Editar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm text-slate-500 dark:text-slate-400">{filtered.length} itens encontrados</div>
                    <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} />
                </div>
            </Card>

            <ProductModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSave}
                initialData={editingProduct}
                categories={categories}
                suppliers={suppliers}
            />
        </div>
    );
}
