/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'main-menu': "url('/src/assets/forestBackground.png')"
      },
      dropShadow: {
        surrounded: [
          '2px 2px  white',
          '-2px -2px white',
          '0 2px white',
          '0 -2px white'
        ],
        'surrounded-blue': [
          '2px 2px  #0075BE',
          '-2px -2px #0075BE',
          '0 2px #0075BE',
          '0 -2px #0075BE'
        ],
      }
    }
  },
  plugins: []
}
