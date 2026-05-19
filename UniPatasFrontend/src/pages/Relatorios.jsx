import StockBarChart from '@/components/charts/StockBarChart.jsx';
import TopProductsChart from '@/components/charts/TopProductsChart.jsx';
import Card from '@/components/ui/Card.jsx';
import Button from '@/components/ui/Button.jsx';
import { revenueSeries, stockSeries, topProductsData } from '@/data/dashboardData.js';

export default function Relatorios() {
    return (
        <div className="space-y-8">
            <Card className="border-slate-200/80">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-brand">Relatórios</p>
                        <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">Análise estratégica</h2>
                        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                            Painel de relatório com indicadores de vendas, estoque e classes de produto para decisões rápidas.
                        </p>
                    </div>
                    <Button variant="secondary">Gerar relatório PDF</Button>
                </div>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border-slate-200/80">
                    <div className="mb-5">
                        <p className="text-sm uppercase tracking-[0.22em] text-brand">Tendência de faturamento</p>
                        <h3 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">Crescimento mensal</h3>
                    </div>
                    <div className="h-[320px]">
                        <StockBarChart data={stockSeries} />
                    </div>
                </Card>

                <Card className="border-slate-200/80">
                    <div className="mb-5">
                        <p className="text-sm uppercase tracking-[0.22em] text-brand">Produtos mais vendidos</p>
                        <h3 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">Top 4 itens</h3>
                    </div>
                    <div className="h-[320px]">
                        <TopProductsChart data={topProductsData} />
                    </div>
                </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="border-slate-200/80">
                    <p className="text-sm uppercase tracking-[0.22em] text-brand">Receita média</p>
                    <p className="mt-4 text-4xl font-semibold text-slate-900 dark:text-slate-100">R$ 257k</p>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">por mês no último semestre</p>
                </Card>
                <Card className="border-slate-200/80">
                    <p className="text-sm uppercase tracking-[0.22em] text-brand">Retenção</p>
                    <p className="mt-4 text-4xl font-semibold text-slate-900 dark:text-slate-100">92%</p>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">novos clientes fidelizados</p>
                </Card>
                <Card className="border-slate-200/80">
                    <p className="text-sm uppercase tracking-[0.22em] text-brand">Estoque ideal</p>
                    <p className="mt-4 text-4xl font-semibold text-slate-900 dark:text-slate-100">76%</p>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">do estoque dentro da meta</p>
                </Card>
            </div>
        </div>
    );
}
