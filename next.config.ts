import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

module.exports = {
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
