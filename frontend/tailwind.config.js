/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'soft-yellow': '#fefce8', // Light cream background like your reference
      },
    },
  },
  plugins: [],
};
