// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // This is the magic line
  theme: {
    extend: {
      colors: {
        // Custom Gray/Black palette for your new theme
        darkBg: "#121212",
        darkSurface: "#1e1e1e",
        darkText: "#e0e0e0",
      },
    },
  },
  plugins: [],
};
