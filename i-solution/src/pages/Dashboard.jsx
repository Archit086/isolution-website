import React from 'react';
import { useAuth } from '../context/AuthContext';
import AnimatedCounter from '../components/AnimatedCounter';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockLineData = [
    { name: '1', orders: 40 }, { name: '5', orders: 30 }, { name: '10', orders: 20 },
    { name: '15', orders: 27 }, { name: '20', orders: 18 }, { name: '25', orders: 23 }, { name: '30', orders: 34 },
];

const mockBarData = [
    { name: 'Antibiotics', stock: 400 }, { name: 'Painkillers', stock: 300 },
    { name: 'Cardio', stock: 200 }, { name: 'Diabetes', stock: 278 },
];

const KPICard = ({ title, value, prefix = '', suffix = '', trend }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-border flex flex-col justify-between hover:shadow-md transition">
        <span className="text-text-secondary font-bold uppercase tracking-wider text-xs mb-4">{title}</span>
        <div className="flex items-end justify-between">
            <div className="text-3xl font-display font-bold text-primary">
                {prefix}<AnimatedCounter target={value} />{suffix}
            </div>
            {trend && (
                <div className={`flex items-center gap-1 text-sm font-bold ${trend > 0 ? 'text-success' : 'text-danger'}`}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={trend > 0 ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"} />
                    </svg>
                    {Math.abs(trend)}%
                </div>
            )}
        </div>
    </div>
);

const Dashboard = () => {
    const { role, user } = useAuth();

    const renderAdminCards = () => (
        <>
            <KPICard title="Total Products" value={1420} trend={12} />
            <KPICard title="Total Orders" value={845} trend={5} />
            <KPICard title="Pending Compliance" value={18} trend={-2} />
            <KPICard title="Stock Alerts" value={7} trend={14} />
        </>
    );

    const renderAuthorityCards = () => (
        <>
            <KPICard title="Pending Reviews" value={18} trend={-4} />
            <KPICard title="Approved Today" value={24} trend={12} />
            <KPICard title="Total Records" value={5420} />
            <KPICard title="Avg Review Time" value={4} suffix="h" trend={-15} />
        </>
    );

    const renderCustomerCards = () => (
        <>
            <KPICard title="My Orders" value={24} />
            <KPICard title="Pending Delivery" value={3} />
            <KPICard title="Delivered" value={20} />
            <KPICard title="Total Spent" value={4520} prefix="$" />
        </>
    );

    const renderDistributorCards = () => (
        <>
            <KPICard title="Orders Placed" value={142} />
            <KPICard title="Total Volume" value={15420} suffix=" units" />
            <KPICard title="Pending Shipments" value={12} />
            <KPICard title="Last Order Value" value={8450} prefix="$" />
        </>
    );

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-display font-bold text-primary mb-2">Welcome back, {user || 'User'}</h1>
                <p className="text-text-secondary font-medium">Here's what's happening in your account today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {role === 'admin' && renderAdminCards()}
                {role === 'authority' && renderAuthorityCards()}
                {role === 'customer' && renderCustomerCards()}
                {role === 'distributor' && renderDistributorCards()}
                {!role && renderCustomerCards()}
            </div>

            {(role === 'admin' || role === 'authority') && (
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-border h-96 flex flex-col">
                        <h3 className="text-lg font-bold text-primary mb-6">Orders Activity (30 Days)</h3>
                        <div className="flex-1 min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={mockLineData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                    <Line type="monotone" dataKey="orders" stroke="#2DD4BF" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} isAnimationActive={true} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-border h-96 flex flex-col">
                        <h3 className="text-lg font-bold text-primary mb-6">Stock by Category</h3>
                        <div className="flex-1 min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={mockBarData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                                    <Tooltip cursor={{ fill: '#F8FAFC' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                    <Bar dataKey="stock" fill="#0A2463" radius={[4, 4, 0, 0]} isAnimationActive={true} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}

            {/* Shared Table Section */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-border">
                <h3 className="text-lg font-bold text-primary mb-6">Recent Activity</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="py-3 px-4 text-xs font-bold text-text-secondary uppercase tracking-wider">ID</th>
                                <th className="py-3 px-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Type</th>
                                <th className="py-3 px-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Date</th>
                                <th className="py-3 px-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3, 4, 5].map((item, i) => (
                                <tr key={item} className="border-b border-border last:border-0 hover:bg-surface-muted transition group">
                                    <td className="py-3 px-4 font-mono text-sm text-primary">#ORD-90{item}2</td>
                                    <td className="py-3 px-4 text-sm text-text-primary font-medium">Order Placement</td>
                                    <td className="py-3 px-4 text-sm text-text-secondary">Today, 10:4{item} AM</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${i === 2 ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'}`}>
                                            {i === 2 ? 'Pending' : 'Completed'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
