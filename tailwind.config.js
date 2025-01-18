/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", // Include App.js or similar root files
    "./app/**/*.{js,jsx,ts,tsx}", // Include all files in the app directory
    "./components/**/*.{js,jsx,ts,tsx}" // Add the components directory
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      backgroundImage: {
        'logo': "url('./assets/profile.png')"
      }
    },
  },
  plugins: [],
};
