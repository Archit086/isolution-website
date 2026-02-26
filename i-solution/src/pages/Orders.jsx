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
        if (s === 'pending') return <span className="bg-warning/10 text-warning px-3 py-1 rounded-full text-xs font-bold">Pending</span>;
        if (s === 'shipped') return <span className="bg-[#3B82F6]/10 text-[#3B82F6] px-3 py-1 rounded-full text-xs font-bold">Shipped</span>;
        if (s === 'completed' || s === 'delivered') return <span className="bg-success/10 text-success px-3 py-1 rounded-full text-xs font-bold">Delivered</span>;
        return <span className="bg-danger/10 text-danger px-3 py-1 rounded-full text-xs font-bold">{status}</span>;
    };

    return (
        <div className="flex flex-col h-full animate-fadeInUp">
            <div className="mb-6">
                <h2 className="text-2xl font-display font-bold text-primary mb-2">
                    {role === 'customer' ? 'My Orders' : role === 'distributor' ? 'Bulk Orders' : 'All Orders'}
                </h2>

                {/* Animated Tabs */}
                <div className="flex space-x-1 border-b border-border mt-6 relative">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 px-4 text-sm font-semibold transition-colors relative ${activeTab === tab ? 'text-primary' : 'text-text-secondary hover:text-primary'}`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent animated-underline"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-border flex-1 overflow-hidden">
                {isLoading ? (
                    <Loader type="spinner" />
                ) : (
                    <div className="overflow-auto min-w-full">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-surface-muted border-b border-border">
                                <tr>
                                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Order ID</th>
                                    {role !== 'customer' && <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Customer</th>}
                                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Product</th>
                                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Quantity</th>
                                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Date</th>
                                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Status</th>
                                    {role === 'admin' && <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider text-right">Actions</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((o, index) => (
                                    <tr key={o.id} className="border-b border-border hover:bg-surface-muted transition group animate-fadeInUp" style={{ animationDelay: `${index * 40}ms` }}>
                                        <td className="py-4 px-6 font-mono font-medium text-primary text-sm">{o.id}</td>
                                        {role !== 'customer' && <td className="py-4 px-6 text-sm font-semibold">{o.customer}</td>}
                                        <td className="py-4 px-6 text-sm text-text-secondary">{o.product}</td>
                                        <td className="py-4 px-6 font-display font-medium">{o.qty}</td>
                                        <td className="py-4 px-6 text-sm text-text-secondary">{o.date}</td>
                                        <td className="py-4 px-6">{getStatusBadge(o.status)}</td>
                                        {role === 'admin' && (
                                            <td className="py-4 px-6 text-right">
                                                <button className="text-danger hover:text-red-700 font-semibold text-sm transition opacity-0 group-hover:opacity-100">Delete</button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                                {orders.length === 0 && (
                                    <tr>
                                        <td colSpan={role === 'admin' ? 7 : (role === 'customer' ? 5 : 6)} className="py-12 text-center text-text-secondary">
                                            No orders found in this category.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
