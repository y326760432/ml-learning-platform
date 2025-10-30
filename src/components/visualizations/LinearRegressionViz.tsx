'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { ControlPanel } from './ControlPanel'

interface DataPoint {
  x: number
  y: number
}

export const LinearRegressionViz: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [learningRate, setLearningRate] = useState(0.01)
  const [iterations, setIterations] = useState(0)
  const [maxIterations] = useState(100)
  
  // 模型参数
  const [slope, setSlope] = useState(0)
  const [intercept, setIntercept] = useState(0)
  const [loss, setLoss] = useState(0)
  
  // 数据点
  const [dataPoints] = useState<DataPoint[]>(() => {
    // 生成一些带噪声的线性数据
    const points: DataPoint[] = []
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * 10
      const y = 2 * x + 3 + (Math.random() - 0.5) * 4
      points.push({ x, y })
    }
    return points
  })

  // 计算损失函数
  const calculateLoss = (m: number, b: number) => {
    let totalLoss = 0
    dataPoints.forEach(point => {
      const predicted = m * point.x + b
      totalLoss += Math.pow(predicted - point.y, 2)
    })
    return totalLoss / dataPoints.length
  }

  // 梯度下降更新
  const gradientDescentStep = () => {
    let gradSlope = 0
    let gradIntercept = 0
    const n = dataPoints.length

    dataPoints.forEach(point => {
      const predicted = slope * point.x + intercept
      const error = predicted - point.y
      gradSlope += (2 / n) * error * point.x
      gradIntercept += (2 / n) * error
    })

    const newSlope = slope - learningRate * gradSlope
    const newIntercept = intercept - learningRate * gradIntercept
    
    setSlope(newSlope)
    setIntercept(newIntercept)
    setLoss(calculateLoss(newSlope, newIntercept))
  }

  // 绘制函数
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const padding = 40

    // 清空画布
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    // 找到数据范围
    const maxX = Math.max(...dataPoints.map(p => p.x))
    const maxY = Math.max(...dataPoints.map(p => p.y))
    const minY = Math.min(...dataPoints.map(p => p.y))

    // 坐标转换函数
    const scaleX = (x: number) => padding + (x / maxX) * (width - 2 * padding)
    const scaleY = (y: number) => height - padding - ((y - minY) / (maxY - minY)) * (height - 2 * padding)

    // 绘制坐标轴
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.moveTo(padding, height - padding)
    ctx.lineTo(padding, padding)
    ctx.stroke()

    // 绘制数据点
    ctx.fillStyle = '#3b82f6'
    dataPoints.forEach(point => {
      ctx.beginPath()
      ctx.arc(scaleX(point.x), scaleY(point.y), 4, 0, Math.PI * 2)
      ctx.fill()
    })

    // 绘制拟合线
    if (iterations > 0) {
      ctx.strokeStyle = '#ef4444'
      ctx.lineWidth = 3
      ctx.beginPath()
      const y1 = slope * 0 + intercept
      const y2 = slope * maxX + intercept
      ctx.moveTo(scaleX(0), scaleY(y1))
      ctx.lineTo(scaleX(maxX), scaleY(y2))
      ctx.stroke()
    }

    // 绘制图例
    ctx.font = '14px sans-serif'
    ctx.fillStyle = '#374151'
    ctx.fillText('数据点', width - 150, 30)
    ctx.fillStyle = '#3b82f6'
    ctx.beginPath()
    ctx.arc(width - 170, 26, 4, 0, Math.PI * 2)
    ctx.fill()

    if (iterations > 0) {
      ctx.fillStyle = '#374151'
      ctx.fillText('拟合线', width - 150, 50)
      ctx.strokeStyle = '#ef4444'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(width - 190, 46)
      ctx.lineTo(width - 160, 46)
      ctx.stroke()
    }
  }, [dataPoints, slope, intercept, iterations])

  // 动画循环
  useEffect(() => {
    if (isPlaying && iterations < maxIterations) {
      const timer = setTimeout(() => {
        gradientDescentStep()
        setIterations(prev => prev + 1)
      }, 100 / speed)
      return () => clearTimeout(timer)
    } else if (iterations >= maxIterations) {
      setIsPlaying(false)
    }
  }, [isPlaying, iterations, speed, slope, intercept])

  // 绘制更新
  useEffect(() => {
    draw()
  }, [draw])

  const handleReset = () => {
    setIsPlaying(false)
    setSlope(0)
    setIntercept(0)
    setIterations(0)
    setLoss(calculateLoss(0, 0))
  }

  return (
    <div className="space-y-6">
      {/* 标题和说明 */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">线性回归 - 梯度下降</h2>
        <p className="text-gray-600">
          通过梯度下降算法优化线性模型，观察拟合线如何逐步接近数据点的趋势
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* 可视化画布 */}
        <div className="lg:col-span-2">
          <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
            <canvas
              ref={canvasRef}
              width={600}
              height={350}
              className="w-full"
            />
          </div>
          
          {/* 实时指标 */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-sm text-blue-600 font-medium">迭代次数</div>
              <div className="text-2xl font-bold text-blue-900">
                {iterations}/{maxIterations}
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-sm text-purple-600 font-medium">斜率 (m)</div>
              <div className="text-2xl font-bold text-purple-900">
                {slope.toFixed(3)}
              </div>
            </div>
            <div className="bg-pink-50 rounded-lg p-4">
              <div className="text-sm text-pink-600 font-medium">损失值</div>
              <div className="text-2xl font-bold text-pink-900">
                {loss.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* 控制面板 */}
        <div>
          <ControlPanel
            isPlaying={isPlaying}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onReset={handleReset}
            speed={speed}
            onSpeedChange={setSpeed}
          >
            {/* 学习率控制 */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  学习率: {learningRate}
                </label>
                <input
                  type="range"
                  min="0.001"
                  max="0.1"
                  step="0.001"
                  value={learningRate}
                  onChange={(e) => setLearningRate(Number(e.target.value))}
                  disabled={isPlaying}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
                />
              </div>

              {/* 当前模型公式 */}
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">当前模型</div>
                <div className="font-mono text-sm text-gray-900">
                  y = {slope.toFixed(2)}x + {intercept.toFixed(2)}
                </div>
              </div>

              {/* 说明 */}
              <div className="text-xs text-gray-500 space-y-1">
                <p>💡 <strong>提示：</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>学习率越大，收敛越快，但可能不稳定</li>
                  <li>观察损失值如何随迭代次数下降</li>
                  <li>红色线是拟合结果</li>
                </ul>
              </div>
            </div>
          </ControlPanel>
        </div>
      </div>
    </div>
  )
}

