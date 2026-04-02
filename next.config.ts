import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  serverExternalPackages: ["lighthouse", "chrome-launcher"],
};

export default nextConfig;
