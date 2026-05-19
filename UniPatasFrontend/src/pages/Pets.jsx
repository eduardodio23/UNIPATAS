import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@/api.js';
import { petSchema } from '@/schemas/petSchema.js';
import Button from '@/components/ui/Button.jsx';
import Card from '@/components/ui/Card.jsx';
import Input from '@/components/ui/Input.jsx';
import Select from '@/components/ui/Select.jsx';
import Loader from '@/components/ui/Loader.jsx';
import EmptyState from '@/components/ui/EmptyState.jsx';

export default function Pets() {
    const [pets, setPets] = useState([]);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({ resolver: zodResolver(petSchema), defaultValues: { specie: '', breed: '', name: '', age: '', notes: '', ownerId: '' } });

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            try {
                const [petsResponse, clientsResponse] = await Promise.all([api.getPets(), api.getClientes()]);
                setPets(petsResponse);
                setClients(clientsResponse);
            } catch (error) {
                setPets([]);
                setClients([]);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const onSubmit = async (values) => {
        try {
            const payload = {
                cliente_id: values.ownerId || null,
                nome: values.name,
                especie: values.specie,
                raca: values.breed,
                idade: values.age,
                observacoes: values.notes
            };
            const created = await api.createPet(payload);
            setPets((prev) => [created, ...prev]);
            reset();
            setStatus('Pet cadastrado com sucesso.');
        } catch (error) {
            setStatus('Não foi possível cadastrar o pet.');
        }
    };

    return (
        <div className="space-y-8">
            <Card className="border-slate-200/80">
                <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
                    <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-brand">Gerencie pets</p>
                        <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">Cadastro de animais</h2>
                        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                            Vincule pets aos tutores, acompanhe histórico e mantenha o perfil do pet atualizado no painel.
                        </p>
                    </div>
                    <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                        <p className="text-sm uppercase tracking-[0.22em] text-slate-500">Total de pets</p>
                        <p className="mt-3 text-4xl font-semibold text-slate-900 dark:text-slate-100">{pets.length}</p>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Perfis ativos e monitoramento de saúde.</p>
                    </div>
                </div>
            </Card>

            <Card className="border-slate-200/80">
                <div className="grid gap-6 lg:grid-cols-2">
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-4">
                            <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                                Cliente dono
                                <Select {...register('ownerId')}>
                                    <option value="">Selecione o tutor</option>
                                    {clients.map((client) => (
                                        <option key={client.id} value={client.id}>{client.nome}</option>
                                    ))}
                                </Select>
                            </label>
                            <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                                Nome do pet
                                <Input placeholder="Nome do pet" {...register('name')} />
                                {errors.name && <span className="text-sm text-rose-500">{errors.name.message}</span>}
                            </label>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                                Espécie
                                <Input placeholder="Cão, Gato, Ave" {...register('specie')} />
                                {errors.specie && <span className="text-sm text-rose-500">{errors.specie.message}</span>}
                            </label>
                            <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                                Raça
                                <Input placeholder="Raça" {...register('breed')} />
                                {errors.breed && <span className="text-sm text-rose-500">{errors.breed.message}</span>}
                            </label>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                                Idade
                                <Input placeholder="Idade" {...register('age')} />
                            </label>
                            <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                                Observações
                                <Input placeholder="Registro de saúde" {...register('notes')} />
                            </label>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button type="submit">Salvar pet</Button>
                            {status && <span className="text-sm text-brand">{status}</span>}
                        </div>
                    </form>

                    <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
                        <p className="text-sm uppercase tracking-[0.22em] text-slate-500">Dica pet-friendly</p>
                        <h3 className="mt-3 text-lg font-semibold text-slate-900 dark:text-slate-100">Perfis conectados</h3>
                        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                            Cada pet fica vinculado a um cliente, facilitando recomendações e histórico de vendas personalizadas.
                        </p>
                    </div>
                </div>

                <div className="mt-8">
                    {loading ? (
                        <Loader />
                    ) : pets.length === 0 ? (
                        <EmptyState title="Nenhum pet cadastrado" description="Adicione pets para acompanhar relatórios e histórico clínico." />
                    ) : (
                        <div className="overflow-x-auto rounded-[2rem] border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
                            <table className="min-w-full text-left text-sm text-slate-700 dark:text-slate-200">
                                <thead className="bg-slate-100 uppercase tracking-[0.22em] text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                                    <tr>
                                        <th className="px-6 py-4">Nome</th>
                                        <th className="px-6 py-4">Tutor</th>
                                        <th className="px-6 py-4">Espécie</th>
                                        <th className="px-6 py-4">Raça</th>
                                        <th className="px-6 py-4">Idade</th>
                                        <th className="px-6 py-4">Observações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pets.map((pet) => (
                                        <tr key={pet.id} className="border-t border-slate-200 hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-900">
                                            <td className="px-6 py-5 font-semibold text-slate-900 dark:text-slate-100">{pet.nome}</td>
                                            <td className="px-6 py-5">{pet.cliente_nome || 'Sem tutor'}</td>
                                            <td className="px-6 py-5">{pet.especie}</td>
                                            <td className="px-6 py-5">{pet.raca}</td>
                                            <td className="px-6 py-5">{pet.idade ?? '-'}</td>
                                            <td className="px-6 py-5 text-slate-500 dark:text-slate-400">{pet.observacoes || '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}
