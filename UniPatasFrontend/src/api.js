import axios from 'axios';
import { toast } from 'react-hot-toast';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const message =
            error.response?.data?.error || error.message || 'Erro de comunicação com o servidor.';
        toast.error(message);
        return Promise.reject(error);
    }
);

export const api = {
    getClientes: () => apiClient.get('/clientes').then((res) => res.data),
    createCliente: (body) => apiClient.post('/clientes', body).then((res) => res.data),
    getPets: () => apiClient.get('/pets').then((res) => res.data),
    createPet: (body) => apiClient.post('/pets', body).then((res) => res.data),
    getProdutos: () => apiClient.get('/produtos').then((res) => res.data),
    createProduto: (body) => apiClient.post('/produtos', body).then((res) => res.data),
    getEstoque: () => apiClient.get('/estoque').then((res) => res.data),
    getMovimentacoes: () => apiClient.get('/movimentacoes').then((res) => res.data),
    stockSaida: (body) => apiClient.post('/estoque/saida', body).then((res) => res.data),
    getVendas: () => apiClient.get('/vendas').then((res) => res.data),
    createVenda: (body) => apiClient.post('/vendas', body).then((res) => res.data)
};
