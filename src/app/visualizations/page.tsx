'use client'

import React, { useState, useEffect } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/Card'
import { TrendingUp, GitBranch, Brain, Activity } from 'lucide-react'
import { LinearRegressionViz } from '@/components/visualizations/LinearRegressionViz'
import { KMeansViz } from '@/components/visualizations/KMeansViz'
import { NeuralNetworkViz } from '@/components/visualizations/NeuralNetworkViz'
import { DecisionTreeViz } from '@/components/visualizations/DecisionTreeViz'
import { GradientDescentViz } from '@/components/visualizations/GradientDescentViz'
import { SVMViz } from '@/components/visualizations/SVMViz'
import { CNNViz } from '@/components/visualizations/CNNViz'
import { KNNViz } from '@/components/visualizations/KNNViz'

const algorithms = [
  {
    id: 'linear-regression',
    name: '线性回归',
    icon: TrendingUp,
    description: '通过梯度下降算法拟合数据点，可视化展示损失函数的优化过程',
    difficulty: '入门',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'kmeans',
    name: 'K-Means聚类',
    icon: GitBranch,
    description: '无监督学习算法，将数据点分组到K个簇中，观察聚类中心的移动',
    difficulty: '入门',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'neural-network',
    name: '神经网络',
    icon: Brain,
    description: '可视化神经网络的前向传播过程，观察数据如何在网络中流动',
    difficulty: '中级',
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'decision-tree',
    name: '决策树',
    icon: GitBranch,
    description: '观察决策树如何递归分割数据进行分类，理解树形结构的决策过程',
    difficulty: '入门',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'gradient-descent',
    name: '梯度下降',
    icon: TrendingUp,
    description: '可视化梯度下降优化算法，观察如何沿梯度方向找到函数最小值',
    difficulty: '中级',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 'svm',
    name: 'SVM',
    icon: Activity,
    description: '支持向量机寻找最大间隔超平面，可视化支持向量的作用',
    difficulty: '中级',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 'cnn',
    name: '卷积神经网络',
    icon: Brain,
    description: 'CNN通过卷积层和池化层提取图像特征，实现图像分类',
    difficulty: '高级',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    id: 'knn',
    name: 'K近邻算法',
    icon: Activity,
    description: '基于距离的分类算法，通过K个最近邻居投票决定类别',
    difficulty: '入门',
    color: 'from-purple-500 to-pink-500',
  },
]

export default function VisualizationsPage() {
  const [selectedAlgo, setSelectedAlgo] = useState('linear-regression')

  // 根据 URL hash 自动选择算法
  useEffect(() => {
    const hash = window.location.hash.slice(1) // 移除 # 符号
    if (hash) {
      const algoExists = algorithms.find(algo => algo.id === hash)
      if (algoExists) {
        setSelectedAlgo(hash)
      }
    }
  }, [])

  const renderVisualization = () => {
    switch (selectedAlgo) {
      case 'linear-regression':
        return <LinearRegressionViz />
      case 'kmeans':
        return <KMeansViz />
      case 'neural-network':
        return <NeuralNetworkViz />
      case 'decision-tree':
        return <DecisionTreeViz />
      case 'gradient-descent':
        return <GradientDescentViz />
      case 'svm':
        return <SVMViz />
      case 'cnn':
        return <CNNViz />
      case 'knn':
        return <KNNViz />
      default:
        return <LinearRegressionViz />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-20">
        <div className="container-custom py-8">
          {/* 顶部算法列表 - 水平滚动 */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">选择算法</h2>
            <div className="relative">
              <div className="flex gap-4 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory">
                {algorithms.map((algo) => {
                  const Icon = algo.icon
                  return (
                    <Card
                      key={algo.id}
                      hover
                      className={`
                        flex-shrink-0 w-72 cursor-pointer transition-all snap-start
                        ${selectedAlgo === algo.id
                          ? 'ring-2 ring-primary-500 shadow-lg scale-105'
                          : ''
                        }
                      `}
                      onClick={() => setSelectedAlgo(algo.id)}
                    >
                      <div className="flex flex-col h-full">
                        <div className="flex items-start space-x-3 mb-3">
                          <div className={`
                            w-12 h-12 rounded-lg bg-gradient-to-br ${algo.color}
                            flex items-center justify-center flex-shrink-0
                          `}>
                            <Icon className="text-white" size={24} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 mb-1">{algo.name}</h3>
                            <span className="inline-block text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                              {algo.difficulty}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {algo.description}
                        </p>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
            
            {/* 滚动提示 */}
            <div className="text-center mt-2 text-xs text-gray-400">
              <span>← 左右滑动查看全部算法 →</span>
            </div>
          </div>

          {/* 可视化区域 */}
          <Card className="p-6">
            {renderVisualization()}
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

