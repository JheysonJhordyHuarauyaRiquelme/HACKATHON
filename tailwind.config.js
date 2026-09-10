/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'surface': '#e9ffec',
        'surface-dim': '#c5e1cb',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#dffbe4',
        'surface-container': '#d9f5df',
        'on-surface': '#082013',
        'primary': '#004225',
        'on-primary': '#ffffff',
        'primary-container': '#0a5c36',
        'secondary': '#22c55e',
        'tertiary': '#0284c7',
        'neutral-dark': '#132a1c',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
