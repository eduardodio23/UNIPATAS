import { create } from 'zustand';

export const useUIStore = create((set) => ({
    sidebarCollapsed: false,
    theme: 'light',
    toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
    setTheme: (value) => set({ theme: value }),
    toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' }))
}));
