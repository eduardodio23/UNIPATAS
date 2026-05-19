import Card from '@/components/ui/Card.jsx';
import Button from '@/components/ui/Button.jsx';

export default function Financeiro() {
    return (
        <div className="space-y-8">
            <Card className="border-slate-200/80">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-brand">Financeiro</p>
                        <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">Controle de caixa</h2>
                        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                            Analise receita, despesas e margens para o seu petshop, com foco em crescimento sustentável.
                        </p>
                    </div>
                    <Button variant="secondary">Exportar finanças</Button>
                </div>
            </Card>

            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="border-slate-200/80">
                    <p className="text-sm uppercase tracking-[0.22em] text-brand">Fluxo de caixa</p>
                    <p className="mt-4 text-4xl font-semibold text-slate-900 dark:text-slate-100">R$ 198.200</p>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">saldo disponível</p>
                </Card>
                <Card className="border-slate-200/80">
                    <p className="text-sm uppercase tracking-[0.22em] text-brand">Receita</p>
                    <p className="mt-4 text-4xl font-semibold text-slate-900 dark:text-slate-100">R$ 256.300</p>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">último mês</p>
                </Card>
                <Card className="border-slate-200/80">
                    <p className="text-sm uppercase tracking-[0.22em] text-brand">Margem líquida</p>
                    <p className="mt-4 text-4xl font-semibold text-slate-900 dark:text-slate-100">28%</p>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">por produto</p>
                </Card>
            </div>

            <Card className="border-slate-200/80">
                <div className="grid gap-6 lg:grid-cols-2">
                    <div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Resumo financeiro</h3>
                        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                            Encontre receitas, despesas fixas e áreas com maior potencial de lucro em um só lugar.
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <div className="rounded-[1.75rem] bg-slate-50 p-5 dark:bg-slate-950">
                            <p className="text-sm text-slate-500 dark:text-slate-400">Receitas recorrentes</p>
                            <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">R$ 128.900</p>
                        </div>
                        <div className="rounded-[1.75rem] bg-slate-50 p-5 dark:bg-slate-950">
                            <p className="text-sm text-slate-500 dark:text-slate-400">Despesas operacionais</p>
                            <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">R$ 58.600</p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
