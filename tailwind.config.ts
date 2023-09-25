import type { Config } from 'tailwindcss'

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
  plugins: [],
}
export default config
