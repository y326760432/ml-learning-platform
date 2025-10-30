'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { ControlPanel } from './ControlPanel'

interface DataPoint {
  x: number
  y: number
  label: number
}

export const SVMViz: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [step, setStep] = useState(0)
  const [margin, setMargin] = useState(1)

  // 生成数据
  const generateData = useCallback((): DataPoint[] => {
    const data: DataPoint[] = []
    // 红色类别（左侧）
    for (let i = 0; i < 15; i++) {
      data.push({
        x: Math.random() * 30 + 10,
        y: Math.random() * 60 + 20,
        label: -1,
      })
    }
    // 蓝色类别（右侧）
    for (let i = 0; i < 15; i++) {
      data.push({
        x: Math.random() * 30 + 60,
        y: Math.random() * 60 + 20,
        label: 1,
      })
    }
    return data
  }, [])

  const [dataPoints] = useState(generateData)

  // 计算SVM分类面（简化版）
  const [w, setW] = useState({ x: 1, y: 0 })
  const [b, setB] = useState(-45)

  // 找支持向量
  const getSupportVectors = useCallback(() => {
    const supportVectors: DataPoint[] = []
    dataPoints.forEach(point => {
      const distance = Math.abs((w.x * point.x + w.y * point.y + b) / Math.sqrt(w.x * w.x + w.y * w.y))
      if (distance < margin + 0.5) {
        supportVectors.push(point)
      }
    })
    return supportVectors
  }, [dataPoints, w, b, margin])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    // 清空画布
    ctx.fillStyle = '#f9fafb'
    ctx.fillRect(0, 0, width, height)

    const scale = 6
    const offsetX = 50
    const offsetY = height - 50

    const toCanvasX = (x: number) => offsetX + x * scale
    const toCanvasY = (y: number) => offsetY - y * scale

    // 绘制坐标轴
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(offsetX, 50)
    ctx.lineTo(offsetX, offsetY)
    ctx.lineTo(width - 50, offsetY)
    ctx.stroke()

    if (step > 0) {
      // 绘制分类区域
      const wNorm = Math.sqrt(w.x * w.x + w.y * w.y)
      
      // 决策边界和边距
      const drawLine = (offset: number, style: string, lineWidth: number, dash: number[] = []) => {
        const adjustedB = b + offset
        const x1 = 0
        const y1 = -(w.x * x1 + adjustedB) / w.y
        const x2 = 100
        const y2 = -(w.x * x2 + adjustedB) / w.y

        ctx.strokeStyle = style
        ctx.lineWidth = lineWidth
        ctx.setLineDash(dash)
        ctx.beginPath()
        ctx.moveTo(toCanvasX(x1), toCanvasY(y1))
        ctx.lineTo(toCanvasX(x2), toCanvasY(y2))
        ctx.stroke()
        ctx.setLineDash([])
      }

      if (step >= 3) {
        // 正边距
        drawLine(margin * wNorm, '#3b82f6', 2, [5, 5])
        // 负边距
        drawLine(-margin * wNorm, '#ef4444', 2, [5, 5])
      }

      if (step >= 2) {
        // 决策边界
        drawLine(0, '#10b981', 3)
      }
    }

    // 绘制数据点
    dataPoints.forEach(point => {
      const cx = toCanvasX(point.x)
      const cy = toCanvasY(point.y)

      ctx.fillStyle = point.label === 1 ? '#3b82f6' : '#ef4444'
      ctx.globalAlpha = 0.7
      ctx.beginPath()
      ctx.arc(cx, cy, 6, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalAlpha = 1
    })

    // 高亮支持向量
    if (step >= 4) {
      const supportVectors = getSupportVectors()
      supportVectors.forEach(point => {
        const cx = toCanvasX(point.x)
        const cy = toCanvasY(point.y)

        ctx.strokeStyle = '#fbbf24'
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.arc(cx, cy, 10, 0, Math.PI * 2)
        ctx.stroke()
      })
    }

    // 绘制图例
    ctx.font = '14px sans-serif'
    ctx.fillStyle = '#374151'
    ctx.textAlign = 'left'
    
    ctx.fillText('类别', 20, 30)
    ctx.fillStyle = '#ef4444'
    ctx.beginPath()
    ctx.arc(65, 26, 5, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#3b82f6'
    ctx.beginPath()
    ctx.arc(85, 26, 5, 0, Math.PI * 2)
    ctx.fill()

    if (step >= 2) {
      ctx.fillStyle = '#374151'
      ctx.fillText('决策边界', 110, 30)
      ctx.strokeStyle = '#10b981'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(180, 26)
      ctx.lineTo(210, 26)
      ctx.stroke()
    }

    if (step >= 4) {
      ctx.fillStyle = '#374151'
      ctx.fillText('支持向量', 230, 30)
      ctx.strokeStyle = '#fbbf24'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(300, 26, 8, 0, Math.PI * 2)
      ctx.stroke()
    }
  }, [dataPoints, w, b, step, margin, getSupportVectors])

  useEffect(() => {
    draw()
  }, [draw])

  useEffect(() => {
    if (isPlaying && step < 4) {
      const timer = setTimeout(() => {
        setStep(prev => prev + 1)
        
        // 优化参数
        if (step === 1) {
          // 调整权重
          setW({ x: 1, y: 0.1 })
        } else if (step === 2) {
          // 调整偏置
          setB(-47)
        }
      }, 1000 / speed)
      return () => clearTimeout(timer)
    } else if (step >= 4) {
      setIsPlaying(false)
    }
  }, [isPlaying, step, speed])

  const handleReset = () => {
    setIsPlaying(false)
    setStep(0)
    setW({ x: 1, y: 0 })
    setB(-45)
  }

  const supportVectors = step >= 4 ? getSupportVectors() : []
  const wNorm = Math.sqrt(w.x * w.x + w.y * w.y)
  const marginWidth = (2 * margin * wNorm).toFixed(2)

  const stepDescriptions = [
    '初始化数据点',
    '寻找最优分离超平面',
    '确定决策边界',
    '计算最大边距',
    '识别支持向量',
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">支持向量机 (SVM)</h2>
        <p className="text-gray-600">
          观察SVM如何找到最大间隔的分类超平面，支持向量是如何确定的
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <canvas
            ref={canvasRef}
            width={800}
            height={350}
            className="w-full border border-gray-200 rounded-lg bg-gray-50"
          />
        </div>

        <div>
          <ControlPanel
            isPlaying={isPlaying}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onReset={handleReset}
            speed={speed}
            onSpeedChange={setSpeed}
          >
            <div className="space-y-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-xs text-blue-600 mb-1">当前步骤</div>
                <div className="text-sm font-medium text-blue-900">
                  {step}: {stepDescriptions[step]}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">权重向量</span>
                  <span className="font-mono text-gray-900">
                    ({w.x.toFixed(2)}, {w.y.toFixed(2)})
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">偏置</span>
                  <span className="font-mono text-gray-900">{b.toFixed(2)}</span>
                </div>
                {step >= 3 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">边距宽度</span>
                    <span className="font-mono text-green-600">{marginWidth}</span>
                  </div>
                )}
                {step >= 4 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">支持向量数</span>
                    <span className="font-mono text-yellow-600">{supportVectors.length}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    边距: {margin.toFixed(1)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={margin}
                  onChange={(e) => setMargin(Number(e.target.value))}
                  disabled={isPlaying}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0.5</span>
                  <span>1.25</span>
                  <span>2</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-start space-x-2 text-sm">
                  <span>💡</span>
                  <div className="text-gray-600 space-y-1">
                    <div className="font-medium">SVM原理：</div>
                    <div>1. 寻找分离超平面</div>
                    <div>2. 最大化分类边距</div>
                    <div>3. 只依赖支持向量</div>
                    <div>4. 对异常值鲁棒</div>
                  </div>
                </div>
              </div>

              {step >= 4 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600">✓</span>
                    <span className="text-sm font-medium text-green-800">训练完成</span>
                  </div>
                </div>
              )}
            </div>
          </ControlPanel>
        </div>
      </div>
    </div>
  )
}

