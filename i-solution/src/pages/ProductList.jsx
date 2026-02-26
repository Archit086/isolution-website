import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useDebounce } from '../hooks/useDebounce';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';

const ProductList = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 300);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        fetchProducts();
    }, [debouncedSearch, page, selectedCategory]);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            // Mocked endpoint behavior, adjust per backend
            const res = await api.get('/products/', {
                params: { search: debouncedSearch, page, category: selectedCategory }
            });
            setProducts(res.data.results || []);
            setTotalPages(Math.ceil((res.data.count || 0) / 10));
        } catch (error) {
            console.error('Failed to fetch products');
            // Set some mock data for UI demo if backend is not connected
            setProducts([
                { id: 1, name: 'Amoxicillin 500mg', price: 12.50, category: 'Antibiotics', stock: 150, complianceStatus: 'Approved' },
                { id: 2, name: 'Ibuprofen 400mg', price: 8.00, category: 'Painkillers', stock: 5, complianceStatus: 'Pending' },
                { id: 3, name: 'Lisinopril 10mg', price: 15.75, category: 'Cardiovascular', stock: 0, complianceStatus: 'Approved' },
                { id: 4, name: 'Metformin 850mg', price: 9.20, category: 'Diabetes', stock: 420, complianceStatus: 'Approved' },
                { id: 5, name: 'Atorvastatin 20mg', price: 22.10, category: 'Cardiovascular', stock: 80, complianceStatus: 'Approved' },
                { id: 6, name: 'Omeprazole 20mg', price: 14.30, category: 'Gastrointestinal', stock: 25, complianceStatus: 'Pending' }
            ]);
            setTotalPages(3);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-surface-muted flex flex-col md:flex-row">

            {/* Sidebar Filter Panel */}
            <aside className="w-full md:w-[260px] bg-white border-r border-border p-6 h-auto md:h-screen md:sticky top-0 shrink-0">
                <h1 className="text-2xl font-bold font-display text-primary mb-8 cursor-pointer" onClick={() => navigate('/')}>I-Solution</h1>

                <div className="mb-6">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3 block">Categories</label>
                    <div className="space-y-3">
                        {['All', 'Antibiotics', 'Painkillers', 'Cardiovascular', 'Diabetes', 'Gastrointestinal'].map(cat => (
                            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="radio"
                                    name="category"
                                    checked={selectedCategory === (cat === 'All' ? '' : cat)}
                                    onChange={() => { setSelectedCategory(cat === 'All' ? '' : cat); setPage(1); }}
                                    className="w-4 h-4 text-accent border-border focus:ring-accent transition"
                                />
                                <span className="text-text-primary group-hover:text-primary transition">{cat}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    onClick={() => { setSelectedCategory(''); setSearch(''); setPage(1); }}
                    className="w-full py-2.5 rounded-xl border border-border text-primary font-semibold hover:bg-surface-muted transition mt-4"
                >
                    Clear Filters
                </button>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-6 md:p-8 overflow-x-hidden">
                <div className="max-w-6xl mx-auto">

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                        <div>
                            <h2 className="text-3xl font-display font-bold text-primary">All Products</h2>
                            <div className="text-sm font-semibold text-text-secondary mt-1 bg-white border border-border rounded-full px-3 py-1 inline-block">
                                Showing {products.length} results
                            </div>
                        </div>

                        <div className="relative w-full sm:w-72">
                            <input
                                type="text"
                                placeholder="Search medicines..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition shadow-sm"
                            />
                            <svg className="w-5 h-5 text-border absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <Loader type="skeleton" rows={1} />
                            <Loader type="skeleton" rows={1} />
                            <Loader type="skeleton" rows={1} />
                            <Loader type="skeleton" rows={1} />
                            <Loader type="skeleton" rows={1} />
                            <Loader type="skeleton" rows={1} />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeInUp">
                            {products.map((p) => (
                                <ProductCard key={p.id} {...p} />
                            ))}
                            {products.length === 0 && (
                                <div className="col-span-full py-20 text-center">
                                    <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4 text-border">
                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-primary mb-2">No products found</h3>
                                    <p className="text-text-secondary">We couldn't match your criteria. Try adjusting filters or search terms.</p>
                                </div>
                            )}
                        </div>
                    )}

                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </div>
            </main>
        </div>
    );
};

export default ProductList;
