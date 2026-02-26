/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0A2463',
                    light: '#1E3A8A'
                },
                accent: {
                    DEFAULT: '#2DD4BF',
                    soft: '#CCFBF1'
                },
                success: '#10B981',
                warning: '#F59E0B',
                danger: '#EF4444',
                surface: {
                    DEFAULT: '#FFFFFF',
                    muted: '#F8FAFC'
                },
                border: '#E2E8F0',
                text: {
                    primary: '#0F172A',
                    secondary: '#64748B',
                    inverse: '#FFFFFF'
                }
            },
            fontFamily: {
                sans: ['"DM Sans"', 'sans-serif'],
                display: ['Sora', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'monospace']
            },
            fontSize: {
                'xs': '0.75rem',
                'sm': '0.8125rem',
                'base': '0.9375rem',
                'lg': '1.125rem',
                'xl': '1.5rem',
                '2xl': '2.25rem',
                '3xl': '3.5rem',
            },
            animation: {
                fadeInUp: 'fadeInUp 0.4s ease-out forwards',
                float: 'float 3s ease-in-out infinite',
                shimmer: 'shimmer 1.5s infinite',
                pulseRing: 'pulseRing 1.5s cubic-bezier(0.24, 0, 0.38, 1) infinite',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-12px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                },
                pulseRing: {
                    '0%': { transform: 'scale(0.8)', opacity: '0.8' },
                    '100%': { transform: 'scale(1.5)', opacity: '0' },
                }
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
}
