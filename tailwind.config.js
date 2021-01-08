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
      blue: colors.blue,
    },
    minWidth: {
      80: "20rem",
    },
    maxHeight: {
      "4/5": "80%",
    },
    extend: {
      outline: {
        blue: ["2px solid #0000ff", "-2px"],
      },
    },
  },
  variants: {
    extend: {
      outline: ["focus-visible"],
      display: ["group-hover"],
    },
  },
  plugins: [],
};
