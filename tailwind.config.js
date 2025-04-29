/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./client/index.html",
    "./client/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'plant-green': '#2ecc71',
        'plant-dark-green': '#27ae60',
      }
    },
  },
  plugins: [],
}
