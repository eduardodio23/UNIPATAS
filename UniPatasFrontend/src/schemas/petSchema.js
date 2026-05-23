import { z } from 'zod';

const emptyToUndefined = (value) => {
    if (typeof value !== 'string') return value;
    return value.trim() === '' ? undefined : value.trim();
};

export const petSchema = z.object({
    ownerId: z.preprocess(emptyToUndefined, z.string().trim().optional()),
    name: z.preprocess(emptyToUndefined, z.string().trim().min(2, 'Nome do pet obrigatório')),
    specie: z.preprocess(emptyToUndefined, z.string().trim().min(2, 'Espécie obrigatória')),
    breed: z.preprocess(emptyToUndefined, z.string().trim().min(2, 'Raça obrigatória')),
    age: z.preprocess(
        emptyToUndefined,
        z.coerce.number({ invalid_type_error: 'Idade inválida' }).int('Idade inválida').min(0, 'Idade inválida').max(40, 'Idade inválida').optional()
    ),
    notes: z.preprocess(emptyToUndefined, z.string().trim().max(280, 'Observações devem ter até 280 caracteres').optional())
});
