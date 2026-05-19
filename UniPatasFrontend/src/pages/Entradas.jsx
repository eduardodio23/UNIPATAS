import { useState } from 'react';
import Card from '@/components/ui/Card.jsx';
import Button from '@/components/ui/Button.jsx';
import Input from '@/components/ui/Input.jsx';
import Select from '@/components/ui/Select.jsx';
import EmptyState from '@/components/ui/EmptyState.jsx';

const defaultEntries = [
    { id: 1, product: 'Ração premium', supplier: 'Beagle Distribuidora', quantity: 120, date: '2026-05-12' },
    { id: 2, product: 'Vitamina pet', supplier: 'PetNature', quantity: 65, date: '2026-05-10' }
];

export default function Entradas() {
    const [entries, setEntries] = useState(defaultEntries);
    const [form, setForm] = useState({ product: '', supplier: '', quantity: 0 });

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!form.product || !form.supplier || form.quantity <= 0) return;
        setEntries((prev) => [{ id: prev.length + 1, product: form.product, supplier: form.supplier, quantity: form.quantity, date: new Date().toISOString().slice(0, 10) }, ...prev]);
        setForm({ product: '', supplier: '', quantity: 0 });
    };

    return (
        <div className="space-y-8">
            <Card className="border-slate-200/80">
                <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-brand">Entradas de estoque</p>
                    <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">Registrar novos recebimentos</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                        Cadastre fisicamente as entradas do estoque e acompanhe o fluxo de reposição de forma premiu.
                    </p>
                </div>
            </Card>

            <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
                <Card className="border-slate-200/80">
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Produto</label>
                            <Input value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} placeholder="Nome do produto" />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Fornecedor</label>
                            <Select value={form.supplier} onChange={(e) => setForm({ ...form, supplier: e.target.value })}>
                                <option value="">Selecione</option>
                                <option value="Beagle Distribuidora">Beagle Distribuidora</option>
                                <option value="PetNature">PetNature</option>
                                <option value="Focinho Log">Focinho Log</option>
                            </Select>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Quantidade</label>
                            <Input type="number" min="1" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })} placeholder="Quantidade" />
                        </div>
                        <Button type="submit">Registrar entrada</Button>
                    </form>
                </Card>

                <Card className="border-slate-200/80">
                    <div>
                        <p className="text-sm uppercase tracking-[0.22em] text-brand">Resumo rápido</p>
                        <h3 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-slate-100">{entries.length}</h3>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">entradas registradas</p>
                    </div>
                </Card>
            </div>

            <Card className="border-slate-200/80">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Últimas entradas</h3>
                {entries.length === 0 ? (
                    <EmptyState title="Nenhuma entrada registrada" description="Registre novas mercadorias para atualizar o estoque." />
                ) : (
                    <div className="mt-6 overflow-x-auto rounded-[2rem] border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
                        <table className="min-w-full text-left text-sm text-slate-700 dark:text-slate-200">
                            <thead className="bg-slate-100 uppercase tracking-[0.22em] text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                                <tr>
                                    <th className="px-6 py-4">Produto</th>
                                    <th className="px-6 py-4">Fornecedor</th>
                                    <th className="px-6 py-4">Quantidade</th>
                                    <th className="px-6 py-4">Data</th>
                                </tr>
                            </thead>
                            <tbody>
                                {entries.map((entry) => (
                                    <tr key={entry.id} className="border-t border-slate-200 hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-900">
                                        <td className="px-6 py-5 font-semibold text-slate-900 dark:text-slate-100">{entry.product}</td>
                                        <td className="px-6 py-5">{entry.supplier}</td>
                                        <td className="px-6 py-5">{entry.quantity}</td>
                                        <td className="px-6 py-5">{entry.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>
        </div>
    );
}
