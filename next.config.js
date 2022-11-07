/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['ih1.redbubble.net','api.escuelajs.co','api.lorem.space','placeimg.com'],
  },
}

module.exports = nextConfig
