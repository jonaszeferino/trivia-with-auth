module.exports = {
  images: {
    domains: [
      "image.tmdb.org",
      "https://image.tmdb.org/t/p/original",
      "image.tmdb.org/t/p/original",
    ],
  },

  experimental: {
    forceSwcTransforms: true,
    newNextLinkBehavior: false,
  },
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};
