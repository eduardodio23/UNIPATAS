export default function Card({ children, className = '' }) {
    return (
        <div className={`rounded-[2rem] border border-sky-100 bg-gradient-to-br from-white via-sky-50 to-blue-100 p-6 shadow-[0_18px_40px_rgba(14,58,99,0.10)] dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 ${className}`}>
            {children}
        </div>
    );
}
