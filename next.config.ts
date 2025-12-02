/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'velocityrecords.com',
        port: '',
        pathname: '/cdn/shop/**',
      },
      {
        protocol: 'https',
        hostname: 'printify.com',
        port: '',
        pathname: '/wp-content/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**', // <-- Correct & flexible
      },
      {
        protocol: 'https',
        hostname: 'thefoschini.vtexassets.com',
        port: '',
        pathname: '/arquivos/**',
      }
    ],
  },
};

module.exports = nextConfig;
