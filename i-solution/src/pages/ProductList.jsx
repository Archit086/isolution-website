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
            const res = await api.get('/products/', {
                params: { search: debouncedSearch, page, category: selectedCategory }
            });
            setProducts(res.data.results || []);
            setTotalPages(Math.ceil((res.data.count || 0) / 10));
        } catch (error) {
            console.error('Failed to fetch products:', error);
            setProducts([]);
            setTotalPages(1);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-cream-base flex flex-col md:flex-row font-body">

            {/* Sidebar Filter Panel */}
            <aside className="w-full md:w-[260px] bg-cream-card border-r border-warm-border p-6 h-auto md:h-screen md:sticky top-0 shrink-0">
                <h1 className="text-3xl font-script text-sage-mist italic mb-8 cursor-pointer hover:text-charcoal transition-colors" onClick={() => navigate('/')}>I-Solution</h1>

                <div className="mb-6">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-[0.1em] mb-4 block">Classifications</label>
                    <div className="space-y-4">
                        {['All', 'Antibiotics', 'Painkillers', 'Cardiovascular', 'Diabetes', 'Gastrointestinal'].map(cat => (
                            <label key={cat} className="flex items-center gap-4 cursor-pointer group">
                                <div className="relative flex items-center justify-center">
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={selectedCategory === (cat === 'All' ? '' : cat)}
                                        onChange={() => { setSelectedCategory(cat === 'All' ? '' : cat); setPage(1); }}
                                        className="peer appearance-none w-5 h-5 border border-warm-border rounded-none checked:bg-charcoal checked:border-charcoal transition-all cursor-pointer"
                                    />
                                    <svg className="absolute w-3 h-3 text-cream-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className={`text-sm tracking-wide font-medium transition ${selectedCategory === (cat === 'All' ? '' : cat) ? 'text-charcoal font-bold' : 'text-text-secondary group-hover:text-charcoal'}`}>{cat}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    onClick={() => { setSelectedCategory(''); setSearch(''); setPage(1); }}
                    className="w-full py-4 text-xs font-bold uppercase tracking-widest border border-charcoal text-charcoal hover:bg-charcoal hover:text-cream-white transition-colors mt-8"
                >
                    Clear Filters
                </button>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-6 md:p-8 overflow-x-hidden">
                <div className="max-w-6xl mx-auto">

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-warm-border pb-6">
                        <div>
                            <h2 className="text-4xl font-display font-bold text-charcoal">Formulations Grid</h2>
                            <div className="text-xs uppercase tracking-widest font-bold text-sage-deep mt-2 bg-sage-deep/5 border border-sage-deep px-3 py-1 inline-block">
                                Displaying {products.length} results
                            </div>
                        </div>

                        <div className="relative w-full sm:w-80">
                            <input
                                type="text"
                                placeholder="Search inventory..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-none border-b-2 border-warm-border bg-transparent focus:bg-cream-deep focus:border-sage-deep outline-none transition-colors"
                            />
                            <svg className="w-5 h-5 text-text-secondary absolute left-4 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <Loader type="skeleton" rows={1} />
                            <Loader type="skeleton" rows={1} />
                            <Loader type="skeleton" rows={1} />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeInUp">
                            {products.map((p) => (
                                <ProductCard key={p.id} {...p} />
                            ))}
                            {products.length === 0 && (
                                <div className="col-span-full py-24 text-center">
                                    <div className="w-16 h-16 bg-cream-deep flex items-center justify-center mx-auto mb-6 text-sage-mist border border-warm-border">
                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-display font-bold text-charcoal mb-2">No references found</h3>
                                    <p className="text-text-secondary tracking-wide">Adjust filters or search parameters to locate formulas.</p>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="mt-12 border-t border-warm-border pt-8">
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={setPage}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProductList;
