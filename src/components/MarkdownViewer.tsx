'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { MermaidDiagram } from './MermaidDiagram'
import { QuizParser } from './QuizParser'
import { MLTrainingFlowAnimation } from './MLTrainingFlowAnimation'

interface MarkdownViewerProps {
  content: string
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content }) => {
  return (
    <div className="markdown-viewer prose prose-lg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // 标题渲染
          h1: ({ children }) => (
            <h1 className="text-4xl font-bold text-gray-900 mb-6 pb-4 border-b-2 border-blue-200">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4 pb-2 border-b border-gray-200">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
              {children}
            </h4>
          ),
          
          // 段落
          p: ({ children }) => (
            <p className="text-gray-700 leading-relaxed mb-4">
              {children}
            </p>
          ),
          
          // 列表
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="ml-4">
              {children}
            </li>
          ),
          
          // 引用块
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 italic text-gray-700">
              {children}
            </blockquote>
          ),
          
          // 代码块
          code: ({ node, inline, className, children, ...props }: any) => {
            const match = /language-([\w-]+)/.exec(className || '')
            const language = match ? match[1] : ''
            
            // Mermaid 图表渲染
            if (!inline && language === 'mermaid') {
              return <MermaidDiagram chart={String(children).replace(/\n$/, '')} />
            }
            
            // 练习题渲染
            if (!inline && (language === 'quiz-json' || language === 'quiz')) {
              return <QuizParser jsonString={String(children).replace(/\n$/, '')} />
            }
            
            // 机器学习训练流程动画
            if (!inline && language === 'ml-training-flow') {
              return <MLTrainingFlowAnimation />
            }
            
            // 普通代码块渲染
            return !inline && match ? (
              <div className="my-4 rounded-lg overflow-hidden shadow-lg">
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={language}
                  PreTag="div"
                  className="rounded-lg"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code className="bg-gray-100 text-red-600 px-2 py-1 rounded text-sm font-mono" {...props}>
                {children}
              </code>
            )
          },
          
          // 表格
          table: ({ children }) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full divide-y divide-gray-300 border border-gray-300">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-50">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="bg-white divide-y divide-gray-200">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-gray-50">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-6 py-4 text-sm text-gray-700">
              {children}
            </td>
          ),
          
          // 链接
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              {children}
            </a>
          ),
          
          // 分割线
          hr: () => (
            <hr className="my-8 border-t-2 border-gray-200" />
          ),
          
          // 图片
          img: ({ src, alt }) => {
            // 判断是否为课程图表图片（需要放大显示）
            const isChartImage = src?.includes('/content/images/') && 
                                (src.includes('AI-ML-DL') || src.includes('机器学习分类'))
            
            return (
              <div className={`flex justify-center my-8 ${isChartImage ? 'bg-transparent' : ''}`}>
                <img
                  src={src}
                  alt={alt}
                  className={`h-auto ${
                    isChartImage 
                      ? 'w-full max-w-5xl' // 图表类图片：全宽，最大5xl
                      : 'max-w-full rounded-lg shadow-md' // 普通图片：保持原样式
                  }`}
                  style={isChartImage ? { 
                    background: 'transparent',
                    border: 'none',
                    boxShadow: 'none'
                  } : {}}
                />
              </div>
            )
          },
          
          // Strong
          strong: ({ children }) => (
            <strong className="font-bold text-gray-900">
              {children}
            </strong>
          ),
          
          // Em
          em: ({ children }) => (
            <em className="italic text-gray-700">
              {children}
            </em>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

