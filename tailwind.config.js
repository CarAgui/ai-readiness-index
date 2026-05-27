/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#070707",
        charcoal: "#151515",
        graphite: "#262626",
        gold: "#f5c400",
        "gold-soft": "#ffe57a",
        paper: "#f8f8f4"
      },
      boxShadow: {
        executive: "0 22px 60px rgba(0, 0, 0, 0.16)",
        subtle: "0 12px 32px rgba(0, 0, 0, 0.08)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "Arial", "sans-serif"]
      }
    }
  },
  plugins: []
};
