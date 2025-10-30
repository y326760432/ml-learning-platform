'use client'

import React, { useState } from 'react'
import { CheckCircle, XCircle, Circle } from 'lucide-react'

interface QuizOption {
  id: string
  text: string
  isCorrect: boolean
}

interface QuizQuestionProps {
  question: string
  options: QuizOption[]
  type?: 'single' | 'multiple'
  explanation?: string
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  options,
  type = 'single',
  explanation,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)

  const handleOptionClick = (optionId: string) => {
    if (showResult) return // 已提交后不能再选

    if (type === 'single') {
      // 单选题：点击后立即提交
      setSelectedOptions([optionId])
      setShowResult(true)
    } else {
      // 多选题：切换选择状态
      setSelectedOptions((prev) =>
        prev.includes(optionId)
          ? prev.filter((id) => id !== optionId)
          : [...prev, optionId]
      )
    }
  }

  const handleSubmitMultiple = () => {
    if (selectedOptions.length === 0) {
      alert('请先选择答案！')
      return
    }
    setShowResult(true)
  }

  const handleReset = () => {
    setSelectedOptions([])
    setShowResult(false)
  }

  const getOptionStatus = (option: QuizOption) => {
    if (!showResult) {
      return selectedOptions.includes(option.id) ? 'selected' : 'default'
    }

    const isSelected = selectedOptions.includes(option.id)
    
    if (option.isCorrect) {
      return 'correct'
    }
    
    if (isSelected && !option.isCorrect) {
      return 'wrong'
    }
    
    return 'default'
  }

  const getOptionStyle = (status: string) => {
    switch (status) {
      case 'selected':
        return 'border-blue-500 bg-blue-50'
      case 'correct':
        return 'border-green-500 bg-green-50'
      case 'wrong':
        return 'border-red-500 bg-red-50'
      default:
        return 'border-gray-300 hover:border-blue-400 bg-white'
    }
  }

  const getOptionIcon = (option: QuizOption) => {
    const status = getOptionStatus(option)
    const isSelected = selectedOptions.includes(option.id)

    if (!showResult) {
      return isSelected ? (
        <Circle className="w-6 h-6 text-blue-500 fill-blue-500" />
      ) : (
        <Circle className="w-6 h-6 text-gray-400" />
      )
    }

    if (status === 'correct') {
      return <CheckCircle className="w-6 h-6 text-green-600 fill-green-100" />
    }

    if (status === 'wrong') {
      return <XCircle className="w-6 h-6 text-red-600 fill-red-100" />
    }

    return <Circle className="w-6 h-6 text-gray-300" />
  }

  const isCorrectAnswer = () => {
    if (type === 'single') {
      const selectedOption = options.find((opt) => opt.id === selectedOptions[0])
      return selectedOption?.isCorrect || false
    } else {
      // 多选题：选中的都是正确的，且没有漏选
      const correctIds = options.filter((opt) => opt.isCorrect).map((opt) => opt.id)
      return (
        selectedOptions.length === correctIds.length &&
        selectedOptions.every((id) => correctIds.includes(id))
      )
    }
  }

  return (
    <div className="my-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200">
      {/* 问题标题 */}
      <div className="mb-6">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              Q
            </div>
          </div>
          <div className="flex-1">
            <p className="text-lg font-semibold text-gray-900 break-words whitespace-normal">{question}</p>
            <p className="text-sm text-gray-600 mt-1">
              {type === 'single' ? '单选题' : '多选题'}
            </p>
          </div>
        </div>
      </div>

      {/* 选项列表 */}
      <div className="space-y-3 mb-6">
        {options.map((option, index) => {
          const status = getOptionStatus(option)
          const isSelected = selectedOptions.includes(option.id)

          return (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              disabled={showResult}
              className={`block w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${getOptionStyle(
                status
              )} ${
                showResult ? 'cursor-default' : 'cursor-pointer hover:shadow-md'
              }`}
            >
              <div className="flex items-center space-x-4">
                {/* 图标 */}
                <div className="flex-shrink-0">{getOptionIcon(option)}</div>

                {/* 选项标签 */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700">
                  {String.fromCharCode(65 + index)}
                </div>

                {/* 选项文本 */}
                <div className="flex-1">
                  <p
                    className={`font-medium break-words whitespace-normal ${
                      status === 'correct'
                        ? 'text-green-700'
                        : status === 'wrong'
                        ? 'text-red-700'
                        : 'text-gray-800'
                    }`}
                  >
                    {option.text}
                  </p>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* 操作按钮 */}
      {!showResult ? (
        <>
          {type === 'multiple' && (
            <button
              onClick={handleSubmitMultiple}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              提交答案（多选题）
            </button>
          )}
          {type === 'single' && (
            <div className="text-center text-sm text-gray-500">
              💡 提示：点击选项后将立即显示结果
            </div>
          )}
        </>
      ) : (
        <div className="space-y-4">
          {/* 结果提示 */}
          <div
            className={`p-4 rounded-lg border-2 ${
              isCorrectAnswer()
                ? 'bg-green-50 border-green-300'
                : 'bg-red-50 border-red-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              {isCorrectAnswer() ? (
                <>
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <p className="font-semibold text-green-800 break-words whitespace-normal">
                    🎉 回答正确！做得很好！
                  </p>
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                  <p className="font-semibold text-red-800 break-words whitespace-normal">
                    💪 回答错误，再接再厉！
                  </p>
                </>
              )}
            </div>

            {/* 解析 */}
            {explanation && (
              <div className="mt-3 pt-3 border-t border-gray-300">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  📖 答案解析：
                </p>
                <p className="text-sm text-gray-700 leading-relaxed break-words whitespace-normal">
                  {explanation}
                </p>
              </div>
            )}
          </div>

          {/* 重新答题按钮 */}
          <button
            onClick={handleReset}
            className="w-full px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-300"
          >
            重新答题
          </button>
        </div>
      )}
    </div>
  )
}

