/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      //Color Palette 9
      colors: {
        primary: {
          DEFAULT: "#035388",
          100: "#E3F8FF",
          200: "#B3ECFF",
          300: "#81DEFD",
          400: "#5ED0FA",
          500: "#40C3F7",
          600: "#2BB0ED",
          700: "#1992D4",
          800: "#127FBF",
          900: "#0B69A3",
        },
        neutral: {
          DEFAULT: "#1F2933",
          100: "#F0F4F8",
          200: "#D9E2EC",
          300: "#BCCCDC",
          400: "#9FB3C8",
          500: "#829AB1",
          600: "#627D98",
          700: "#486581",
          800: "#334E68",
          900: "#243B53",
        },
        accent: {
          primary: {
            DEFAULT: "#620042",
            100: "#F0F4F8",
            200: "#D9E2EC",
            300: "#BCCCDC",
            400: "#9FB3C8",
            500: "#829AB1",
            600: "#DA127D",
            700: "#BC0A6F",
            800: "#A30664",
            900: "#870557",
          },
          destructive: {
            DEFAULT: "#610316",
            100: "#F0F4F8",
            200: "#D9E2EC",
            300: "#BCCCDC",
            400: "#9FB3C8",
            500: "#829AB1",
            600: "#627D98",
            700: "#486581",
            800: "#334E68",
            900: "#243B53",
          },
          warning: {
            DEFAULT: "#8D2B0B",
            100: "#F0F4F8",
            200: "#D9E2EC",
            300: "#BCCCDC",
            400: "#9FB3C8",
            500: "#829AB1",
            600: "#627D98",
            700: "#486581",
            800: "#334E68",
            900: "#243B53",
          },
          positive: {
            DEFAULT: "#014D40",
            100: "#F0F4F8",
            200: "#D9E2EC",
            300: "#BCCCDC",
            400: "#9FB3C8",
            500: "#829AB1",
            600: "#627D98",
            700: "#486581",
            800: "#334E68",
            900: "#243B53",
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
