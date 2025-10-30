import { Navbar } from '@/components/Navbar'
import { HomeCoursesSection } from '@/components/HomeCoursesSection'
import { AlgorithmVisualizations } from '@/components/AlgorithmVisualizations'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* 第一部分：精品课程 */}
      <HomeCoursesSection />
      
      {/* 第二部分：算法可视化 */}
      <AlgorithmVisualizations />
      
      <Footer />
    </main>
  )
}

