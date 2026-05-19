import { useEffect, useState } from 'react';
import { api } from '../api.js';

function MovimentacaoEstoque() {
    const [produtos, setProdutos] = useState([]);
    const [movimentacoes, setMovimentacoes] = useState([]);
    const [form, setForm] = useState({ produto_id: '', quantidade: '', motivo: '' });
    const [status, setStatus] = useState('');

    useEffect(() => {
        loadDados();
    }, []);

    const loadDados = async () => {
        try {
            setProdutos(await api.getProdutos());
            setMovimentacoes(await api.getMovimentacoes());
        } catch (err) {
            setStatus(err.message);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus('');

        try {
            await api.stockSaida({
                produto_id: Number(form.produto_id),
                quantidade: Number(form.quantidade),
                motivo: form.motivo,
            });
            setForm({ produto_id: '', quantidade: '', motivo: '' });
            await loadDados();
            setStatus('Movimentação de saída registrada com sucesso.');
        } catch (err) {
            setStatus(err.message);
        }
    };

    return (
        <div className="page-section">
            <section className="card">
                <h2>Saída de Estoque</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Produto
                        <select value={form.produto_id} onChange={(e) => setForm({ ...form, produto_id: e.target.value })} required>
                            <option value="">-- Selecione --</option>
                            {produtos.map((produto) => (
                                <option key={produto.id} value={produto.id}>{produto.nome}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Quantidade
                        <input type="number" min="1" value={form.quantidade} onChange={(e) => setForm({ ...form, quantidade: e.target.value })} required />
                    </label>
                    <label>
                        Motivo
                        <input value={form.motivo} onChange={(e) => setForm({ ...form, motivo: e.target.value })} required />
                    </label>
                    <button className="primary" type="submit">Registrar saída</button>
                </form>
                {status && <p><small>{status}</small></p>}
            </section>

            <section className="card">
                <h2>Últimas movimentações</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Produto</th>
                            <th>Tipo</th>
                            <th>Quantidade</th>
                            <th>Motivo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movimentacoes.map((mov) => (
                            <tr key={mov.id}>
                                <td>{mov.produto_nome}</td>
                                <td>{mov.tipo}</td>
                                <td>{mov.quantidade}</td>
                                <td>{mov.motivo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default MovimentacaoEstoque;
