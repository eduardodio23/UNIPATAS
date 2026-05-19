import { useEffect, useState } from 'react';
import { api } from '../api.js';

function CadastroProdutos() {
    const [produtos, setProdutos] = useState([]);
    const [form, setForm] = useState({ nome: '', descricao: '', preco: '', estoque: '' });
    const [status, setStatus] = useState('');

    useEffect(() => {
        loadProdutos();
    }, []);

    const loadProdutos = async () => {
        try {
            setProdutos(await api.getProdutos());
        } catch (err) {
            setStatus(err.message);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus('');

        try {
            await api.createProduto({
                nome: form.nome,
                descricao: form.descricao,
                preco: Number(form.preco),
                estoque: Number(form.estoque),
            });
            setForm({ nome: '', descricao: '', preco: '', estoque: '' });
            loadProdutos();
            setStatus('Produto cadastrado com sucesso.');
        } catch (err) {
            setStatus(err.message);
        }
    };

    return (
        <div className="page-section">
            <section className="card">
                <h2>Cadastro de Produtos</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Nome do produto
                        <input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} required />
                    </label>
                    <label>
                        Descrição
                        <textarea value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} rows="3" />
                    </label>
                    <label>
                        Preço
                        <input type="number" step="0.01" value={form.preco} onChange={(e) => setForm({ ...form, preco: e.target.value })} required />
                    </label>
                    <label>
                        Estoque inicial
                        <input type="number" value={form.estoque} onChange={(e) => setForm({ ...form, estoque: e.target.value })} required />
                    </label>
                    <button className="primary" type="submit">Salvar produto</button>
                </form>
                {status && <p><small>{status}</small></p>}
            </section>

            <section className="card">
                <h2>Produtos cadastrados</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Estoque</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map((produto) => (
                            <tr key={produto.id}>
                                <td>{produto.id}</td>
                                <td>{produto.nome}</td>
                                <td>R$ {produto.preco?.toFixed(2)}</td>
                                <td>{produto.estoque}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default CadastroProdutos;
