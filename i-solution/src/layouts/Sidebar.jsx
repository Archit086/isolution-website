import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { role, logout, user } = useAuth();
    const location = useLocation();

    const getNavItems = () => {
        switch (role) {
            case 'admin':
                return [
                    { label: 'Dashboard', path: '/dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
                    { label: 'Products', path: '/dashboard/products', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
                    { label: 'Orders', path: '/dashboard/orders', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
                    { label: 'Compliance', path: '/dashboard/compliance', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
                    { label: 'Users', path: '/dashboard/users', icon: 'M12 4a4 4 0 100 8 4 4 0 000-8zM2 20a10 10 0 0115.3-8.5' }
                ];
            case 'authority':
                return [
                    { label: 'Dashboard', path: '/dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z' },
                    { label: 'Compliance Queue', path: '/dashboard/compliance', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' }
                ];
            case 'distributor':
                return [
                    { label: 'Dashboard', path: '/dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z' },
                    { label: 'Bulk Products', path: '/dashboard/products', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
                    { label: 'Order History', path: '/dashboard/orders', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' }
                ];
            default: // customer
                return [
                    { label: 'Dashboard', path: '/dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z' },
                    { label: 'Browse Products', path: '/products', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
                    { label: 'My Orders', path: '/dashboard/orders', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' }
                ];
        }
    };

    const navItems = getNavItems();

    return (
        <div className="w-64 bg-charcoal text-cream-white h-screen flex flex-col pt-6 fixed left-0 top-0 shadow-xl z-20">
            <div className="px-6 mb-8">
                <h1 className="text-2xl font-bold font-display text-cream-white tracking-tight">I-Solution</h1>
            </div>

            <div className="flex-1 overflow-y-auto px-2 space-y-2">
                {navItems.map((item, idx) => {
                    const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
                    return (
                        <NavLink
                            key={idx}
                            to={item.path}
                            className={`flex items-center gap-3 py-3 px-4 rounded-none mx-2 transition-all duration-300 ${isActive
                                ? 'bg-espresso text-cream-white border-l-4 border-amber-warm'
                                : 'text-text-placeholder hover:bg-espresso hover:text-cream-white border-l-4 border-transparent'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                            </svg>
                            <span className="font-body font-medium">{item.label}</span>
                        </NavLink>
                    );
                })}
            </div>

            <div className="p-4 border-t border-espresso mt-auto">
                <div className="bg-espresso rounded-none p-4 flex items-center justify-between group hover:bg-charcoal transition cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-sage-deep text-cream-white flex items-center justify-center font-bold text-sm">
                            {user ? user.substring(0, 2).toUpperCase() : 'U'}
                        </div>
                        <div>
                            <p className="text-sm font-semibold truncate w-24 text-cream-white font-body">{user || 'User'}</p>
                            <span className="text-xs text-amber-soft uppercase tracking-wider font-body">{role}</span>
                        </div>
                    </div>
                    <button onClick={logout} className="text-text-placeholder hover:text-cream-white transition">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
