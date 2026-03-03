/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  
  content: [
      "./*.html",
      "./src/js/*.js"
  ],
  safelist: [
    'bg-ev-main',
    'bg-ev-darker'
  ],
  theme: {
    extend: {
      fontFamily: { 
        sans: ['Inter', 'sans-serif'] 
      },
      colors: {
        ev: {
          main:    '#e5effa',  /* Slate Light */
          sidebar: '#212435',  /* Slate       */
          card:    '#2a2e41',  /* Card        */
          accent:  '#84cc16',  /* Lime        */
          darker:  '#181a25',  /* Dark bg     */
        }
      },
      backgroundImage: {
        donut: "conic-gradient(#84cc16 85%, #181a25 0)",
      }
    }
  },
  plugins: [],
}