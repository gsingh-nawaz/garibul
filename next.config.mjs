/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  webpack: (config) => {
    config.externals.push({ 'sharp': 'commonjs sharp', 'canvas': 'commonjs canvas' });
    return config;
  },
};

export default nextConfig;
