export default function EmptyState({ title = 'Nada encontrado', description = 'Ajuste o filtro ou tente outro termo para ver resultados.', icon }) {
    return (
        <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-slate-300 bg-slate-50/90 p-10 text-center dark:border-slate-700 dark:bg-slate-900/80">
            {icon ? <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-brand/10 text-brand">{icon}</div> : null}
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
            <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p>
        </div>
    );
}
