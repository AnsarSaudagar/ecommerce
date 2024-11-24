/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    fontFamily:{
      custom: ['Poppins', 'sans-serif'], // Replace 'YourFontFamily' with the actual font name
    }
    
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

