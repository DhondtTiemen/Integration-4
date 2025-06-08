/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        alphaPurple: '#BB7CD2',
        alphaYellow: '#FEBE4F',
        alphaGreen: '#05A368',
        alphaBlue: '#5F90FF',
        alphaBrown: '#691F13',
        alphaDark: '#222222',
        alphaWhite: '#FFFFFF'
      },
      fontFamily: {
        primary: ['"GT Walsheim"', 'sans-serif']
      }
    }
  },
  plugins: []
}