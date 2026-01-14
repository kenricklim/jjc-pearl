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
        // OFFICIAL JCI PALETTE
        primary: {
          DEFAULT: "#0097D7", // JCI Aqua (Main Brand Color)
          foreground: "#FFFFFF",
          dark: "#0077B6",
          light: "#33B5E5",
          50: "#E6F7FD",
          100: "#CCEFFB",
          200: "#99DFF7",
          300: "#66CFF3",
          400: "#33BFEF",
          500: "#0097D7",
          600: "#0077B6",
          700: "#005795",
          800: "#003774",
          900: "#001753",
        },
        secondary: {
          DEFAULT: "#0A0F29", // JCI Navy (Deep Blue for Text/Footer)
          foreground: "#FFFFFF",
          dark: "#070A1C",
          light: "#1A1F3A",
        },
        accent: {
          DEFAULT: "#56BDA3", // Nature Green (JCI Seafoam)
          foreground: "#FFFFFF",
          dark: "#3FA085",
          light: "#7DD4C0",
        },
        // CUSTOM PERLAS THEME
        pearl: {
          DEFAULT: "#F8F9FA", // Soft Pearl/Cream for backgrounds
          50: "#FFFFFF",
          100: "#F8F9FA",
          200: "#E9ECEF", // Darker pearl for borders
        },
        // Legacy JJC colors for backward compatibility
        jjc: {
          aqua: "#0097D7", // JCI Aqua
          navy: "#0A0F29", // JCI Navy
          green: "#56BDA3", // Nature Green
          pearl: "#F8F9FA", // Pearl White
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

