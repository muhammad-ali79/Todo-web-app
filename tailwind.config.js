/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    enabled: true,
    content: ["./src/**/*.{html,js}"], // Paths to your templates and JavaScript files
    // More options here as needed
  },

  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bgcolor: "#e4e5f1",
        bgcard: "#fafafa",
        bordercolor: "#cacde8",
        color: "#484b6a",
        hovercolor: "#4d5066",
        caretcolor: "#484b6a",
        checkedcolor: "#cacde8",

        // For dark mode
        "bgcolor-dark": "#161722",
        "bgcard-dark": "#25273c",
        "bordercolor-dark": "#484b6a",
        "color-dark": "#d2d3db",
        "hovercolor-dark": "#4d5066",
        "caretcolor-dark": "#3a7bfd",
        "checkedcolor-dark": "#777a92",
      },
      screens: {
        vs: "270px",
        xs: "425px",
      },
      keyframes: {
        fadeleft: {
          from: { transform: "translateX(50px)", opacity: "0.5" },
          start: { transform: "translateX(0px)", opacity: "1" },
        },

        faderight: {
          from: { transform: "translateX(-30px)", opacity: "1" },
          start: { transform: "translateX(0px)", opacity: "0" },
        },
      },
      animation: {
        fadeleft: "fadeleft 0.5s ease-in",
        faderight: "faderight 0.5s ease-in",
      },
    },
  },
  plugins: [],
};
