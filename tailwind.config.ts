import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#10b981", // Emerald Green (JCI/JJC Brand Color)
          dark: "#059669",
          light: "#34d399",
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
        secondary: {
          DEFAULT: "#fef3c7", // Pearl White/Cream (Perlas reference)
          dark: "#fde68a",
          light: "#fffbeb",
        },
        accent: {
          DEFAULT: "#fbbf24", // Gold/Yellow (JCI Accent)
          dark: "#f59e0b",
          light: "#fcd34d",
        },
        jjc: {
          green: "#10b981", // Primary JJC Green
          pearl: "#fef3c7", // Pearl White
          gold: "#fbbf24", // Gold Accent
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

