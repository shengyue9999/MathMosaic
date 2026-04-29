/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Static optimization hints
  output: 'standalone',

  // Compress responses
  compress: true,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
