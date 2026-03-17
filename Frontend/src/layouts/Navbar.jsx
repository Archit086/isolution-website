import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartCount } = useCart();
    const paths = location.pathname.split('/').filter(p => p);

    return (
        <div className="bg-brand-dark flex items-center justify-between px-[32px] py-[16px] sticky top-0 z-10 shadow-sm border-b border-warm-border/30">
            <div className="flex items-center text-sm font-body">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-brand-secondary hover:text-brand-primary transition-colors font-semibold mr-4"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Home
                </button>
                <div className="w-px h-4 bg-brand-body/30 mr-4"></div>
                {paths.map((path, idx) => {
                    const isLast = idx === paths.length - 1;
                    return (
                        <React.Fragment key={idx}>
                            <span className={`capitalize ${isLast ? 'text-brand-primary font-bold tracking-wide' : 'text-brand-secondary font-medium'}`}>
                                {path}
                            </span>
                            {!isLast && <span className="text-brand-body/50 mx-2">/</span>}
                        </React.Fragment>
                    );
                })}
            </div>

            <div className="flex items-center gap-6">
                <button
                    onClick={() => navigate('/cart')}
                    className="flex items-center gap-2 text-brand-secondary hover:text-brand-accent transition-colors font-bold uppercase tracking-widest text-xs"
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
