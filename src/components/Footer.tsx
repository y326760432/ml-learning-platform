import React from 'react'
import Link from 'next/link'
import { Github, Twitter, Mail, Heart } from 'lucide-react'

export const Footer: React.FC = () => {
  const footerLinks = {
    product: [
      { name: '课程中心', href: '#courses' },
      { name: '代码实验室', href: '#playground' },
      { name: '项目实战', href: '#projects' },
      { name: '学习路径', href: '#path' },
    ],
    resources: [
      { name: '文档中心', href: '#docs' },
      { name: '博客', href: '#blog' },
      { name: 'API参考', href: '#api' },
      { name: '常见问题', href: '#faq' },
    ],
    community: [
      { name: '论坛', href: '#forum' },
      { name: 'Discord', href: '#discord' },
      { name: '贡献指南', href: '#contribute' },
      { name: '行为准则', href: '#conduct' },
    ],
    company: [
      { name: '关于我们', href: '#about' },
      { name: '联系我们', href: '#contact' },
      { name: '隐私政策', href: '#privacy' },
      { name: '使用条款', href: '#terms' },
    ],
  }

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12 md:py-16">
        {/* 主要内容 */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Logo和简介 */}
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">ML</span>
              </div>
              <span className="text-xl font-bold text-white">MLearning</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-xs">
              让机器学习触手可及，通过可视化和交互式学习，帮助每个人掌握AI技术
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* 链接列 */}
          <div>
            <h3 className="text-white font-semibold mb-4">产品</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">资源</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">社区</h3>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 分割线 */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © 2025 MLearning. All rights reserved.
            </p>
            <p className="text-sm text-gray-400 flex items-center">
              Made with <Heart className="mx-1 text-red-500" size={14} fill="currentColor" /> by AI Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

