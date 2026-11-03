import type { NextConfig } from "next";

const repoBasePath = "/stg-qatar-website";
const useGithubPages =
  process.env.GITHUB_PAGES === "true" || process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: useGithubPages ? repoBasePath : undefined,
  env: {
    // Ensures next/image public assets resolve under the GitHub Pages subpath.
    NEXT_PUBLIC_BASE_PATH: useGithubPages ? repoBasePath : "",
  },
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
    loader: "custom",
    loaderFile: "./image-loader.ts",
  },
};

export default nextConfig;
