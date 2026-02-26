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
        <div className="flex min-h-screen bg-surface-muted overflow-hidden">
            <div className="hidden lg:flex lg:w-1/2 bg-primary relative items-center justify-center p-12">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMEEyNDYzIiBmaWxsLW9wYWNpdHk9IjEiPjwvcmVjdD4KPHBhdGggZD0iTTAgMEw4IDhaTTAgOEw4IDBaIiBzdHJva2U9IiMxRTNBOEEiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20"></div>
                <div className="relative z-10 text-white max-w-lg mb-20 animate-fadeInUp">
                    <Link to="/" className="text-3xl font-display font-bold tracking-tight text-white block mb-12 hover:text-accent transition">I-Solution</Link>
                    <h2 className="text-5xl font-display font-bold leading-tight mb-6 mt-12">
                        Secure compliance,<br />seamless ordering.
                    </h2>
                    <p className="text-xl text-accent-soft/80 leading-relaxed">
                        Log in to manage your pharmaceutical pipeline with full visibility and regulatory adherence.
                    </p>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
                <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-border p-10">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-display font-bold text-primary mb-2">Welcome Back</h2>
                        <p className="text-text-secondary font-medium">Please enter your details to sign in.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Email</label>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors({ ...errors, email: null }) }}
                                className={`w-full px-4 py-3 rounded-xl border bg-surface-muted focus:bg-white focus:ring-2 focus:ring-accent outline-none transition ${errors.email ? 'border-danger focus:ring-danger' : 'border-border'}`}
                                placeholder="admin@isolution.app"
                            />
                            {errors.email && <p className="text-danger text-xs mt-1.5 font-medium">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors({ ...errors, password: null }) }}
                                    className={`w-full pl-4 pr-12 py-3 rounded-xl border bg-surface-muted focus:bg-white focus:ring-2 focus:ring-accent outline-none transition ${errors.password ? 'border-danger focus:ring-danger' : 'border-border'}`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-3.5 text-text-secondary hover:text-primary transition"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        {showPassword ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /> // eye open path
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /> // eye closed path
                                        )}
                                    </svg>
                                </button>
                            </div>
                            {errors.password && <p className="text-danger text-xs mt-1.5 font-medium">{errors.password}</p>}
                        </div>

                        <div className="flex items-center justify-between mt-2">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input type="checkbox" className="w-4 h-4 rounded text-accent border-border focus:ring-accent transition cursor-pointer" />
                                <span className="text-sm font-medium text-text-secondary group-hover:text-primary transition">Remember me</span>
                            </label>
                            <button type="button" className="text-sm font-bold text-primary hover:text-accent transition">Forgot Password?</button>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary text-white py-3.5 rounded-xl font-bold mt-8 hover:bg-primary-light active:scale-[0.98] transition shadow-lg shadow-primary/20 flex justify-center items-center h-[52px]"
                        >
                            {isLoading ? <Loader type="spinner" /> : 'Sign In'}
                        </button>
                    </form>

                    <p className="text-center mt-8 text-sm text-text-secondary font-medium">
                        Don't have an account? <Link to="/register" className="text-accent font-bold hover:underline">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
