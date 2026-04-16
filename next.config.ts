import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
      allowedOrigins: ["localhost:3000", "*.devtunnels.ms"],
    },
  },
  async redirects() {
    return [
      {
        source: "/labels",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
