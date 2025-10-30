'use client'

import React from 'react'
import Link from 'next/link'
import { BookOpen, Clock, Award, ArrowRight } from 'lucide-react'
import { module1Courses } from '@/data/courses'

export const HomeCoursesSection: React.FC = () => {
  // 只显示已完成的课程
  const availableCourses = module1Courses.filter(course => course.status === 'completed')

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        {/* 标题 */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">精品课程</span>
          </h2>
          <p className="text-lg text-gray-600">
            从零开始，系统掌握机器学习核心知识
          </p>
        </div>

        {/* 课程卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {availableCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* 查看全部课程按钮 */}
        <div className="text-center">
          <Link href="/courses">
            <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <span>查看全部课程</span>
              <ArrowRight size={20} className="ml-2" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

interface CourseCardProps {
  course: {
    id: string
    number: number
    title: string
    description: string
    duration: string
    difficulty: string
    exercises: number
  }
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '入门': return 'bg-green-100 text-green-700 border-green-300'
      case '进阶': return 'bg-blue-100 text-blue-700 border-blue-300'
      case '中级': return 'bg-purple-100 text-purple-700 border-purple-300'
      case '高级': return 'bg-red-100 text-red-700 border-red-300'
      default: return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  return (
    <Link href={`/courses/${course.id}`}>
      <div className="group h-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-200 cursor-pointer">
        {/* 课程编号 */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white text-2xl font-bold">{course.number}</span>
          </div>
          <span className={`text-xs px-3 py-1 rounded-full border ${getDifficultyColor(course.difficulty)}`}>
            {course.difficulty}
          </span>
        </div>

        {/* 课程标题 */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>

        {/* 课程描述 */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {course.description}
        </p>

        {/* 元信息 */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-500">
            <Clock size={16} className="mr-1" />
            <span>{course.duration}</span>
          </div>
          
          {course.exercises > 0 && (
            <div className="flex items-center text-sm text-gray-500">
              <BookOpen size={16} className="mr-1" />
              <span>{course.exercises}道题</span>
            </div>
          )}
        </div>

        {/* 开始学习提示 */}
        <div className="mt-4 flex items-center text-blue-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
          <Award size={16} className="mr-1" />
          <span>立即学习</span>
          <ArrowRight size={16} className="ml-1" />
        </div>
      </div>
    </Link>
  )
}

