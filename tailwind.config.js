/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}", // Pastikan jalur ini sesuai dengan struktur proyek Anda
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        golibold: "Goli-Bold", // Nama font harus sesuai dengan `useFonts`
        goliregular: "Goli-Regular",
        golimedium: "Goli-Medium",
        golilight: "Goli-Light",
      },
    },
  },
  plugins: [],
}
