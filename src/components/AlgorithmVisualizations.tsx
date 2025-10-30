'use client'

import React from 'react'
import Link from 'next/link'
import { Play, TrendingUp, Network, Brain, BarChart3, GitBranch, Layers, Activity } from 'lucide-react'

export const AlgorithmVisualizations: React.FC = () => {
  const algorithms = [
    {
      id: 'linear-regression',
      title: '线性回归',
      description: '可视化理解线性回归的工作原理，观察拟合过程',
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-500',
      difficulty: '入门',
      duration: '5分钟',
      available: true
    },
    {
      id: 'kmeans',
      title: 'K-Means聚类',
      description: '动画演示聚类过程，理解迭代优化',
      icon: BarChart3,
      color: 'from-indigo-500 to-purple-500',
      difficulty: '入门',
      duration: '7分钟',
      available: true
    },
    {
      id: 'neural-network',
      title: '神经网络',
      description: '可视化神经网络训练过程，观察权重更新',
      icon: Brain,
      color: 'from-orange-500 to-red-500',
      difficulty: '中级',
      duration: '15分钟',
      available: true
    },
    {
      id: 'decision-tree',
      title: '决策树',
      description: '动态构建决策树，理解分裂和剪枝过程',
      icon: GitBranch,
      color: 'from-green-500 to-emerald-500',
      difficulty: '入门',
      duration: '10分钟',
      available: true
    },
    {
      id: 'gradient-descent',
      title: '梯度下降',
      description: '3D可视化梯度下降过程，调整学习率',
      icon: Activity,
      color: 'from-yellow-500 to-orange-500',
      difficulty: '中级',
      duration: '12分钟',
      available: true
    },
    {
      id: 'svm',
      title: 'SVM',
      description: '支持向量机寻找最大间隔超平面',
      icon: Activity,
      color: 'from-pink-500 to-rose-500',
      difficulty: '中级',
      duration: '12分钟',
      available: true
    },
    {
      id: 'cnn',
      title: '卷积神经网络',
      description: '可视化CNN各层特征提取过程',
      icon: Layers,
      color: 'from-indigo-500 to-purple-500',
      difficulty: '高级',
      duration: '20分钟',
      available: true
    },
    {
      id: 'knn',
      title: 'K近邻算法',
      description: '交互式探索KNN分类过程，调整K值看效果',
      icon: Network,
      color: 'from-purple-500 to-pink-500',
      difficulty: '入门',
      duration: '8分钟',
      available: true
    }
  ]

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-custom">
        {/* 标题 */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">算法可视化</span>
          </h2>
          <p className="text-lg text-gray-600">
            通过交互式动画，直观理解算法原理
          </p>
        </div>

        {/* 算法卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {algorithms.map((algo) => (
            <AlgorithmCard key={algo.id} {...algo} />
          ))}
        </div>

        {/* 提示信息 */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            💡 提示：点击可用的算法卡片即可开始交互式学习
          </p>
        </div>
      </div>
    </section>
  )
}

interface AlgorithmCardProps {
  id: string
  title: string
  description: string
  icon: React.ElementType
  color: string
  difficulty: string
  duration: string
  available: boolean
}

const AlgorithmCard: React.FC<AlgorithmCardProps> = ({
  id,
  title,
  description,
  icon: Icon,
  color,
  difficulty,
  duration,
  available
}) => {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case '入门': return 'bg-green-100 text-green-700 border-green-300'
      case '进阶': return 'bg-blue-100 text-blue-700 border-blue-300'
      case '高级': return 'bg-purple-100 text-purple-700 border-purple-300'
      default: return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  const CardContent = () => (
    <div className={`
      relative h-full bg-white rounded-2xl p-6 shadow-lg 
      transition-all duration-300 border-2 border-transparent
      ${available 
        ? 'hover:shadow-2xl hover:-translate-y-2 hover:border-blue-200 cursor-pointer' 
        : 'opacity-60 cursor-not-allowed'
      }
    `}>
      {/* 不可用标记 */}
      {!available && (
        <div className="absolute top-4 right-4 px-3 py-1 bg-gray-200 text-gray-600 text-xs font-medium rounded-full">
          即将推出
        </div>
      )}

      {/* 图标 */}
      <div className={`w-16 h-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center shadow-lg mb-4`}>
        <Icon size={32} className="text-white" />
      </div>

      {/* 标题 */}
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>

      {/* 描述 */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>

      {/* 元信息 */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <span className={`text-xs px-2 py-1 rounded-full border ${getDifficultyColor(difficulty)}`}>
            {difficulty}
          </span>
          <span className="text-xs text-gray-500">⏱️ {duration}</span>
        </div>
        
        {available && (
          <div className="flex items-center text-blue-600 text-sm font-medium">
            <Play size={16} className="mr-1" />
            <span>体验</span>
          </div>
        )}
      </div>

      {/* 悬停渐变效果 */}
      {available && (
        <div className={`absolute inset-0 bg-gradient-to-br ${color} rounded-2xl opacity-0 hover:opacity-5 transition-opacity -z-10`}></div>
      )}
    </div>
  )

  if (available) {
    return (
      <Link href={`/visualizations#${id}`}>
        <CardContent />
      </Link>
    )
  }

  return <CardContent />
}

