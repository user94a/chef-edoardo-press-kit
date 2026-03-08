const basePath = process.env.NODE_ENV === 'production' ? '/chef-edoardo-press-kit' : ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: process.env.NODE_ENV === 'production' ? '/chef-edoardo-press-kit/' : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
