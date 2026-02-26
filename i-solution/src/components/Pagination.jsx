import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-2 mt-8 w-full">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-xl border border-border bg-white text-primary disabled:opacity-50 hover:bg-surface-muted transition"
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
                        className={`px-3 py-1 rounded-xl font-semibold transition ${isActive ? 'bg-primary text-white' : 'bg-transparent text-text-secondary hover:bg-surface-muted'
                            }`}
                    >
                        {page}
                    </button>
                );
            })}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-xl border border-border bg-white text-primary disabled:opacity-50 hover:bg-surface-muted transition"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
