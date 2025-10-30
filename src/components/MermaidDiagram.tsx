'use client'

import React, { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

interface MermaidDiagramProps {
  chart: string
}

// 初始化 Mermaid 配置
mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  themeVariables: {
    primaryColor: '#3B82F6',
    primaryTextColor: '#1F2937',
    primaryBorderColor: '#2563EB',
    lineColor: '#8B5CF6',
    secondaryColor: '#8B5CF6',
    tertiaryColor: '#F3F4F6',
  },
  flowchart: {
    curve: 'basis',
    padding: 20,
  },
  sequence: {
    diagramMarginX: 50,
    diagramMarginY: 10,
    actorMargin: 50,
    width: 150,
    height: 65,
  },
})

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = React.useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || !elementRef.current) return

    const renderDiagram = async () => {
      try {
        // 生成唯一 ID
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`
        
        // 渲染图表
        const { svg } = await mermaid.render(id, chart)
        
        if (elementRef.current) {
          elementRef.current.innerHTML = svg
        }
      } catch (error) {
        console.error('Mermaid 渲染错误:', error)
        if (elementRef.current) {
          elementRef.current.innerHTML = `
            <div class="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              <p class="font-semibold mb-2">图表渲染失败</p>
              <pre class="text-xs overflow-auto">${chart}</pre>
            </div>
          `
        }
      }
    }

    renderDiagram()
  }, [chart, isClient])

  if (!isClient) {
    return (
      <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
        <div className="animate-pulse text-gray-500">加载图表中...</div>
      </div>
    )
  }

  return (
    <div className="mermaid-diagram my-6 flex justify-center">
      <div 
        ref={elementRef}
        className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm overflow-auto max-w-full"
      />
    </div>
  )
}

