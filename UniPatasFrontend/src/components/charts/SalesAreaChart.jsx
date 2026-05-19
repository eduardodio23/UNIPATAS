import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function SalesAreaChart({ data }) {
    return (
        <div className="h-[320px] w-full rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-950">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Faturamento mensal</p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">Crescimento sustentável</h3>
                </div>
            </div>
            <ResponsiveContainer width="100%" height="85%">
                <AreaChart data={data} margin={{ top: 0, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                        <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#14B8A6" stopOpacity={0.06} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                    <Tooltip contentStyle={{ borderRadius: 18, border: '1px solid #e2e8f0', backgroundColor: '#ffffff' }} />
                    <Area type="monotone" dataKey="revenue" stroke="#14B8A6" strokeWidth={3} fill="url(#salesGradient)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
