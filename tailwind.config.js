/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      lg: '1024px',
      mobile: { max: '820px' }
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
}
