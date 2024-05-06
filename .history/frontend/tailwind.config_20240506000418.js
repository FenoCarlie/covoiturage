import flowbite from "./node_modules/flowbite/plugin";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      boxShadow: {
        l: "0 0 40px -15px rgba(0, 0, 0, 0.3)",
      },
      colors: {
        myColor: "#054752",
      },
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
    },
  },
  plugins: [flowbite],
};
