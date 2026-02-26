import React from 'react';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onCancel}
            ></div>
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full animate-fadeInUp">
                <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
                <p className="text-text-secondary mb-8">{message}</p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-6 py-2.5 rounded-xl border border-border text-primary font-semibold hover:bg-surface-muted transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-6 py-2.5 rounded-xl bg-danger text-white font-semibold hover:bg-red-600 active:scale-[0.98] transition-all"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
