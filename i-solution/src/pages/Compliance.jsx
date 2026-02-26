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
            const res = await api.get('/compliance/pending/');
            const data = res.data.results || res.data || [];
            setDocuments(data);
        } catch (error) {
            console.error('Failed to fetch compliance documents:', error);
            setDocuments([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleApprove = async (id) => {
        setApprovingId(id);
        try {
            await api.put(`/compliance/${id}/approve/`);
            setDocuments(docs => docs.map(d => d.id === id ? { ...d, status: 'Approved' } : d));
            toast.success('Document approved successfully');
        } catch (error) {
            console.error('Failed to approve document:', error);
            toast.error('Failed to approve document.');
        } finally {
            setApprovingId(null);
        }
    };

    const currentDocs = documents.filter(d => d.status === activeTab);

    if (role === 'admin') {
        return (
            <div className="flex flex-col h-full animate-fadeInUp font-body">
                <h2 className="text-4xl font-display font-bold text-charcoal mb-6">Compliance Records</h2>
                <div className="bg-cream-card rounded-none shadow-sm border border-warm-border flex-1 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-cream-deep border-b-2 border-warm-border">
                            <tr>
                                <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-[0.1em]">Doc ID</th>
                                <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-[0.1em]">Title / Description</th>
                                <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-[0.1em]">Uploaded By</th>
                                <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-[0.1em]">Date</th>
                                <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-[0.1em]">Status</th>
                                <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-[0.1em] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents.map((doc, i) => (
                                <tr key={doc.id} className="border-b border-warm-border hover:bg-cream-white transition-colors group animate-fadeInUp" style={{ animationDelay: `${i * 40}ms` }}>
                                    <td className="py-4 px-6 font-mono font-bold text-sm text-charcoal">{doc.id}</td>
                                    <td className="py-4 px-6 font-semibold text-ink text-sm">
                                        <div className="flex items-center gap-3">
                                            <svg className="w-5 h-5 text-sage-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            {doc.title}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-text-secondary">{doc.uploadedBy}</td>
                                    <td className="py-4 px-6 text-sm text-text-secondary">{doc.date}</td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-none ${doc.status === 'Approved' ? 'bg-sage-deep' : 'bg-amber-gold animate-pulseRing'}`}></div>
                                            <span className="text-sm font-semibold tracking-wide text-charcoal">{doc.status}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <button className="text-terracotta hover:text-ink font-bold uppercase tracking-widest text-xs transition opacity-0 group-hover:opacity-100">Delete</button>
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
        <div className="flex flex-col h-full animate-fadeInUp font-body">
            <div className="mb-8">
                <h2 className="text-4xl font-display font-bold text-charcoal mb-2">Compliance Queue</h2>
                <p className="text-text-secondary text-sm tracking-wide">Review, verify, and approve product regulatory documents.</p>

                <div className="flex space-x-2 border-b-2 border-warm-border mt-8 relative">
                    {['Pending', 'Approved'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-4 px-6 text-sm font-bold uppercase tracking-widest transition-colors relative ${activeTab === tab ? 'text-charcoal' : 'text-text-secondary hover:text-charcoal'}`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-charcoal"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-auto mt-4">
                {isLoading ? (
                    <Loader type="spinner" />
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {currentDocs.map((doc, i) => (
                            <div
                                key={doc.id}
                                className="bg-cream-card p-6 rounded-none shadow-sm border border-warm-border flex flex-col justify-between hover:shadow-md transition-shadow animate-fadeInUp"
                                style={{ animationDelay: `${i * 100}ms` }}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-cream-deep text-charcoal rounded-none flex items-center justify-center shrink-0 border border-warm-border">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-charcoal leading-tight mb-1">{doc.title}</h4>
                                            <p className="text-sm font-medium text-text-secondary">By {doc.uploadedBy} • {doc.date}</p>
                                        </div>
                                    </div>

                                    <div className={`flex items-center gap-1.5 px-3 py-1 bg-cream-deep rounded-none text-[10px] uppercase tracking-widest font-bold border border-warm-border`}>
                                        <div className={`w-2 h-2 rounded-none ${doc.status === 'Approved' ? 'bg-sage-deep' : 'bg-amber-gold animate-pulseRing'}`}></div>
                                        <span className="text-charcoal">{doc.status}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-auto pt-6 border-t border-warm-border">
                                    <a href={doc.url} className="flex items-center gap-2 text-charcoal font-bold hover:text-sage-deep transition text-sm uppercase tracking-wider">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Download Cert
                                    </a>

                                    {activeTab === 'Pending' && (
                                        <button
                                            onClick={() => handleApprove(doc.id)}
                                            disabled={approvingId === doc.id}
                                            className="bg-charcoal text-cream-white px-6 py-3 rounded-none font-bold uppercase tracking-widest hover:bg-espresso active:scale-[0.98] transition disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center min-w-[140px]"
                                        >
                                            {approvingId === doc.id ? (
                                                <svg className="animate-spin h-5 w-5 text-cream-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            ) : 'Authorize'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}

                        {currentDocs.length === 0 && (
                            <div className="col-span-full py-20 text-center">
                                <div className="w-16 h-16 bg-cream-card rounded-none flex items-center justify-center mx-auto mb-6 border border-warm-border shadow-sm text-sage-mist">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-display font-bold text-charcoal mb-2">All Caught Up!</h3>
                                <p className="text-text-secondary tracking-wide">There are no {activeTab.toLowerCase()} documents right now.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Compliance;
