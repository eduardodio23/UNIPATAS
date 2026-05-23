import { z } from 'zod';

const emptyToUndefined = (value) => {
    if (typeof value !== 'string') return value;
    return value.trim() === '' ? undefined : value.trim();
};

export const supplierSchema = z.object({
    name: z.preprocess(emptyToUndefined, z.string().trim().min(3, 'Nome do fornecedor obrigatório')),
    contact: z.preprocess(emptyToUndefined, z.string().trim().min(5, 'Contato obrigatório')),
    email: z.preprocess(
        emptyToUndefined,
        z.string().trim().email('Email inválido').optional()
    ),
    status: z.enum(['Ativo', 'Atenção'])
});
