import { useEffect, useMemo, useState } from 'react';
import { TrendingUp, Layers, Activity, ShoppingBag, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Card from '@/components/ui/Card.jsx';
import SalesAreaChart from '@/components/charts/SalesAreaChart.jsx';
import StockBarChart from '@/components/charts/StockBarChart.jsx';
import TopProductsChart from '@/components/charts/TopProductsChart.jsx';
import Badge from '@/components/ui/Badge.jsx';
import Loader from '@/components/ui/Loader.jsx';
import { api } from '@/api.js';
import { metricsData, recentActivity, revenueSeries, stockSeries, topProductsData } from '@/data/dashboardData.js';
import { formatCurrency } from '@/utils/format.js';

export default function Dashboard() {
    const [productCount, setProductCount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [recent, setRecent] = useState(recentActivity);

    useEffect(() => {
        async function loadMetrics() {
            try {
                const products = await api.getProdutos();
                const movimentacoes = await api.getMovimentacoes();
                setProductCount(products.length);
                setRecent((prev) => [
                    ...movimentacoes.slice(0, 4).map((item) => ({
                        id: `mov-${item.id}`,
                        title: item.tipo === 'saida' ? 'Saída de estoque' : 'Entrada de estoque',
                        subtitle: item.produto_nome,
                        label: item.tipo === 'saida' ? 'Venda' : 'Entrada',
                        amount: item.quantidade > 0 ? `± ${item.quantidade}` : '0',
                        time: new Date(item.criado_em || Date.now()).toLocaleString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                    })),
                    ...prev.slice(0, 4)
                ]);
            } catch (error) {
                setProductCount(1248);
            } finally {
                setLoading(false);
            }
        }

        loadMetrics();
    }, []);

    const cards = useMemo(
        () => [
            { icon: TrendingUp, title: 'Produtos cadastrados', value: productCount ?? 1248, extra: 'crescimento 12%' },
            { icon: Layers, title: 'Estoque crítico', value: '84', extra: 'alertas ativos' },
            { icon: ShoppingBag, title: 'Total de vendas', value: '3.712', extra: 'ordens processadas' },
            { icon: Activity, title: 'Faturamento', value: 'R$ 256.300', extra: 'meta 90%' }
        ],
        [productCount]
    );

    return (
        <div className="space-y-8">
            <div className="grid gap-6 xl:grid-cols-4">
                {loading ? (
                    new Array(4).fill(0).map((_, index) => <Loader key={index} />)
                ) : (
                    cards.map((card) => {
                        const Icon = card.icon;
                        return (
                            <Card key={card.title} className="border-slate-200/80 p-6">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="rounded-3xl bg-brand/10 p-3 text-brand">
                                        <Icon size={22} />
                                    </div>
                                    <span className="rounded-full bg-slate-100 px-3 py-2 text-xs uppercase tracking-[0.22em] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                                        Atualizado
                                    </span>
                                </div>
                                <div className="mt-8">
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{card.title}</p>
                                    <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">{card.value}</p>
                                    <div className="mt-2 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                        <ArrowUpRight size={16} className="text-emerald-500" />
                                        {card.extra}
                                    </div>
                                </div>
                            </Card>
                        );
                    })
                )}
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
                <SalesAreaChart data={revenueSeries} />
                <StockBarChart data={stockSeries} />
            </div>

            <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
                <TopProductsChart data={topProductsData} />
                <Card className="space-y-4 border-slate-200/80 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Movimentações recentes</p>
                            <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">Últimas entradas e saídas</h2>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {recent.slice(0, 4).map((item) => (
                            <div key={item.id} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-800 dark:bg-slate-950">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{item.title}</p>
                                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.subtitle}</p>
                                    </div>
                                    <Badge variant={item.label === 'Venda' ? 'danger' : item.label === 'Entrada' ? 'success' : 'warning'}>
                                        {item.label}
                                    </Badge>
                                </div>
                                <div className="mt-4 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                                    <span>{item.amount}</span>
                                    <span>{item.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
