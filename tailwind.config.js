/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        body: ["Jost", "sans-serif"],
      },

      animation: {
        pop: "pop .25s ease",
        fadeIn: "fadeIn .25s ease",
      },

      keyframes: {
        pop: {
          "0%": { transform: "scale(.95)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },

        fadeIn: {
          from: { opacity: 0, transform: "scale(.95)" },
          to: { opacity: 1, transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
