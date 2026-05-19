import { z } from 'zod';

export const customerSchema = z.object({
    name: z.string().min(3, 'Nome obrigatório'),
    email: z.string().email('Email inválido').optional(),
    phone: z.string().min(8, 'Telefone obrigatório').optional(),
    address: z.string().max(255).optional()
});
