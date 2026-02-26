import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('access');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded.user_id || decoded.email);
                setRole(decoded.role || 'customer'); // default to customer or adjust
                setIsAuthenticated(true);
            } catch (err) {
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const res = await api.post('/accounts/login/', { email, password });
            const { access, refresh } = res.data;
            localStorage.setItem('access', access);
            localStorage.setItem('refresh', refresh);
            const decoded = jwtDecode(access);
            setUser(decoded.user_id || decoded.email);
            setRole(decoded.role || 'customer');
            setIsAuthenticated(true);
            return { success: true };
        } catch (error) {
            return { success: false, error: 'Login failed' };
        }
    };

    const logout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setUser(null);
        setRole(null);
        setIsAuthenticated(false);
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ user, role, isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
