/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#293659',
        'fog': '#E6E6E6',
        'fog-dark': '#ECECEC'
      },
      fontFamily: {
  sans:   ['var(--font-manrope)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  serif:  ['var(--font-manrope)', 'ui-sans-serif', 'sans-serif'],  // ← add this
  mono:   ['var(--font-manrope)', 'ui-sans-serif', 'sans-serif'],  // ← add this
  manrope: ['var(--font-manrope)', 'sans-serif'],
  kugile:  ['var(--font-kugile)', 'serif'],
},
    },
  },
  plugins: [],
}


