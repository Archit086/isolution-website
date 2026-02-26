import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ id, name, price, category, stock, complianceStatus }) => {
    const navigate = useNavigate();

    const getStockBadge = () => {
        if (stock === 0) return <span className="bg-terracotta/5 border border-terracotta text-terracotta rounded-none px-3 py-1 text-[10px] uppercase tracking-widest font-bold">Out of Stock</span>;
        if (stock < 10) return <span className="bg-amber-gold/5 border border-amber-gold text-amber-gold rounded-none px-3 py-1 text-[10px] uppercase tracking-widest font-bold">Low Stock</span>;
        return <span className="bg-sage-deep/5 border border-sage-deep text-sage-deep rounded-none px-3 py-1 text-[10px] uppercase tracking-widest font-bold">In Stock</span>;
    };

    const getComplianceBadge = () => {
        if (complianceStatus === 'Approved') return <div className="w-2 h-2 rounded-none bg-sage-deep"></div>;
        return <div className="w-2 h-2 rounded-none bg-amber-gold animate-pulseRing"></div>;
    };

    return (
        <div
            onClick={() => navigate(`/products/${id}`)}
            className="rounded-none bg-cream-card border border-warm-border shadow-sm hover:shadow-md hover:border-charcoal transition-all duration-300 cursor-pointer p-6 flex flex-col h-full group"
        >
            <div className="flex justify-between items-start mb-6">
                <span className="bg-sage-deep/10 text-sage-deep border border-sage-deep text-[10px] uppercase tracking-[0.15em] font-bold px-3 py-1">
                    {category}
                </span>
                <div className="flex items-center gap-2" title={`Compliance: ${complianceStatus}`}>
                    {getComplianceBadge()}
                </div>
            </div>

            <div className="flex-1 mb-6">
                <h4 className="font-bold text-xl text-charcoal mb-2 leading-snug group-hover:text-espresso transition-colors">{name}</h4>
            </div>

            <div className="mt-auto pt-6 border-t border-warm-border flex justify-between items-end">
                <div>
                    <span className="block text-3xl font-bold font-display text-charcoal mb-2">${price}</span>
                    <div className="mt-1">{getStockBadge()}</div>
                </div>
                <button className="bg-transparent text-charcoal text-xs uppercase tracking-widest font-bold hover:text-sage-deep transition-colors pb-1 border-b-2 border-transparent hover:border-sage-deep">
                    View &rarr;
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
