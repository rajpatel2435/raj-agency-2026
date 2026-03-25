import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // This makes Inter your default text
        sans: ['var(--font-inter)', 'sans-serif'], 
      },
      colors: {
        brand: "#F95D0A",
      }
    },
  },
  plugins: [],
};

export default config;