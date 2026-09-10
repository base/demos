/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile external SDKs
  transpilePackages: ['@zoralabs/coins-sdk'],
  experimental: {
    esmExternals: 'loose'
  },
  // Silence warnings
  // https://github.com/WalletConnect/walletconnect-monorepo/issues/1908
  webpack: (config, options) => {
    // Add fallbacks for Node modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false
    };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default nextConfig;
