import { useEffect, useState } from 'react';
import { api } from '../api.js';

function CadastroClientes() {
    const [clientes, setClientes] = useState([]);
    const [form, setForm] = useState({ nome: '', email: '', telefone: '', endereco: '' });
    const [status, setStatus] = useState('');

    useEffect(() => {
        loadClientes();
    }, []);

    const loadClientes = async () => {
        try {
            const data = await api.getClientes();
            setClientes(data);
        } catch (err) {
            setStatus(err.message);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus('');

        try {
            await api.createCliente(form);
            setForm({ nome: '', email: '', telefone: '', endereco: '' });
            loadClientes();
            setStatus('Cliente cadastrado com sucesso.');
        } catch (err) {
            setStatus(err.message);
        }
    };

    return (
        <div className="page-section">
            <section className="card">
                <h2>Cadastro de Clientes</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Nome do cliente
                        <input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} required />
                    </label>
                    <label>
                        Email
                        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </label>
                    <label>
                        Telefone
                        <input value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} />
                    </label>
                    <label>
                        Endereço
                        <input value={form.endereco} onChange={(e) => setForm({ ...form, endereco: e.target.value })} />
                    </label>
                    <button className="primary" type="submit">Salvar cliente</button>
                </form>
                {status && <p><small>{status}</small></p>}
            </section>

            <section className="card">
                <h2>Clientes cadastrados</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente) => (
                            <tr key={cliente.id}>
                                <td>{cliente.id}</td>
                                <td>{cliente.nome}</td>
                                <td>{cliente.email}</td>
                                <td>{cliente.telefone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default CadastroClientes;
