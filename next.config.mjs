/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: ['*.googleusercontent.com', '*.githubusercontent.com'],
        port: '',
        pathname: '**',
      },
    ],
  },
}

export default nextConfig
