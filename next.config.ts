/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.pointspreads.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io', 
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com', // 👈 Added DiceBear here
      },
    ],
  },

  // 👇 Added rewrites below to handle the subdirectory routing
  async rewrites() {
    return [
      {
        // When a user types launchatdawn.com/apps/crypto-pulse
        source: '/apps/crypto-pulse',
        // Silently pull the homepage from your background app deployment
        destination: 'https://crypto-pulse-app.vercel.app/apps/crypto-pulse', 
      },
      {
        // This handles all assets, chunks, sub-pages, and API calls seamlessly
        source: '/apps/crypto-pulse/:path*',
        destination: 'https://crypto-pulse-app.vercel.app/apps/crypto-pulse/:path*', 
      },
      {
        source:'/apps/trading',
        destination: 'https://crypto-pulse-chi-gold.vercel.app/apps/trading',
      },
      {
        source:'/apps/trading/:path*',
        destination: 'https://crypto-pulse-chi-gold.vercel.app/apps/trading/:path*',
      }
    ];
  },

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.launchatdawn.com' }],
        destination: 'https://launchatdawn.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;