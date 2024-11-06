/** @type {import('tailwindcss').Config} */
export default {
  content: ["./html/**/*.html", "./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "spin-slow2": "spin 4s linear infinite", // Hace que gire más lento (3s)
      },
      spacing: {
        "72.8vw": "72.8vw",
        "4vw": "4vw",
      },
      fontFamily: {
        boogaloo: ["Boogaloo", "system-ui"],
        breeSerif: ["Bree Serif", "serif"],
        baloo: ["'Baloo 2'", "system-ui"],
        poopins: ["'Poppins'", "sans-serif"],
      },
      colors: {
        "custom-color": "rgb(227, 220, 227)", // Color personalizado
      },
      screens: {
        xlprimario: "769px",
        xlsecundario: "2000px",
      },
      boxShadow: {
        asideProductos: "0.1vw 0.1vw 0.8vw #a69aaa",
        asiSeccion: "0vw 0.1vw 0.2vw #a69aaa",
        fav: "0vw 0.2vw 0.5vw #a69aaa",
      },
      backgroundImage: {
        "custom-gradient": "repeating-radial-gradient(circle at 0 0, transparent 0, #cb76e3 15px), repeating-linear-gradient(#54008955, #540089)",
      },
    },
  },
  plugins: [],
};
