import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const stored = localStorage.getItem('isolution_v3_cart');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Failed to parse cart from local storage:', error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('isolution_v3_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity = 1) => {
        const normalizedProduct = {
            ...product,
            price: parseFloat(product.price || 0)
        };

        setCartItems(prev => {
            const existing = prev.find(item => item.id === normalizedProduct.id);
            if (existing) {
                // Check stock bounds
                const newQty = existing.quantity + quantity;
                if (newQty > normalizedProduct.stock) {
                    toast.error(`Cannot add more. Only ${normalizedProduct.stock} units available.`);
                    return prev;
                }
                toast.success(`Updated ${normalizedProduct.name} quantity to ${newQty}.`);
                return prev.map(item => item.id === normalizedProduct.id ? { ...item, quantity: newQty } : item);
            } else {
                if (quantity > normalizedProduct.stock) {
                    toast.error(`Cannot add more than available stock (${normalizedProduct.stock}).`);
                    return prev;
                }
                toast.success(`Added ${normalizedProduct.name} to provision list.`);
                return [...prev, { ...normalizedProduct, quantity }];
            }
        });
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) return;
        setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartTotal = cartItems.reduce((total, item) => total + (parseFloat(item.price || 0) * item.quantity), 0);
    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
            {children}
        </CartContext.Provider>
    );
};
