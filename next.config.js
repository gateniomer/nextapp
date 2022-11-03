/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['fakestoreapi.com','api.escuelajs.co','api.lorem.space','placeimg.com'],
  },
}

module.exports = nextConfig
