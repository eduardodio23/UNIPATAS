import { z } from 'zod';

export const petSchema = z.object({
    ownerId: z.string().optional(),
    name: z.string().min(2, 'Nome do pet obrigatório'),
    specie: z.string().min(2, 'Espécie obrigatória'),
    breed: z.string().min(2, 'Raça obrigatória'),
    age: z.string().optional(),
    notes: z.string().max(280).optional()
});
