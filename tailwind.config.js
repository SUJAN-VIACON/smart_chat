/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary: "rgba(36, 36, 36, 0.6)",
          secondary: "#017efa",
          accent: "#292929",
          "accent-content":"#363636",
          "accent-focus":"#343434",
          neutral: "#EFEFEF",
          "natural-focus": "#FFFFFF",
          "neutral-content": "#797979",
          "base-100": "#ffffff",
          "base-200": "#2F2F2F",
          "base-300": "#797979E5",
  
        },
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          primary: "rgba(36, 36, 36, 0.6)",
          secondary: "#017efa",
          accent: "#292929",
          neutral: "#EFEFEF",
          "accent-content":"#363636",
          "accent-focus":"#343434",
          "natural-focus": "#FFFFFF",
          "neutral-content": "#797979",
          "base-200": "#2F2F2F",
          "base-300": "#797979E5",

        },
      },
    ],
  },
};
