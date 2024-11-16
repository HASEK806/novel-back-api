/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    middlewarePrefetch: 'flexible', // 优化中间件加载性能
  },
};

module.exports = nextConfig;
