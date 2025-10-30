'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/Card'
import { Clock, BookOpen, Award, CheckCircle, Lock, Filter } from 'lucide-react'
import { module1Courses } from '@/data/courses'
import Link from 'next/link'

type DifficultyLevel = '全部' | '入门' | '进阶' | '中级' | '高级'

export default function CoursesPage() {
  const router = useRouter()
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('全部')

  const difficulties: DifficultyLevel[] = ['全部', '入门', '进阶', '中级', '高级']

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '入门':
        return 'bg-green-100 text-green-700 border-green-300'
      case '进阶':
        return 'bg-blue-100 text-blue-700 border-blue-300'
      case '中级':
        return 'bg-orange-100 text-orange-700 border-orange-300'
      case '高级':
        return 'bg-red-100 text-red-700 border-red-300'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" size={20} />
      case 'in-progress':
        return <div className="text-blue-500" title="进行中">⚡</div>
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

  const filteredCourses = selectedDifficulty === '全部' 
    ? module1Courses 
    : module1Courses.filter(course => course.difficulty === selectedDifficulty)

  const getCoursesByDifficulty = (difficulty: string) => {
    return module1Courses.filter(course => course.difficulty === difficulty).length
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* 页面头部 */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">课程中心</h1>
            <p className="text-xl opacity-90 mb-6">
              系统学习机器学习知识，从入门到精通
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                📚 共 {module1Courses.length} 节课程
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                ✅ {module1Courses.filter(c => c.status === 'completed').length} 节可学习
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                ⏱️ 约10小时学习时长
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 难度筛选 */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center space-x-4 mb-4">
              <Filter size={20} className="text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">按难度筛选</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 border-2 ${
                    selectedDifficulty === difficulty
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-lg scale-105'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:shadow-md'
                  }`}
                >
                  {difficulty}
                  {difficulty !== '全部' && (
                    <span className="ml-2 text-xs opacity-75">
                      ({getCoursesByDifficulty(difficulty)})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 课程列表 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {filteredCourses.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">该难度等级暂无课程</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {filteredCourses.map((course) => (
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
                          router.push(`/courses/${course.id}`)
                        }
                      }}
                    >
                    <div className="flex items-start space-x-6">
                      {/* 课程编号 */}
                      <div className="flex-shrink-0">
                        <div
                          className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold ${
                            course.status === 'completed'
                              ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                              : 'bg-gray-200 text-gray-400'
                          }`}
                        >
                          {course.number}
                        </div>
                      </div>

                      {/* 课程内容 */}
                      <div className="flex-1 min-w-0">
                        {/* 标题和状态 */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
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

                        {/* 学习目标 */}
                        {course.status === 'completed' && course.objectives.length > 0 && (
                          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                            <h4 className="text-sm font-semibold text-blue-900 mb-2">
                              🎯 学习目标：
                            </h4>
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
                          <div className="flex items-center text-gray-600">
                            <Clock size={16} className="mr-1" />
                            <span>{course.duration}</span>
                          </div>

                          <div
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                              course.difficulty
                            )}`}
                          >
                            {course.difficulty}
                          </div>

                          {course.exercises > 0 && (
                            <div className="flex items-center text-gray-600">
                              <BookOpen size={16} className="mr-1" />
                              <span>{course.exercises}道练习题</span>
                            </div>
                          )}

                          <div
                            className={`flex items-center font-medium ${
                              course.status === 'completed'
                                ? 'text-green-600'
                                : course.status === 'in-progress'
                                ? 'text-blue-600'
                                : 'text-gray-400'
                            }`}
                          >
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
                                router.push(`/courses/${course.id}`)
                              }}
                              className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                              <span>开始学习</span>
                              <svg
                                className="ml-2 w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 学习建议 */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
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
                    <span>建议按难度从"入门"到"高级"循序渐进学习</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>每节课包含丰富的案例和练习，建议认真完成</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>理解概念比速度更重要，遇到困难可以反复学习</span>
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

      <Footer />
    </main>
  )
}

