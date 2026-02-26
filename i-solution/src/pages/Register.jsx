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
            // Mock registration logic or hit API endpoint
            // await api.post('/register/', formData);
            toast.success('Registration successful! Please login.');
            navigate('/login');
        } catch (error) {
            toast.error('Registration failed. Try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-surface-muted overflow-hidden">
            <div className="hidden lg:flex lg:w-1/2 bg-primary relative items-center justify-center p-12">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMEEyNDYzIiBmaWxsLW9wYWNpdHk9IjEiPjwvcmVjdD4KPHBhdGggZD0iTTAgMEw4IDhaTTAgOEw4IDBaIiBzdHJva2U9IiMxRTNBOEEiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20"></div>
                <div className="relative z-10 text-white max-w-lg mb-20 animate-fadeInUp">
                    <Link to="/" className="text-3xl font-display font-bold tracking-tight text-white block mb-12 hover:text-accent transition">I-Solution</Link>
                    <h2 className="text-5xl font-display font-bold leading-tight mb-6 mt-12">
                        Join the ecosystem.
                    </h2>
                    <p className="text-xl text-accent-soft/80 leading-relaxed">
                        Create an account to browse compliant products, track orders, or manage large scale distributions.
                    </p>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 animate-fadeInUp overflow-y-auto h-screen" style={{ animationDelay: '100ms' }}>
                <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-border p-10 my-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-display font-bold text-primary mb-2">Create Account</h2>
                        <p className="text-text-secondary font-medium">Join I-Solution as a customer or distributor.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Full Name</label>
                            <input
                                type="text" name="name" value={formData.name} onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-xl border bg-surface-muted focus:bg-white focus:ring-2 focus:ring-accent outline-none transition ${errors.name ? 'border-danger focus:ring-danger' : 'border-border'}`}
                                placeholder="John Doe"
                            />
                            {errors.name && <p className="text-danger text-xs mt-1.5 font-medium">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Email</label>
                            <input
                                type="text" name="email" value={formData.email} onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-xl border bg-surface-muted focus:bg-white focus:ring-2 focus:ring-accent outline-none transition ${errors.email ? 'border-danger focus:ring-danger' : 'border-border'}`}
                                placeholder="john@example.com"
                            />
                            {errors.email && <p className="text-danger text-xs mt-1.5 font-medium">{errors.email}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Password</label>
                                <input
                                    type="password" name="password" value={formData.password} onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-xl border bg-surface-muted focus:bg-white focus:ring-2 focus:ring-accent outline-none transition ${errors.password ? 'border-danger focus:ring-danger' : 'border-border'}`}
                                    placeholder="••••••••"
                                />
                                {errors.password && <p className="text-danger text-xs mt-1.5 font-medium">{errors.password}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Confirm</label>
                                <input
                                    type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-xl border bg-surface-muted focus:bg-white focus:ring-2 focus:ring-accent outline-none transition ${errors.confirmPassword ? 'border-danger focus:ring-danger' : 'border-border'}`}
                                    placeholder="••••••••"
                                />
                                {errors.confirmPassword && <p className="text-danger text-xs mt-1.5 font-medium">{errors.confirmPassword}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Role</label>
                            <select
                                name="role" value={formData.role} onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-border bg-surface-muted focus:bg-white focus:ring-2 focus:ring-accent outline-none transition text-primary font-medium"
                            >
                                <option value="customer">Customer</option>
                                <option value="distributor">Distributor</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary text-white py-3.5 rounded-xl font-bold mt-6 hover:bg-primary-light active:scale-[0.98] transition shadow-lg flex justify-center items-center h-[52px]"
                        >
                            {isLoading ? <Loader type="spinner" /> : 'Register'}
                        </button>
                    </form>

                    <p className="text-center mt-8 text-sm text-text-secondary font-medium">
                        Already have an account? <Link to="/login" className="text-accent font-bold hover:underline">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
