import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';
import { useUIStore } from '@/store/uiStore.js';

export default function AppLayout() {
    const { theme } = useUIStore();

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
            <div className="mx-auto flex min-h-screen max-w-[1800px]">
                <Sidebar />

                <div className="flex min-h-screen flex-1 flex-col bg-transparent">
                    <Header />
                    <main className="flex-1 px-6 pb-10 pt-2 sm:px-8">
                        <div className="mx-auto w-full max-w-[1800px] rounded-[2rem] bg-white/95 p-6 shadow-soft backdrop-blur-xl dark:bg-slate-900/90">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
