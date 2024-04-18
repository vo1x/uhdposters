/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pastelLightBlue: '#75c3f0',
        pastelOrange: '#f0cb75',
        pastelRed: '#f07596'
      }
    }
  },
  plugins: []
};
