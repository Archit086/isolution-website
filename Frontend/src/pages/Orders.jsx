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
            const res = await api.get('/orders/');
            const data = res.data.results || res.data || [];

            const filtered = activeTab === 'All'
                ? data
                : data.filter(o => {
                    const statusMatch = (o.status || '').toLowerCase();
                    const tabMatch = activeTab.toLowerCase();
                    if (tabMatch === 'completed') return statusMatch === 'completed' || statusMatch === 'delivered';
                    return statusMatch === tabMatch;
                });

            setOrders(filtered);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
            setOrders([]);
        } finally {
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
                <h2 className="text-4xl font-display font-semibold text-[#F5F5F5] mb-2">
                    {role === 'customer' ? 'My Orders' : role === 'distributor' ? 'Bulk Provisions' : 'All Provisions'}
                </h2>

                {/* Animated Tabs */}
                <div className="flex space-x-1 border-b-2 border-warm-border mt-8 relative">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-4 px-6 text-sm font-bold uppercase tracking-widest transition-colors relative ${activeTab === tab ? 'text-[#F5F5F5]' : 'text-[#CFCFCF] hover:text-[#FFFFFF]'}`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#E0B04B]"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-brand-dark/50 rounded-none shadow-sm border border-warm-border flex-1 overflow-hidden flex flex-col">
                <div className="flex-1 overflow-auto">
                    {isLoading ? (
                        <Loader type="spinner" />
                    ) : (
                        <table className="w-full text-left border-collapse min-w-max">
                            <thead className="sticky top-0 bg-brand-dark border-b-2 border-warm-border z-10">
                                <tr>
                                    <th className="py-4 px-6 text-xs font-semibold text-[#6B5F4C] uppercase tracking-[0.04em]">Identifier</th>
                                    {role !== 'customer' && <th className="py-4 px-6 text-xs font-semibold text-[#6B5F4C] uppercase tracking-[0.04em]">Entity</th>}
                                    <th className="py-4 px-6 text-xs font-semibold text-[#6B5F4C] uppercase tracking-[0.04em]">Classification</th>
                                    <th className="py-4 px-6 text-xs font-semibold text-[#6B5F4C] uppercase tracking-[0.04em]">Volume</th>
                                    <th className="py-4 px-6 text-xs font-semibold text-[#6B5F4C] uppercase tracking-[0.04em]">Timestamp</th>
                                    <th className="py-4 px-6 text-xs font-semibold text-[#6B5F4C] uppercase tracking-[0.04em]">State</th>
                                    {role === 'admin' && <th className="py-4 px-6 text-xs font-semibold text-[#6B5F4C] uppercase tracking-[0.04em] text-right">Actions</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((o, index) => (
                                    <tr key={o.id} className="border-b border-warm-border/30 last:border-0 hover:bg-brand-dark transition-colors group animate-fadeInUp" style={{ animationDelay: `${index * 40}ms` }}>
                                        <td className="py-4 px-6 font-mono font-bold text-[#F5F5F5] text-sm">{o.id}</td>
                                        {role !== 'customer' && <td className="py-4 px-6 text-sm font-bold text-[#F5F5F5]">{o.customer}</td>}
                                        <td className="py-4 px-6 text-sm text-[#D0D0D0]">{o.product}</td>
                                        <td className="py-4 px-6 font-display font-bold text-[#F5F5F5]">{o.qty}</td>
                                        <td className="py-4 px-6 text-sm text-[#D0D0D0]">{o.date}</td>
                                        <td className="py-4 px-6">{getStatusBadge(o.status)}</td>
                                        {role === 'admin' && (
                                            <td className="py-4 px-6 text-right">
                                                <button className="text-terracotta hover:text-[#F5F5F5] font-bold uppercase tracking-widest text-xs transition opacity-0 group-hover:opacity-100">Delete</button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                                {orders.length === 0 && (
                                    <tr>
                                        <td colSpan={role === 'admin' ? 7 : (role === 'customer' ? 5 : 6)} className="py-12 text-center text-[#AFAFAF]">
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
