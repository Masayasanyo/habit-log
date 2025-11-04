import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./styles/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    // color setting 
    colors: {
      primary: "#3674B5",
      secondary: "#A1E3F9",
      tertiary: "FFFFFF", 
      // gray scale setting 
      gray: {
        900: "#333333",
        800: "#666666",
        700: "#999999",
        600: "#CCCCCC",
        100: "#EEEEEE",
      },
      white: "#FFFFFF",
    },
  },
  plugins: [],
};
