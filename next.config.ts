import type { NextConfig } from "next";

const repoBasePath = "/stg-qatar-website";
const useGithubPages =
  process.env.GITHUB_PAGES === "true" || process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: useGithubPages ? repoBasePath : undefined,
  poweredByHeader: false,
  turbopack: {
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
