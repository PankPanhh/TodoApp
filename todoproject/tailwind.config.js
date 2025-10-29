// trong file tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Đảm bảo dòng này có để quét file component
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}