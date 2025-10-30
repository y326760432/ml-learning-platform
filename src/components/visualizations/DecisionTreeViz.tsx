'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { ControlPanel } from './ControlPanel'

interface TreeNode {
  id: number
  x: number
  y: number
  feature?: string
  threshold?: number
  label?: string
  isLeaf: boolean
  left?: number
  right?: number
  samples: number[]
  depth: number
}

export const DecisionTreeViz: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [step, setStep] = useState(0)
  const [maxDepth, setMaxDepth] = useState(3)

  // 生成数据点
  const generateData = useCallback(() => {
    const data: { x: number; y: number; label: number }[] = []
    // 红色类别（左上）
    for (let i = 0; i < 20; i++) {
      data.push({
        x: Math.random() * 40 + 10,
        y: Math.random() * 40 + 10,
        label: 0,
      })
    }
    // 蓝色类别（右下）
    for (let i = 0; i < 20; i++) {
      data.push({
        x: Math.random() * 40 + 50,
        y: Math.random() * 40 + 50,
        label: 1,
      })
    }
    return data
  }, [])

  const [dataPoints] = useState(generateData)

  // 构建决策树
  const buildTree = useCallback((depth: number, samples: number[], nodeId: number, x: number, y: number): TreeNode[] => {
    const nodes: TreeNode[] = []
    
    if (depth === 0 || samples.length < 5) {
      // 叶子节点
      const labels = samples.map(i => dataPoints[i].label)
      const majorityLabel = labels.filter(l => l === 1).length > labels.length / 2 ? 1 : 0
      nodes.push({
        id: nodeId,
        x,
        y,
        label: majorityLabel === 1 ? '蓝色' : '红色',
        isLeaf: true,
        samples,
        depth: maxDepth - depth,
      })
      return nodes
    }

    // 找最佳分割点
    const avgX = samples.reduce((sum, i) => sum + dataPoints[i].x, 0) / samples.length
    const avgY = samples.reduce((sum, i) => sum + dataPoints[i].y, 0) / samples.length
    
    const feature = Math.random() > 0.5 ? 'x' : 'y'
    const threshold = feature === 'x' ? avgX : avgY
    
    const leftSamples = samples.filter(i => 
      feature === 'x' ? dataPoints[i].x < threshold : dataPoints[i].y < threshold
    )
    const rightSamples = samples.filter(i => 
      feature === 'x' ? dataPoints[i].x >= threshold : dataPoints[i].y >= threshold
    )

    const leftId = nodeId * 2 + 1
    const rightId = nodeId * 2 + 2

    nodes.push({
      id: nodeId,
      x,
      y,
      feature,
      threshold,
      isLeaf: false,
      left: leftId,
      right: rightId,
      samples,
      depth: maxDepth - depth,
    })

    // 递归构建子树
    const leftNodes = buildTree(depth - 1, leftSamples, leftId, x - 120 / (maxDepth - depth + 1), y + 80)
    const rightNodes = buildTree(depth - 1, rightSamples, rightId, x + 120 / (maxDepth - depth + 1), y + 80)
    
    return [...nodes, ...leftNodes, ...rightNodes]
  }, [dataPoints, maxDepth])

  const [tree, setTree] = useState<TreeNode[]>([])

  useEffect(() => {
    const allIndices = dataPoints.map((_, i) => i)
    const newTree = buildTree(maxDepth, allIndices, 0, 400, 50)
    setTree(newTree)
    setStep(0)
  }, [buildTree, dataPoints, maxDepth])

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

    // 绘制数据点
    ctx.save()
    ctx.translate(50, height - 250)
    dataPoints.forEach(point => {
      ctx.fillStyle = point.label === 1 ? '#3b82f6' : '#ef4444'
      ctx.globalAlpha = 0.6
      ctx.beginPath()
      ctx.arc(point.x * 4, -point.y * 4 + 400, 4, 0, Math.PI * 2)
      ctx.fill()
    })
    ctx.restore()
    ctx.globalAlpha = 1

    // 绘制决策树
    if (tree.length > 0) {
      // 先绘制连接线
      tree.slice(0, step + 1).forEach(node => {
        if (!node.isLeaf && node.left !== undefined && node.right !== undefined) {
          const leftNode = tree.find(n => n.id === node.left)
          const rightNode = tree.find(n => n.id === node.right)
          
          if (leftNode && step >= tree.indexOf(leftNode)) {
            ctx.strokeStyle = '#d1d5db'
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(leftNode.x, leftNode.y)
            ctx.stroke()
          }
          
          if (rightNode && step >= tree.indexOf(rightNode)) {
            ctx.strokeStyle = '#d1d5db'
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(rightNode.x, rightNode.y)
            ctx.stroke()
          }
        }
      })

      // 再绘制节点
      tree.slice(0, step + 1).forEach(node => {
        if (node.isLeaf) {
          // 叶子节点
          ctx.fillStyle = node.label === '蓝色' ? '#3b82f6' : '#ef4444'
          ctx.strokeStyle = '#1e40af'
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.arc(node.x, node.y, 20, 0, Math.PI * 2)
          ctx.fill()
          ctx.stroke()

          ctx.fillStyle = 'white'
          ctx.font = 'bold 12px sans-serif'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(node.label === '蓝色' ? 'B' : 'R', node.x, node.y)
        } else {
          // 决策节点
          ctx.fillStyle = '#10b981'
          ctx.strokeStyle = '#059669'
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.arc(node.x, node.y, 25, 0, Math.PI * 2)
          ctx.fill()
          ctx.stroke()

          ctx.fillStyle = 'white'
          ctx.font = 'bold 11px sans-serif'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          const text = `${node.feature} < ${node.threshold?.toFixed(0)}`
          ctx.fillText(text, node.x, node.y)
        }
      })
    }

    // 绘制图例
    ctx.font = '14px sans-serif'
    ctx.fillStyle = '#374151'
    ctx.textAlign = 'left'
    
    ctx.fillText('数据点', 20, 30)
    ctx.fillStyle = '#ef4444'
    ctx.beginPath()
    ctx.arc(90, 26, 4, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#3b82f6'
    ctx.beginPath()
    ctx.arc(110, 26, 4, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = '#374151'
    ctx.fillText('决策节点', 130, 30)
    ctx.fillStyle = '#10b981'
    ctx.beginPath()
    ctx.arc(210, 26, 8, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = '#374151'
    ctx.fillText('叶子节点', 230, 30)
    ctx.fillStyle = '#ef4444'
    ctx.beginPath()
    ctx.arc(310, 26, 8, 0, Math.PI * 2)
    ctx.fill()
  }, [dataPoints, tree, step])

  useEffect(() => {
    draw()
  }, [draw])

  useEffect(() => {
    if (isPlaying && step < tree.length - 1) {
      const timer = setTimeout(() => {
        setStep(prev => prev + 1)
      }, 500 / speed)
      return () => clearTimeout(timer)
    } else if (step >= tree.length - 1) {
      setIsPlaying(false)
    }
  }, [isPlaying, step, speed, tree.length])

  const handleReset = () => {
    setIsPlaying(false)
    setStep(0)
    const allIndices = dataPoints.map((_, i) => i)
    const newTree = buildTree(maxDepth, allIndices, 0, 400, 50)
    setTree(newTree)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">决策树生成</h2>
        <p className="text-gray-600">
          观察决策树如何通过递归分割数据来进行分类，每个节点选择最佳特征和阈值
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
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">节点进度</span>
                  <span className="text-sm text-gray-600">
                    {step + 1} / {tree.length}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">最大深度: {maxDepth}</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="4"
                  step="1"
                  value={maxDepth}
                  onChange={(e) => setMaxDepth(Number(e.target.value))}
                  disabled={isPlaying}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">树结构</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>总节点: {tree.length}</div>
                  <div>叶子节点: {tree.filter(n => n.isLeaf).length}</div>
                  <div>决策节点: {tree.filter(n => !n.isLeaf).length}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-start space-x-2 text-sm">
                  <span>💡</span>
                  <div className="text-gray-600 space-y-1">
                    <div className="font-medium">决策树算法：</div>
                    <div>1. 选择最佳分割特征</div>
                    <div>2. 按阈值分割数据</div>
                    <div>3. 递归构建子树</div>
                    <div>4. 达到停止条件</div>
                  </div>
                </div>
              </div>
            </div>
          </ControlPanel>
        </div>
      </div>
    </div>
  )
}

