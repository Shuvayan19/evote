import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "d3i6fh83elv35t.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "cdn.britannica.com",
      },
      {
        protocol: "https",
        hostname: "skift.com",
      },
      {
        protocol: "https",
        hostname: "static.themarthablog.com",
      },
    ],
  },
};

export default nextConfig;
