import React from 'react';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const paths = location.pathname.split('/').filter(p => p);

    return (
        <div className="h-16 bg-white border-b border-border flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
            <div className="flex items-center gap-2 text-sm">
                {paths.map((path, idx) => {
                    const isLast = idx === paths.length - 1;
                    return (
                        <React.Fragment key={idx}>
                            <span className={`capitalize ${isLast ? 'text-primary font-bold' : 'text-text-secondary font-medium'}`}>
                                {path}
                            </span>
                            {!isLast && <span className="text-border">/</span>}
                        </React.Fragment>
                    );
                })}
            </div>

            <div className="flex items-center gap-6">
                <button className="text-text-secondary hover:text-primary transition relative">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="absolute top-0 right-0 w-2 h-2 bg-danger rounded-full ring-2 ring-white"></span>
                </button>
            </div>
        </div>
    );
};

export default Navbar;
