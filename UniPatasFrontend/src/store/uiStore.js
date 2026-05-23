import { create } from 'zustand';

const isBrowser = typeof window !== 'undefined';
const savedTheme = isBrowser ? window.localStorage.getItem('unipatas_theme') : null;
const defaultTheme = savedTheme === 'dark' ? 'dark' : 'light';

export const useUIStore = create((set) => ({
    sidebarCollapsed: false,
    theme: defaultTheme,
    toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
    setTheme: (value) => {
        const theme = value === 'dark' ? 'dark' : 'light';
        if (isBrowser) window.localStorage.setItem('unipatas_theme', theme);
        set({ theme });
    },
    toggleTheme: () => set((state) => {
        const theme = state.theme === 'light' ? 'dark' : 'light';
        if (isBrowser) window.localStorage.setItem('unipatas_theme', theme);
        return { theme };
    })
}));
