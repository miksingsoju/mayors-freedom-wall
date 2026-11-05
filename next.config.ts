import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Let kiosks and the projector laptop on the same Wi-Fi load the dev server.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.*.*.*"],
};

export default nextConfig;
