module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        sniglet: ['Sniglet', 'cursive']
      },
      spacing:{
        'graph-s':'30rem'
      },
      colors: {
        ungu:{
          light: '#AFADCC',
          terang: '#F2F1FF',
          teks: '#333333',
          gelap: '#2F2B71',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
