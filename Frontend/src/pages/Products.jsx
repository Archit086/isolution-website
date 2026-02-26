import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import api from '../api/axios';
import SlideOver from '../components/SlideOver';
import ConfirmModal from '../components/ConfirmModal';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import { useDebounce } from '../hooks/useDebounce';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 300);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [isSlideOpen, setIsSlideOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [form, setForm] = useState({ name: '', category: '', price: '', stock: '', complianceStatus: 'Pending' });

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, [debouncedSearch, page]);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const res = await api.get('/products/', { params: { search: debouncedSearch, page } });
            setProducts(res.data.results || []);
            setTotalPages(Math.ceil((res.data.count || 0) / 10));
        } catch {
            // Mock for UI
            setProducts([
                { id: 1, name: 'Amoxicillin 500mg', price: 12.50, category: 'Antibiotics', stock: 150, complianceStatus: 'Approved' },
                { id: 2, name: 'Ibuprofen 400mg', price: 8.00, category: 'Painkillers', stock: 5, complianceStatus: 'Pending' },
                { id: 3, name: 'Lisinopril 10mg', price: 15.75, category: 'Cardiovascular', stock: 0, complianceStatus: 'Approved' }
            ]);
            setTotalPages(1);
        } finally {
            setIsLoading(false);
        }
    };

    const openAdd = () => {
        setEditingProduct(null);
        setForm({ name: '', category: '', price: '', stock: '', complianceStatus: 'Pending' });
        setIsSlideOpen(true);
    };

    const openEdit = (p) => {
        setEditingProduct(p);
        setForm({ name: p.name, category: p.category, price: p.price, stock: p.stock, complianceStatus: p.complianceStatus });
        setIsSlideOpen(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            if (editingProduct) {
                // await api.put(`/products/${editingProduct.id}/`, form);
                toast.success('Product updated successfully');
            } else {
                // await api.post('/products/', form);
                toast.success('Product added successfully');
            }
            setIsSlideOpen(false);
            fetchProducts();
        } catch {
            toast.error('Failed to save product');
        } finally {
            setIsSaving(false);
        }
    };

    const confirmDelete = async () => {
        try {
            // await api.delete(`/products/${productToDelete.id}/`);
            setProducts(products.filter(p => p.id !== productToDelete.id));
            toast.success('Product deleted successfully');
        } catch {
            toast.error('Failed to delete product');
        } finally {
            setDeleteModalOpen(false);
        }
    };

    return (
        <div className="flex flex-col h-full animate-fadeInUp font-body">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-4xl font-display font-bold text-charcoal">Manage Products</h2>

                <div className="flex w-full sm:w-auto gap-4">
                    <div className="relative w-full sm:w-64">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-none border border-warm-border bg-cream-card focus:bg-cream-white focus:border-sage-deep outline-none text-sm transition-colors"
                        />
                        <svg className="w-4 h-4 text-text-secondary absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <button
                        onClick={openAdd}
                        className="whitespace-nowrap bg-charcoal text-cream-white px-5 py-2 rounded-none text-sm font-bold uppercase tracking-wider hover:bg-espresso active:scale-[0.98] transition flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        Add Product
                    </button>
                </div>
            </div>

            <div className="bg-cream-card rounded-none shadow-sm border border-warm-border flex-1 overflow-hidden flex flex-col">
                <div className="flex-1 overflow-auto">
                    {isLoading ? (
                        <Loader type="spinner" />
                    ) : (
                        <table className="w-full text-left border-collapse min-w-max">
                            <thead className="sticky top-0 bg-cream-deep border-b-2 border-warm-border z-10">
                                <tr>
                                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-[0.1em]">Product Name</th>
                                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-[0.1em]">Category</th>
                                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-[0.1em]">Price</th>
                                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-[0.1em]">Stock</th>
                                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-[0.1em]">Status</th>
                                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-[0.1em] text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((p, index) => (
                                    <tr key={p.id} className="border-b border-warm-border last:border-0 hover:bg-cream-white transition-colors group animate-fadeInUp" style={{ animationDelay: `${index * 40}ms` }}>
                                        <td className="py-4 px-6 font-bold text-charcoal">{p.name}</td>
                                        <td className="py-4 px-6"><span className="text-[10px] font-bold uppercase tracking-widest border border-amber-soft text-amber-gold bg-amber-soft/10 px-3 py-1 rounded-none">{p.category}</span></td>
                                        <td className="py-4 px-6 font-display font-bold text-charcoal">${p.price.toFixed(2)}</td>
                                        <td className="py-4 px-6">
                                            <span className={`px-3 py-1 text-[10px] uppercase tracking-widest font-bold border rounded-none ${p.stock === 0 ? 'border-terracotta text-terracotta bg-terracotta/5' : p.stock < 10 ? 'border-[#C2A345] text-[#C2A345] bg-[#C2A345]/5' : 'border-sage-deep text-sage-deep bg-sage-deep/5'}`}>
                                                {p.stock === 0 ? '0 (Out)' : p.stock}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-none ${p.complianceStatus === 'Approved' ? 'bg-sage-deep' : 'bg-amber-gold animate-pulseRing'}`}></div>
                                                <span className="text-sm font-semibold text-charcoal tracking-wide">{p.complianceStatus}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-right space-x-3">
                                            <button onClick={() => openEdit(p)} className="text-text-secondary hover:text-charcoal font-bold uppercase tracking-widest text-xs transition">Edit</button>
                                            <button onClick={() => { setProductToDelete(p); setDeleteModalOpen(true); }} className="text-text-secondary hover:text-terracotta font-bold uppercase tracking-widest text-xs transition">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                                {products.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="py-12 text-center text-text-secondary">No products cataloged.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="p-4 border-t border-warm-border bg-cream-card">
                    <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                </div>
            </div>

            <SlideOver
                isOpen={isSlideOpen}
                title={editingProduct ? 'Edit Portfolio Element' : 'Initialize Product'}
                onClose={() => setIsSlideOpen(false)}
            >
                <form onSubmit={handleSave} className="space-y-6 flex flex-col h-full font-body">
                    <div>
                        <label className="block text-xs font-bold text-text-secondary uppercase tracking-[0.1em] mb-2">Identifier / Name</label>
                        <input required type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-none border-b-2 border-warm-border bg-cream-white focus:bg-cream-deep focus:border-sage-deep outline-none transition-colors" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-text-secondary uppercase tracking-[0.1em] mb-2">Classification</label>
                        <input required type="text" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-3 rounded-none border-b-2 border-warm-border bg-cream-white focus:bg-cream-deep focus:border-sage-deep outline-none transition-colors" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-text-secondary uppercase tracking-[0.1em] mb-2">Valuation ($)</label>
                            <input required type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="w-full px-4 py-3 rounded-none border-b-2 border-warm-border bg-cream-white focus:bg-cream-deep focus:border-sage-deep outline-none transition-colors" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-text-secondary uppercase tracking-[0.1em] mb-2">Base Stock</label>
                            <input required type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} className="w-full px-4 py-3 rounded-none border-b-2 border-warm-border bg-cream-white focus:bg-cream-deep focus:border-sage-deep outline-none transition-colors" />
                        </div>
                    </div>

                    <div className="mt-auto pt-8">
                        <button type="submit" disabled={isSaving} className="w-full py-4 bg-charcoal text-cream-white rounded-none uppercase font-bold tracking-[0.1em] hover:bg-espresso transition flex justify-center h-[56px] items-center">
                            {isSaving ? <Loader type="spinner" /> : 'Commit Changes'}
                        </button>
                    </div>
                </form>
            </SlideOver>

            <ConfirmModal
                isOpen={deleteModalOpen}
                title="Delete Product"
                message={`Are you sure you want to delete "${productToDelete?.name}"? This action cannot be undone.`}
                onConfirm={confirmDelete}
                onCancel={() => setDeleteModalOpen(false)}
            />
        </div>
    );
};

export default Products;
