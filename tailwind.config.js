/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#FFCC00',
        secondary: '#0075BE'
      },
      backgroundImage: {
        'main-menu': "url('/src/assets/forestBackground.png')",
        pokeballs: "url('/src/assets/pokeballsBackground.jpg')"
      },
      dropShadow: {
        surrounded: [
          '2px 2px  white',
          '-2px -2px white',
          '0 2px white',
          '0 -2px white'
        ],
        'surrounded-thin': [
          '1px 1px  white',
          '-1px -1px white',
          '0 1px white',
          '0 -1px white'
        ],
        'surrounded-blue': [
          '2px 2px  #0075BE',
          '-2px -2px #0075BE',
          '0 2px #0075BE',
          '0 -2px #0075BE'
        ]
      }
    }
  },
  plugins: []
}
