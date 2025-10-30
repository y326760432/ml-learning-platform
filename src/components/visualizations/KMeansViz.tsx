'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { ControlPanel } from './ControlPanel'

interface Point {
  x: number
  y: number
  cluster: number
}

interface Centroid {
  x: number
  y: number
}

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899']

export const KMeansViz: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [k, setK] = useState(3)
  const [iterations, setIterations] = useState(0)
  const [converged, setConverged] = useState(false)
  
  // 初始化数据点
  const generateInitialData = () => {
    const newPoints: Point[] = []
    
    // 生成几个簇的数据
    const clusters = [
      { centerX: 150, centerY: 150, spread: 40 },
      { centerX: 400, centerY: 200, spread: 50 },
      { centerX: 300, centerY: 350, spread: 45 },
    ]
    
    clusters.forEach((cluster) => {
      for (let i = 0; i < 30; i++) {
        newPoints.push({
          x: cluster.centerX + (Math.random() - 0.5) * cluster.spread * 2,
          y: cluster.centerY + (Math.random() - 0.5) * cluster.spread * 2,
          cluster: -1,
        })
      }
    })
    
    return newPoints
  }

  const generateInitialCentroids = () => {
    const newCentroids: Centroid[] = []
    for (let i = 0; i < 3; i++) {
      newCentroids.push({
        x: Math.random() * 500 + 50,
        y: Math.random() * 350 + 50,
      })
    }
    return newCentroids
  }

  const [points, setPoints] = useState<Point[]>(generateInitialData)
  const [centroids, setCentroids] = useState<Centroid[]>(generateInitialCentroids)
  const [step, setStep] = useState<'assign' | 'update'>('assign')

  // 重新初始化数据
  const initializeData = useCallback(() => {
    setPoints(generateInitialData())
    const newCentroids: Centroid[] = []
    for (let i = 0; i < k; i++) {
      newCentroids.push({
        x: Math.random() * 500 + 50,
        y: Math.random() * 350 + 50,
      })
    }
    setCentroids(newCentroids)
    setIterations(0)
    setConverged(false)
    setStep('assign')
  }, [k])

  // 计算距离
  const distance = (p1: { x: number; y: number }, p2: { x: number; y: number }) => {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
  }

  // 分配点到最近的质心
  const assignPoints = useCallback(() => {
    const newPoints = points.map(point => {
      let minDist = Infinity
      let closestCluster = 0
      
      centroids.forEach((centroid, idx) => {
        const dist = distance(point, centroid)
        if (dist < minDist) {
          minDist = dist
          closestCluster = idx
        }
      })
      
      return { ...point, cluster: closestCluster }
    })
    
    setPoints(newPoints)
    setStep('update')
  }, [points, centroids])

  // 更新质心位置
  const updateCentroids = useCallback(() => {
    const newCentroids = centroids.map((_, idx) => {
      const clusterPoints = points.filter(p => p.cluster === idx)
      if (clusterPoints.length === 0) return centroids[idx]
      
      const sumX = clusterPoints.reduce((sum, p) => sum + p.x, 0)
      const sumY = clusterPoints.reduce((sum, p) => sum + p.y, 0)
      
      return {
        x: sumX / clusterPoints.length,
        y: sumY / clusterPoints.length,
      }
    })
    
    // 检查是否收敛
    const hasConverged = newCentroids.every((nc, idx) => {
      const oldC = centroids[idx]
      return distance(nc, oldC) < 1
    })
    
    setCentroids(newCentroids)
    setStep('assign')
    setIterations(prev => prev + 1)
    
    if (hasConverged) {
      setConverged(true)
      setIsPlaying(false)
    }
  }, [points, centroids])

  // 绘制函数
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // 绘制连接线（从点到质心）
    if (step === 'assign' && iterations > 0) {
      points.forEach(point => {
        if (point.cluster !== -1) {
          const centroid = centroids[point.cluster]
          ctx.strokeStyle = COLORS[point.cluster] + '20'
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(point.x, point.y)
          ctx.lineTo(centroid.x, centroid.y)
          ctx.stroke()
        }
      })
    }

    // 绘制数据点
    points.forEach(point => {
      if (point.cluster === -1) {
        ctx.fillStyle = '#9ca3af'
      } else {
        ctx.fillStyle = COLORS[point.cluster]
      }
      ctx.beginPath()
      ctx.arc(point.x, point.y, 5, 0, Math.PI * 2)
      ctx.fill()
    })

    // 绘制质心
    centroids.forEach((centroid, idx) => {
      // 外圈
      ctx.strokeStyle = COLORS[idx]
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.arc(centroid.x, centroid.y, 12, 0, Math.PI * 2)
      ctx.stroke()
      
      // 内圈
      ctx.fillStyle = '#ffffff'
      ctx.beginPath()
      ctx.arc(centroid.x, centroid.y, 8, 0, Math.PI * 2)
      ctx.fill()
      
      ctx.fillStyle = COLORS[idx]
      ctx.beginPath()
      ctx.arc(centroid.x, centroid.y, 5, 0, Math.PI * 2)
      ctx.fill()
    })
  }, [points, centroids, step, iterations])

  // 动画循环
  useEffect(() => {
    if (isPlaying && !converged) {
      const timer = setTimeout(() => {
        if (step === 'assign') {
          assignPoints()
        } else {
          updateCentroids()
        }
      }, 1000 / speed)
      return () => clearTimeout(timer)
    }
  }, [isPlaying, step, converged, speed, assignPoints, updateCentroids])

  // 绘制更新
  useEffect(() => {
    draw()
  }, [draw])

  // 初始化
  useEffect(() => {
    initializeData()
  }, [initializeData])

  return (
    <div className="space-y-6">
      {/* 标题和说明 */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">K-Means 聚类算法</h2>
        <p className="text-gray-600">
          观察数据点如何被分配到不同的簇，以及聚类中心如何移动到最优位置
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
              <div className="text-2xl font-bold text-blue-900">{iterations}</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-sm text-purple-600 font-medium">当前步骤</div>
              <div className="text-lg font-bold text-purple-900">
                {step === 'assign' ? '分配点' : '更新质心'}
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-sm text-green-600 font-medium">状态</div>
              <div className="text-lg font-bold text-green-900">
                {converged ? '✓ 已收敛' : '运行中...'}
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
            onReset={initializeData}
            speed={speed}
            onSpeedChange={setSpeed}
          >
            {/* K值控制 */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  聚类数量 K: {k}
                </label>
                <input
                  type="range"
                  min="2"
                  max="6"
                  step="1"
                  value={k}
                  onChange={(e) => setK(Number(e.target.value))}
                  disabled={isPlaying}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>2</span>
                  <span>4</span>
                  <span>6</span>
                </div>
              </div>

              {/* 簇统计 */}
              <div className="bg-white border border-gray-200 rounded-lg p-3 space-y-2">
                <div className="text-xs text-gray-500 mb-2">各簇点数</div>
                {centroids.map((_, idx) => {
                  const count = points.filter(p => p.cluster === idx).length
                  return (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: COLORS[idx] }}
                        />
                        <span className="text-sm">簇 {idx + 1}</span>
                      </div>
                      <span className="text-sm font-medium">{count} 个点</span>
                    </div>
                  )
                })}
              </div>

              {/* 说明 */}
              <div className="text-xs text-gray-500 space-y-1">
                <p>💡 <strong>算法步骤：</strong></p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>随机初始化K个质心</li>
                  <li>将每个点分配到最近的质心</li>
                  <li>重新计算质心位置</li>
                  <li>重复2-3直到收敛</li>
                </ol>
              </div>
            </div>
          </ControlPanel>
        </div>
      </div>
    </div>
  )
}

