import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    typescript: {
          ignoreBuildErrors: true,
    },
    images: {
          remotePatterns: [
            { protocol: 'https', hostname: 'images.unsplash.com' },
            { protocol: 'https', hostname: 'envirocarellc.com' },
                ],
    },
    async redirects() {
          return [
            { source: '/services/termite', destination: '/services/termite-control', permanent: true },
            { source: '/services/mosquito', destination: '/services/mosquito-control', permanent: true },
            { source: '/services/pest', destination: '/services/pest-control', permanent: true },
            { source: '/services/fire-ant', destination: '/services/fire-ant-control', permanent: true },
            { source: '/services/rodent', destination: '/services/rodent-control', permanent: true },
            { source: '/termite', destination: '/services/termite-control', permanent: true },
            { source: '/mosquito', destination: '/services/mosquito-control', permanent: true },
            { source: '/pest-control', destination: '/services/pest-control', permanent: true },
            { source: '/sentricon', destination: '/services/sentricon', permanent: true },
            { source: '/pay', destination: 'https://payenvirocare.key7app.com', permanent: false },
                ];
    },
};

export default nextConfig;
