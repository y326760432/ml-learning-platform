'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { ControlPanel } from './ControlPanel'

export const CNNViz: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [currentLayer, setCurrentLayer] = useState(0)

  // 简化的CNN层结构
  const layers = [
    { name: '输入图像', type: 'input', size: 28, channels: 1, color: '#3b82f6' },
    { name: '卷积1', type: 'conv', size: 24, channels: 8, color: '#10b981' },
    { name: '池化1', type: 'pool', size: 12, channels: 8, color: '#f59e0b' },
    { name: '卷积2', type: 'conv', size: 8, channels: 16, color: '#10b981' },
    { name: '池化2', type: 'pool', size: 4, channels: 16, color: '#f59e0b' },
    { name: '全连接', type: 'fc', size: 10, channels: 1, color: '#8b5cf6' },
  ]

  // 生成简单的"图像"数据（数字5的简化版）
  const generateImage = useCallback(() => {
    const size = 28
    const image: number[][] = Array(size).fill(0).map(() => Array(size).fill(0))
    
    // 画一个简单的"5"
    for (let i = 5; i < 23; i++) {
      for (let j = 5; j < 18; j++) {
        if (i < 10 || (i > 13 && i < 18) || i > 20) {
          if (j < 8 || j > 15) {
            image[i][j] = 1
          }
        } else if (i >= 10 && i <= 13 && j > 12) {
          image[i][j] = 1
        }
      }
    }
    
    return image
  }, [])

  const [inputImage] = useState(generateImage)

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

    const startX = 50
    const startY = height / 2
    const layerSpacing = 120

    // 绘制层
    layers.forEach((layer, idx) => {
      const x = startX + idx * layerSpacing
      const isActive = idx <= currentLayer

      // 绘制层的表示
      if (layer.type === 'input' || layer.type === 'conv' || layer.type === 'pool') {
        // 绘制为小方块（特征图）
        const boxSize = Math.min(60, layer.size * 2)
        const offsetY = startY - boxSize / 2

        // 绘制多个通道
        const channelOffset = Math.min(3, layer.channels)
        for (let c = 0; c < Math.min(3, layer.channels); c++) {
          const channelX = x - c * 5
          const channelY = offsetY + c * 5

          ctx.fillStyle = isActive ? layer.color : '#e5e7eb'
          ctx.strokeStyle = isActive ? '#1f2937' : '#9ca3af'
          ctx.lineWidth = 2
          ctx.fillRect(channelX, channelY, boxSize, boxSize)
          ctx.strokeRect(channelX, channelY, boxSize, boxSize)

          // 如果是输入层且激活，绘制输入图像
          if (idx === 0 && isActive) {
            const pixelSize = boxSize / inputImage.length
            inputImage.forEach((row, i) => {
              row.forEach((val, j) => {
                if (val > 0.5) {
                  ctx.fillStyle = '#1e40af'
                  ctx.fillRect(
                    channelX + j * pixelSize,
                    channelY + i * pixelSize,
                    pixelSize,
                    pixelSize
                  )
                }
              })
            })
          }
        }

        // 层名称
        ctx.fillStyle = '#374151'
        ctx.font = '12px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(layer.name, x + boxSize / 2 - channelOffset * 2.5, offsetY + boxSize + 20)
        ctx.font = '10px sans-serif'
        ctx.fillStyle = '#6b7280'
        ctx.fillText(
          `${layer.size}×${layer.size}×${layer.channels}`,
          x + boxSize / 2 - channelOffset * 2.5,
          offsetY + boxSize + 35
        )
      } else if (layer.type === 'fc') {
        // 全连接层绘制为圆点列表
        const nodeSize = 8
        const spacing = 12
        const totalHeight = layer.size * spacing
        const offsetY = startY - totalHeight / 2

        for (let i = 0; i < layer.size; i++) {
          const y = offsetY + i * spacing
          ctx.fillStyle = isActive ? layer.color : '#e5e7eb'
          ctx.strokeStyle = isActive ? '#1f2937' : '#9ca3af'
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.arc(x, y, nodeSize, 0, Math.PI * 2)
          ctx.fill()
          ctx.stroke()
        }

        ctx.fillStyle = '#374151'
        ctx.font = '12px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(layer.name, x, offsetY + totalHeight + 20)
        ctx.font = '10px sans-serif'
        ctx.fillStyle = '#6b7280'
        ctx.fillText(`${layer.size} 类别`, x, offsetY + totalHeight + 35)
      }

      // 绘制连接线
      if (idx < layers.length - 1 && isActive) {
        const nextLayer = layers[idx + 1]
        const nextX = startX + (idx + 1) * layerSpacing
        
        ctx.strokeStyle = idx < currentLayer ? '#10b981' : '#d1d5db'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(x + 60, startY)
        ctx.lineTo(nextX - 10, startY)
        ctx.stroke()

        // 箭头
        if (idx < currentLayer) {
          ctx.fillStyle = '#10b981'
          ctx.beginPath()
          ctx.moveTo(nextX - 10, startY)
          ctx.lineTo(nextX - 18, startY - 5)
          ctx.lineTo(nextX - 18, startY + 5)
          ctx.closePath()
          ctx.fill()
        }
      }
    })

    // 绘制当前操作说明
    if (currentLayer > 0 && currentLayer < layers.length) {
      const layer = layers[currentLayer]
      let operation = ''
      if (layer.type === 'conv') {
        operation = '应用卷积核提取特征'
      } else if (layer.type === 'pool') {
        operation = '池化降低维度'
      } else if (layer.type === 'fc') {
        operation = '全连接输出分类'
      }

      ctx.fillStyle = '#10b981'
      ctx.font = 'bold 14px sans-serif'
      ctx.textAlign = 'left'
      ctx.fillText(`当前: ${operation}`, 50, 50)
    }

    // 绘制图例
    ctx.font = '12px sans-serif'
    ctx.fillStyle = '#374151'
    ctx.textAlign = 'left'
    
    const legendY = height - 40
    ctx.fillText('卷积层', 50, legendY)
    ctx.fillStyle = '#10b981'
    ctx.fillRect(100, legendY - 8, 15, 12)

    ctx.fillStyle = '#374151'
    ctx.fillText('池化层', 130, legendY)
    ctx.fillStyle = '#f59e0b'
    ctx.fillRect(180, legendY - 8, 15, 12)

    ctx.fillStyle = '#374151'
    ctx.fillText('全连接', 210, legendY)
    ctx.fillStyle = '#8b5cf6'
    ctx.fillRect(265, legendY - 8, 15, 12)
  }, [currentLayer, inputImage, layers])

  useEffect(() => {
    draw()
  }, [draw])

  useEffect(() => {
    if (isPlaying && currentLayer < layers.length - 1) {
      const timer = setTimeout(() => {
        setCurrentLayer(prev => prev + 1)
      }, 1500 / speed)
      return () => clearTimeout(timer)
    } else if (currentLayer >= layers.length - 1) {
      setIsPlaying(false)
    }
  }, [isPlaying, currentLayer, speed, layers.length])

  const handleReset = () => {
    setIsPlaying(false)
    setCurrentLayer(0)
  }

  const getOutputProbabilities = () => {
    if (currentLayer < layers.length - 1) return null
    
    // 模拟输出概率
    const probs = Array(10).fill(0).map(() => Math.random() * 20)
    probs[5] = 85 + Math.random() * 10 // "5"有最高概率
    const sum = probs.reduce((a, b) => a + b, 0)
    return probs.map(p => (p / sum) * 100)
  }

  const probabilities = getOutputProbabilities()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">卷积神经网络 (CNN)</h2>
        <p className="text-gray-600">
          观察CNN如何通过卷积层、池化层逐层提取图像特征，最终实现图像分类
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
                <div className="text-xs text-blue-600 mb-1">当前层</div>
                <div className="text-sm font-medium text-blue-900">
                  {currentLayer + 1} / {layers.length}: {layers[currentLayer].name}
                </div>
              </div>

              <div className="space-y-2">
                {layers.map((layer, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center space-x-2 text-sm p-2 rounded ${
                      idx === currentLayer ? 'bg-blue-50' : idx < currentLayer ? 'bg-green-50' : 'bg-gray-50'
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full ${
                        idx === currentLayer
                          ? 'bg-blue-500'
                          : idx < currentLayer
                          ? 'bg-green-500'
                          : 'bg-gray-300'
                      }`}
                    />
                    <span className="font-medium">{layer.name}</span>
                    <span className="text-xs text-gray-500 ml-auto">
                      {layer.type !== 'fc'
                        ? `${layer.size}×${layer.size}×${layer.channels}`
                        : `${layer.size}`}
                    </span>
                  </div>
                ))}
              </div>

              {probabilities && (
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">输出概率</h4>
                  <div className="space-y-2">
                    {probabilities.map((prob, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">类别 {idx}</span>
                          <span className="font-mono text-gray-900">{prob.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${
                              idx === 5 ? 'bg-green-500' : 'bg-blue-400'
                            }`}
                            style={{ width: `${prob}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-800">预测结果</span>
                      <span className="text-2xl font-bold text-green-600">5</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-start space-x-2 text-sm">
                  <span>💡</span>
                  <div className="text-gray-600 space-y-1">
                    <div className="font-medium">CNN结构：</div>
                    <div>1. 卷积层提取特征</div>
                    <div>2. 池化层降维</div>
                    <div>3. 多层堆叠加深</div>
                    <div>4. 全连接输出</div>
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

