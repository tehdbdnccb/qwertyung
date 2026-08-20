/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        0g: {
          dark: '#0a0a0a',
          accent: '#00ffcc',
          danger: '#ff3366'
        }
      }
    },
  },
  plugins: [],
};