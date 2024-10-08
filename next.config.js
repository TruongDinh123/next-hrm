/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@ant-design/icons",
    "antd",
    "rc-util",
    "@ant-design/icons-svg",
    "rc-pagination",
    "rc-picker"
  ],
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;