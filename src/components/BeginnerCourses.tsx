'use client'

import React from 'react'
import { Card } from './ui/Card'
import { Clock, BookOpen, Award, CheckCircle, Lock, Sparkles } from 'lucide-react'
import { module1Courses, moduleInfo } from '@/data/courses'
import Link from 'next/link'

export const BeginnerCourses: React.FC = () => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '入门':
        return 'bg-green-100 text-green-700'
      case '进阶':
        return 'bg-blue-100 text-blue-700'
      case '中级':
        return 'bg-orange-100 text-orange-700'
      case '高级':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" size={20} />
      case 'in-progress':
        return <Sparkles className="text-blue-500" size={20} />
      case 'coming-soon':
        return <Lock className="text-gray-400" size={20} />
      default:
        return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '可学习'
      case 'in-progress':
        return '进行中'
      case 'coming-soon':
        return '即将推出'
      default:
        return ''
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* 模块头部 */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-4">
            <span className="text-blue-700 font-semibold">📚 {moduleInfo.name}</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {moduleInfo.description}
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            {moduleInfo.totalCourses}节课程，已完成 {moduleInfo.completedCourses} 节 • {moduleInfo.totalDuration}
          </p>
          
          {/* 进度条 */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>学习进度</span>
              <span>{Math.round((moduleInfo.completedCourses / moduleInfo.totalCourses) * 100)}%</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                style={{ width: `${(moduleInfo.completedCourses / moduleInfo.totalCourses) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* 课程列表 */}
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-6">
            {module1Courses.map((course) => (
              <Card 
                key={course.id} 
                className={`transition-all duration-300 ${
                  course.status === 'completed' 
                    ? 'hover:shadow-xl cursor-pointer border-2 border-transparent hover:border-blue-500' 
                    : 'opacity-75'
                }`}
                hover={course.status === 'completed'}
                onClick={() => {
                  if (course.status === 'completed') {
                    // TODO: 跳转到课程详情页
                    window.open(course.fileUrl, '_blank')
                  }
                }}
              >
                <div className="flex items-start space-x-6">
                  {/* 课程编号 */}
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold ${
                      course.status === 'completed'
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}>
                      {course.number}
                    </div>
                  </div>

                  {/* 课程内容 */}
                  <div className="flex-1 min-w-0">
                    {/* 标题和状态 */}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {course.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {course.description}
                        </p>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        {getStatusIcon(course.status)}
                      </div>
                    </div>

                    {/* 学习目标（仅已完成课程） */}
                    {course.status === 'completed' && course.objectives.length > 0 && (
                      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                        <h4 className="text-sm font-semibold text-blue-900 mb-2">🎯 学习目标：</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {course.objectives.map((objective, index) => (
                            <li key={index} className="flex items-start text-sm text-blue-700">
                              <span className="mr-2">✓</span>
                              <span>{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* 元信息 */}
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      {/* 时长 */}
                      <div className="flex items-center text-gray-600">
                        <Clock size={16} className="mr-1" />
                        <span>{course.duration}</span>
                      </div>

                      {/* 难度 */}
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
                        {course.difficulty}
                      </div>

                      {/* 练习题数（如果有） */}
                      {course.exercises > 0 && (
                        <div className="flex items-center text-gray-600">
                          <BookOpen size={16} className="mr-1" />
                          <span>{course.exercises}道练习题</span>
                        </div>
                      )}

                      {/* 状态 */}
                      <div className={`flex items-center font-medium ${
                        course.status === 'completed' ? 'text-green-600' :
                        course.status === 'in-progress' ? 'text-blue-600' :
                        'text-gray-400'
                      }`}>
                        <Award size={16} className="mr-1" />
                        <span>{getStatusText(course.status)}</span>
                      </div>
                    </div>

                    {/* 行动按钮 */}
                    {course.status === 'completed' && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(course.fileUrl, '_blank')
                          }}
                          className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                          <span>开始学习</span>
                          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* 底部提示 */}
        <div className="max-w-4xl mx-auto mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl">
                💡
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">学习建议</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>按顺序学习效果最佳，每课包含丰富的案例和练习</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>建议每天学习1-2课，理解概念比速度更重要</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>完成每课后的练习题，巩固所学知识</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>更多课程正在创作中，敬请期待！🚀</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


