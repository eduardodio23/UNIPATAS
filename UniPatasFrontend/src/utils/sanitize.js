export function sanitizeString(value) {
    if (typeof value !== 'string') return value;
    return value.replace(/<[^>]*>/g, '').trim();
}

export function sanitizeFormValues(values) {
    return Object.fromEntries(
        Object.entries(values).map(([key, value]) => [key, typeof value === 'string' ? sanitizeString(value) : value])
    );
}
