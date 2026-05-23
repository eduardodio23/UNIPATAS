export default function Input({ className = '', ...props }) {
    return (
        <input
            className={`w-full rounded-2xl border border-sky-100 bg-white/95 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 ${className}`}
            {...props}
        />
    );
}
