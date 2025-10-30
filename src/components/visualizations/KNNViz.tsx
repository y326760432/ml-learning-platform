'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { ControlPanel } from './ControlPanel'

interface DataPoint {
  x: number
  y: number
  label: number // 0 或 1 表示类别
}

interface TestPoint {
  x: number
  y: number
}

export const KNNViz: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [k, setK] = useState(3)
  const [testPoint, setTestPoint] = useState<TestPoint>({ x: 5, y: 5 })
  const [prediction, setPrediction] = useState<number | null>(null)
  const [neighbors, setNeighbors] = useState<DataPoint[]>([])
  
  // 生成训练数据点
  const [dataPoints] = useState<DataPoint[]>(() => {
    const points: DataPoint[] = []
    
    // 类别 0 (蓝色) - 左下区域
    for (let i = 0; i < 30; i++) {
      points.push({
        x: Math.random() * 4 + 0.5,
        y: Math.random() * 4 + 0.5,
        label: 0
      })
    }
    
    // 类别 1 (红色) - 右上区域
    for (let i = 0; i < 30; i++) {
      points.push({
        x: Math.random() * 4 + 5.5,
        y: Math.random() * 4 + 5.5,
        label: 1
      })
    }
    
    return points
  })

  // 计算欧氏距离
  const calculateDistance = (p1: { x: number; y: number }, p2: { x: number; y: number }) => {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
  }

  // KNN 分类
  const classifyPoint = useCallback((point: TestPoint) => {
    // 计算所有点到测试点的距离
    const distances = dataPoints.map(dp => ({
      point: dp,
      distance: calculateDistance(dp, point)
    }))

    // 按距离排序并取前 K 个
    distances.sort((a, b) => a.distance - b.distance)
    const kNearest = distances.slice(0, k).map(d => d.point)
    
    // 投票决定类别
    const votes = kNearest.reduce((acc, p) => {
      acc[p.label] = (acc[p.label] || 0) + 1
      return acc
    }, {} as Record<number, number>)

    const predictedLabel = Object.entries(votes).reduce((a, b) => 
      votes[parseInt(a[0])] > votes[parseInt(b[0])] ? a : b
    )[0]

    setNeighbors(kNearest)
    setPrediction(parseInt(predictedLabel))
  }, [dataPoints, k])

  // 重新分类当前测试点
  useEffect(() => {
    classifyPoint(testPoint)
  }, [testPoint, k, classifyPoint])

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
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    // 坐标系范围
    const xMin = 0, xMax = 10
    const yMin = 0, yMax = 10

    // 坐标转换函数
    const toCanvasX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding)
    const toCanvasY = (y: number) => height - padding - ((y - yMin) / (yMax - yMin)) * (height - 2 * padding)

    // 绘制网格
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 1
    for (let i = 0; i <= 10; i++) {
      const x = toCanvasX(i)
      const y = toCanvasY(i)
      
      ctx.beginPath()
      ctx.moveTo(x, padding)
      ctx.lineTo(x, height - padding)
      ctx.stroke()
      
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()
    }

    // 绘制坐标轴
    ctx.strokeStyle = '#374151'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.lineTo(width - padding - 10, height - padding - 5)
    ctx.moveTo(width - padding, height - padding)
    ctx.lineTo(width - padding - 10, height - padding + 5)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(padding, height - padding)
    ctx.lineTo(padding, padding)
    ctx.lineTo(padding - 5, padding + 10)
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding + 5, padding + 10)
    ctx.stroke()

    // 标注轴
    ctx.fillStyle = '#374151'
    ctx.font = '14px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('X', width - padding + 20, height - padding + 5)
    ctx.save()
    ctx.translate(padding - 25, padding - 10)
    ctx.rotate(-Math.PI / 2)
    ctx.fillText('Y', 0, 0)
    ctx.restore()

    // 绘制训练数据点
    dataPoints.forEach(point => {
      const cx = toCanvasX(point.x)
      const cy = toCanvasY(point.y)
      
      // 判断是否是邻居
      const isNeighbor = neighbors.some(n => n.x === point.x && n.y === point.y)
      
      ctx.beginPath()
      ctx.arc(cx, cy, isNeighbor ? 8 : 5, 0, Math.PI * 2)
      ctx.fillStyle = point.label === 0 ? '#3b82f6' : '#ef4444'
      ctx.fill()
      
      // 如果是邻居，添加高亮边框
      if (isNeighbor) {
        ctx.strokeStyle = '#fbbf24'
        ctx.lineWidth = 3
        ctx.stroke()
      }
    })

    // 绘制到邻居的连线
    ctx.strokeStyle = '#fbbf24'
    ctx.lineWidth = 1
    ctx.setLineDash([5, 5])
    neighbors.forEach(neighbor => {
      ctx.beginPath()
      ctx.moveTo(toCanvasX(testPoint.x), toCanvasY(testPoint.y))
      ctx.lineTo(toCanvasX(neighbor.x), toCanvasY(neighbor.y))
      ctx.stroke()
    })
    ctx.setLineDash([])

    // 绘制测试点
    const testX = toCanvasX(testPoint.x)
    const testY = toCanvasY(testPoint.y)
    
    ctx.beginPath()
    ctx.arc(testX, testY, 10, 0, Math.PI * 2)
    ctx.fillStyle = prediction === 0 ? '#3b82f6' : '#ef4444'
    ctx.fill()
    ctx.strokeStyle = '#1f2937'
    ctx.lineWidth = 3
    ctx.stroke()

    // 绘制图例
    const legendX = width - padding - 150
    const legendY = padding + 20

    // 类别 0
    ctx.beginPath()
    ctx.arc(legendX, legendY, 6, 0, Math.PI * 2)
    ctx.fillStyle = '#3b82f6'
    ctx.fill()
    ctx.fillStyle = '#374151'
    ctx.font = '12px Arial'
    ctx.textAlign = 'left'
    ctx.fillText('类别 0 (蓝色)', legendX + 15, legendY + 4)

    // 类别 1
    ctx.beginPath()
    ctx.arc(legendX, legendY + 25, 6, 0, Math.PI * 2)
    ctx.fillStyle = '#ef4444'
    ctx.fill()
    ctx.fillStyle = '#374151'
    ctx.fillText('类别 1 (红色)', legendX + 15, legendY + 29)

    // 测试点
    ctx.beginPath()
    ctx.arc(legendX, legendY + 50, 8, 0, Math.PI * 2)
    ctx.fillStyle = prediction === 0 ? '#3b82f6' : '#ef4444'
    ctx.fill()
    ctx.strokeStyle = '#1f2937'
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.fillStyle = '#374151'
    ctx.fillText('测试点', legendX + 15, legendY + 54)

    // K 近邻
    ctx.beginPath()
    ctx.arc(legendX, legendY + 75, 6, 0, Math.PI * 2)
    ctx.fillStyle = '#9ca3af'
    ctx.fill()
    ctx.strokeStyle = '#fbbf24'
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.fillStyle = '#374151'
    ctx.fillText('K 近邻', legendX + 15, legendY + 79)

  }, [dataPoints, testPoint, neighbors, prediction])

  // 动画循环
  useEffect(() => {
    draw()
  }, [draw])

  // 处理画布点击
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const width = canvas.width
    const height = canvas.height
    const padding = 40

    // 转换为数据坐标
    const dataX = ((x - padding) / (width - 2 * padding)) * 10
    const dataY = (1 - (y - padding) / (height - 2 * padding)) * 10

    if (dataX >= 0 && dataX <= 10 && dataY >= 0 && dataY <= 10) {
      setTestPoint({ x: dataX, y: dataY })
    }
  }

  const controls = [
    {
      label: 'K 值',
      value: k,
      min: 1,
      max: 15,
      step: 1,
      onChange: (value: number) => setK(value),
      tooltip: '选择最近的 K 个邻居进行投票'
    }
  ]

  const stats = [
    { label: 'K 值', value: k.toString() },
    { label: '预测类别', value: prediction !== null ? `类别 ${prediction}` : '-' },
    { label: '测试点坐标', value: `(${testPoint.x.toFixed(2)}, ${testPoint.y.toFixed(2)})` },
    { label: '类别 0 邻居', value: neighbors.filter(n => n.label === 0).length.toString() },
    { label: '类别 1 邻居', value: neighbors.filter(n => n.label === 1).length.toString() }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">K近邻算法 (KNN)</h2>
        <p className="text-gray-600">
          点击画布任意位置放置测试点，观察 KNN 如何根据最近的 K 个邻居进行分类
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
            <canvas
              ref={canvasRef}
              width={700}
              height={350}
              className="w-full cursor-crosshair"
              onClick={handleCanvasClick}
            />
          </div>
        </div>

        <div className="space-y-6">
          <ControlPanel
            controls={controls}
            stats={stats}
            showPlayControls={false}
          />

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-bold text-blue-900 mb-2">💡 使用说明</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 点击画布放置测试点</li>
              <li>• 调整 K 值观察分类变化</li>
              <li>• 黄色高亮显示最近的 K 个邻居</li>
              <li>• 测试点颜色表示预测类别</li>
            </ul>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-bold text-purple-900 mb-2">📚 算法原理</h3>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>1. 计算测试点到所有训练点的距离</li>
              <li>2. 选出距离最近的 K 个点</li>
              <li>3. 统计这 K 个点的类别</li>
              <li>4. 使用多数投票决定分类</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-bold text-yellow-900 mb-2">⚙️ K 值选择</h3>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• K 太小：容易受噪声影响</li>
              <li>• K 太大：边界变得模糊</li>
              <li>• 通常选择奇数避免平票</li>
              <li>• 可通过交叉验证确定最佳 K</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

