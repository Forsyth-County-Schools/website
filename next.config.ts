import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()'
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://www.ahscampus.com'
          },
        ],
      },
    ];
  },
  // Allow external images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'resources.finalsite.net',
      },
      {
        protocol: 'https',
        hostname: 'www.forsyth.k12.ga.us',
      },
      {
        protocol: 'https',
        hostname: 'fchs.forsyth.k12.ga.us',
      },
      {
        protocol: 'https',
        hostname: 'sfhs.forsyth.k12.ga.us',
      },
      {
        protocol: 'https',
        hostname: 'nfhs.forsyth.k12.ga.us',
      },
      {
        protocol: 'https',
        hostname: 'wfhs.forsyth.k12.ga.us',
      },
      {
        protocol: 'https',
        hostname: 'lhs.forsyth.k12.ga.us',
      },
      {
        protocol: 'https',
        hostname: 'dhs.forsyth.k12.ga.us',
      },
      {
        protocol: 'https',
        hostname: 'efhs.forsyth.k12.ga.us',
      },
      {
        protocol: 'https',
        hostname: 'www.ahscampus.com',
      },
      {
        protocol: 'https',
        hostname: 'ahscampus.com',
      },
    ],
  },
};

export default nextConfig;
