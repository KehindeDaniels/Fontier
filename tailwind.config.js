/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Allows us to toggle dark mode via a class
  content: ["./src/**/*.{html,js}", "./index.html"], // Specify paths to your template files
  theme: {
    extend: {
      fontFamily: {
        itim: ["Itim", "cursive"], // Add this line
      },
      colors: {
        backgroundLight: "#FFFFFF",
        backgroundDark: "#2C2E3A",
        fontIconLight: "#606060",
        fontIconDark: "#D0D0D0",
        navBarLight: "#FFFFFF",
        navBarDark: "#2E323E",
        mobileNavBarDark: "#2C2E3A",
        textAreaLight: "#FFFFFF",
        textAreaDark: "#2E323E",
      },
    },
  },
  plugins: [],
};
