'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from './ui/Button'
import { ArrowRight, Sparkles } from 'lucide-react'
import { NeuralNetworkBackground } from './animations/NeuralNetworkBackground'

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 背景动画 */}
      <NeuralNetworkBackground />
      
      {/* 渐变背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 opacity-90" />
      
      {/* 内容 */}
      <div className="container-custom relative z-10 py-20 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* 标签 */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-8 animate-fade-in">
            <Sparkles className="text-primary-600" size={20} />
            <span className="text-sm font-medium text-gray-700">
              零基础也能轻松入门机器学习
            </span>
          </div>

          {/* 主标题 */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
            <span className="gradient-text">可视化学习</span>
            <br />
            <span className="text-gray-900">让机器学习触手可及</span>
          </h1>

          {/* 副标题 */}
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            通过交互式动画和在线代码实验室，直观理解机器学习算法原理，
            从零开始掌握AI核心技术
          </p>

          {/* CTA按钮 */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link href="/visualizations">
              <Button variant="primary" size="lg" className="group">
                体验算法可视化
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              浏览课程
            </Button>
          </div>

          {/* 统计数据 */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div>
              <div className="text-3xl md:text-4xl font-bold gradient-text">50+</div>
              <div className="text-sm text-gray-600 mt-1">算法可视化</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold gradient-text">100+</div>
              <div className="text-sm text-gray-600 mt-1">实战项目</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold gradient-text">10K+</div>
              <div className="text-sm text-gray-600 mt-1">学习者</div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部渐变 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}

