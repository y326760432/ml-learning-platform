import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '',
  hover = false,
  ...rest
}) => {
  return (
    <div 
      className={`
        bg-white rounded-2xl shadow-md p-6
        ${hover ? 'card-hover cursor-pointer' : ''}
        ${className}
      `}
      {...rest}
    >
      {children}
    </div>
  )
}

