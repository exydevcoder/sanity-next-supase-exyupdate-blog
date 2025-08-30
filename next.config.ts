import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**'
      },
      {
        protocol: 'https',
        hostname: 'ajcymrzpuffbdfqjzdkv.supabase.co'
      }
    ]
  }
};

export default nextConfig;
