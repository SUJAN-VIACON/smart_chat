/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["localhost","static.xx.fbcdn.net","lh3.googleusercontent.com","avatars.dicebear.com"],
  },
}

module.exports = nextConfig
