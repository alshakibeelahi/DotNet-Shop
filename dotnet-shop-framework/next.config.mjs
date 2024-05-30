/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['https://localhost:44377/'],
  },
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'localhost',
      port: '44377',
      pathname: '/uploads/**',
    },
  ],
};

export default nextConfig;
