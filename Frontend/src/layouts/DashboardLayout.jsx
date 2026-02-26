import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const DashboardLayout = () => {
    const location = useLocation();

    return (
        <div className="flex h-screen overflow-hidden bg-cream-base">
            <Sidebar />
            <div className="flex flex-col flex-1 sm:ml-64 relative">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-8 pt-6 relative">
                    <div className="grain-bg"></div>
                    <div key={location.pathname} className="animate-fadeInUp max-w-7xl mx-auto h-full relative z-20">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
