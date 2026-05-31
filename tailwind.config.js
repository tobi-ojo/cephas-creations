/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      colors: {
        gold: {
          50:  '#fdf9ee',
          100: '#f8edca',
          200: '#f0d88a',
          400: '#d4a520',
          600: '#8B6914',
          800: '#5a420c',
          900: '#3a2a07',
        },
        dark: {
          900: '#120d06',
          800: '#1a1208',
          700: '#2d2010',
          600: '#3d2c14',
        },
        cream: '#faf8f4',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
