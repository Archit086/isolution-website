import React from 'react';

const SlideOver = ({ isOpen, title, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div
                className="absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-md h-full bg-cream-white shadow-2xl flex flex-col pt-6 pb-8 px-8 sm:translate-x-0 transition-transform duration-300 transform translate-x-full border-l border-warm-border">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold font-display text-charcoal">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-text-secondary hover:text-charcoal transition bg-cream-card rounded-none p-2"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default SlideOver;
