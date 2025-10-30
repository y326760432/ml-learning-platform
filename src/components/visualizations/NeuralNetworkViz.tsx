'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { ControlPanel } from './ControlPanel'

interface Layer {
  neurons: number
  activations: number[]
}

export const NeuralNetworkViz: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [currentLayer, setCurrentLayer] = useState(0)
  const [animationProgress, setAnimationProgress] = useState(0)
  
  // 网络结构 [输入层, 隐藏层1, 隐藏层2, 输出层]
  const initialLayers: Layer[] = [
    { neurons: 3, activations: [0.8, 0.6, 0.4] },
    { neurons: 5, activations: [0, 0, 0, 0, 0] },
    { neurons: 4, activations: [0, 0, 0, 0] },
    { neurons: 2, activations: [0, 0] },
  ]

  const [layers, setLayers] = useState<Layer[]>(initialLayers)

  // 权重矩阵（简化表示）
  const [weights] = useState(() => {
    const w: number[][][] = []
    for (let i = 0; i < initialLayers.length - 1; i++) {
      const layerWeights: number[][] = []
      for (let j = 0; j < initialLayers[i].neurons; j++) {
        const neuronWeights: number[] = []
        for (let k = 0; k < initialLayers[i + 1].neurons; k++) {
          neuronWeights.push(Math.random() * 2 - 1)
        }
        layerWeights.push(neuronWeights)
      }
      w.push(layerWeights)
    }
    return w
  })

  // Sigmoid激活函数
  const sigmoid = (x: number) => 1 / (1 + Math.exp(-x))

  // 前向传播一层
  const forwardPropagateLayer = useCallback((fromLayer: number) => {
    if (fromLayer >= layers.length - 1) {
      setIsPlaying(false)
      return
    }

    const newLayers = [...layers]
    const nextLayerActivations: number[] = []

    for (let j = 0; j < layers[fromLayer + 1].neurons; j++) {
      let sum = 0
      for (let i = 0; i < layers[fromLayer].neurons; i++) {
        sum += layers[fromLayer].activations[i] * weights[fromLayer][i][j]
      }
      nextLayerActivations.push(sigmoid(sum))
    }

    newLayers[fromLayer + 1].activations = nextLayerActivations
    setLayers(newLayers)
  }, [layers, weights])

  // 绘制神经网络
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    // 清空画布
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    const layerSpacing = width / (layers.length + 1)
    const maxNeurons = Math.max(...layers.map(l => l.neurons))

    // 绘制连接线和权重
    layers.forEach((layer, layerIdx) => {
      if (layerIdx === layers.length - 1) return

      const x1 = layerSpacing * (layerIdx + 1)
      const x2 = layerSpacing * (layerIdx + 2)

      layer.activations.forEach((activation, neuronIdx) => {
        const y1 = (height / (layer.neurons + 1)) * (neuronIdx + 1)

        layers[layerIdx + 1].activations.forEach((_, nextNeuronIdx) => {
          const y2 = (height / (layers[layerIdx + 1].neurons + 1)) * (nextNeuronIdx + 1)
          
          const weight = weights[layerIdx][neuronIdx][nextNeuronIdx]
          const opacity = Math.abs(weight)
          const color = weight > 0 ? '#3b82f6' : '#ef4444'
          
          // 只在动画到达该层时高亮连接
          if (layerIdx === currentLayer && animationProgress > 0) {
            ctx.strokeStyle = color + Math.floor(opacity * animationProgress * 255).toString(16).padStart(2, '0')
            ctx.lineWidth = 2 + Math.abs(weight) * 2
          } else if (layerIdx < currentLayer) {
            ctx.strokeStyle = color + Math.floor(opacity * 80).toString(16).padStart(2, '0')
            ctx.lineWidth = 1 + Math.abs(weight)
          } else {
            ctx.strokeStyle = '#e5e7eb'
            ctx.lineWidth = 1
          }
          
          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
          ctx.stroke()
        })
      })
    })

    // 绘制神经元
    layers.forEach((layer, layerIdx) => {
      const x = layerSpacing * (layerIdx + 1)
      
      layer.activations.forEach((activation, neuronIdx) => {
        const y = (height / (layer.neurons + 1)) * (neuronIdx + 1)
        
        // 神经元外圈
        ctx.beginPath()
        ctx.arc(x, y, 20, 0, Math.PI * 2)
        
        // 根据激活值设置颜色
        const intensity = layerIdx <= currentLayer ? activation : 0
        const hue = 200 // 蓝色
        ctx.fillStyle = `hsl(${hue}, 70%, ${100 - intensity * 50}%)`
        ctx.fill()
        
        ctx.strokeStyle = layerIdx === currentLayer ? '#3b82f6' : '#d1d5db'
        ctx.lineWidth = layerIdx === currentLayer ? 3 : 2
        ctx.stroke()
        
        // 激活值文本
        if (layerIdx <= currentLayer) {
          ctx.fillStyle = '#374151'
          ctx.font = '11px monospace'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(activation.toFixed(2), x, y)
        }
      })
      
      // 层标签
      ctx.fillStyle = '#6b7280'
      ctx.font = '12px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(
        layerIdx === 0 ? '输入层' :
        layerIdx === layers.length - 1 ? '输出层' :
        `隐藏层${layerIdx}`,
        x,
        height - 20
      )
    })
  }, [layers, weights, currentLayer, animationProgress])

  // 动画循环
  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setAnimationProgress(prev => {
          if (prev >= 1) {
            if (currentLayer < layers.length - 2) {
              forwardPropagateLayer(currentLayer)
              setCurrentLayer(c => c + 1)
              return 0
            } else {
              setIsPlaying(false)
              return 1
            }
          }
          return prev + 0.02 * speed
        })
      }, 20)
      return () => clearInterval(timer)
    }
  }, [isPlaying, currentLayer, animationProgress, speed, layers.length, forwardPropagateLayer])

  // 绘制更新
  useEffect(() => {
    draw()
  }, [draw])

  const handleReset = () => {
    setIsPlaying(false)
    setCurrentLayer(0)
    setAnimationProgress(0)
    
    // 重置激活值
    const newLayers = initialLayers.map((layer, idx) => ({
      ...layer,
      activations: idx === 0 
        ? [Math.random(), Math.random(), Math.random()]
        : new Array(layer.neurons).fill(0)
    }))
    setLayers(newLayers)
  }

  return (
    <div className="space-y-6">
      {/* 标题和说明 */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">神经网络前向传播</h2>
        <p className="text-gray-600">
          观察数据如何在神经网络中层层传递，每个神经元如何被激活
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
          
          {/* 网络结构信息 */}
          <div className="grid grid-cols-4 gap-4 mt-4">
            {layers.map((layer, idx) => (
              <div 
                key={idx}
                className={`rounded-lg p-4 ${
                  idx === currentLayer 
                    ? 'bg-blue-50 border-2 border-blue-500' 
                    : 'bg-gray-50'
                }`}
              >
                <div className="text-xs text-gray-600 font-medium">
                  {idx === 0 ? '输入' : idx === layers.length - 1 ? '输出' : `隐藏${idx}`}
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {layer.neurons}
                </div>
                <div className="text-xs text-gray-500">神经元</div>
              </div>
            ))}
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
            {/* 输出预测 */}
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-2">输出预测</div>
                <div className="space-y-2">
                  {layers[layers.length - 1].activations.map((activation, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>类别 {idx + 1}</span>
                        <span className="font-medium">{(activation * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${activation * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 图例 */}
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-2">图例</div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-1 bg-blue-500" />
                    <span>正权重</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-1 bg-red-500" />
                    <span>负权重</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-blue-200 border-2 border-blue-500" />
                    <span>激活的神经元</span>
                  </div>
                </div>
              </div>

              {/* 说明 */}
              <div className="text-xs text-gray-500 space-y-1">
                <p>💡 <strong>前向传播：</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>输入数据从左侧进入</li>
                  <li>每层计算加权和</li>
                  <li>通过激活函数(Sigmoid)</li>
                  <li>最终输出分类结果</li>
                </ul>
              </div>
            </div>
          </ControlPanel>
        </div>
      </div>
    </div>
  )
}

