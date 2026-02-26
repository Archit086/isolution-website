import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ id, name, price, category, stock, complianceStatus }) => {
    const navigate = useNavigate();

    const getStockBadge = () => {
        if (stock === 0) return <span className="bg-danger/10 text-danger rounded-full px-3 py-0.5 text-xs font-semibold">Out of Stock</span>;
        if (stock < 10) return <span className="bg-warning/10 text-warning rounded-full px-3 py-0.5 text-xs font-semibold">Low Stock</span>;
        return <span className="bg-success/10 text-success rounded-full px-3 py-0.5 text-xs font-semibold">In Stock</span>;
    };

    const getComplianceBadge = () => {
        if (complianceStatus === 'Approved') return <div className="w-2 h-2 rounded-full bg-success"></div>;
        return <div className="w-2 h-2 rounded-full bg-warning animate-pulseRing"></div>;
    };

    return (
        <div
            onClick={() => navigate(`/products/${id}`)}
            className="rounded-2xl bg-white shadow-sm hover:shadow-md hover:ring-1 hover:ring-accent/30 transition-all duration-200 cursor-pointer p-6 flex flex-col h-full"
        >
            <div className="flex justify-between items-start mb-4">
                <span className="rounded-full bg-accent-soft text-accent text-[10px] uppercase tracking-wider font-semibold px-3 py-1">
                    {category}
                </span>
                <div className="flex items-center gap-2" title={`Compliance: ${complianceStatus}`}>
                    {getComplianceBadge()}
                </div>
            </div>

            <div className="flex-1">
                <h4 className="font-semibold text-lg text-primary mb-2 line-clamp-2">{name}</h4>
            </div>

            <div className="mt-4 pt-4 border-t border-border flex justify-between items-end">
                <div>
                    <span className="block text-2xl font-bold font-display text-primary">${price}</span>
                    <div className="mt-1">{getStockBadge()}</div>
                </div>
                <button className="bg-transparent text-primary text-sm font-semibold hover:text-accent transition">
                    View Details &rarr;
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
