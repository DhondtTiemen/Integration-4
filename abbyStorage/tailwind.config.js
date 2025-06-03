// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: "#BB7CD2",
        yellow: "#FEBE4F",
        green: "#05A368",
        blue: "#5F90FF",
        brown: "#691F13",
        dark: "#222222",
        white: "#FFFFFF",
      },
      fontFamily: {
        primary: ['"GT Walsheim"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}