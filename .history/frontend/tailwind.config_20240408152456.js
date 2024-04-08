/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        l: "0 0 40px -15px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
