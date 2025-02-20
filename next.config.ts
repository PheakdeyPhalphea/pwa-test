// next.config.js
const withPWA = require("next-pwa");

export default withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  reactStrictMode: true,
  experimental: {
    turbopack: true, // Enable Turbopack bundler
  },
});
