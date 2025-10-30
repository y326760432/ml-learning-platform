import React from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { CourseDetailContent } from '@/components/CourseDetailContent'
import { module1Courses } from '@/data/courses'

// 生成静态参数（用于静态导出）
export function generateStaticParams() {
  return module1Courses.map((course) => ({
    id: course.id,
  }))
}

interface CourseDetailPageProps {
  params: {
    id: string
  }
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <CourseDetailContent courseId={params.id} />
      <Footer />
    </main>
  )
}
