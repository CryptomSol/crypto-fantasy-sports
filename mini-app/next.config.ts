import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  experimental: {
    preloadEntriesOnStart: false,
    webpackMemoryOptimizations: true,
  },
};

export default nextConfig;
