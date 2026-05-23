import { z } from 'zod';

const emptyToUndefined = (value) => {
    if (typeof value !== 'string') return value;
    return value.trim() === '' ? undefined : value.trim();
};

const normalizeCpf = (value) => {
    if (typeof value !== 'string') return value;
    const cleaned = value.replace(/\D/g, '');
    return cleaned === '' ? undefined : cleaned;
};

const normalizePhone = (value) => {
    if (typeof value !== 'string') return value;
    const cleaned = value.replace(/\D/g, '');
    return cleaned === '' ? undefined : cleaned;
};

export const customerSchema = z.object({
    name: z.preprocess(emptyToUndefined, z.string().trim().min(3, 'Nome obrigatório')),
    email: z.preprocess(
        emptyToUndefined,
        z.string().trim().email('Email inválido').optional()
    ),
    phone: z.preprocess(
        normalizePhone,
        z.string().regex(/^\d{8,15}$/, 'Telefone inválido').optional()
    ),
    cpf: z.preprocess(
        normalizeCpf,
        z.string().regex(/^\d{11}$/, 'CPF inválido').optional()
    ),
    address: z.preprocess(
        emptyToUndefined,
        z.string().trim().min(5, 'Endereço inválido').max(255).optional()
    )
});
