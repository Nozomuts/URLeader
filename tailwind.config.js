const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.tsx"],
  darkMode: false,
  theme: {
    colors: {
      transparent: "transparent",
      black: "#20232a",
      gray: colors.gray,
      white: "#fff",
      main: "#61dafb",
      sub: "#282c34",
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
