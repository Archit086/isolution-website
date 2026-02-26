import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../api/axios';
import Loader from '../components/Loader';

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'customer'
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const errs = {};
        if (!formData.name) errs.name = 'Full Name is required';
        if (!formData.email) errs.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Email address is invalid';
        if (!formData.password) errs.password = 'Password is required';
        else if (formData.password.length < 6) errs.password = 'Password must be at least 6 characters';
        if (formData.password !== formData.confirmPassword) errs.confirmPassword = 'Passwords do not match';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);
        try {
            const res = await api.post('/accounts/register/', formData);
            if (res.status === 201) {
                toast.success('Registration successful! Please authenticate.');
                navigate('/login');
            } else {
                toast.error('Registration failed. Try again.');
            }
        } catch (error) {
            console.error('Registration error:', error.response?.data);
            const errorMsg = error.response?.data?.email?.[0] || error.response?.data?.detail || 'Registration failed. Try again.';
            toast.error(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-cream-base overflow-hidden font-body">
            <div className="hidden lg:flex lg:w-1/2 bg-charcoal relative items-center justify-center p-12 overflow-hidden border-r border-[#3D3529]">
                <div className="absolute inset-0 grain-bg mix-blend-overlay opacity-30"></div>

                <div className="relative z-10 max-w-lg animate-fadeInUp">
                    <Link to="/" className="font-script text-3xl font-bold tracking-tight text-sage-mist block mb-8 hover:text-cream-white transition italic">I-Solution</Link>
                    <h2 className="text-5xl font-display font-bold leading-tight mb-8 mt-12 text-cream-white">
                        Join the clinical ecosystem.
                    </h2>
                    <p className="text-xl text-[#9A9082] leading-relaxed">
                        Create an authorized node to browse compliant products, authorize formulations, or manage large scale distributions securely.
                    </p>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 animate-fadeInUp overflow-y-auto h-screen" style={{ animationDelay: '100ms' }}>
                <div className="w-full max-w-md bg-cream-card rounded-xl border border-warm-border p-10 my-auto shadow-2xl">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-display font-bold text-charcoal mb-2">Network Initialization</h2>
                        <p className="text-text-secondary font-medium tracking-wide">Register your operational role.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-text-secondary uppercase tracking-[0.15em] mb-2">Entity Name</label>
                            <input
                                type="text" name="name" value={formData.name} onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-none border-b-2 bg-transparent focus:bg-cream-deep focus:border-sage-deep outline-none transition-colors ${errors.name ? 'border-terracotta' : 'border-warm-border'}`}
                                placeholder="Corporate Name or User"
                            />
                            {errors.name && <p className="text-terracotta text-xs mt-1.5 font-bold tracking-wide">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-text-secondary uppercase tracking-[0.15em] mb-2">Email Identity</label>
                            <input
                                type="text" name="email" value={formData.email} onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-none border-b-2 bg-transparent focus:bg-cream-deep focus:border-sage-deep outline-none transition-colors ${errors.email ? 'border-terracotta' : 'border-warm-border'}`}
                                placeholder="identifier@domain.com"
                            />
                            {errors.email && <p className="text-terracotta text-xs mt-1.5 font-bold tracking-wide">{errors.email}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-text-secondary uppercase tracking-[0.15em] mb-2">Access Token</label>
                                <input
                                    type="password" name="password" value={formData.password} onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-none border-b-2 bg-transparent focus:bg-cream-deep focus:border-sage-deep outline-none transition-colors ${errors.password ? 'border-terracotta' : 'border-warm-border'}`}
                                    placeholder="••••••••"
                                />
                                {errors.password && <p className="text-terracotta text-xs mt-1.5 font-bold tracking-wide">{errors.password}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-text-secondary uppercase tracking-[0.15em] mb-2">Verify</label>
                                <input
                                    type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-none border-b-2 bg-transparent focus:bg-cream-deep focus:border-sage-deep outline-none transition-colors ${errors.confirmPassword ? 'border-terracotta' : 'border-warm-border'}`}
                                    placeholder="••••••••"
                                />
                                {errors.confirmPassword && <p className="text-terracotta text-xs mt-1.5 font-bold tracking-wide">{errors.confirmPassword}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-text-secondary uppercase tracking-[0.15em] mb-2">Operational Role</label>
                            <select
                                name="role" value={formData.role} onChange={handleChange}
                                className="w-full px-4 py-3 rounded-none border-b-2 border-warm-border bg-transparent focus:bg-cream-deep focus:border-sage-deep outline-none transition-colors text-charcoal font-medium"
                            >
                                <option value="customer">Consumer</option>
                                <option value="distributor">Distributor</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-amber-warm text-ink py-4 rounded-none uppercase tracking-[0.1em] font-extrabold mt-10 hover:bg-amber-gold active:scale-[0.98] transition flex justify-center items-center h-[56px] shadow-lg"
                        >
                            {isLoading ? <Loader type="spinner" /> : 'Request Provisioning'}
                        </button>
                    </form>

                    <p className="text-center mt-10 text-sm text-text-secondary font-medium tracking-wide">
                        Already initialized? <Link to="/login" className="text-sage-deep font-bold border-b border-sage-deep hover:text-ink hover:border-ink transition-colors pb-0.5">Authenticate</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
