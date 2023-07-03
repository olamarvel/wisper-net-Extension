/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT")
module.exports = withMT({
  mode: "jit",
  darkMode: "class",
  content: ["./**/*.tsx"],
  theme: {
    extend: {
     colors: {
      dark: '#030303',
      'l-blue': '#E9F1FA',
      'my-indigo': '#CC8899',
      Text: '#cbd5e0',
     },
    },
   },
  plugins: []
})
