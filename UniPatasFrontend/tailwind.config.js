export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                brand: '#14B8A6',
                brandDark: '#0f766e',
                surface: '#f8fafc',
                surfaceDark: '#0b1720',
                chrome: '#f1f5f9'
            },
            boxShadow: {
                soft: '0 24px 80px rgba(2, 30, 45, 0.08)',
                inset: 'inset 0 1px 0 rgba(255,255,255,0.08)'
            },
            borderRadius: {
                xl: '1.5rem'
            }
        }
    },
    plugins: []
};
