import bundleAnalyzer from "@next/bundle-analyzer";
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,

  webpack(config, { isServer }) {
    config.ignoreWarnings = [
      {
        module: /cache/,
        message: /Serializing big strings/,
      },
    ];

    config.infrastructureLogging = {
      level: "none",
    };

    const fileLoaderRule = config.module.rules.find((rule: any) => rule.test?.test?.(".svg"));
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
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
    unoptimized: true, // ✅ Disable sharp usage
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
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
