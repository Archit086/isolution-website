import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import api from '../api/axios';

const Compliance = () => {
    const { role } = useAuth();
    const [activeTab, setActiveTab] = useState('Pending');
    const [documents, setDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [approvingId, setApprovingId] = useState(null);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        setIsLoading(true);
        try {
            setTimeout(() => {
                setDocuments([
                    { id: 'DOC-9921', title: 'FDA Approval - Amoxicillin Batch B', uploadedBy: 'PharmaCorp Global', date: 'Oct 24, 2023', status: 'Pending', url: '#' },
                    { id: 'DOC-9922', title: 'Safety Cert - Ibuprofen 400mg', uploadedBy: 'HealthPlus Pharmacy', date: 'Oct 25, 2023', status: 'Pending', url: '#' },
                    { id: 'DOC-9910', title: 'Import License - Lisinopril', uploadedBy: 'PharmaCorp Global', date: 'Oct 20, 2023', status: 'Approved', url: '#' },
                ]);
                setIsLoading(false);
            }, 500);
        } catch {
            setIsLoading(false);
        }
    };

    const handleApprove = async (id) => {
        setApprovingId(id);

        // Simulate API delay
        await new Promise(r => setTimeout(r, 600));

        // Optimistic UI Update
        setDocuments(docs => docs.map(d => d.id === id ? { ...d, status: 'Approved' } : d));
        toast.success('Document approved successfully');
        setApprovingId(null);
    };

    const currentDocs = documents.filter(d => d.status === activeTab);

    if (role === 'admin') {
        return (
            <div className="flex flex-col h-full animate-fadeInUp">
                <h2 className="text-2xl font-display font-bold text-primary mb-6">Compliance Records</h2>
                <div className="bg-white rounded-2xl shadow-sm border border-border flex-1 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-surface-muted border-b border-border">
                            <tr>
                                <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Doc ID</th>
                                <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Title / Description</th>
                                <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Uploaded By</th>
                                <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Date</th>
                                <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Status</th>
                                <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents.map((doc, i) => (
                                <tr key={doc.id} className="border-b border-border hover:bg-surface-muted transition group animate-fadeInUp" style={{ animationDelay: `${i * 40}ms` }}>
                                    <td className="py-4 px-6 font-mono font-medium text-sm text-primary">{doc.id}</td>
                                    <td className="py-4 px-6 font-semibold text-text-primary text-sm">
                                        <div className="flex items-center gap-3">
                                            <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            {doc.title}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-text-secondary">{doc.uploadedBy}</td>
                                    <td className="py-4 px-6 text-sm text-text-secondary">{doc.date}</td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${doc.status === 'Approved' ? 'bg-success' : 'bg-warning animate-pulseRing'}`}></div>
                                            <span className="text-sm font-semibold">{doc.status}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <button className="text-danger hover:text-red-700 font-semibold text-sm transition opacity-0 group-hover:opacity-100">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full animate-fadeInUp">
            <div className="mb-8">
                <h2 className="text-2xl font-display font-bold text-primary mb-2">Compliance Queue</h2>
                <p className="text-text-secondary text-sm">Review, verify, and approve product regulatory documents.</p>

                <div className="flex space-x-2 border-b border-border mt-6">
                    {['Pending', 'Approved'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 px-6 text-sm font-bold transition-colors relative ${activeTab === tab ? 'text-primary' : 'text-text-secondary hover:text-primary'}`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-accent rounded-t-full"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-auto">
                {isLoading ? (
                    <Loader type="spinner" />
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {currentDocs.map((doc, i) => (
                            <div
                                key={doc.id}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-border flex flex-col justify-between hover:shadow-md transition-shadow animate-fadeInUp"
                                style={{ animationDelay: `${i * 100}ms` }}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-surface-muted text-primary rounded-xl flex items-center justify-center shrink-0 border border-border">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-primary leading-tight mb-1">{doc.title}</h4>
                                            <p className="text-sm font-medium text-text-secondary">By {doc.uploadedBy} • {doc.date}</p>
                                        </div>
                                    </div>

                                    <div className={`flex items-center gap-1.5 px-3 py-1 bg-surface-muted rounded-full text-xs font-bold border border-border`}>
                                        <div className={`w-2 h-2 rounded-full ${doc.status === 'Approved' ? 'bg-success' : 'bg-warning animate-pulseRing'}`}></div>
                                        {doc.status}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-auto pt-6 border-t border-border">
                                    <a href={doc.url} className="flex items-center gap-2 text-primary font-bold hover:text-accent transition text-sm">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Download Cert
                                    </a>

                                    {activeTab === 'Pending' && (
                                        <button
                                            onClick={() => handleApprove(doc.id)}
                                            disabled={approvingId === doc.id}
                                            className="bg-accent text-primary px-6 py-2 rounded-xl font-bold hover:bg-teal-400 active:scale-[0.98] transition disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center min-w-[120px]"
                                        >
                                            {approvingId === doc.id ? (
                                                <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            ) : 'Approve'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}

                        {currentDocs.length === 0 && (
                            <div className="col-span-full py-20 text-center">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-border shadow-sm text-accent">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-primary mb-2">All Caught Up!</h3>
                                <p className="text-text-secondary">There are no {activeTab.toLowerCase()} documents right now.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Compliance;
