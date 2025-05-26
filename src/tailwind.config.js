/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        street: ['"Bebas Neue"', "sans-serif"],
        rocksalt: ['"Rock Salt"', "cursive"],
        justAnotherHand: ['"Just Another Hand"', "cursive"],
      },
    },
  },
  plugins: [],
};
// This is a Tailwind CSS configuration file that specifies the content files to scan for class names,