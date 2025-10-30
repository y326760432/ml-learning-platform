'use client'

import React from 'react'
import { QuizQuestion } from './QuizQuestion'

interface QuizParserProps {
  jsonString: string
}

export const QuizParser: React.FC<QuizParserProps> = ({ jsonString }) => {
  try {
    const quizData = JSON.parse(jsonString)
    
    // 验证数据格式
    if (!quizData.question || !quizData.options || !Array.isArray(quizData.options)) {
      throw new Error('练习题数据格式错误')
    }

    return (
      <QuizQuestion
        question={quizData.question}
        options={quizData.options}
        type={quizData.type || 'single'}
        explanation={quizData.explanation}
      />
    )
  } catch (error) {
    console.error('练习题解析错误:', error)
    return (
      <div className="my-8 p-6 bg-red-50 border-2 border-red-200 rounded-xl">
        <p className="text-red-600 font-semibold mb-2">⚠️ 练习题加载失败</p>
        <p className="text-sm text-red-500">数据格式错误，请检查 JSON 格式</p>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm text-red-600">查看原始数据</summary>
          <pre className="mt-2 p-3 bg-white rounded text-xs overflow-auto">
            {jsonString}
          </pre>
        </details>
      </div>
    )
  }
}

