'use client'

import React from 'react'
import { Card } from './ui/Card'
import { Eye, Code2, TrendingUp, Users } from 'lucide-react'

const features = [
  {
    icon: Eye,
    title: '可视化学习',
    description: '通过精美的动画和交互式图表，直观展示机器学习算法的工作原理，让抽象概念一目了然',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Code2,
    title: '在线实验室',
    description: '内置代码编辑器和Python运行环境，无需配置即可编写和运行机器学习代码，即时查看结果',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: TrendingUp,
    title: '渐进式学习',
    description: '精心设计的学习路径，从零基础到进阶应用，系统化掌握机器学习核心知识和实战技能',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Users,
    title: '社区互动',
    description: '活跃的学习社区，与志同道合的学习者交流心得，分享项目作品，共同成长进步',
    color: 'from-green-500 to-teal-500',
  },
]

export const Features: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container-custom">
        {/* 标题 */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            为什么选择 <span className="gradient-text">MLearning</span>
          </h2>
          <p className="text-lg text-gray-600">
            我们致力于为零基础学习者提供最友好、最高效的机器学习入门体验
          </p>
        </div>

        {/* 功能卡片 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card 
                key={index} 
                hover 
                className="group"
              >
                {/* 图标 */}
                <div className={`
                  w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color}
                  flex items-center justify-center mb-4
                  group-hover:scale-110 transition-transform duration-300
                `}>
                  <Icon className="text-white" size={28} />
                </div>

                {/* 标题 */}
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {feature.title}
                </h3>

                {/* 描述 */}
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            )
          })}
        </div>

        {/* 额外亮点 */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-4xl font-bold gradient-text">100%</div>
            <div className="text-gray-600">免费开放</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold gradient-text">24/7</div>
            <div className="text-gray-600">随时随地学习</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold gradient-text">0</div>
            <div className="text-gray-600">零门槛入门</div>
          </div>
        </div>
      </div>
    </section>
  )
}

