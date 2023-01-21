/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['media.licdn.com', 'blogger.googleusercontent.com', 's3.ap-south-1.amazonaws.com'],
  },
}

module.exports = nextConfig
