import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartCount } = useCart();
    const paths = location.pathname.split('/').filter(p => p);

    return (
        <div className="h-16 bg-cream-white border-b border-warm-border flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-body">
                {paths.map((path, idx) => {
                    const isLast = idx === paths.length - 1;
                    return (
                        <React.Fragment key={idx}>
                            <span className={`capitalize ${isLast ? 'text-charcoal font-bold tracking-wide' : 'text-text-secondary font-medium'}`}>
                                {path}
                            </span>
                            {!isLast && <span className="text-warm-border">/</span>}
                        </React.Fragment>
                    );
                })}
            </div>

            <div className="flex items-center gap-6">
                <button
                    onClick={() => navigate('/cart')}
                    className="flex items-center gap-2 text-text-secondary hover:text-charcoal transition-colors font-bold uppercase tracking-widest text-xs"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Cart
                    {cartCount > 0 && (
                        <span className="bg-sage-deep text-cream-white px-2 py-0.5 ml-1 text-[10px] items-center justify-center flex">
                            {cartCount}
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default Navbar;
