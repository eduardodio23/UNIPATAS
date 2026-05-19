import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function StockBarChart({ data }) {
    return (
        <div className="h-[320px] w-full rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-950">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Estoque por categoria</p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">Visão estratégica</h3>
                </div>
            </div>
            <ResponsiveContainer width="100%" height="85%">
                <BarChart data={data} margin={{ top: 0, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" vertical={false} />
                    <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                    <Tooltip contentStyle={{ borderRadius: 18, border: '1px solid #e2e8f0', backgroundColor: '#ffffff' }} />
                    <Bar dataKey="stock" fill="#0f766e" radius={[12, 12, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
