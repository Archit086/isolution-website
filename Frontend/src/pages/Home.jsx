import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedCounter from '../components/AnimatedCounter';
import { useParallax } from '../hooks/useParallax';
import { useParallaxX } from '../hooks/useParallaxX';
import { useScrollReveal } from '../hooks/useScrollReveal';

// Reusable ScrollReveal component
const Reveal = ({ children, delay = 0 }) => {
    const [ref, isVisible] = useScrollReveal(0.15);
    return (
        <div
            ref={ref}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
                transition: `opacity 0.8s ease-out ${delay}ms, transform 0.8s ease-out ${delay}ms`,
            }}
        >
            {children}
        </div>
    );
};

const FeatureCard = ({ title, desc, icon, index }) => {
    // Enable horizontal drift on features based on index
    const driftSpeed = index % 2 === 0 ? 0.05 : -0.05;
    const ref = useParallaxX(driftSpeed);

    return (
        <div ref={ref} className="bg-cream-card p-8 rounded-xl ring-1 ring-warm-border hover:shadow-[0_8px_32px_rgba(44,36,22,0.10)] hover:-translate-y-1 transition-all duration-300 parallax-layer">
            <div className="w-12 h-12 bg-sage-mist text-sage-deep rounded-none flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} /></svg>
            </div>
            <h4 className="text-xl font-display font-bold text-charcoal mb-3">{title}</h4>
            <p className="text-text-secondary leading-relaxed font-body">{desc}</p>
        </div>
    );
};

const ServiceCard = () => {
    return (
        <div className="bg-cream-card border border-warm-border p-5 shadow-2xl rounded-none w-64">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-sage-mist rounded-full flex items-center justify-center text-sage-deep">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                    <div className="text-xs text-text-secondary uppercase tracking-widest font-bold">Secure</div>
                    <div className="text-charcoal font-display font-bold">Compliance</div>
                </div>
            </div>
            <div className="h-1 bg-warm-border w-full rounded-full overflow-hidden">
                <div className="h-full bg-amber-warm w-3/4"></div>
            </div>
        </div>
    )
}

const Home = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    const blurLayer = useParallax(0.05);
    const grainLayer = useParallax(0.08);
    const ghostWatermark = useParallax(0.15);
    const contentUp = useParallax(-0.05);
    const floatingCard = useParallax(0.25);

    const statsGrain = useParallax(0.1);
    const statsNum = useParallax(-0.12);
    const statsLeaf = useParallax(0.3);

    const aboutGhost = useParallax(0.2);
    const aboutLeft = useParallax(0.1);
    const aboutContent = useParallax(-0.05);
    const aboutDots = useParallax(0.35);

    const ctaBg = useParallax(0.05);
    const ctaGhost = useParallax(0.3);
    const ctaContent = useParallax(-0.08);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen font-body bg-cream-base text-ink overflow-x-hidden selection:bg-sage-mist selection:text-ink">
            {/* Public Navbar - Warm Theme transition */}
            <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 ${scrolled ? 'bg-charcoal shadow-md py-4' : 'bg-transparent py-6'}`}>
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <div className="flex relative items-center justify-center">
                        <div className="absolute right-[-15px] top-[-5px] w-8 h-8 bg-sage-deep/20 rounded-full blur-md"></div>
                        <div className={`text-2xl font-bold font-display tracking-tight z-10 ${scrolled ? 'text-cream-card' : 'text-charcoal'}`}>I-Solution</div>
                    </div>
                    <div className={`flex gap-8 items-center font-medium ${scrolled ? 'text-cream-card' : 'text-charcoal'}`}>
                        <button onClick={() => navigate('/')} className="hover:text-amber-warm transition">Home</button>
                        <button onClick={() => navigate('/products')} className="hover:text-amber-warm transition">Products</button>
                        <div className="w-px h-5 bg-warm-border"></div>
                        <button onClick={() => navigate('/login')} className="hover:text-sage-deep transition">Login</button>
                        <button onClick={() => navigate('/register')} className="bg-sage-deep text-cream-white px-6 py-2 rounded-none tracking-widest uppercase text-xs hover:bg-sage-mid active:scale-[0.98] transition font-semibold">
                            Register
                        </button>
                    </div>
                </div>
            </nav>

            {/* 1. HERO SECTION - 5 Layer Parallax */}
            <section className="relative h-screen overflow-hidden bg-cream-deep">
                {/* Layer 1: Background Blur Fixed */}
                <div
                    ref={blurLayer}
                    className="absolute inset-0 parallax-layer"
                >
                    <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-amber-soft/40 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-sage-mist/60 rounded-full blur-[100px]"></div>
                </div>

                {/* Layer 2: Grain Texture overlay */}
                <div ref={grainLayer} className="grain-bg parallax-layer"></div>

                {/* Layer 3: Giant ghost watermark */}
                <div ref={ghostWatermark} className="watermark-text absolute top-32 left-[-2%] parallax-layer">
                    I-SOLUTION
                </div>

                {/* Layer 4: Content Moves opposite to scroll */}
                <div ref={contentUp} className="absolute inset-0 flex items-center justify-center px-6 parallax-layer">
                    <div className="text-center max-w-4xl pt-16">
                        <p className="font-script text-3xl md:text-5xl text-sage-deep mb-4 md:mb-6 animate-fadeInUp shadow-sm">Integrity. Efficacy. Trust.</p>
                        <h1 className="font-display text-5xl md:text-7xl text-ink font-extrabold mb-8 animate-fadeInUp leading-tight" style={{ animationDelay: '100ms' }}>
                            A Modern Era of <br /><span className="text-charcoal relative inline-block">Pharmaceutical Care</span>
                        </h1>
                        <p className="font-body text-lg text-text-secondary mb-12 max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: '200ms' }}>
                            Discover our curated inventory of clinical formulations. Managed by experts, verified by authorities, delivered directly to your practice.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fadeInUp" style={{ animationDelay: '300ms' }}>
                            <button onClick={() => navigate('/products')} className="bg-sage-deep text-cream-white tracking-[0.1em] uppercase text-xs font-semibold px-8 py-4 rounded-none hover:bg-sage-mid active:scale-[0.98] transition border border-sage-deep shadow-xl">
                                Explore Formulation
                            </button>
                            <button onClick={() => navigate('/dashboard')} className="bg-transparent border border-warm-border text-sage-deep tracking-[0.1em] uppercase text-xs font-semibold px-8 py-4 rounded-none hover:bg-cream-card active:scale-[0.98] transition">
                                Access Dashboard
                            </button>
                        </div>
                    </div>
                </div>

                {/* Layer 5: Floating Card - Fastest */}
                <div ref={floatingCard} className="absolute bottom-16 left-[10%] hidden lg:block parallax-layer">
                    <ServiceCard />
                </div>
            </section>

            {/* 2. STATS SECTION */}
            <section className="relative px-6 py-16 bg-cream-card overflow-hidden border-t-4 border-amber-warm">
                <div ref={statsGrain} className="grain-bg parallax-layer opacity-40"></div>

                <div ref={statsLeaf} className="absolute -top-12 -right-12 text-sage-mist opacity-50 parallax-layer">
                    <svg className="w-64 h-64" viewBox="0 0 100 100" fill="currentColor"><path d="M50 0C50 0 0 20 0 50C0 80 50 100 50 100C50 100 100 80 100 50C100 20 50 0 50 0Z" /></svg>
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <div ref={statsNum} className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-warm-border parallax-layer">
                        <Reveal delay={0}>
                            <div className="text-center pt-6 md:pt-0">
                                <div className="text-5xl font-display font-bold text-ink mb-2"><AnimatedCounter target={12400} />+</div>
                                <div className="text-secondary tracking-[0.12em] font-semibold uppercase text-xs text-text-secondary">Clinical Formulas</div>
                            </div>
                        </Reveal>
                        <Reveal delay={150}>
                            <div className="text-center pt-6 md:pt-0">
                                <div className="text-5xl font-display font-bold text-charcoal mb-2"><AnimatedCounter target={98} />%</div>
                                <div className="text-secondary tracking-[0.12em] font-semibold uppercase text-xs text-text-secondary">Authority Approved</div>
                            </div>
                        </Reveal>
                        <Reveal delay={300}>
                            <div className="text-center pt-6 md:pt-0">
                                <div className="text-5xl font-display font-bold text-ink mb-2"><AnimatedCounter target={450} />+</div>
                                <div className="text-secondary tracking-[0.12em] font-semibold uppercase text-xs text-text-secondary">Global Partners</div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* 3. ABOUT SECTION - 2D Parallax Watermark left, dots right */}
            <section className="relative py-32 bg-cream-base overflow-hidden border-y border-warm-border">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 relative">
                    {/* Left Frame */}
                    <div className="relative h-[600px] flex items-center justify-center p-8">
                        <div ref={aboutLeft} className="absolute inset-0 bg-sage-mist/30 border border-sage-mist parallax-layer rounded-none transform -rotate-1"></div>
                        <div ref={aboutGhost} className="absolute left-[-20%] bottom-0 font-display text-9xl font-bold text-sage-deep/5 select-none parallax-layer whitespace-nowrap transform -rotate-90 origin-bottom-left">
                            APOTHECARY
                        </div>
                        <img src="https://images.unsplash.com/photo-1563213126-a4273aed2016?auto=format&fit=crop&q=80&w=800" alt="Institutional Medical setup" className="relative z-10 w-full h-full object-cover shadow-2xl grayscale sepia-[0.3]" />
                    </div>

                    {/* Right Content */}
                    <div className="relative flex flex-col justify-center">
                        <div ref={aboutDots} className="absolute -right-20 -top-20 opacity-30 parallax-layer hidden lg:block" style={{ backgroundImage: 'radial-gradient(#C26A45 2px, transparent 2px)', backgroundSize: '24px 24px', width: '300px', height: '300px' }}></div>

                        <div ref={aboutContent} className="relative z-10 parallax-layer">
                            <Reveal>
                                <span className="font-script text-3xl text-amber-gold mb-2 block">Our Heritage</span>
                                <h2 className="text-4xl lg:text-5xl font-display font-bold text-charcoal mb-8 leading-tight">Elevating Clinical <br /> Standards Since Inception</h2>
                                <p className="text-lg text-text-secondary leading-relaxed mb-6">
                                    I-Solution connects certified pharmaceutical manufacturers with stringent regulatory authorities and active distributors. We remove the friction from bulk ordering while ensuring absolute compliance track records.
                                </p>
                                <p className="text-lg text-text-secondary leading-relaxed mb-10">
                                    Experience a tailored, role-based dashboard handling intensive CRUD operations elegantly.
                                </p>
                                <button className="border-b-2 border-sage-deep text-sage-deep uppercase tracking-widest font-bold text-sm pb-1 hover:text-ink hover:border-ink transition-colors">
                                    Read The Manifesto &rarr;
                                </button>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. FEATURES SECTION (Horizontal X Parallax) */}
            <section className="py-32 px-6 max-w-7xl mx-auto bg-cream-base overflow-hidden">
                <Reveal>
                    <div className="text-center mb-20">
                        <h2 className="text-4xl lg:text-5xl font-display font-bold text-charcoal mb-4">Architected for the Ecosystem</h2>
                        <p className="text-text-secondary max-w-2xl mx-auto text-lg">Four distinct roles. One unified infrastructure.</p>
                    </div>
                </Reveal>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 px-4">
                    <FeatureCard
                        index={0}
                        title="Administrative Oversight"
                        desc="Absolute control over inventories and users. Complete system logging and catalog management via smooth slide-over editors."
                        icon="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                    <FeatureCard
                        index={1}
                        title="Authority Workflows"
                        desc="A dedicated queue for reviewing uploaded certificates. Approve or reject products with single-click optimistic UI updates."
                        icon="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                    <FeatureCard
                        index={2}
                        title="Distributor Cart"
                        desc="B2B bulk ordering interface with seamless stock validations, preventing race conditions via nested REST constraints."
                        icon="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                    <FeatureCard
                        index={3}
                        title="Customer Browsing"
                        desc="Clean, paginated product catalog supporting debounced searches. Designed for consumer safety and direct access."
                        icon="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                </div>
            </section>

            {/* 5. CTA BANNER */}
            <section className="relative py-32 bg-espresso w-full text-center px-6 overflow-hidden border-t border-amber-gold/30">
                {/* Wavy top edge */}
                <svg className="absolute top-0 left-0 w-full text-cream-base" preserveAspectRatio="none" viewBox="0 0 1440 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M0 48H1440V0c-214.33 0-482.33 24-720 24S214.33 0 0 0V48z" /></svg>

                <div ref={ctaBg} className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 parallax-layer"></div>

                <div ref={ctaGhost} className="watermark-text absolute top-10 left-[10%] text-cream-base/5 parallax-layer z-0">
                    INTEGRATE
                </div>

                <div ref={ctaContent} className="relative z-10 max-w-3xl mx-auto mt-8 parallax-layer">
                    <Reveal>
                        <h2 className="text-4xl lg:text-6xl font-display font-bold text-cream-white mb-8 leading-tight">Secure Your Supply Chain Infrastructure.</h2>
                        <button onClick={() => navigate('/register')} className="bg-amber-warm text-ink tracking-[0.1em] uppercase text-sm font-bold px-10 py-5 rounded-none hover:bg-amber-gold active:scale-[0.98] transition shadow-2xl">
                            Request Implementation
                        </button>
                    </Reveal>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-ink text-warm-border py-20 border-t border-[#3D3529]">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 text-sm">
                    <div>
                        <div className="text-2xl font-bold font-display text-cream-white mb-6 tracking-wide">I-Solution</div>
                        <p className="max-w-xs font-body leading-relaxed text-[#9A9082]">Digitizing the apothecary heritage. Secure, compliant, and modern pharmaceutical logistics.</p>
                    </div>
                    <div>
                        <h4 className="text-cream-white font-bold mb-6 tracking-[0.15em] uppercase text-xs">Directory</h4>
                        <ul className="space-y-4 font-body">
                            <li><button onClick={() => navigate('/products')} className="hover:text-amber-gold transition">Catalog</button></li>
                            <li><button onClick={() => navigate('/login')} className="hover:text-amber-gold transition">Dashboard Auth</button></li>
                            <li><button className="hover:text-amber-gold transition">Our Manifesto</button></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-cream-white font-bold mb-6 tracking-[0.15em] uppercase text-xs">Headquarters</h4>
                        <ul className="space-y-4 font-body text-[#9A9082]">
                            <li>communications@isolution.app</li>
                            <li>+1 (800) 555-0199</li>
                            <li>404 Apothecary District, Central City</li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
