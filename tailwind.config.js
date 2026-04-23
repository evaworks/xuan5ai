/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        xuanwu: {
          dark: '#0a0e14',
          darker: '#050810',
          accent: '#c9a962',
          text: '#e8e6e3',
          muted: '#6b7280',
        }
      },
      fontFamily: {
        serif: ['"Source Serif 4"', '"Noto Serif SC"', 'Georgia', 'serif'],
        sans: ['Inter', '"Noto Sans SC"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}