export default function Pagination({ page, totalPages, onChange }) {
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className="flex flex-wrap items-center gap-2 rounded-3xl bg-slate-100 p-3 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-300">
            <button
                type="button"
                className="rounded-2xl border border-slate-200 bg-white px-3 py-2 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950"
                onClick={() => onChange(Math.max(1, page - 1))}
                disabled={page === 1}
            >
                Anterior
            </button>
            {pages.map((current) => (
                <button
                    key={current}
                    type="button"
                    className={`rounded-2xl px-3 py-2 transition ${current === page ? 'bg-brand text-white shadow-soft' : 'bg-white hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-800'}`}
                    onClick={() => onChange(current)}
                >
                    {current}
                </button>
            ))}
            <button
                type="button"
                className="rounded-2xl border border-slate-200 bg-white px-3 py-2 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800"
                onClick={() => onChange(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
            >
                Próxima
            </button>
        </div>
    );
}
