/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{react,vite,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      screens: {
        xl: "1200px",
        fontFamily: {
          namePlace: ["Open Sans"],
        },
      },
    },
  },
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("tailwind-scrollbar-hide"),
  ],
};
