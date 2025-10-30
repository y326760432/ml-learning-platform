'use client'

import React from 'react'
import { Play, Pause, RotateCcw, Settings } from 'lucide-react'
import { Button } from '../ui/Button'

interface ControlPanelProps {
  isPlaying: boolean
  onPlay: () => void
  onPause: () => void
  onReset: () => void
  speed?: number
  onSpeedChange?: (speed: number) => void
  children?: React.ReactNode
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  isPlaying,
  onPlay,
  onPause,
  onReset,
  speed = 1,
  onSpeedChange,
  children,
}) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-4">
      {/* 播放控制 */}
      <div className="flex items-center space-x-3">
        <Button
          variant={isPlaying ? 'secondary' : 'primary'}
          size="sm"
          onClick={isPlaying ? onPause : onPlay}
          className="flex items-center space-x-2"
        >
          {isPlaying ? (
            <>
              <Pause size={16} />
              <span>暂停</span>
            </>
          ) : (
            <>
              <Play size={16} />
              <span>播放</span>
            </>
          )}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          className="flex items-center space-x-2"
        >
          <RotateCcw size={16} />
          <span>重置</span>
        </Button>
      </div>

      {/* 速度控制 */}
      {onSpeedChange && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            动画速度: {speed}x
          </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.5"
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0.5x</span>
            <span>1x</span>
            <span>1.5x</span>
            <span>2x</span>
          </div>
        </div>
      )}

      {/* 自定义参数区域 */}
      {children && (
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center space-x-2 mb-3">
            <Settings size={16} className="text-gray-600" />
            <span className="text-sm font-medium text-gray-700">参数设置</span>
          </div>
          {children}
        </div>
      )}
    </div>
  )
}

