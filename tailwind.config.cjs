/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
    darkMode: "class",
    theme: {
    extend: {
      backgroundImage:{
        'banner': "url('/src/assets/banner.jpg')",
        "colors " : {
          'b':'#000',
          'w': "#fff"
        }
      }
    },
  },
  plugins: [require("daisyui")],
}
