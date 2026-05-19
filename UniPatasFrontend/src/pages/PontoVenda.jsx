import { useEffect, useState } from 'react';
import { api } from '../api.js';

function PontoVenda() {
    const [clientes, setClientes] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [carrinho, setCarrinho] = useState([]);
    const [selecao, setSelecao] = useState({ cliente_id: '', produto_id: '', quantidade: 1 });
    const [status, setStatus] = useState('');

    useEffect(() => {
        loadDados();
    }, []);

    const loadDados = async () => {
        try {
            setClientes(await api.getClientes());
            setProdutos(await api.getProdutos());
        } catch (err) {
            setStatus(err.message);
        }
    };

    const handleAddItem = () => {
        const produto = produtos.find((item) => item.id === Number(selecao.produto_id));
        if (!produto) return;
        const quantidade = Number(selecao.quantidade);
        if (quantidade <= 0) return;

        setCarrinho((prev) => {
            const existing = prev.find((item) => item.produto_id === produto.id);
            if (existing) {
                return prev.map((item) =>
                    item.produto_id === produto.id ? { ...item, quantidade: item.quantidade + quantidade } : item
                );
            }
            return [...prev, {
                produto_id: produto.id,
                nome: produto.nome,
                quantidade,
                preco_unitario: Number(produto.preco),
            }];
        });
        setStatus('Item adicionado ao carrinho.');
    };

    const handleRemoveItem = (id) => {
        setCarrinho(carrinho.filter((item) => item.produto_id !== id));
    };

    const total = carrinho.reduce((sum, item) => sum + item.preco_unitario * item.quantidade, 0);

    const handleSale = async (event) => {
        event.preventDefault();
        setStatus('');
        if (!selecao.cliente_id) {
            setStatus('Selecione um cliente para a venda.');
            return;
        }
        if (!carrinho.length) {
            setStatus('Adicione pelo menos um item ao carrinho.');
            return;
        }

        try {
            await api.createVenda({
                cliente_id: Number(selecao.cliente_id),
                itens: carrinho.map(({ produto_id, quantidade, preco_unitario }) => ({ produto_id, quantidade, preco_unitario })),
            });
            setCarrinho([]);
            setSelecao({ ...selecao, produto_id: '', quantidade: 1 });
            setStatus('Venda registrada com sucesso.');
            await loadDados();
        } catch (err) {
            setStatus(err.message);
        }
    };

    return (
        <div className="page-section">
            <section className="card">
                <h2>Ponto de Venda</h2>
                <form onSubmit={handleSale}>
                    <label>
                        Cliente
                        <select value={selecao.cliente_id} onChange={(e) => setSelecao({ ...selecao, cliente_id: e.target.value })} required>
                            <option value="">-- Selecione --</option>
                            {clientes.map((cliente) => (
                                <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
                            ))}
                        </select>
                    </label>
                    <div style={{ display: 'grid', gap: '12px' }}>
                        <label>
                            Produto
                            <select value={selecao.produto_id} onChange={(e) => setSelecao({ ...selecao, produto_id: e.target.value })}>
                                <option value="">-- Selecione --</option>
                                {produtos.map((produto) => (
                                    <option key={produto.id} value={produto.id}>{produto.nome}</option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Quantidade
                            <input type="number" min="1" value={selecao.quantidade} onChange={(e) => setSelecao({ ...selecao, quantidade: Number(e.target.value) })} />
                        </label>
                        <button type="button" className="secondary" onClick={handleAddItem}>Adicionar ao carrinho</button>
                    </div>
                    <div style={{ marginTop: '18px' }}>
                        <h3>Carrinho</h3>
                        {carrinho.length ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Produto</th>
                                        <th>Quantidade</th>
                                        <th>Preço unit.</th>
                                        <th>Subtotal</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {carrinho.map((item) => (
                                        <tr key={item.produto_id}>
                                            <td>{item.nome}</td>
                                            <td>{item.quantidade}</td>
                                            <td>R$ {item.preco_unitario.toFixed(2)}</td>
                                            <td>R$ {(item.preco_unitario * item.quantidade).toFixed(2)}</td>
                                            <td><button type="button" className="secondary" onClick={() => handleRemoveItem(item.produto_id)}>Remover</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>Nenhum item no carrinho.</p>
                        )}
                        <p><strong>Total:</strong> R$ {total.toFixed(2)}</p>
                    </div>
                    <button type="submit" className="primary">Finalizar venda</button>
                </form>
                {status && <p><small>{status}</small></p>}
            </section>
        </div>
    );
}

export default PontoVenda;
