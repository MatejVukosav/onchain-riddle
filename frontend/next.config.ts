import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals = config.externals || [];
    config.externals.push("pino-pretty", "encoding");
    return config;
  },
};

export default nextConfig;
