/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // 禁用图片优化，因为静态导出不支持
  // 如果有使用 next/image，会使用未优化的图片
  
  // 在生产构建时忽略 ESLint 错误
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // 在生产构建时忽略 TypeScript 错误（可选）
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig

