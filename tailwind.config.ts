import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dream: {
          bg: "#f9f5f0",
          paper: "#fffdf7",
          accent: "#e8b4a8",
          softgreen: "#a8d5ba",
          softblue: "#b8d4f0",
          softpink: "#f4c2c2",
          softyellow: "#f7d9a8",
        },
      },
      fontFamily: {
        sans: ["Noto Sans SC", "system-ui", "sans-serif"],
        serif: ["Noto Serif SC", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
