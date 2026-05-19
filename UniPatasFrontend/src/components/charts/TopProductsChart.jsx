import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const palette = ['#14B8A6', '#0f766e', '#7dd3fc', '#38bdf8', '#fde68a'];

export default function TopProductsChart({ data }) {
    return (
        <div className="h-[320px] w-full rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-950">
            <div className="mb-4">
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Produtos mais vendidos</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">Performance do trimestre</h3>
            </div>
            <ResponsiveContainer width="100%" height="85%">
                <PieChart>
                    <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="45%" innerRadius={62} outerRadius={96} paddingAngle={3}>
                        {data.map((entry, index) => (
                            <Cell key={entry.name} fill={palette[index % palette.length]} />
                        ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: 18, border: '1px solid #e2e8f0', backgroundColor: '#ffffff' }} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
