import bundleAnalyzer from "@next/bundle-analyzer";
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,

  webpack(config, { isServer }) {
    // ➡️ 1. Forcefully suppress the warning (most reliable method)
    config.ignoreWarnings = [
      {
        module: /cache/,
        message: /Serializing big strings/,
      },
    ];

    // ➡️ 2. Disable infrastructure logs (optional)
    config.infrastructureLogging = {
      level: "none",
    };

    // ➡️ 3. Your existing SVG loader setup
    const fileLoaderRule = config.module.rules.find((rule: any) => rule.test?.test?.(".svg"));
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...(fileLoaderRule.resourceQuery?.not || []), /url/] },
        use: ["@svgr/webpack"],
      }
    );
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "png.pngtree.com",
      },
    ],
  },

  experimental: {
    turbo: {
      rules: {},
    },
  },
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
