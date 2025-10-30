'use client'

import React from 'react'
import { Card } from './ui/Card'
import { Button } from './ui/Button'
import { BookOpen, Brain, Sparkles, Rocket, CheckCircle } from 'lucide-react'

const learningPaths = [
  {
    icon: BookOpen,
    title: '基础入门',
    level: '初级',
    duration: '4周',
    color: 'bg-blue-500',
    topics: [
      '机器学习概述',
      'Python基础',
      '数据预处理',
      '线性回归',
      '逻辑回归'
    ],
    completed: 0,
  },
  {
    icon: Brain,
    title: '核心算法',
    level: '中级',
    duration: '6周',
    color: 'bg-purple-500',
    topics: [
      '决策树与随机森林',
      'SVM支持向量机',
      '聚类算法',
      '神经网络基础',
      '模型评估与优化'
    ],
    completed: 0,
  },
  {
    icon: Sparkles,
    title: '深度学习',
    level: '高级',
    duration: '8周',
    color: 'bg-pink-500',
    topics: [
      '卷积神经网络',
      '循环神经网络',
      'Transformer架构',
      '迁移学习',
      '模型部署'
    ],
    completed: 0,
  },
  {
    icon: Rocket,
    title: '项目实战',
    level: '进阶',
    duration: '持续',
    color: 'bg-orange-500',
    topics: [
      '图像分类项目',
      '文本情感分析',
      '推荐系统实现',
      '时间序列预测',
      '端到端应用开发'
    ],
    completed: 0,
  },
]

export const LearningPath: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="container-custom">
        {/* 标题 */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">系统化</span>学习路径
          </h2>
          <p className="text-lg text-gray-600">
            从零基础到实战应用，循序渐进掌握机器学习全栈技能
          </p>
        </div>

        {/* 学习路径卡片 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {learningPaths.map((path, index) => {
            const Icon = path.icon
            return (
              <Card key={index} hover className="flex flex-col h-full">
                {/* 头部 */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`
                    w-12 h-12 rounded-xl ${path.color}
                    flex items-center justify-center
                  `}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 bg-gray-100 rounded-full text-gray-700">
                    {path.level}
                  </span>
                </div>

                {/* 标题和时长 */}
                <h3 className="text-xl font-bold mb-2">{path.title}</h3>
                <p className="text-sm text-gray-500 mb-4">
                  预计学习时间：{path.duration}
                </p>

                {/* 主题列表 */}
                <div className="flex-grow space-y-2 mb-6">
                  {path.topics.map((topic, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <CheckCircle className="text-primary-500 mt-0.5 flex-shrink-0" size={16} />
                      <span className="text-sm text-gray-700">{topic}</span>
                    </div>
                  ))}
                </div>

                {/* 按钮 */}
                <Button variant="outline" size="sm" className="w-full">
                  开始学习
                </Button>
              </Card>
            )
          })}
        </div>

        {/* 进度提示 */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white rounded-full shadow-lg">
            <Sparkles className="text-primary-600" size={20} />
            <span className="text-gray-700">
              完成所有路径后，你将具备独立开发机器学习项目的能力
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

