import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const errs = {};
        if (!email) errs.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Email address is invalid';
        if (!password) errs.password = 'Password is required';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);
        const res = await login(email, password);
        setIsLoading(false);

        if (res.success) {
            toast.success('Logged in successfully!');
            navigate('/dashboard');
        } else {
            toast.error(res.error || 'Failed to login. Please check credentials.');
        }
    };

    return (
        <div className="flex min-h-screen bg-cream-base overflow-hidden font-body">
            <div className="hidden lg:flex lg:w-1/2 bg-charcoal relative items-center justify-center p-12 overflow-hidden border-r border-[#3D3529]">
                <div className="absolute inset-0 grain-bg mix-blend-overlay opacity-30"></div>

                <div className="relative z-10 max-w-lg animate-fadeInUp">
                    <Link to="/" className="font-script text-3xl font-bold tracking-tight text-sage-mist block mb-8 hover:text-cream-white transition italic">I-Solution</Link>
                    <h2 className="text-5xl font-display font-bold leading-tight mb-8 mt-12 text-cream-white">
                        Secure governance,<br />seamless clinical provisioning.
                    </h2>
                    <p className="text-xl text-[#9A9082] leading-relaxed">
                        Access your infrastructure role to manage the pharmaceutical pipeline with absolute visibility.
                    </p>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
                <div className="w-full max-w-md bg-cream-card rounded-xl border border-warm-border p-10 shadow-2xl">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-display font-extrabold text-charcoal mb-2">Authentication</h2>
                        <p className="text-text-secondary font-medium tracking-wide">Enter your authorized credentials.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-text-secondary uppercase tracking-[0.15em] mb-2">Email Identity</label>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors({ ...errors, email: null }) }}
                                className={`w-full px-4 py-3 rounded-none border-b-2 bg-transparent focus:bg-cream-deep focus:border-sage-deep outline-none transition-colors ${errors.email ? 'border-terracotta' : 'border-warm-border'}`}
                                placeholder="authority@isolution.app"
                            />
                            {errors.email && <p className="text-terracotta text-xs mt-1.5 font-bold tracking-wide">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-text-secondary uppercase tracking-[0.15em] mb-2">Access Token</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors({ ...errors, password: null }) }}
                                    className={`w-full pl-4 pr-12 py-3 rounded-none border-b-2 bg-transparent focus:bg-cream-deep focus:border-sage-deep outline-none transition-colors ${errors.password ? 'border-terracotta' : 'border-warm-border'}`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-3.5 text-text-secondary hover:text-charcoal transition"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        {showPassword ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        )}
                                    </svg>
                                </button>
                            </div>
                            {errors.password && <p className="text-terracotta text-xs mt-1.5 font-bold tracking-wide">{errors.password}</p>}
                        </div>

                        <div className="flex items-center justify-between mt-6">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" className="w-4 h-4 rounded-none text-sage-deep border-warm-border focus:ring-sage-deep transition cursor-pointer" />
                                <span className="text-sm font-semibold text-text-secondary group-hover:text-charcoal transition tracking-wide">Remember Node</span>
                            </label>
                            <button type="button" className="text-sm font-bold tracking-wide text-charcoal hover:text-sage-deep transition">Reset Token?</button>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-amber-warm text-ink py-4 rounded-none uppercase tracking-[0.1em] font-extrabold mt-10 hover:bg-amber-gold active:scale-[0.98] transition flex justify-center items-center h-[56px] shadow-lg"
                        >
                            {isLoading ? <Loader type="spinner" /> : 'Authenticate'}
                        </button>
                    </form>

                    <p className="text-center mt-10 text-sm text-text-secondary font-medium tracking-wide">
                        Require provisioning? <Link to="/register" className="text-sage-deep font-bold border-b border-sage-deep hover:text-ink hover:border-ink transition-colors pb-0.5">Initialize Account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
