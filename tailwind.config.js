const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [
    "./pages/**/*.tsx",
    "./components/**/*.tsx",
    "./pages_components/**/*.tsx",
  ],
  // darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      ...defaultTheme.fontFamily,
      sans: ["Inter var", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        blue: colors.blue,
        cyan: colors.cyan,
        rose: colors.rose,
        amber: colors.amber,
        orange: colors.orange,
        bronze: {
          light: "#E3D6B9",
          medium: "#E5BD91",
          dark: "#CB9F6F",
        },
        mustard: {
          light: "#E3BB6B",
          medium: "#D8AA50",
          dark: "#B99143",
        },
        steel: {
          xlight: "#CED3D7",
          light: "#96AFC1",
          medium: "#437598",
          dark: "#264A63",
          xdark: "#293A45",
        },
        beige: {
          light: "#F69D65",
          medium: "#DF8349",
          dark: "#964D1F",
        },
        gold: {
          50: "#FFEDDF",
          100: "#FFDEC3",
          200: "#FECFA9",
          300: "#F2BE93",
          400: "#D4915A",
          500: "#D4915A",
          600: "#C3824D",
          700: "#BA7741",
          800: "#975D2D",
          900: "#5B3516",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
  // variants: {
  //   extend: {},
  // },
  // plugins: [],
};
