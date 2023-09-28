import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const flip = plugin(function ({ addUtilities }) {
  addUtilities({
    '.flip-x': {
      transform: 'rotateX(180deg)',
    },
    '.flip-y': {
      transform: 'rotateY(180deg)',
    },
  })
})

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'header-banner': "url('/bg_header.webp')",
        'body-background': "url('/bg_pattern02.png')",
      },
      colors: {
        'pd-gray-300': '#969696',
        'pd-gray-400': '#767676',
        'pd-gray-900': '#333333',
        'pd-pink-100': '#ff99be',
        'pd-pink-400': '#ff67b3',
      },
    },
  },
  plugins: [flip],
}
export default config
