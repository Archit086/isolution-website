import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const DashboardLayout = () => {
    const location = useLocation();

    return (
        <div className="flex h-screen overflow-hidden bg-surface-muted">
            <Sidebar />
            <div className="flex flex-col flex-1 sm:ml-64">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-8 pt-6">
                    <div key={location.pathname} className="animate-fadeInUp max-w-7xl mx-auto h-full">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
