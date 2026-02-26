import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import Loader from '../components/Loader';

const Orders = () => {
    const { role } = useAuth();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('All');

    const tabs = ['All', 'Pending', 'Shipped', 'Delivered', 'Cancelled'];

    useEffect(() => {
        fetchOrders();
    }, [activeTab]);

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            // Mock API call
            setTimeout(() => {
                const data = [
                    { id: 'ORD-5829', customer: 'John Smith', product: 'Amoxicillin 500mg', qty: 200, status: 'Completed', date: '2023-10-24' },
                    { id: 'ORD-5830', customer: 'HealthPlus Pharmacy', product: 'Ibuprofen 400mg', qty: 5000, status: 'Pending', date: '2023-10-25' },
                    { id: 'ORD-5831', customer: 'Alice Wong', product: 'Lisinopril 10mg', qty: 10, status: 'Shipped', date: '2023-10-26' },
                ];

                const filtered = activeTab === 'All'
                    ? data
                    : data.filter(o => {
                        if (activeTab === 'Completed') return o.status === 'Completed' || o.status === 'Delivered';
                        return o.status === activeTab;
                    });

                setOrders(filtered);
                setIsLoading(false);
            }, 400);
        } catch {
            setIsLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        const s = status.toLowerCase();
        if (s === 'pending') return <span className="border border-amber-gold text-amber-gold bg-amber-soft/10 px-3 py-1 rounded-none text-[10px] font-bold uppercase tracking-widest">Validating</span>;
        if (s === 'shipped') return <span className="border border-[#7C9082] text-[#7C9082] bg-sage-mist/20 px-3 py-1 rounded-none text-[10px] font-bold uppercase tracking-widest">In Transit</span>;
        if (s === 'completed' || s === 'delivered') return <span className="border border-sage-deep text-sage-deep bg-sage-deep/5 px-3 py-1 rounded-none text-[10px] font-bold uppercase tracking-widest">Cleared</span>;
        return <span className="border border-terracotta text-terracotta bg-terracotta/5 px-3 py-1 rounded-none text-[10px] font-bold uppercase tracking-widest">{status}</span>;
    };

    return (
        <div className="flex flex-col h-full animate-fadeInUp font-body">
            <div className="mb-6">
                <h2 className="text-4xl font-display font-bold text-charcoal mb-2">
                    {role === 'customer' ? 'My Orders' : role === 'distributor' ? 'Bulk Provisions' : 'All Provisions'}
                </h2>

                {/* Animated Tabs */}
                <div className="flex space-x-1 border-b-2 border-warm-border mt-8 relative">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-4 px-6 text-sm font-bold uppercase tracking-widest transition-colors relative ${activeTab === tab ? 'text-charcoal' : 'text-text-secondary hover:text-charcoal'}`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-charcoal"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-cream-card rounded-none shadow-sm border border-warm-border flex-1 overflow-hidden flex flex-col">
                <div className="flex-1 overflow-auto">
                    {isLoading ? (
                        <Loader type="spinner" />
                    ) : (
                        <table className="w-full text-left border-collapse min-w-max">
                            <thead className="sticky top-0 bg-cream-deep border-b-2 border-warm-border z-10">
                                <tr>
                                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-[0.1em]">Identifier</th>
                                    {role !== 'customer' && <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-[0.1em]">Entity</th>}
                                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-[0.1em]">Classification</th>
                                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-[0.1em]">Volume</th>
                                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-[0.1em]">Timestamp</th>
                                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-[0.1em]">State</th>
                                    {role === 'admin' && <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-[0.1em] text-right">Actions</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((o, index) => (
                                    <tr key={o.id} className="border-b border-warm-border last:border-0 hover:bg-cream-white transition-colors group animate-fadeInUp" style={{ animationDelay: `${index * 40}ms` }}>
                                        <td className="py-4 px-6 font-mono font-bold text-charcoal text-sm">{o.id}</td>
                                        {role !== 'customer' && <td className="py-4 px-6 text-sm font-bold text-ink">{o.customer}</td>}
                                        <td className="py-4 px-6 text-sm text-text-secondary">{o.product}</td>
                                        <td className="py-4 px-6 font-display font-bold text-charcoal">{o.qty}</td>
                                        <td className="py-4 px-6 text-sm text-text-secondary">{o.date}</td>
                                        <td className="py-4 px-6">{getStatusBadge(o.status)}</td>
                                        {role === 'admin' && (
                                            <td className="py-4 px-6 text-right">
                                                <button className="text-terracotta hover:text-ink font-bold uppercase tracking-widest text-xs transition opacity-0 group-hover:opacity-100">Delete</button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                                {orders.length === 0 && (
                                    <tr>
                                        <td colSpan={role === 'admin' ? 7 : (role === 'customer' ? 5 : 6)} className="py-12 text-center text-text-secondary">
                                            No provisions cataloged in this sector.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Orders;
