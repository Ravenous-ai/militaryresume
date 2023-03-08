/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6A44FF",
          lighter: "#6A44FF",
          darker: "#6A44FF",
        },
        secondary: "#FCBE25",
        tertiary: "#FF7A00",
      },
    },
  },
  plugins: [],
};
