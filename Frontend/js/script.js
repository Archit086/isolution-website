/*
   iSolution - Main Script
   Handles navigation, cart logic, and interactions.
*/

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                // Populate mobile menu if empty (simple clone for now)
                if (mobileMenu.innerHTML.trim() === '') {
                    const links = navbar.innerHTML;
                    mobileMenu.innerHTML = `<ul style="display: flex; flex-direction: column; gap: 1rem;">${links}</ul>`;
                }
            } else {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // --- Cart Logic ---
    updateCartCount();

    window.addToCart = function (id, name, price) {
        let cart = JSON.parse(localStorage.getItem('isolution_cart')) || [];
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }

        localStorage.setItem('isolution_cart', JSON.stringify(cart));
        updateCartCount();
        alert(`${name} added to cart!`);
    };

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('isolution_cart')) || [];
        const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

        const countElements = document.querySelectorAll('#cart-count');
        countElements.forEach(el => el.textContent = totalCount);
    }

    // --- Cart Page Rendering (if on cart.html) ---
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    if (cartItemsContainer && cartTotalElement) {
        renderCart();
    }

    function renderCart() {
        const cart = JSON.parse(localStorage.getItem('isolution_cart')) || [];
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            cartTotalElement.textContent = '0';
            return;
        }

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const itemDiv = document.createElement('div');
            itemDiv.className = 'flex';
            itemDiv.style.justifyContent = 'space-between';
            itemDiv.style.alignItems = 'center';
            itemDiv.style.padding = '1rem 0';
            itemDiv.style.borderBottom = '1px solid #eee';

            itemDiv.innerHTML = `
                <div>
                    <h5 style="margin: 0;">${item.name}</h5>
                    <p style="font-size: 0.9rem; color: #666;">₹${item.price} x ${item.quantity}</p>
                </div>
                <div>
                    <span style="font-weight: 600;">₹${itemTotal}</span>
                </div>
            `;
            cartItemsContainer.appendChild(itemDiv);
        });

        cartTotalElement.textContent = total;
    }

    // --- Checkout Logic (Mock) ---
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Order Placed Successfully! We will contact you for payment and delivery.');
            localStorage.removeItem('isolution_cart');
            window.location.href = 'index.html';
        });
    }

    console.log('iSolution script loaded.');
});
