import Card from '@/components/ui/Card.jsx';
import Button from '@/components/ui/Button.jsx';
import { suppliers } from '@/data/inventoryData.js';

export default function Fornecedores() {
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
                    <Button variant="secondary">Adicionar fornecedor</Button>
                </div>
            </Card>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {suppliers.map((supplier) => (
                    <Card key={supplier.id} className="border-slate-200/80">
                        <p className="text-sm uppercase tracking-[0.22em] text-brand">{supplier.name}</p>
                        <p className="mt-4 text-3xl font-semibold text-slate-900 dark:text-slate-100">{supplier.status}</p>
                        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{supplier.contact}</p>
                    </Card>
                ))}
            </div>

            <Card className="border-slate-200/80">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Fornecedores com entregas ágeis</h3>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {suppliers.map((supplier) => (
                        <div key={supplier.id} className="rounded-[1.75rem] border border-slate-200 p-5 dark:border-slate-800">
                            <p className="text-sm uppercase tracking-[0.22em] text-brand">{supplier.name}</p>
                            <p className="mt-4 text-3xl font-semibold text-slate-900 dark:text-slate-100">{supplier.status === 'Ativo' ? 'Disponível' : 'Atenção'}</p>
                            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{supplier.contact}</p>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
