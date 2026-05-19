import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/navigation/AppLayout.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Estoque from './pages/Estoque.jsx';
import Produtos from './pages/Produtos.jsx';
import Categorias from './pages/Categorias.jsx';
import Fornecedores from './pages/Fornecedores.jsx';
import Clientes from './pages/Clientes.jsx';
import Pets from './pages/Pets.jsx';
import Entradas from './pages/Entradas.jsx';
import Saidas from './pages/Saidas.jsx';
import Relatorios from './pages/Relatorios.jsx';
import Financeiro from './pages/Financeiro.jsx';
import Configuracoes from './pages/Configuracoes.jsx';
import Login from './pages/AuthLogin.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <AppLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="estoque" element={<Estoque />} />
                <Route path="produtos" element={<Produtos />} />
                <Route path="categorias" element={<Categorias />} />
                <Route path="fornecedores" element={<Fornecedores />} />
                <Route path="clientes" element={<Clientes />} />
                <Route path="pets" element={<Pets />} />
                <Route path="entradas" element={<Entradas />} />
                <Route path="saidas" element={<Saidas />} />
                <Route path="relatorios" element={<Relatorios />} />
                <Route path="financeiro" element={<Financeiro />} />
                <Route path="configuracoes" element={<Configuracoes />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
