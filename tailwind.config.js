/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'dusty-olive': '#6D8C6E',
                'ash-grey': '#BFCCB3',
                'eggshell-white': '#F0EBD5',
                'tomato-red': '#FD6046',
                'dark-spruce': '#22442B',
            },
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
                script: ['Great Vibes', 'cursive'],
                baskerville: ['Libre Baskerville', 'serif'],
                inter: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
