'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MarkdownViewer } from '@/components/MarkdownViewer'
import { module1Courses } from '@/data/courses'
import { Clock, BookOpen, Award, ArrowLeft, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'

interface CourseDetailContentProps {
  courseId: string
}

export const CourseDetailContent: React.FC<CourseDetailContentProps> = ({ courseId }) => {
  const router = useRouter()
  const [markdownContent, setMarkdownContent] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')
  
  // 查找当前课程
  const course = module1Courses.find(c => c.id === courseId)
  const courseIndex = module1Courses.findIndex(c => c.id === courseId)
  const prevCourse = courseIndex > 0 ? module1Courses[courseIndex - 1] : null
  const nextCourse = courseIndex < module1Courses.length - 1 ? module1Courses[courseIndex + 1] : null

  useEffect(() => {
    if (!course || course.status !== 'completed') {
      setError('课程不存在或尚未发布')
      setLoading(false)
      return
    }

    // 加载Markdown文件
    fetch(course.fileUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('无法加载课程内容')
        }
        return response.text()
      })
      .then(text => {
        setMarkdownContent(text)
        setLoading(false)
      })
      .catch(err => {
        console.error('加载课程失败:', err)
        setError('加载课程内容失败，请稍后重试')
        setLoading(false)
      })
  }, [course, courseId])

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

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">课程不存在</h1>
          <p className="text-gray-600 mb-8">抱歉，您访问的课程不存在或已被删除。</p>
          <Link
            href="/courses"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            返回课程列表
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* 简洁的顶部导航 */}
      <section className="py-4 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/courses"
              className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              返回课程列表
            </Link>
          </div>
        </div>
      </section>
      
      {/* 课程内容 */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-600">加载课程内容中...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  重新加载
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                <MarkdownViewer content={markdownContent} />
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* 课程导航 */}
      <section className="py-8 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* 上一课 */}
              {prevCourse ? (
                <Link
                  href={prevCourse.status === 'completed' ? `/courses/${prevCourse.id}` : '#'}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-lg border-2 transition-all ${
                    prevCourse.status === 'completed'
                      ? 'border-gray-300 hover:border-blue-500 hover:shadow-md cursor-pointer'
                      : 'border-gray-200 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <ChevronLeft size={20} />
                  <div className="text-left">
                    <p className="text-xs text-gray-500">上一课</p>
                    <p className="font-medium text-gray-900">{prevCourse.title}</p>
                  </div>
                </Link>
              ) : (
                <div className="invisible"></div>
              )}
              
              {/* 课程列表按钮 */}
              <Link
                href="/courses"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                课程列表
              </Link>
              
              {/* 下一课 */}
              {nextCourse ? (
                <Link
                  href={nextCourse.status === 'completed' ? `/courses/${nextCourse.id}` : '#'}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-lg border-2 transition-all ${
                    nextCourse.status === 'completed'
                      ? 'border-gray-300 hover:border-blue-500 hover:shadow-md cursor-pointer'
                      : 'border-gray-200 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="text-right">
                    <p className="text-xs text-gray-500">下一课</p>
                    <p className="font-medium text-gray-900">{nextCourse.title}</p>
                  </div>
                  <ChevronRight size={20} />
                </Link>
              ) : (
                <div className="invisible"></div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

