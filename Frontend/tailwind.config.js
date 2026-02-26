/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                ink: '#2C2416',
                charcoal: '#3D3529',
                espresso: '#5C4A32',
                sage: {
                    deep: '#5F7052',
                    mid: '#7A8C6E',
                    light: '#9BAF8D',
                    mist: '#D4E0CC'
                },
                amber: {
                    gold: '#D4880A',
                    warm: '#F0A500',
                    soft: '#FBE8B8'
                },
                terracotta: {
                    DEFAULT: '#C26A45',
                    soft: '#F5DDD4'
                },
                cream: {
                    base: '#F5F3ED',
                    card: '#EEEADE',
                    deep: '#E4DFCF',
                    white: '#FDFCF9'
                },
                warm: {
                    border: '#D5CEBC'
                },
                text: {
                    primary: '#2C2416',
                    secondary: '#6B5E4A',
                    placeholder: '#9A9082'
                },
                success: {
                    DEFAULT: '#5F7052',
                    soft: '#D4E0CC'
                },
                warning: {
                    DEFAULT: '#F0A500',
                    soft: '#FBE8B8'
                },
                danger: {
                    DEFAULT: '#C26A45',
                    soft: '#F5DDD4'
                }
            },
            fontFamily: {
                display: ['Cormorant Garamond', 'serif'],
                script: ['Cormorant Garamond', 'serif'],
                body: ['Outfit', 'sans-serif'],
                mono: ['IBM Plex Mono', 'monospace'],
            },
            animation: {
                fadeInUp: 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                shimmer: 'shimmer 2s infinite linear',
                pulseRing: 'pulseRing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                },
                pulseRing: {
                    '0%, 100%': { transform: 'scale(1)', opacity: '1' },
                    '50%': { transform: 'scale(1.5)', opacity: '0.3' },
                }
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
}
