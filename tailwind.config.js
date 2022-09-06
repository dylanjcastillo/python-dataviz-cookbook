/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ["assets/js/*.js", "./*.html"],
  theme: {
    extend: {
      colors: {
        bgray: colors.slate,
      },
    },
    plugins: [],
  }
}
