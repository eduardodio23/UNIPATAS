import { useEffect, useState } from 'react';
import { api } from '../api.js';

function CadastroPets() {
    const [pets, setPets] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [form, setForm] = useState({ cliente_id: '', nome: '', especie: '', raca: '', idade: '', observacoes: '' });
    const [status, setStatus] = useState('');

    useEffect(() => {
        loadPets();
        loadClientes();
    }, []);

    const loadPets = async () => {
        try {
            setPets(await api.getPets());
        } catch (err) {
            setStatus(err.message);
        }
    };

    const loadClientes = async () => {
        try {
            setClientes(await api.getClientes());
        } catch (err) {
            setStatus(err.message);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus('');

        try {
            await api.createPet({
                cliente_id: form.cliente_id || null,
                nome: form.nome,
                especie: form.especie,
                raca: form.raca,
                idade: Number(form.idade),
                observacoes: form.observacoes,
            });
            setForm({ cliente_id: '', nome: '', especie: '', raca: '', idade: '', observacoes: '' });
            loadPets();
            setStatus('Pet cadastrado com sucesso.');
        } catch (err) {
            setStatus(err.message);
        }
    };

    return (
        <div className="page-section">
            <section className="card">
                <h2>Cadastro de Pets</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Cliente dono
                        <select value={form.cliente_id} onChange={(e) => setForm({ ...form, cliente_id: e.target.value })}>
                            <option value="">-- Selecione --</option>
                            {clientes.map((cliente) => (
                                <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Nome do pet
                        <input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} required />
                    </label>
                    <label>
                        Espécie
                        <input value={form.especie} onChange={(e) => setForm({ ...form, especie: e.target.value })} />
                    </label>
                    <label>
                        Raça
                        <input value={form.raca} onChange={(e) => setForm({ ...form, raca: e.target.value })} />
                    </label>
                    <label>
                        Idade
                        <input type="number" value={form.idade} onChange={(e) => setForm({ ...form, idade: e.target.value })} />
                    </label>
                    <label>
                        Observações
                        <textarea value={form.observacoes} onChange={(e) => setForm({ ...form, observacoes: e.target.value })} rows="3" />
                    </label>
                    <button className="primary" type="submit">Salvar pet</button>
                </form>
                {status && <p><small>{status}</small></p>}
            </section>

            <section className="card">
                <h2>Pets cadastrados</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Cliente</th>
                            <th>Espécie</th>
                            <th>Raça</th>
                            <th>Idade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pets.map((pet) => (
                            <tr key={pet.id}>
                                <td>{pet.id}</td>
                                <td>{pet.nome}</td>
                                <td>{pet.cliente_nome || 'Sem dono'}</td>
                                <td>{pet.especie}</td>
                                <td>{pet.raca}</td>
                                <td>{pet.idade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default CadastroPets;
