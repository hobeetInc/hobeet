import type { Config } from "tailwindcss";
import scrollbarHide from "tailwind-scrollbar-hide";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          200: "#FFF1CC",
          300: "#FFE399",
          400: "#FFD566",
          500: "#FDB800",
          600: "#CC9400",
          700: "#996F00",
          800: "#664A00",
          900: "#0D0D0D"
        },
        white: "#FFF",
        red: "#F02A49",
        gray: {
          50: "#F2F2F2",
          100: "#D9D9D9",
          200: "#BFBFBF",
          300: "#A6A6A6",
          400: "#8C8C8C",
          500: "#737373",
          600: "#595959",
          700: "#404040",
          800: "#262626",
          900: "#0D0D0D"
        }
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)"]
      },
      fontSize: {
        "body-10": ["10px", { lineHeight: "14.5px" }],
        "body-12": ["12px", { lineHeight: "17.4px" }],
        "body-14": ["14px", { lineHeight: "20.3px" }],
        "body-16": ["16px", { lineHeight: "23.2px" }],
        "body-18": ["18px", { lineHeight: "26.1px" }],
        "body_medium-12": ["12px", { lineHeight: "17.4px", fontWeight: "500" }],
        "body_medium-14": ["14px", { lineHeight: "20.3px", fontWeight: "500" }],
        "body_medium-16": ["16px", { lineHeight: "21.6px", fontWeight: "500" }],
        "body_medium-18": ["18px", { lineHeight: "24.3px", fontWeight: "500" }],
        "subtitle-12": ["12px", { lineHeight: "16.2px", fontWeight: "600" }],
        "subtitle-14": ["14px", { lineHeight: "18.9px", fontWeight: "600" }],
        "subtitle-16": ["16px", { lineHeight: "21.6px", fontWeight: "600" }],
        "subtitle-18": ["18px", { lineHeight: "24.3px", fontWeight: "600" }],
        "subtitle-20": ["20px", { lineHeight: "27px", fontWeight: "600" }],
        "header-16": ["16px", { lineHeight: "21.6px", fontWeight: "700" }],
        "header-18": ["18px", { lineHeight: "24.3px", fontWeight: "700" }],
        "header-20": ["20px", { lineHeight: "27px", fontWeight: "700" }],
        "header-32": ["32px", { lineHeight: "43.2px", fontWeight: "700" }]
      }
    }
  },
  plugins: [scrollbarHide]
};

export default config;
