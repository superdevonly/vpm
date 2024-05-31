/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverActions: {
      bodySizeLimit: "90mb",
    },
  },
  transpilePackages: ["@repo/ui"],
  images: {
    domains: [
      "s3.eu-north-1.amazonaws.com",
      "oaidalleapiprodscus.blob.core.windows.net",
      "aceternity.com",
    ],
  },
};

module.exports = nextConfig;
