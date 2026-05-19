import Card from '@/components/ui/Card.jsx';
import { categories } from '@/data/inventoryData.js';

export default function Categorias() {
    return (
        <div className="space-y-8">
            <Card className="border-slate-200/80">
                <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-brand">Categorias</p>
                    <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">Organize seu portfólio</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                        Ajuste e crie categorias para agrupar seus produtos de forma inteligente e escalável.
                    </p>
                </div>
            </Card>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {categories.map((category) => (
                    <Card key={category.id} className="border-slate-200/80">
                        <p className="text-xs uppercase tracking-[0.22em] text-brand">{category.name}</p>
                        <p className="mt-4 text-4xl font-semibold text-slate-900 dark:text-slate-100">{category.products}</p>
                        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Produtos na categoria</p>
                    </Card>
                ))}
            </div>

            <Card className="border-slate-200/80 overflow-hidden">
                <div className="grid gap-6 lg:grid-cols-2">
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Categorias de alto desempenho</h3>
                        <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
                            Avalie quais segmentos trazem mais faturamento e otimize o mix de produtos para o seu petshop.
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <div className="rounded-[1.75rem] bg-brand/10 p-5 text-slate-900 dark:bg-brand/20 dark:text-slate-100">
                            <p className="text-sm uppercase tracking-[0.22em]">Alimentos</p>
                            <p className="mt-3 text-3xl font-semibold">342 itens</p>
                        </div>
                        <div className="rounded-[1.75rem] bg-slate-100 p-5 dark:bg-slate-900">
                            <p className="text-sm uppercase tracking-[0.22em] text-slate-500">Saúde</p>
                            <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">128 itens</p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
