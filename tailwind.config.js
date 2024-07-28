/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        marker: ['Permanent Marker', 'cursive'],
        indie: ['Indie Flower', ' cursive'],
        concert: ['Concert One', 'cursive'],
      },
    },
  },

  plugins: [],
};
