export default function Loader() {
    return (
        <div className="flex min-h-[260px] items-center justify-center rounded-[2rem] border border-slate-200 bg-slate-50 text-slate-600 shadow-soft dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border-4 border-brand/15 border-t-brand text-brand animate-spin" aria-label="Carregando" />
        </div>
    );
}
