import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import api from '../api/axios';
import Loader from '../components/Loader';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, role } = useAuth();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        setIsLoading(true);
        try {
            const res = await api.get(`/products/${id}/`);
            setProduct(res.data);
        } catch (e) {
            console.error('Failed to fetch product details:', e);
            setProduct(null);
            toast.error('Failed to load product details.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            toast.info('Please log in to add items to your cart.');
            navigate('/login');
            return;
        }

        if (role !== 'customer' && role !== 'distributor') {
            toast.error('Only customers or distributors can authorize allocations.');
            return;
        }

        if (qty > product.stock) {
            toast.error('Requested quantity exceeds available stock');
            return;
        }

        addToCart(product, qty);
    };

    if (isLoading) return <Loader type="spinner" />;
    if (!product) return <div className="p-12 text-center text-xl text-text-secondary">Product not found.</div>;


    return (
        <div className="bg-cream-base min-h-screen py-16 px-6 font-body">
            <div className="max-w-6xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="text-text-secondary hover:text-charcoal mb-10 flex items-center gap-2 transition-colors font-bold uppercase tracking-widest text-xs"
                >
                    &larr; Back to Inventory
                </button>

                <div className="bg-cream-card rounded-none shadow-sm border border-warm-border overflow-hidden flex flex-col md:flex-row animate-fadeInUp">

                    {/* Left: Image / Status Area */}
                    <div className="md:w-[45%] bg-cream-deep p-8 flex flex-col relative min-h-[400px] border-b md:border-b-0 md:border-r border-warm-border">
                        <span className="absolute top-8 left-8 bg-sage-deep/10 text-sage-deep text-[10px] font-bold px-3 py-1 uppercase tracking-[0.2em] border border-sage-deep">
                            {product?.category || 'General'}
                        </span>

                        <div className={`absolute top-8 right-8 flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-widest border ${product?.compliance_status === 'Approved' ? 'bg-sage-deep/10 text-sage-deep border-sage-deep' : 'bg-amber-gold/10 text-amber-gold border-amber-gold'}`}>
                            <div className={`w-2 h-2 rounded-none ${product?.compliance_status === 'Approved' ? 'bg-sage-deep' : 'bg-amber-gold animate-pulseRing'}`}></div>
                            {product?.compliance_status || 'Pending'}
                        </div>

                        <div className="flex-1 flex items-center justify-center pt-16">
                            <svg className="w-56 h-56 text-sage-mist opacity-50" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 9h-2V7h-2v5H6v2h2v5h2v-5h2v-2z" />
                            </svg>
                        </div>
                    </div>

                    {/* Right: Info / Order Area */}
                    <div className="md:w-[55%] p-10 lg:p-16 flex flex-col justify-center">
                        <h1 className="text-4xl lg:text-5xl font-display font-bold text-charcoal mb-6 leading-tight">
                            {product?.name || 'Unknown Product'}
                        </h1>

                        <div className="text-4xl font-display font-bold text-charcoal mb-8 pb-8 border-b border-warm-border">
                            ${product?.price ? parseFloat(product.price).toFixed(2) : '0.00'}
                            <span className="text-sm font-body text-text-secondary uppercase tracking-widest ml-4 block mt-2">Per Unit / Box</span>
                        </div>

                        <p className="text-text-secondary leading-relaxed mb-10 text-lg">
                            {product?.description || product?.desc || 'No description available for this product.'}
                        </p>

                        {/* Specifications Table */}
                        <div className="bg-cream-deep border border-warm-border p-8 mb-10">
                            <div className="grid grid-cols-2 gap-y-6 text-sm">
                                <div>
                                    <span className="block text-text-secondary font-bold uppercase tracking-widest text-[10px] mb-2">Manufacturer</span>
                                    <span className="text-charcoal font-bold tracking-wide">{product?.manufacturer || 'I-Solution Partners'}</span>
                                </div>
                                <div>
                                    <span className="block text-text-secondary font-bold uppercase tracking-widest text-[10px] mb-2">Formulation</span>
                                    <span className="text-charcoal font-bold tracking-wide">{product?.dosage_form || 'Standard'}</span>
                                </div>
                                <div>
                                    <span className="block text-text-secondary font-bold uppercase tracking-widest text-[10px] mb-2">Storage Protocol</span>
                                    <span className="text-charcoal font-bold tracking-wide">{product?.storage || 'Room Temperature'}</span>
                                </div>
                                <div>
                                    <span className="block text-text-secondary font-bold uppercase tracking-widest text-[10px] mb-2">Documentation</span>
                                    <a href={product?.document_url || '#'} className="text-charcoal hover:text-sage-deep font-bold flex items-center gap-2 uppercase tracking-wide text-xs transition-colors">
                                        View Certificate <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Ordering Section */}
                        <div className="mt-auto">
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-bold text-charcoal uppercase tracking-widest text-[11px]">Volume Allocation</span>
                                <span className={`text-[11px] uppercase tracking-widest font-bold ${product.stock > 0 ? 'text-sage-deep' : 'text-terracotta'}`}>
                                    {product.stock} units available
                                </span>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex items-center border border-charcoal bg-transparent h-[56px] w-[140px] shrink-0">
                                    <button
                                        disabled={qty <= 1}
                                        onClick={() => setQty(q => q - 1)}
                                        className="w-12 h-full flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-cream-white disabled:opacity-30 transition-colors font-bold text-xl"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        min="1"
                                        max={product.stock}
                                        value={qty}
                                        onChange={(e) => setQty(Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1)))}
                                        className="w-full text-center border-none focus:ring-0 font-bold text-lg p-0 bg-transparent text-charcoal"
                                    />
                                    <button
                                        disabled={qty >= product.stock}
                                        onClick={() => setQty(q => q + 1)}
                                        className="w-12 h-full flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-cream-white disabled:opacity-30 transition-colors font-bold text-xl"
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="flex-1">
                                    {isAuthenticated ? (
                                        <button
                                            onClick={handleAddToCart}
                                            disabled={product.stock === 0}
                                            className="w-full h-[56px] bg-charcoal text-cream-white border border-charcoal font-bold uppercase tracking-widest hover:bg-espresso active:scale-[0.99] disabled:opacity-50 disabled:active:scale-100 transition shadow-none flex items-center justify-center text-xs"
                                        >
                                            {product.stock === 0 ? 'Out of Stock' : `Add ${qty} Units to Cart`}
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => navigate('/login')}
                                            className="w-full h-[56px] border border-charcoal text-charcoal bg-transparent font-bold uppercase tracking-widest hover:bg-charcoal hover:text-cream-white active:scale-[0.99] transition-colors flex items-center justify-center text-xs"
                                        >
                                            Authenticate to Order
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
