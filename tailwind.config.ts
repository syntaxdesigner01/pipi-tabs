import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "great-vibes": ['"Great Vibes"', "cursive"],
      },
      colors: {
        tabBg: "#FFFD8F",
        primary: "#043915",
        secondary: "#4c763b",
      },
    },
  },
  plugins: [],
};

export default config;
