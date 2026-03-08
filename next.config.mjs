/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/chef-edoardo-press-kit' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/chef-edoardo-press-kit/' : '',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
