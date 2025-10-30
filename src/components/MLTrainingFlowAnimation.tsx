'use client'

import React, { useState, useEffect } from 'react'
import { Database, CheckCircle, Search, Brain, Target } from 'lucide-react'

interface Step {
  id: number
  icon: React.ReactNode
  title: string
  description: string
  color: string
  bgColor: string
  borderColor: string
}

export const MLTrainingFlowAnimation: React.FC = () => {
  const [visibleSteps, setVisibleSteps] = useState<number>(0)
  const [isComplete, setIsComplete] = useState(false)

  const steps: Step[] = [
    {
      id: 1,
      icon: <Database size={32} />,
      title: '步骤1：准备数据',
      description: '收集大量示例数据',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
      borderColor: '#3B82F6',
    },
    {
      id: 2,
      icon: <CheckCircle size={32} />,
      title: '步骤2：标注答案',
      description: '为每个数据标注正确结果',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-gradient-to-br from-green-500 to-green-600',
      borderColor: '#10B981',
    },
    {
      id: 3,
      icon: <Search size={32} />,
      title: '步骤3：特征提取',
      description: '提取数据的关键特征',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-500 to-purple-600',
      borderColor: '#8B5CF6',
    },
    {
      id: 4,
      icon: <Brain size={32} />,
      title: '步骤4：算法学习',
      description: '算法自动学习数据规律',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-gradient-to-br from-pink-500 to-pink-600',
      borderColor: '#EC4899',
    },
    {
      id: 5,
      icon: <Target size={32} />,
      title: '步骤5：生成模型',
      description: '得到训练好的模型',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-gradient-to-br from-orange-500 to-orange-600',
      borderColor: '#F97316',
    },
  ]

  useEffect(() => {
    if (visibleSteps < steps.length) {
      const timer = setTimeout(() => {
        setVisibleSteps((prev) => prev + 1)
      }, 800)
      return () => clearTimeout(timer)
    } else if (visibleSteps === steps.length && !isComplete) {
      setTimeout(() => {
        setIsComplete(true)
      }, 500)
    }
  }, [visibleSteps, steps.length, isComplete])

  const handleReplay = () => {
    setVisibleSteps(0)
    setIsComplete(false)
  }

  return (
    <div className="my-8 p-6 md:p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg">
      {/* 标题 */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          📚 训练阶段流程
        </h3>
        <p className="text-gray-600">
          {isComplete ? '✅ 完整流程展示' : '🎬 流程演示中...'}
        </p>
      </div>

      {/* 流程步骤 */}
      <div className="relative space-y-6">
        {steps.map((step, index) => (
          <div key={step.id} className="relative">
            {/* 步骤卡片 */}
            <div
              className="transform transition-all duration-700 ease-out"
              style={{
                opacity: visibleSteps > index ? 1 : 0,
                transform: visibleSteps > index ? 'translateX(0)' : 'translateX(-48px)',
              }}
            >
              <div
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300 border-l-4"
                style={{
                  borderLeftColor: step.borderColor,
                }}
              >
                <div className="flex items-start space-x-4">
                  {/* 图标 */}
                  <div
                    className={`flex-shrink-0 w-16 h-16 rounded-full ${step.bgColor} flex items-center justify-center text-white shadow-lg transform transition-transform duration-500`}
                    style={{
                      transform: visibleSteps > index ? 'scale(1)' : 'scale(0)',
                      transitionDelay: `${index * 100}ms`,
                    }}
                  >
                    {step.icon}
                  </div>

                  {/* 内容 */}
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-800 mb-1">
                      {step.title}
                    </h4>
                    <p className="text-gray-600">{step.description}</p>
                  </div>

                  {/* 步骤编号 */}
                  <div className="flex-shrink-0">
                    <div
                      className={`w-10 h-10 rounded-full ${step.bgColor} flex items-center justify-center text-white font-bold text-lg shadow-md`}
                    >
                      {step.id}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 连接箭头 */}
            {index < steps.length - 1 && (
              <div
                className="flex justify-center my-2 transform transition-all duration-500"
                style={{
                  opacity: visibleSteps > index + 1 ? 1 : 0,
                  transform: visibleSteps > index + 1 ? 'translateY(0)' : 'translateY(-16px)',
                }}
              >
                <div 
                  className="text-4xl text-gray-400"
                  style={{
                    animation: visibleSteps > index + 1 ? 'bounce 2s ease-in-out infinite' : 'none',
                  }}
                >
                  ↓
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 完成提示和重播按钮 */}
      {isComplete && (
        <div 
          className="mt-8 text-center"
          style={{
            animation: 'fadeIn 0.5s ease-out',
          }}
        >
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-6 py-3 rounded-full shadow-md mb-4">
            <CheckCircle size={24} />
            <span className="font-semibold">训练流程完成！</span>
          </div>
          <div>
            <button
              onClick={handleReplay}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
            >
              🔄 重新播放
            </button>
          </div>
        </div>
      )}

      {/* 内联CSS动画 */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `
      }} />
    </div>
  )
}
