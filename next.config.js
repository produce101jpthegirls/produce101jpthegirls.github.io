/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: true,  // TODO: optimize images
  },
  output: 'export',
}

module.exports = nextConfig
