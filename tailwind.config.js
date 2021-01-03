// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.tsx"],
  darkMode: false,
  theme: {
    colors: {
      transparent: "transparent",
      black: "#282c34",
      gray: colors.gray,
      white: "#fff",
      main: "#61dafb",
      red: colors.red,
    },
    extend: {},
  },
  variants: {
    extend: {
      outline: ["focus-visible"],
      display: ["group-hover"],
    },
  },
  plugins: [],
};
