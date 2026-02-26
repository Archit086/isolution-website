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
    <div className="bg-cream-card p-6 rounded-none shadow-sm border border-warm-border flex flex-col justify-between hover:shadow-md transition">
        <span className="text-text-secondary font-bold uppercase tracking-widest text-xs mb-4">{title}</span>
        <div className="flex items-end justify-between">
            <div className="text-3xl font-display font-bold text-charcoal">
                {prefix}<AnimatedCounter target={value} />{suffix}
            </div>
            {trend && (
                <div className={`flex items-center gap-1 text-sm font-bold tracking-wide ${trend > 0 ? 'text-sage-deep' : 'text-terracotta'}`}>
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
            <KPICard title="Total Portfolio" value={1420} trend={12} />
            <KPICard title="Total Distributions" value={845} trend={5} />
            <KPICard title="Pending Review" value={18} trend={-2} />
            <KPICard title="Inventory Alerts" value={7} trend={14} />
        </>
    );

    const renderAuthorityCards = () => (
        <>
            <KPICard title="Pending Verification" value={18} trend={-4} />
            <KPICard title="Cleared Today" value={24} trend={12} />
            <KPICard title="Total Records" value={5420} />
            <KPICard title="Avg Clear Time" value={4} suffix="h" trend={-15} />
        </>
    );

    const renderCustomerCards = () => (
        <>
            <KPICard title="My Active Orders" value={24} />
            <KPICard title="Processing" value={3} />
            <KPICard title="Delivered" value={20} />
            <KPICard title="Total Expenditure" value={4520} prefix="$" />
        </>
    );

    const renderDistributorCards = () => (
        <>
            <KPICard title="Distributions Placed" value={142} />
            <KPICard title="Total Volume" value={15420} suffix=" units" />
            <KPICard title="Pending Transit" value={12} />
            <KPICard title="Last Provision" value={8450} prefix="$" />
        </>
    );

    return (
        <div>
            <div className="mb-8 font-body">
                <h1 className="text-4xl font-display font-bold text-charcoal mb-2">Welcome Back, {user || 'User'}</h1>
                <p className="text-text-secondary font-medium tracking-wide">Infrastructure and provisioning overview.</p>
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
                    <div className="bg-cream-card p-6 rounded-none shadow-sm border border-warm-border h-96 flex flex-col">
                        <h3 className="text-lg font-display font-bold text-charcoal mb-6">Execution Activity (30 Days)</h3>
                        <div className="flex-1 min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={mockLineData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E3DCD2" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#7C7265', fontSize: 12, fontFamily: 'Outfit, sans-serif' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#7C7265', fontSize: 12, fontFamily: 'Outfit, sans-serif' }} />
                                    <Tooltip contentStyle={{ borderRadius: '0', border: '1px solid #E3DCD2', backgroundColor: '#FDFBF7', boxShadow: '0 4px 6px -1px rgba(44,36,22,0.1)' }} />
                                    <Line type="monotone" dataKey="orders" stroke="#5E6B56" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#5E6B56' }} activeDot={{ r: 6 }} isAnimationActive={true} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="bg-cream-card p-6 rounded-none shadow-sm border border-warm-border h-96 flex flex-col">
                        <h3 className="text-lg font-display font-bold text-charcoal mb-6">Allocation by Classification</h3>
                        <div className="flex-1 min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={mockBarData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E3DCD2" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#7C7265', fontSize: 12, fontFamily: 'Outfit, sans-serif' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#7C7265', fontSize: 12, fontFamily: 'Outfit, sans-serif' }} />
                                    <Tooltip cursor={{ fill: '#F2E8DA' }} contentStyle={{ borderRadius: '0', border: '1px solid #E3DCD2', backgroundColor: '#FDFBF7', boxShadow: '0 4px 6px -1px rgba(44,36,22,0.1)' }} />
                                    <Bar dataKey="stock" fill="#C26A45" radius={[0, 0, 0, 0]} isAnimationActive={true} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}

            {/* Shared Table Section */}
            <div className="bg-cream-card p-6 rounded-none shadow-sm border border-warm-border">
                <h3 className="text-lg font-display font-bold text-charcoal mb-6">Recent Provisioning</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b-2 border-warm-border">
                                <th className="py-3 px-4 text-xs font-bold text-text-secondary uppercase tracking-[0.1em]">Identifier</th>
                                <th className="py-3 px-4 text-xs font-bold text-text-secondary uppercase tracking-[0.1em]">Classification</th>
                                <th className="py-3 px-4 text-xs font-bold text-text-secondary uppercase tracking-[0.1em]">Timestamp</th>
                                <th className="py-3 px-4 text-xs font-bold text-text-secondary uppercase tracking-[0.1em]">State</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3, 4, 5].map((item, i) => (
                                <tr key={item} className="border-b border-warm-border last:border-0 hover:bg-cream-deep transition-colors group">
                                    <td className="py-4 px-4 font-mono text-sm text-charcoal font-bold">#PRV-90{item}2</td>
                                    <td className="py-4 px-4 text-sm text-ink font-medium">Provision Request</td>
                                    <td className="py-4 px-4 text-sm text-text-secondary">Today, 10:4{item} AM</td>
                                    <td className="py-4 px-4">
                                        <span className={`px-2.5 py-1 rounded-none text-[10px] font-bold uppercase tracking-widest border border-current ${i === 2 ? 'bg-amber-soft/20 text-amber-gold' : 'bg-sage-mist/40 text-sage-deep'}`}>
                                            {i === 2 ? 'Validating' : 'Cleared'}
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
