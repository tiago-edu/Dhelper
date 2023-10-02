/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{react,vite,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};
