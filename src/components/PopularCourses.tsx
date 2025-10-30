'use client'

import React from 'react'
import Link from 'next/link'
import { Card } from './ui/Card'
import { Button } from './ui/Button'
import { Clock, Users, Star, TrendingUp, Eye } from 'lucide-react'

const courses = [
  {
    title: '线性回归可视化',
    description: '通过动画直观理解梯度下降算法，掌握线性回归的核心原理和实现方法',
    image: '📈',
    difficulty: '初级',
    duration: '2小时',
    students: 1234,
    rating: 4.8,
    tags: ['回归', '可视化', '基础算法'],
  },
  {
    title: 'K-Means聚类实战',
    description: '从零开始学习无监督学习，通过交互式动画理解聚类算法的工作原理',
    image: '🎯',
    difficulty: '初级',
    duration: '3小时',
    students: 987,
    rating: 4.9,
    tags: ['聚类', '无监督学习', '可视化'],
  },
  {
    title: '神经网络入门',
    description: '深入浅出讲解神经网络基础，从感知机到多层网络，理解深度学习的起点',
    image: '🧠',
    difficulty: '中级',
    duration: '5小时',
    students: 2156,
    rating: 4.7,
    tags: ['神经网络', '深度学习', '前向传播'],
  },
  {
    title: '手写数字识别项目',
    description: '使用MNIST数据集完成端到端的图像分类项目，掌握卷积神经网络实战技能',
    image: '✍️',
    difficulty: '中级',
    duration: '8小时',
    students: 1543,
    rating: 4.9,
    tags: ['CNN', '图像分类', '项目实战'],
  },
]

export const PopularCourses: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container-custom">
        {/* 标题 */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="text-primary-600" size={24} />
              <h2 className="text-3xl md:text-4xl font-bold">
                热门课程
              </h2>
            </div>
            <p className="text-gray-600">
              最受欢迎的机器学习课程，助你快速入门
            </p>
          </div>
          <Button variant="outline" className="hidden md:inline-flex">
            查看全部
          </Button>
        </div>

        {/* 课程卡片 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <Card key={index} hover className="flex flex-col h-full group">
              {/* 课程图标 */}
              <div className="w-full h-40 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <span className="text-6xl">{course.image}</span>
              </div>

              {/* 难度标签 */}
              <div className="flex items-center justify-between mb-3">
                <span className={`
                  text-xs font-semibold px-3 py-1 rounded-full
                  ${course.difficulty === '初级' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-orange-100 text-orange-700'
                  }
                `}>
                  {course.difficulty}
                </span>
                <div className="flex items-center space-x-1 text-yellow-500">
                  <Star size={14} fill="currentColor" />
                  <span className="text-sm font-medium text-gray-700">
                    {course.rating}
                  </span>
                </div>
              </div>

              {/* 标题 */}
              <h3 className="text-lg font-bold mb-2 group-hover:text-primary-600 transition-colors">
                {course.title}
              </h3>

              {/* 描述 */}
              <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-2">
                {course.description}
              </p>

              {/* 标签 */}
              <div className="flex flex-wrap gap-2 mb-4">
                {course.tags.slice(0, 2).map((tag, idx) => (
                  <span 
                    key={idx}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* 底部信息 */}
              <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
                <div className="flex items-center space-x-1">
                  <Clock size={14} />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users size={14} />
                  <span>{course.students}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* 可视化演示入口 */}
        <div className="mt-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white text-center">
          <div className="flex justify-center mb-4">
            <Eye size={48} />
          </div>
          <h3 className="text-2xl font-bold mb-3">体验交互式算法可视化</h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            通过精美的动画和实时交互，直观理解线性回归、K-Means聚类、神经网络等核心算法
          </p>
          <Link href="/visualizations">
            <Button variant="outline" size="lg" className="bg-white text-primary-600 hover:bg-gray-100 border-white">
              立即体验
            </Button>
          </Link>
        </div>

        {/* 移动端查看全部按钮 */}
        <div className="mt-8 text-center md:hidden">
          <Button variant="outline">
            查看全部课程
          </Button>
        </div>
      </div>
    </section>
  )
}

