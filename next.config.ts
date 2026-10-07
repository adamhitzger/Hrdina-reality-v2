import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    taint: true,
    // Životopis z přihlášky jde přes serverovou akci, max. 4 MB (schemas.ts). Na Vercelu je strop 4,5 MB a výš nejde.
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  images: {
    remotePatterns: [new URL("https://cdn.sanity.io/images/**")],
  },
};

export default nextConfig;
