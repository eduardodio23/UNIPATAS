export const metricsData = [
    {
        id: 'produtos',
        label: 'Produtos cadastrados',
        value: '1.248',
        trend: '+12%',
        description: 'crescimento em 30 dias'
    },
    {
        id: 'estoque-baixo',
        label: 'Estoque baixo',
        value: '84',
        trend: '-8%',
        description: 'alimentos e suplementos'
    },
    {
        id: 'vendas',
        label: 'Total de vendas',
        value: '3.712',
        trend: '+18%',
        description: 'ordens processadas'
    },
    {
        id: 'faturamento',
        label: 'Faturamento mensal',
        value: 'R$ 256.300',
        trend: '+24%',
        description: 'meta próxima de R$ 280k'
    }
];

export const revenueSeries = [
    { month: 'Jan', revenue: 92000 },
    { month: 'Fev', revenue: 104000 },
    { month: 'Mar', revenue: 118000 },
    { month: 'Abr', revenue: 138000 },
    { month: 'Mai', revenue: 158000 },
    { month: 'Jun', revenue: 176000 }
];

export const stockSeries = [
    { category: 'Alimentos', stock: 420 },
    { category: 'Medicamentos', stock: 275 },
    { category: 'Higiene', stock: 190 },
    { category: 'Acessórios', stock: 135 }
];

export const topProductsData = [
    { name: 'Ração premium', value: 420 },
    { name: 'Vitamina pet', value: 340 },
    { name: 'Petiscos naturais', value: 230 },
    { name: 'Coleira smart', value: 180 }
];

export const recentActivity = [
    { id: 'mov-01', title: 'Entrada de estoque', subtitle: 'Vira-Lata Gourmet', label: 'Entrada', amount: '+ 24', time: '19 minutos atrás' },
    { id: 'mov-02', title: 'Venda processada', subtitle: 'Ração Golden Pet', label: 'Venda', amount: '- 5', time: '1h atrás' },
    { id: 'mov-03', title: 'Novo fornecedor', subtitle: 'Beagle Distribuidora', label: 'Fornecedor', amount: '+ 1', time: '2h atrás' },
    { id: 'mov-04', title: 'Estoque crítico', subtitle: 'Shampoo felino', label: 'Atenção', amount: '- 3', time: '4h atrás' }
];
