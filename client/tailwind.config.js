/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'finance-dark': '#0a0b14', // Very dark blue/black
                'finance-panel': '#161923', // Slightly lighter panel
                'finance-accent': '#00d1ff', // Cyan accent
                'finance-green': '#00ff9d',
                'finance-red': '#ff4d4d',
                'finance-gold': '#ffd700',
            },
            fontFamily: {
                mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', "Liberation Mono", "Courier New", 'monospace'],
                sans: ['Inter', 'system-ui', 'sans-serif'], // Assuming Inter is available or fallback
            }
        },
    },
    plugins: [],
}
