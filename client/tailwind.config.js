/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mulish: ['Mulish', 'sans-serif'],
      },
      colors: {
        primary: "#5983fb",
        grey: "#666666",
        lightgray: "#868686",
        black: "#222222",
      },
    },
  },
  plugins: [],
}

