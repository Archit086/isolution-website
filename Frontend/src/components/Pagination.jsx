import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-2 mt-8 w-full">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-none border border-warm-border bg-cream-card text-charcoal disabled:opacity-50 hover:bg-cream-deep transition font-body"
            >
                Prev
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;
                const isActive = page === currentPage;
                return (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-3 py-1 rounded-none font-semibold transition border ${isActive ? 'bg-sage-deep text-cream-white border-sage-deep' : 'bg-cream-card text-text-secondary border-warm-border hover:bg-cream-deep'
                            }`}
                    >
                        {page}
                    </button>
                );
            })}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-none border border-warm-border bg-cream-card text-charcoal disabled:opacity-50 hover:bg-cream-deep transition font-body"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
