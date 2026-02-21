/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#003087",
        gold: "#FCD34D",
        "gold-dark": "#C99600",
        navy: "#003087",
        "navy-light": "#004BB5",
      },
    },
  },
  plugins: [],
};
