export const categories = [
    { id: 'cat-01', name: 'Alimentos', products: 342 },
    { id: 'cat-02', name: 'Saúde', products: 128 },
    { id: 'cat-03', name: 'Higiene', products: 97 },
    { id: 'cat-04', name: 'Acessórios', products: 205 }
];

export const suppliers = [
    { id: 'sup-01', name: 'Beagle Distribuidora', contact: 'contato@beagle.com.br', status: 'Ativo' },
    { id: 'sup-02', name: 'Focinho Log', contact: 'vendas@focinholog.com.br', status: 'Ativo' },
    { id: 'sup-03', name: 'PetNature', contact: 'suporte@petnature.com', status: 'Atenção' }
];

export const mockProductDetails = [
    {
        id: 1,
        category: 'Alimentos',
        supplier: 'Beagle Distribuidora',
        barcode: '7891234567890',
        expiry: '2025-04-12',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 2,
        category: 'Saúde',
        supplier: 'PetNature',
        barcode: '7894561230987',
        expiry: '2025-07-02',
        image: 'https://images.unsplash.com/photo-1556228724-4f2b4a5f7a1f?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 3,
        category: 'Higiene',
        supplier: 'Focinho Log',
        barcode: '7896543210987',
        expiry: '2026-01-15',
        image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=400&q=80'
    }
];
