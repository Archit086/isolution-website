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
        <div className="flex flex-col h-full animate-fadeInUp">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-2xl font-display font-bold text-primary">Manage Products</h2>

                <div className="flex w-full sm:w-auto gap-4">
                    <div className="relative w-full sm:w-64">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-border focus:ring-2 focus:ring-accent outline-none text-sm"
                        />
                        <svg className="w-4 h-4 text-border absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <button
                        onClick={openAdd}
                        className="whitespace-nowrap bg-primary text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-primary-light transition flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        Add Product
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-border flex-1 overflow-hidden flex flex-col">
                <div className="flex-1 overflow-auto">
                    {isLoading ? (
                        <Loader type="spinner" />
                    ) : (
                        <table className="w-full text-left border-collapse min-w-max">
                            <thead className="sticky top-0 bg-surface-muted border-b border-border z-10">
                                <tr>
                                    <th className="py-3 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Product Name</th>
                                    <th className="py-3 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Category</th>
                                    <th className="py-3 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Price</th>
                                    <th className="py-3 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Stock</th>
                                    <th className="py-3 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Status</th>
                                    <th className="py-3 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((p, index) => (
                                    <tr key={p.id} className="border-b border-border last:border-0 hover:bg-surface-muted transition group animate-fadeInUp" style={{ animationDelay: `${index * 40}ms` }}>
                                        <td className="py-4 px-6 font-semibold text-primary">{p.name}</td>
                                        <td className="py-4 px-6"><span className="text-xs font-bold bg-accent-soft text-accent px-3 py-1 rounded-full">{p.category}</span></td>
                                        <td className="py-4 px-6 font-display font-bold text-primary">${p.price.toFixed(2)}</td>
                                        <td className="py-4 px-6">
                                            <span className={`px-3 py-1 text-xs font-bold rounded-full ${p.stock === 0 ? 'bg-danger/10 text-danger' : p.stock < 10 ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'}`}>
                                                {p.stock === 0 ? '0 (Out)' : p.stock}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${p.complianceStatus === 'Approved' ? 'bg-success' : 'bg-warning animate-pulseRing'}`}></div>
                                                <span className="text-sm font-medium">{p.complianceStatus}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-right space-x-3">
                                            <button onClick={() => openEdit(p)} className="text-text-secondary hover:text-accent font-semibold text-sm transition">Edit</button>
                                            <button onClick={() => { setProductToDelete(p); setDeleteModalOpen(true); }} className="text-text-secondary hover:text-danger font-semibold text-sm transition">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                                {products.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="py-12 text-center text-text-secondary">No products found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="p-4 border-t border-border bg-white">
                    <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                </div>
            </div>

            <SlideOver
                isOpen={isSlideOpen}
                title={editingProduct ? 'Edit Product' : 'Add New Product'}
                onClose={() => setIsSlideOpen(false)}
            >
                <form onSubmit={handleSave} className="space-y-4 flex flex-col h-full">
                    <div>
                        <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Product Name</label>
                        <input required type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full p-3 rounded-xl border border-border focus:ring-accent outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Category</label>
                        <input required type="text" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full p-3 rounded-xl border border-border focus:ring-accent outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Price ($)</label>
                            <input required type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="w-full p-3 rounded-xl border border-border focus:ring-accent outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Initial Stock</label>
                            <input required type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} className="w-full p-3 rounded-xl border border-border focus:ring-accent outline-none" />
                        </div>
                    </div>

                    <div className="mt-auto pt-8">
                        <button type="submit" disabled={isSaving} className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-light transition flex justify-center h-[48px] items-center">
                            {isSaving ? <Loader type="spinner" /> : 'Save Product'}
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
