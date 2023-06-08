/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "127.0.0.1",
            },
            {
                hostname:
                    "zoclhas-verbose-chainsaw-wxj5v74xp4jcg446-8000.preview.app.github.dev",
            },
            {
                hostname: "api.naab.zocs.space",
            },
            {
          hostname: "api.notaanother.blog",
      },
        ],
    },
};

module.exports = nextConfig;
