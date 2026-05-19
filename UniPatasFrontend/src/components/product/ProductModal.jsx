import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Camera, Barcode, Package, Calendar, FileImage2 } from 'lucide-react';
import Modal from '@/components/ui/Modal.jsx';
import Input from '@/components/ui/Input.jsx';
import Select from '@/components/ui/Select.jsx';
import Button from '@/components/ui/Button.jsx';
import { productSchema } from '@/schemas/productSchema.js';

export default function ProductModal({ open, onClose, onSave, initialData, categories, suppliers }) {
    const [preview, setPreview] = useState(initialData?.image || '');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: initialData?.name || '',
            category: initialData?.category || categories[0]?.name || '',
            supplier: initialData?.supplier || suppliers[0]?.name || '',
            price: initialData?.price || '',
            stock: initialData?.stock || 0,
            barcode: initialData?.barcode || '',
            expiry: initialData?.expiry || '',
            description: initialData?.description || '',
            image: initialData?.image || ''
        }
    });

    useEffect(() => {
        reset({
            name: initialData?.name || '',
            category: initialData?.category || categories[0]?.name || '',
            supplier: initialData?.supplier || suppliers[0]?.name || '',
            price: initialData?.price || '',
            stock: initialData?.stock || 0,
            barcode: initialData?.barcode || '',
            expiry: initialData?.expiry || '',
            description: initialData?.description || '',
            image: initialData?.image || ''
        });
        setPreview(initialData?.image || '');
    }, [initialData, reset, categories, suppliers]);

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setPreview(url);
    };

    const submit = (values) => {
        onSave({ ...initialData, ...values, image: preview });
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={initialData ? 'Editar produto' : 'Adicionar novo produto'}
            description="Preencha os dados do produto e organize seu estoque com precisão."
            actions={
                <Button type="button" variant="ghost" onClick={onClose}>
                    Cancelar
                </Button>
            }
        >
            <form className="grid gap-5" onSubmit={handleSubmit(submit)}>
                <div className="grid gap-5 lg:grid-cols-2">
                    <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                        Nome do produto
                        <Input placeholder="Ração premium" {...register('name')} />
                        {errors.name && <span className="text-sm text-rose-500">{errors.name.message}</span>}
                    </label>

                    <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                        Categoria
                        <Select {...register('category')}>
                            {categories.map((category) => (
                                <option key={category.id} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </Select>
                        {errors.category && <span className="text-sm text-rose-500">{errors.category.message}</span>}
                    </label>
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                    <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                        Fornecedor
                        <Select {...register('supplier')}>
                            {suppliers.map((supplier) => (
                                <option key={supplier.id} value={supplier.name}>
                                    {supplier.name}
                                </option>
                            ))}
                        </Select>
                        {errors.supplier && <span className="text-sm text-rose-500">{errors.supplier.message}</span>}
                    </label>

                    <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                        Código de barras
                        <div className="relative">
                            <Barcode className="pointer-events-none absolute left-4 top-3 text-slate-400" size={18} />
                            <Input className="pl-11" placeholder="7891234567890" {...register('barcode')} />
                        </div>
                        {errors.barcode && <span className="text-sm text-rose-500">{errors.barcode.message}</span>}
                    </label>
                </div>

                <div className="grid gap-5 lg:grid-cols-3">
                    <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                        Preço unitário
                        <div className="relative">
                            <span className="pointer-events-none absolute left-4 top-3 text-slate-400">R$</span>
                            <Input className="pl-10" type="number" step="0.01" placeholder="0.00" {...register('price')} />
                        </div>
                        {errors.price && <span className="text-sm text-rose-500">{errors.price.message}</span>}
                    </label>

                    <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                        Estoque
                        <Input type="number" placeholder="0" {...register('stock')} />
                        {errors.stock && <span className="text-sm text-rose-500">{errors.stock.message}</span>}
                    </label>

                    <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                        Validade
                        <div className="relative">
                            <Calendar className="pointer-events-none absolute left-4 top-3 text-slate-400" size={18} />
                            <Input type="date" {...register('expiry')} />
                        </div>
                        {errors.expiry && <span className="text-sm text-rose-500">{errors.expiry.message}</span>}
                    </label>
                </div>

                <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                    Descrição
                    <textarea
                        rows="4"
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                        placeholder="Breve descrição do produto"
                        {...register('description')}
                    />
                </label>

                <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
                    <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                        Imagem do produto
                        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center dark:border-slate-800 dark:bg-slate-900">
                            {preview ? (
                                <img src={preview} alt="Prévia do produto" className="mx-auto h-40 w-full max-w-[240px] rounded-3xl object-cover" />
                            ) : (
                                <div className="flex flex-col items-center justify-center gap-3 py-8 text-slate-500 dark:text-slate-400">
                                    <FileImage2 size={28} />
                                    <p>Upload de imagem para visualização rápida</p>
                                </div>
                            )}
                            <div className="mt-4">
                                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="product-image-upload" />
                                <label htmlFor="product-image-upload" className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200">
                                    <Camera size={18} /> Upload de imagem
                                </label>
                            </div>
                        </div>
                    </label>

                    <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                        <div className="mb-5 flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                            <Package size={18} /> Detalhes avançados
                        </div>
                        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">Informe todos os campos para manter o estoque precisos, rastreável e disponível em relatórios inteligentes.</p>
                        <div className="mt-6 space-y-4">
                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                <span className="rounded-full bg-brand/10 px-3 py-1 text-brand">Estoque inteligente</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600 dark:bg-slate-900 dark:text-slate-300">Relatórios imediatos</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Button type="submit">Salvar produto</Button>
                    <Button type="button" variant="secondary" onClick={onClose}>
                        Cancelar
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
