/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-water": "#60D3D6",
        "marine-blue": "#205D76",
        "mustard": "#FFC751",
        "beige": "#FAE9CC",
        "light-pink": "#FFA4AB",
        "lawn-green": "#20B376",
        "poppy-red": "#E25764",
        "black": "#252525",
        "white": "#F9F9F9",
        "gray": {
          100: "#E1E1E1",
          200: "#B5B5B5",
          300: "#495057",
        },
      },
      fontFamily: {
        Mali: ["Mali", "serif"],
        Roboto: ["Roboto", "serif"],
      },
    },
  },
  plugins: [],
};
