import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingIncludes: {
    '/**': ['./generated/prisma/**/*'],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.ap-south-1.amazonaws.com"
      }
    ]
  },
};

export default nextConfig;
