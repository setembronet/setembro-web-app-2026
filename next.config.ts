import type { NextConfig } from "next";
// import createNextIntlPlugin from 'next-intl/plugin'; // Removed

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'gpgeexulpyuwomgfcpfl.supabase.co',
      },
    ],
  },
};

export default nextConfig;
