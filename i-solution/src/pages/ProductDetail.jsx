import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import Loader from '../components/Loader';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [qty, setQty] = useState(1);
    const [isOrdering, setIsOrdering] = useState(false);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        setIsLoading(true);
        try {
            const res = await api.get(`/products/${id}/`);
            setProduct(res.data);
        } catch (e) {
            // Mock Data 
            setTimeout(() => {
                setProduct({
                    id,
                    name: 'Amoxicillin 500mg - Extended Release Formulation',
                    desc: 'A powerful, broad-spectrum antibiotic used to treat numerous bacterial infections. Formulated for extended release and maximum efficacy. Comes in a secure, tamper-evident package directly sourced from primary manufacturers.',
                    price: 12.50,
                    category: 'Antibiotics',
                    stock: 150,
                    complianceStatus: 'Pending',
                    manufacturer: 'PharmaCorp Global',
                    dosage_form: 'Capsule',
                    storage: 'Store below 25°C',
                    rx_required: true,
                    document_url: '#'
                });
                setIsLoading(false);
            }, 600);
        }
    };

    const handleOrder = async () => {
        if (!isAuthenticated) {
            toast.info('Please log in to place an order');
            navigate('/login');
            return;
        }
        if (qty > product.stock) {
            toast.error('Requested quantity exceeds available stock');
            return;
        }

        setIsOrdering(true);
        try {
            await api.post('/orders/', { items: [{ product: product.id, quantity: qty }] });
            toast.success('Order placed successfully!');
            setProduct(prev => ({ ...prev, stock: prev.stock - qty }));
            setQty(1);
        } catch (e) {
            toast.error('Failed to process order. Try again.');
        } finally {
            setIsOrdering(false);
        }
    };

    if (isLoading) return <Loader type="spinner" />;
    if (!product) return <div className="p-12 text-center text-xl text-text-secondary">Product not found.</div>;

    return (
        <div className="bg-surface-muted min-h-screen py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="text-text-secondary hover:text-primary mb-8 flex items-center gap-2 transition font-semibold"
                >
                    &larr; Back to Products
                </button>

                <div className="bg-white rounded-3xl shadow-md border border-border overflow-hidden flex flex-col md:flex-row animate-fadeInUp">

                    {/* Left: Image / Status Area */}
                    <div className="md:w-[45%] bg-[#F0F4F8] p-8 flex flex-col relative min-h-[400px]">
                        <span className="absolute top-6 left-6 rounded-full bg-accent-soft text-accent text-xs font-semibold px-4 py-1.5 uppercase tracking-wider">
                            {product.category}
                        </span>

                        <div className={`absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border ${product.complianceStatus === 'Approved' ? 'bg-success/10 text-success border-success/20' : 'bg-warning/10 text-warning border-warning/20'}`}>
                            <div className={`w-2 h-2 rounded-full ${product.complianceStatus === 'Approved' ? 'bg-success' : 'bg-warning animate-pulseRing'}`}></div>
                            {product.complianceStatus}
                        </div>

                        <div className="flex-1 flex items-center justify-center">
                            <svg className="w-48 h-48 text-primary/10" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 9h-2V7h-2v5H6v2h2v5h2v-5h2v-2z" />
                            </svg>
                        </div>
                    </div>

                    {/* Right: Info / Order Area */}
                    <div className="md:w-[55%] p-10 lg:p-14 flex flex-col justify-center">
                        <h1 className="text-3xl lg:text-4xl font-display font-bold text-primary mb-4 leading-tight">
                            {product.name}
                        </h1>

                        <div className="text-4xl font-display font-bold text-accent mb-6">
                            ${product.price.toFixed(2)}
                        </div>

                        <p className="text-text-secondary leading-relaxed mb-8">
                            {product.desc}
                        </p>

                        {/* Specifications Table */}
                        <div className="bg-surface-muted rounded-2xl p-6 mb-8 border border-border">
                            <div className="grid grid-cols-2 gap-y-4 text-sm">
                                <div>
                                    <span className="block text-text-secondary font-semibold uppercase tracking-wider text-[10px] mb-1">Manufacturer</span>
                                    <span className="text-primary font-medium">{product.manufacturer}</span>
                                </div>
                                <div>
                                    <span className="block text-text-secondary font-semibold uppercase tracking-wider text-[10px] mb-1">Form</span>
                                    <span className="text-primary font-medium">{product.dosage_form}</span>
                                </div>
                                <div>
                                    <span className="block text-text-secondary font-semibold uppercase tracking-wider text-[10px] mb-1">Storage</span>
                                    <span className="text-primary font-medium">{product.storage}</span>
                                </div>
                                <div>
                                    <span className="block text-text-secondary font-semibold uppercase tracking-wider text-[10px] mb-1">Document</span>
                                    <a href={product.document_url} className="text-accent hover:underline font-semibold flex items-center gap-1">
                                        View Cert <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Ordering Section */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-semibold text-primary">Quantity Selector</span>
                                <span className={`text-sm font-semibold ${product.stock > 0 ? 'text-success' : 'text-danger'}`}>
                                    {product.stock} units available
                                </span>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex items-center border border-border rounded-xl bg-white overflow-hidden h-[52px]">
                                    <button
                                        disabled={qty <= 1}
                                        onClick={() => setQty(q => q - 1)}
                                        className="w-12 h-full flex items-center justify-center text-primary hover:bg-surface-muted disabled:opacity-50 transition"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        min="1"
                                        max={product.stock}
                                        value={qty}
                                        onChange={(e) => setQty(Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1)))}
                                        className="w-16 h-full text-center border-none focus:ring-0 font-semibold p-0"
                                    />
                                    <button
                                        disabled={qty >= product.stock}
                                        onClick={() => setQty(q => q + 1)}
                                        className="w-12 h-full flex items-center justify-center text-primary hover:bg-surface-muted disabled:opacity-50 transition"
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="flex-1">
                                    {isAuthenticated ? (
                                        <button
                                            onClick={handleOrder}
                                            disabled={isOrdering || product.stock === 0}
                                            className="w-full h-[52px] bg-primary text-white rounded-xl font-bold hover:bg-primary-light active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 transition shadow-lg flex items-center justify-center"
                                        >
                                            {isOrdering ? <Loader type="spinner" /> : (product.stock === 0 ? 'Out of Stock' : `Order ${qty} Units`)}
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => navigate('/login')}
                                            className="w-full h-[52px] border border-primary text-primary bg-white rounded-xl font-bold hover:bg-surface-muted active:scale-[0.98] transition flex items-center justify-center"
                                        >
                                            Login to Order
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
