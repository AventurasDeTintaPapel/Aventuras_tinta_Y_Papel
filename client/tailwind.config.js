/** @type {import('tailwindcss').Config} */
export default {
  content: ["./html/**/*.html", "./src/**/*.js"],
  theme: {
    extend: {
      screens: {
        xlprimario: "769px",
        xlsecundario: "2000px",
      },
      backgroundImage: {
        'custom-gradient': 'repeating-radial-gradient(circle at 0 0, transparent 0, #cb76e3 15px), repeating-linear-gradient(#54008955, #540089)',
      }
    },
  },
  plugins: [],
};
