import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MLearning - 机器学习可视化教学平台',
  description: '通过可视化、交互式的方式帮助零基础学习者理解机器学习核心概念',
  keywords: '机器学习,教学平台,可视化,在线学习,Python',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}

