import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { toast } from 'react-hot-toast';
import Loader from '../components/Loader';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount } = useCart();
    const { isAuthenticated, role } = useAuth();
    const navigate = useNavigate();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const handleCheckout = async () => {
        if (cartItems.length === 0) return;
        if (!isAuthenticated) {
            toast.error('Authentication required strictly for clinical allocation. Please login.');
            navigate('/login');
            return;
        }

        setIsCheckingOut(true);
        try {
            const itemsPayload = cartItems.map(item => ({
                product: item.id,
                quantity: item.quantity
            }));

            await api.post('/orders/', { items: itemsPayload });

            toast.success('Order processed accurately. Awaiting verification.');
            clearCart();
            // Redirect to appropriate orders page depending on if they are in the dashboard or not
            if (role === 'customer' || role === 'distributor') {
                navigate('/dashboard/orders');
            } else {
                navigate('/dashboard/orders');
            }
        } catch (error) {
            console.error('Checkout failed:', error);
            const errorMsg = error.response?.data?.detail || error.response?.data?.error || 'Allocation error. Stock may be depleted.';
            toast.error(errorMsg);
        } finally {
            setIsCheckingOut(false);
        }
    };

    return (
        <div className="bg-cream-base min-h-screen py-16 px-6 font-body">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="text-text-secondary hover:text-charcoal mb-8 flex items-center gap-2 transition-colors font-bold uppercase tracking-widest text-xs"
                >
                    &larr; Return to Inventory
                </button>

                <h1 className="text-4xl font-display font-bold text-charcoal mb-10 border-b border-warm-border pb-6">
                    Allocation Cart ({cartCount} Items)
                </h1>

                {cartItems.length === 0 ? (
                    <div className="bg-cream-card p-12 text-center border border-warm-border">
                        <svg className="w-16 h-16 text-sage-mist mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <p className="text-xl font-bold text-text-secondary uppercase tracking-widest">Your cart is empty</p>
                        <button
                            onClick={() => navigate('/products')}
                            className="mt-6 bg-charcoal text-cream-white px-8 py-3 font-bold uppercase tracking-widest text-xs hover:bg-espresso transition-colors"
                        >
                            Browse Inventory
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-10">
                        {/* Cart Items */}
                        <div className="flex-1 space-y-6">
                            {cartItems.map((item) => (
                                <div key={item.id} className="bg-cream-card border border-warm-border p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative group">
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="absolute top-4 right-4 text-text-placeholder hover:text-terracotta transition-colors"
                                        title="Remove from cart"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>

                                    <div className="flex-1">
                                        <span className="bg-sage-deep/10 text-sage-deep text-[9px] font-bold px-2 py-1 uppercase tracking-[0.2em] border border-sage-deep mb-3 inline-block">
                                            {item.category || 'General'}
                                        </span>
                                        <h3 className="text-xl font-bold text-charcoal mb-1">{item.name}</h3>
                                        <p className="text-sm font-bold text-text-secondary tracking-widest uppercase">₹{item.price.toFixed(2)}/unit</p>
                                    </div>

                                    <div className="flex items-center gap-6 mt-4 sm:mt-0">
                                        <div className="flex items-center border border-charcoal bg-transparent h-[40px] w-[110px]">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-10 h-full flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-cream-white transition-colors font-bold"
                                            >
                                                -
                                            </button>
                                            <span className="flex-1 text-center font-bold text-charcoal">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-10 h-full flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-cream-white transition-colors font-bold"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div className="w-24 text-right">
                                            <span className="font-display font-bold text-2xl text-charcoal">₹{(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Checkout Summary */}
                        <div className="lg:w-[350px]">
                            <div className="bg-cream-deep border border-warm-border p-8 sticky top-8">
                                <h3 className="font-bold text-charcoal uppercase tracking-widest text-sm mb-6 pb-4 border-b border-warm-border">Summary</h3>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-center text-sm font-bold text-text-secondary uppercase tracking-widest">
                                        <span>Subtotal</span>
                                        <span className="text-charcoal">₹{cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-bold text-text-secondary uppercase tracking-widest">
                                        <span>Tax & Compliance</span>
                                        <span className="text-charcoal text-right">Calculated at Checkout</span>
                                    </div>
                                </div>

                                <div className="mb-8 pt-6 border-t border-warm-border flex justify-between items-end">
                                    <span className="font-bold text-charcoal uppercase tracking-widest text-sm">Estimated Total</span>
                                    <span className="font-display font-bold text-4xl text-charcoal">₹{cartTotal.toFixed(2)}</span>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    disabled={isCheckingOut || cartItems.length === 0}
                                    className="w-full bg-charcoal text-cream-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-espresso disabled:opacity-50 transition-colors flex items-center justify-center border border-charcoal"
                                >
                                    {isCheckingOut ? <Loader type="spinner" /> : 'Authorize Allocation'}
                                </button>

                                <p className="text-[10px] text-text-placeholder uppercase tracking-widest text-center mt-6">
                                    Clinical allocations subject to compliance review upon submission.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
