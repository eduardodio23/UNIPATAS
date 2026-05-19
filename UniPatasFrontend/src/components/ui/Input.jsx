export default function Input({ className = '', ...props }) {
    return (
        <input
            className={`w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 ${className}`}
            {...props}
        />
    );
}
