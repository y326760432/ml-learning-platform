'use client'

import React, { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
}

export const NeuralNetworkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Node[]>([])
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 设置画布大小
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // 初始化节点
    const nodeCount = 50
    nodesRef.current = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }))

    // 动画循环
    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 更新节点位置
      nodesRef.current.forEach(node => {
        node.x += node.vx
        node.y += node.vy

        // 边界检测
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1
      })

      // 绘制连接线
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.15)'
      ctx.lineWidth = 1

      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const node1 = nodesRef.current[i]
          const node2 = nodesRef.current[j]
          const distance = Math.sqrt(
            Math.pow(node1.x - node2.x, 2) + Math.pow(node1.y - node2.y, 2)
          )

          if (distance < 150) {
            const opacity = 1 - distance / 150
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.15})`
            ctx.beginPath()
            ctx.moveTo(node1.x, node1.y)
            ctx.lineTo(node2.x, node2.y)
            ctx.stroke()
          }
        }
      }

      // 绘制节点
      nodesRef.current.forEach(node => {
        ctx.fillStyle = 'rgba(139, 92, 246, 0.3)'
        ctx.beginPath()
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  )
}

