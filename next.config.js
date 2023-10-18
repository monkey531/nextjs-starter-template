/** @type {import('next').NextConfig} */
const nextConfig = {

  swcMinify: true,
  reactStrictMode: true,
  images: {
    unoptimized: false,

    remotePatterns: [

    ]
  },

}

module.exports = nextConfig
