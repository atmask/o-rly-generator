/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

const isProd = process.env.NODE_ENV === "production";

/** @type {import("next").NextConfig} */
const config = {
  basePath: isProd ? "/o-rly-generator" : "",
  output: "export",
  reactStrictMode: true,

  transpilePackages: ["geist"],
};

export default config;
