import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';

const AuthContext = createContext(null);

const STORAGE_KEY = 'unipatas-auth';

const defaultUser = {
    name: 'UniPatas Admin',
    email: 'admin@unipatas.com'
};

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setUser(parsed?.user || null);
                setIsAuthenticated(Boolean(parsed?.isAuthenticated));
            } catch (err) {
                // valor inválido no localStorage; limpar para evitar que a app quebre
                window.localStorage.removeItem(STORAGE_KEY);
                setUser(null);
                setIsAuthenticated(false);
            }
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ isAuthenticated, user }));
    }, [isAuthenticated, user]);

    const login = ({ email, password }) => {
        if (email === 'admin@unipatas.com' && password === 'unipatas123') {
            setUser(defaultUser);
            setIsAuthenticated(true);
            toast.success('Bem-vindo ao UniPatas!');
            return true;
        }

        toast.error('Credenciais incorretas. Use admin@unipatas.com / unipatas123');
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        window.localStorage.removeItem(STORAGE_KEY);
        toast('Sessão encerrada.');
    };

    const value = useMemo(
        () => ({ user, isAuthenticated, login, logout }),
        [user, isAuthenticated]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth precisa ser usado dentro de AuthProvider');
    }
    return context;
}
