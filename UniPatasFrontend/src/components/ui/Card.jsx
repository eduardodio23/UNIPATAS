export default function Card({ children, className = '' }) {
    return (
        <div className={`rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-950 ${className}`}>
            {children}
        </div>
    );
}
