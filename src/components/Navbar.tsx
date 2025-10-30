'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, BookOpen, Code, Users, Play } from 'lucide-react'
import { Button } from './ui/Button'

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: '课程', href: '/courses', icon: BookOpen },
    { name: '可视化', href: '/visualizations', icon: Play },
    { name: '实验室', href: '#playground', icon: Code },
    { name: '社区', href: '#community', icon: Users },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">ML</span>
            </div>
            <span className="text-xl md:text-2xl font-bold gradient-text">
              MLearning
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors duration-200"
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/courses">
              <Button variant="primary" size="sm">
                开始学习
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 bg-white rounded-lg shadow-lg mt-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </Link>
            ))}
            <div className="px-4 pt-4">
              <Link href="/courses" className="block">
                <Button variant="primary" size="sm" className="w-full">
                  开始学习
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

