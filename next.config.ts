const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // Disable PWA in dev mode
});

module.exports = withPWA({
  reactStrictMode: true,
  experimental: {
    // Remove turbopack for now
    // turbopack: true,
  },
});
