import { z } from 'zod';

export const productSchema = z.object({
    name: z.string().min(3, 'Nome obrigatório').max(100),
    category: z.string().min(2, 'Categoria obrigatória'),
    supplier: z.string().min(2, 'Fornecedor obrigatório'),
    price: z.preprocess((value) => Number(value), z.number().positive('Preço deve ser maior que zero')),
    stock: z.preprocess((value) => Number(value), z.number().int('Estoque deve ser inteiro').nonnegative('Estoque não pode ser negativo')),
    barcode: z.string().min(8, 'Código de barras obrigatório'),
    expiry: z.string().min(4, 'Validade obrigatória'),
    description: z.string().max(280).optional(),
    image: z.string().optional()
});
