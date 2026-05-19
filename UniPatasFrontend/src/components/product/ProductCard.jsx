import Badge from '@/components/ui/Badge.jsx';

export default function ProductCard({ product }) {
    return (
        <article className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-sm uppercase tracking-[0.22em] text-brand">{product.category}</p>
                    <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-slate-100">{product.name}</h3>
                </div>
                <Badge variant={product.status}>{product.status === 'success' ? 'Saudável' : product.status === 'warning' ? 'Atenção' : 'Crítico'}</Badge>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-500 dark:text-slate-400">Fornecedor: {product.supplier}</p>
            <div className="mt-6 flex items-center justify-between gap-3">
                <span className="text-2xl font-semibold text-slate-900 dark:text-slate-100">R$ {product.price.toFixed(2)}</span>
                <span className="text-sm text-slate-500 dark:text-slate-400">{product.stock} unidades</span>
            </div>
        </article>
    );
}
