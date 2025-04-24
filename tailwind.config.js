/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}", "./src/**/*.{js,ts}"],
  theme: {
    extend: {
      colors: {
        "github-dark": "#0d1117",
        "github-gray": "#161b22",
        "github-light": "#21262d",
        "github-blue": "#58a6ff",
      },
    },
  },
  plugins: [],
}; 