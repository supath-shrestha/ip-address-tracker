/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "mobile-pattern": "url('./images/pattern-bg-mobile.png')",
        "desktop-pattern": ["url('./images/pattern-bg-desktop.png')"],
      },
      colors: {
        "very-dark-gray": "hsl(0, 0%, 17%)",
        "dark-gray": "hsl(0, 0%, 59%)",
      },
      fontFamily: {
        "rubik": ["Rubik", "sans-serif"]
      }
    },
  },
  plugins: [],
}

