// tailwind.config.js
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        l: "0 0 40px -15px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
});
