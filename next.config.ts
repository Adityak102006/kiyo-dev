import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  reactStrictMode: true,
  async redirects() {
    // The standalone /terms page now lives in the Terms band on /contact.
    return [{ source: "/terms", destination: "/contact#terms", permanent: false }];
  },
  images: {
    // Serve AVIF first, WebP as fallback — sharp handles this in production.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
