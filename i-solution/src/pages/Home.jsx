import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedCounter from '../components/AnimatedCounter';

const Home = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen font-sans bg-surface-muted text-text-primary">
            {/* Public Navbar */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-primary shadow-lg py-4' : 'bg-transparent py-6'}`}>
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <div className="text-2xl font-bold font-display text-white tracking-tight">I-Solution</div>
                    <div className="flex gap-8 items-center text-white/90 font-medium">
                        <button onClick={() => navigate('/')} className="hover:text-accent transition">Home</button>
                        <button onClick={() => navigate('/products')} className="hover:text-accent transition">Products</button>
                        <div className="w-px h-5 bg-white/20"></div>
                        <button onClick={() => navigate('/login')} className="hover:text-white transition">Login</button>
                        <button onClick={() => navigate('/register')} className="bg-accent text-primary px-5 py-2 rounded-xl hover:bg-teal-400 transition font-semibold">
                            Register
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-br from-primary to-primary-light">
                {/* Hex Grid Background pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#2DD4BF 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center">
                    <div className="lg:w-1/2 text-center lg:text-left mb-16 lg:mb-0 animate-fadeInUp">
                        <h1 className="text-4xl lg:text-6xl font-extrabold font-display text-white leading-tight mb-6">
                            Pharmaceutical Management, <span className="text-accent relative inline-block">Redefined<svg className="absolute w-full h-3 -bottom-1 left-0 text-accent" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" /></svg></span>.
                        </h1>
                        <p className="text-lg text-accent-soft/80 mb-10 max-w-xl mx-auto lg:mx-0">
                            A comprehensive SaaS ecosystem for Admins, Authorities, Distributors, and Customers to manage inventory, compliance, and orders securely and seamlessly.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button onClick={() => navigate('/products')} className="bg-accent text-primary font-bold px-8 py-3.5 rounded-xl hover:bg-teal-400 active:scale-[0.98] transition-all shadow-lg hover:shadow-accent/30">
                                Explore Products
                            </button>
                            <button onClick={() => navigate('/dashboard')} className="border border-white/30 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/10 active:scale-[0.98] transition-all">
                                Login to Dashboard
                            </button>
                        </div>
                    </div>

                    <div className="lg:w-1/2 flex justify-center lg:justify-end animate-fadeInUp" style={{ animationDelay: '100ms' }}>
                        {/* Abstract Molecule/Pharma SVG Float */}
                        <div className="relative w-72 h-72 lg:w-96 lg:h-96 animate-float">
                            <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl"></div>
                            <svg viewBox="0 0 200 200" className="w-full h-full text-white/90 drop-shadow-2xl" fill="none" stroke="currentColor">
                                <circle cx="100" cy="100" r="40" strokeWidth="4" className="text-accent fill-primary" />
                                <circle cx="40" cy="50" r="20" strokeWidth="3" className="fill-primary-light" />
                                <circle cx="160" cy="50" r="25" strokeWidth="3" className="fill-primary-light" />
                                <circle cx="100" cy="180" r="15" strokeWidth="3" className="text-accent fill-primary" />

                                <line x1="100" y1="60" x2="100" y2="20" strokeWidth="3" strokeDasharray="4 4" className="text-accent" />
                                <line x1="60" y1="50" x2="80" y2="70" strokeWidth="4" />
                                <line x1="140" y1="50" x2="115" y2="75" strokeWidth="4" />
                                <line x1="100" y1="140" x2="100" y2="165" strokeWidth="4" />
                            </svg>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="relative -mt-12 z-20 px-6 max-w-5xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl ring-1 ring-border p-8 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-border">
                    <div className="text-center pt-4 md:pt-0 block relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-accent rounded-full -mt-8 md:-mt-8"></div>
                        <div className="text-4xl font-display font-bold text-primary mb-2"><AnimatedCounter target={10000} />+</div>
                        <div className="text-text-secondary font-medium uppercase tracking-wider text-sm">Products Indexed</div>
                    </div>
                    <div className="text-center pt-4 md:pt-0">
                        <div className="text-4xl font-display font-bold text-primary mb-2"><AnimatedCounter target={500} />+</div>
                        <div className="text-text-secondary font-medium uppercase tracking-wider text-sm">Distributors</div>
                    </div>
                    <div className="text-center pt-4 md:pt-0">
                        <div className="text-4xl font-display font-bold text-primary mb-2"><AnimatedCounter target={99.9} />%</div>
                        <div className="text-text-secondary font-medium uppercase tracking-wider text-sm">Compliance Rate</div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-display font-bold text-primary mb-4">Built for the Entire Pharma Ecosystem</h2>
                    <p className="text-text-secondary max-w-2xl mx-auto">From regulatory authority tracking to end-customer ordering, our platform provides role-based tools for every step of the supply chain.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {[
                        { title: "Admin Control", desc: "Manage product catalogs, track inventory levels, and oversee all system users with powerful moderation tools.", icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" },
                        { title: "Compliance Workflows", desc: "Upload and verify regulatory documents with a dedicated authority review queue to maintain strict standards.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
                        { title: "Bulk Ordering", desc: "For distributors managing large scale shipments, optimized cart and checkout processes with real-time stock limits.", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
                        { title: "Real-time Tracking", desc: "Instant updates on order status, compliance clearance, and inventory alerts to keep your supply chain moving.", icon: "M13 10V3L4 14h7v7l9-11h-7z" }
                    ].map((feature, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md ring-1 ring-border hover:ring-accent transition-all animate-fadeInUp" style={{ animationDelay: `${i * 100}ms` }}>
                            <div className="w-12 h-12 bg-accent-soft text-accent rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} /></svg>
                            </div>
                            <h4 className="text-xl font-bold text-primary mb-3">{feature.title}</h4>
                            <p className="text-text-secondary leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works Layer */}
            <section className="bg-white py-24 border-y border-border">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-display font-bold text-primary">How It Works</h2>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-start relative">
                        <div className="hidden md:block absolute top-12 left-[10%] w-[80%] h-0.5 bg-border z-0"></div>
                        {[
                            { num: "01", title: "Register", desc: "Create an account based on your role in the pharma lifecycle." },
                            { num: "02", title: "Browse & Order", desc: "Find approved medicines and place tracked orders seamlessly." },
                            { num: "03", title: "Compliance Cleared", desc: "Automated checks against regulatory standards ensure safety." }
                        ].map((step, i) => (
                            <div key={i} className="relative z-10 flex flex-col items-center text-center max-w-xs mb-10 md:mb-0">
                                <div className="w-24 h-24 bg-primary rounded-full ring-4 ring-white flex items-center justify-center text-accent text-3xl font-display font-bold mb-6 shadow-xl">
                                    {step.num}
                                </div>
                                <h4 className="text-xl font-bold text-primary mb-2">{step.title}</h4>
                                <p className="text-text-secondary">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Layer */}
            <section className="py-20 bg-primary w-full text-center px-6">
                <h2 className="text-3xl lg:text-5xl font-display font-bold text-white mb-8">Ready to streamline your compliance workflow?</h2>
                <button onClick={() => navigate('/register')} className="bg-accent text-primary font-bold px-10 py-4 rounded-xl hover:bg-teal-400 active:scale-[0.98] transition-all shadow-xl text-lg">
                    Join I-Solution Today
                </button>
            </section>

            {/* Footer */}
            <footer className="bg-[#0f172a] text-secondary py-16">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-[#94A3B8]">
                    <div>
                        <div className="text-2xl font-bold font-display text-white mb-4 tracking-tight">I-Solution</div>
                        <p className="max-w-xs">Connecting the pharmaceutical ecosystem with secure, compliant, and modern management tools.</p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><button onClick={() => navigate('/products')} className="hover:text-accent transition">Products</button></li>
                            <li><button onClick={() => navigate('/login')} className="hover:text-accent transition">Dashboard Login</button></li>
                            <li><button className="hover:text-accent transition">About Us</button></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Contact</h4>
                        <ul className="space-y-3">
                            <li>support@isolution.app</li>
                            <li>+1 (555) 123-4567</li>
                            <li>100 Pharma Way, HealthTech City</li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
