/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        vazir: ["Vazir", "sans-serif"],
      },
      colors: {
        primary: "#007bff",
        secondary: "#0056b3",
        danger: "#dc3545",
        success: "#28a745",
        light: "#f8f9fa",
        dark: "#343a40",
      },
    },
  },
  plugins: [],
};
