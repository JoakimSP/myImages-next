/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-grey': 'rgba(62,60,61,1)',
      },
      backgroundImage: {
        'custom-header-grey': 'linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(70,70,70,1) 100%)',
      }
    },
  },
  plugins: [],
}

