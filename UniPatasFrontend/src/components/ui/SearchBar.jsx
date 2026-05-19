import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = 'Buscar produtos, clientes ou categorias...' }) {
    return (
        <label className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm transition focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
            <Search size={18} className="text-slate-400" />
            <input
                value={value}
                onChange={onChange}
                className="w-full bg-transparent outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
                placeholder={placeholder}
            />
        </label>
    );
}
