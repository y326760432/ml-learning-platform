'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { ControlPanel } from './ControlPanel'

export const GradientDescentViz: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [iterations, setIterations] = useState(0)
  const [learningRate, setLearningRate] = useState(0.1)
  
  // 当前位置
  const [x, setX] = useState(3)
  const [y, setY] = useState(3)
  const [path, setPath] = useState<{x: number, y: number}[]>([{x: 3, y: 3}])
  
  // 目标函数: f(x, y) = (x-1)^2 + (y-2)^2 (最小值在(1,2))
  const f = useCallback((x: number, y: number) => {
    return Math.pow(x - 1, 2) + Math.pow(y - 2, 2)
  }, [])

  // 梯度
  const gradient = useCallback((x: number, y: number) => {
    return {
      dx: 2 * (x - 1),
      dy: 2 * (y - 2),
    }
  }, [])

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

    // 坐标转换
    const scale = 80
    const offsetX = width / 2
    const offsetY = height / 2

    const toCanvasX = (x: number) => offsetX + x * scale
    const toCanvasY = (y: number) => offsetY - y * scale

    // 绘制等高线
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 1
    const levels = [0.5, 1, 2, 3, 5, 8, 12]
    
    levels.forEach(level => {
      ctx.beginPath()
      for (let angle = 0; angle <= Math.PI * 2; angle += 0.1) {
        const r = Math.sqrt(level)
        const px = 1 + r * Math.cos(angle)
        const py = 2 + r * Math.sin(angle)
        if (angle === 0) {
          ctx.moveTo(toCanvasX(px), toCanvasY(py))
        } else {
          ctx.lineTo(toCanvasX(px), toCanvasY(py))
        }
      }
      ctx.stroke()
    })

    // 绘制坐标轴
    ctx.strokeStyle = '#9ca3af'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(0, offsetY)
    ctx.lineTo(width, offsetY)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(offsetX, 0)
    ctx.lineTo(offsetX, height)
    ctx.stroke()

    // 绘制坐标轴标签
    ctx.fillStyle = '#6b7280'
    ctx.font = '12px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('x', width - 20, offsetY - 10)
    ctx.textAlign = 'right'
    ctx.fillText('y', offsetX - 10, 20)

    // 绘制最优点
    ctx.fillStyle = '#10b981'
    ctx.beginPath()
    ctx.arc(toCanvasX(1), toCanvasY(2), 8, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = 'white'
    ctx.font = 'bold 10px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('★', toCanvasX(1), toCanvasY(2))

    // 绘制路径
    if (path.length > 1) {
      ctx.strokeStyle = '#3b82f6'
      ctx.lineWidth = 2
      ctx.beginPath()
      path.forEach((point, i) => {
        const cx = toCanvasX(point.x)
        const cy = toCanvasY(point.y)
        if (i === 0) {
          ctx.moveTo(cx, cy)
        } else {
          ctx.lineTo(cx, cy)
        }
      })
      ctx.stroke()

      // 绘制路径点
      path.forEach((point, i) => {
        const cx = toCanvasX(point.x)
        const cy = toCanvasY(point.y)
        ctx.fillStyle = i === path.length - 1 ? '#ef4444' : '#3b82f6'
        ctx.beginPath()
        ctx.arc(cx, cy, i === path.length - 1 ? 6 : 3, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    // 绘制当前梯度向量
    if (iterations > 0) {
      const grad = gradient(x, y)
      const arrowLength = 30
      const cx = toCanvasX(x)
      const cy = toCanvasY(y)
      const gradMag = Math.sqrt(grad.dx * grad.dx + grad.dy * grad.dy)
      
      if (gradMag > 0.001) {
        const ex = cx - (grad.dx / gradMag) * arrowLength
        const ey = cy + (grad.dy / gradMag) * arrowLength

        ctx.strokeStyle = '#f59e0b'
        ctx.fillStyle = '#f59e0b'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(ex, ey)
        ctx.stroke()

        // 箭头
        const angle = Math.atan2(ey - cy, ex - cx)
        ctx.beginPath()
        ctx.moveTo(ex, ey)
        ctx.lineTo(ex - 8 * Math.cos(angle - Math.PI / 6), ey - 8 * Math.sin(angle - Math.PI / 6))
        ctx.lineTo(ex - 8 * Math.cos(angle + Math.PI / 6), ey - 8 * Math.sin(angle + Math.PI / 6))
        ctx.closePath()
        ctx.fill()
      }
    }

    // 绘制图例
    ctx.font = '14px sans-serif'
    ctx.fillStyle = '#374151'
    ctx.textAlign = 'left'
    ctx.fillText('等高线', 20, 30)
    
    ctx.fillText('当前位置', 20, 50)
    ctx.fillStyle = '#ef4444'
    ctx.beginPath()
    ctx.arc(95, 46, 4, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = '#374151'
    ctx.fillText('最优点', 120, 50)
    ctx.fillStyle = '#10b981'
    ctx.beginPath()
    ctx.arc(180, 46, 6, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = '#374151'
    ctx.fillText('梯度方向', 210, 50)
    ctx.strokeStyle = '#f59e0b'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(280, 46)
    ctx.lineTo(310, 46)
    ctx.stroke()
  }, [x, y, path, iterations, gradient])

  useEffect(() => {
    draw()
  }, [draw])

  useEffect(() => {
    if (isPlaying && iterations < 100) {
      const grad = gradient(x, y)
      const gradMag = Math.sqrt(grad.dx * grad.dx + grad.dy * grad.dy)
      
      if (gradMag < 0.001) {
        setIsPlaying(false)
        return
      }

      const timer = setTimeout(() => {
        const newX = x - learningRate * grad.dx
        const newY = y - learningRate * grad.dy
        setX(newX)
        setY(newY)
        setPath(prev => [...prev, {x: newX, y: newY}])
        setIterations(prev => prev + 1)
      }, 300 / speed)
      
      return () => clearTimeout(timer)
    } else if (iterations >= 100) {
      setIsPlaying(false)
    }
  }, [isPlaying, iterations, speed, x, y, learningRate, gradient])

  const handleReset = () => {
    setIsPlaying(false)
    setIterations(0)
    setX(3)
    setY(3)
    setPath([{x: 3, y: 3}])
  }

  const currentValue = f(x, y)
  const optimalValue = f(1, 2)
  const grad = gradient(x, y)
  const gradMag = Math.sqrt(grad.dx * grad.dx + grad.dy * grad.dy)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">梯度下降优化</h2>
        <p className="text-gray-600">
          可视化梯度下降算法如何沿着梯度反方向逐步找到函数的最小值点
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
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-xs text-blue-600 mb-1">迭代次数</div>
                  <div className="text-xl font-bold text-blue-900">{iterations}</div>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="text-xs text-purple-600 mb-1">梯度大小</div>
                  <div className="text-xl font-bold text-purple-900">{gradMag.toFixed(4)}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">当前位置</span>
                  <span className="font-mono text-gray-900">
                    ({x.toFixed(2)}, {y.toFixed(2)})
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">当前值</span>
                  <span className="font-mono text-gray-900">{currentValue.toFixed(4)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">最优值</span>
                  <span className="font-mono text-green-600">{optimalValue.toFixed(4)}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    学习率: {learningRate.toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="0.5"
                  step="0.01"
                  value={learningRate}
                  onChange={(e) => setLearningRate(Number(e.target.value))}
                  disabled={isPlaying}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0.01</span>
                  <span>0.25</span>
                  <span>0.5</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-start space-x-2 text-sm">
                  <span>💡</span>
                  <div className="text-gray-600 space-y-1">
                    <div className="font-medium">梯度下降：</div>
                    <div>1. 计算当前梯度</div>
                    <div>2. 沿负梯度方向移动</div>
                    <div>3. 更新参数位置</div>
                    <div>4. 重复直至收敛</div>
                  </div>
                </div>
              </div>

              {gradMag < 0.001 && iterations > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600">✓</span>
                    <span className="text-sm font-medium text-green-800">已收敛</span>
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

