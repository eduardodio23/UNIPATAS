export default function Table({ columns, data, emptyMessage = 'Nenhum registro encontrado.' }) {
    return (
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <table className="min-w-full border-collapse text-sm text-slate-700 dark:text-slate-200">
                <thead className="bg-slate-100 text-left text-xs uppercase tracking-[0.18em] text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key} className="px-5 py-4">
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="px-5 py-10 text-center text-slate-500 dark:text-slate-400">
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        data.map((row) => (
                            <tr key={row.id} className="border-t border-slate-100 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900">
                                {columns.map((column) => (
                                    <td key={`${row.id}-${column.key}`} className="px-5 py-4 align-top">
                                        {typeof column.render === 'function' ? column.render(row) : row[column.key]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
