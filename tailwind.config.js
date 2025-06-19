/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#2F855A', // emerald green
        secondary: '#68D391', // light green
        accent: '#E6E1D9', // earthy beige
        offwhite: '#FAF9F6', // light background
        darktext: '#1A202C', // dark gray for text
        bordergray: '#CBD5E0', // subtle border color
        error: '#E53E3E', // error red
      },
    },
  },
  plugins: [],
};
