/** @type {import('tailwindcss').Config} */
module.exports = {
  // prefix: 'lin-',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      padding: {
        '1': '30px',
      },
      fontSize: {
        'base': ['30px', '2rem']
      }
    },
    screens: {
      'md': '300px'
    }
  },
  plugins: [
    require('./lin.plugin')
  ],
}

