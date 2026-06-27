/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.cache = { type: "memory" };
    }
    return config;
  },
};

export default nextConfig;
