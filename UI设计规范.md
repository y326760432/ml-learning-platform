# 机器学习教学平台 - UI/UX设计规范

## 🎨 设计原则

### 核心原则

1. **简约至上**: 去除一切不必要的元素，专注于内容本身
2. **直观易懂**: 零基础用户也能快速上手
3. **视觉引导**: 通过设计引导用户的学习路径
4. **一致性**: 整站保持统一的视觉语言
5. **可访问性**: 符合WCAG 2.1 AA标准

---

## 🌈 色彩系统

### 主色调

#### 品牌色 (Primary)
```css
--primary-50:  #EFF6FF;   /* 最浅 */
--primary-100: #DBEAFE;
--primary-200: #BFDBFE;
--primary-300: #93C5FD;
--primary-400: #60A5FA;
--primary-500: #3B82F6;   /* 主色 */
--primary-600: #2563EB;
--primary-700: #1D4ED8;
--primary-800: #1E40AF;
--primary-900: #1E3A8A;   /* 最深 */
```

**使用场景**:
- 主要按钮
- 链接
- 重点信息高亮
- 进度条

#### 辅助色 (Secondary)
```css
--secondary-50:  #FAF5FF;
--secondary-100: #F3E8FF;
--secondary-200: #E9D5FF;
--secondary-300: #D8B4FE;
--secondary-400: #C084FC;
--secondary-500: #A855F7;  /* 辅助色 */
--secondary-600: #9333EA;
--secondary-700: #7E22CE;
--secondary-800: #6B21A8;
--secondary-900: #581C87;
```

**使用场景**:
- 次要按钮
- 标签
- 可视化图表
- 装饰元素

### 功能色

#### 成功 (Success)
```css
--success-50:  #F0FDF4;
--success-500: #10B981;  /* 绿色 */
--success-700: #047857;
```

**使用场景**: 成功提示、正确答案、完成状态

#### 警告 (Warning)
```css
--warning-50:  #FFFBEB;
--warning-500: #F59E0B;  /* 橙色 */
--warning-700: #B45309;
```

**使用场景**: 警告提示、提醒信息

#### 错误 (Error)
```css
--error-50:  #FEF2F2;
--error-500: #EF4444;  /* 红色 */
--error-700: #B91C1C;
```

**使用场景**: 错误提示、错误答案、异常状态

### 中性色

```css
--gray-50:  #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-300: #D1D5DB;
--gray-400: #9CA3AF;
--gray-500: #6B7280;
--gray-600: #4B5563;
--gray-700: #374151;
--gray-800: #1F2937;
--gray-900: #111827;
```

**使用场景**:
- 背景色
- 边框
- 文字（不同层级）
- 分割线

### 色彩应用示例

```css
/* 背景 */
body {
  background-color: var(--gray-50);
}

.card {
  background-color: white;
}

/* 文字 */
.text-primary {
  color: var(--gray-900);
}

.text-secondary {
  color: var(--gray-600);
}

.text-muted {
  color: var(--gray-400);
}

/* 按钮 */
.btn-primary {
  background-color: var(--primary-500);
  color: white;
}

.btn-primary:hover {
  background-color: var(--primary-600);
}

/* 链接 */
a {
  color: var(--primary-600);
}

a:hover {
  color: var(--primary-700);
}
```

---

## 📝 字体系统

### 字体族

#### 界面字体
```css
font-family: 
  -apple-system, 
  BlinkMacSystemFont, 
  "Segoe UI", 
  "PingFang SC", 
  "Hiragino Sans GB", 
  "Microsoft YaHei", 
  sans-serif;
```

#### 代码字体
```css
font-family: 
  "Fira Code", 
  "JetBrains Mono", 
  "Consolas", 
  "Monaco", 
  monospace;
```

#### 数学公式字体
```css
font-family: 
  "Latin Modern Math", 
  "STIX Two Math", 
  serif;
```

### 字号系统

```css
--text-xs:   0.75rem;  /* 12px - 辅助信息 */
--text-sm:   0.875rem; /* 14px - 次要文字 */
--text-base: 1rem;     /* 16px - 正文 */
--text-lg:   1.125rem; /* 18px - 小标题 */
--text-xl:   1.25rem;  /* 20px - 标题 */
--text-2xl:  1.5rem;   /* 24px - 大标题 */
--text-3xl:  1.875rem; /* 30px - 主标题 */
--text-4xl:  2.25rem;  /* 36px - 超大标题 */
--text-5xl:  3rem;     /* 48px - Hero标题 */
```

### 行高

```css
--leading-tight:  1.25;  /* 标题 */
--leading-normal: 1.5;   /* 正文 */
--leading-relaxed: 1.75; /* 舒适阅读 */
```

### 字重

```css
--font-light:    300;
--font-normal:   400;
--font-medium:   500;
--font-semibold: 600;
--font-bold:     700;
```

### 应用示例

```css
/* Hero标题 */
.hero-title {
  font-size: var(--text-5xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
}

/* 正文 */
.body-text {
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: var(--leading-relaxed);
  color: var(--gray-700);
}

/* 代码 */
.code {
  font-family: "Fira Code", monospace;
  font-size: var(--text-sm);
}
```

---

## 📏 间距系统

### 间距尺度

```css
--space-0:  0;
--space-1:  0.25rem;  /* 4px */
--space-2:  0.5rem;   /* 8px */
--space-3:  0.75rem;  /* 12px */
--space-4:  1rem;     /* 16px */
--space-5:  1.25rem;  /* 20px */
--space-6:  1.5rem;   /* 24px */
--space-8:  2rem;     /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

### 应用规则

- **组件内部**: 4px, 8px, 12px
- **组件之间**: 16px, 24px, 32px
- **区块之间**: 48px, 64px, 80px
- **页面边距**: 24px (移动端), 48px (桌面端)

---

## 🔲 组件规范

### 按钮 (Button)

#### 主要按钮
```css
.btn-primary {
  padding: 12px 24px;
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  color: white;
  border-radius: 8px;
  font-weight: 500;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);
}

.btn-primary:hover {
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: translateY(0);
}
```

#### 次要按钮
```css
.btn-secondary {
  padding: 12px 24px;
  background: white;
  color: var(--primary-600);
  border: 1px solid var(--primary-200);
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: var(--primary-50);
  border-color: var(--primary-300);
}
```

#### 文本按钮
```css
.btn-text {
  padding: 8px 16px;
  background: transparent;
  color: var(--primary-600);
  border: none;
  font-weight: 500;
  cursor: pointer;
}

.btn-text:hover {
  color: var(--primary-700);
  background: var(--primary-50);
  border-radius: 6px;
}
```

#### 大小变体
```css
.btn-sm { padding: 8px 16px; font-size: 14px; }
.btn-md { padding: 12px 24px; font-size: 16px; } /* 默认 */
.btn-lg { padding: 16px 32px; font-size: 18px; }
```

### 卡片 (Card)

```css
.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.card-header {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  margin-bottom: 16px;
}

.card-body {
  color: var(--gray-600);
  line-height: 1.6;
}

.card-footer {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--gray-200);
}
```

### 输入框 (Input)

```css
.input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--gray-300);
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s;
  background: white;
}

.input:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input:disabled {
  background: var(--gray-100);
  cursor: not-allowed;
}

.input-error {
  border-color: var(--error-500);
}

.input-error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}
```

### 标签 (Tag)

```css
.tag {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
}

.tag-primary {
  background: var(--primary-100);
  color: var(--primary-700);
}

.tag-success {
  background: var(--success-100);
  color: var(--success-700);
}

.tag-warning {
  background: var(--warning-100);
  color: var(--warning-700);
}
```

### 进度条 (Progress Bar)

```css
.progress {
  width: 100%;
  height: 8px;
  background: var(--gray-200);
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%);
  border-radius: 4px;
  transition: width 0.3s ease;
}

/* 带动画的进度条 */
.progress-bar-animated {
  background: linear-gradient(
    90deg,
    #3B82F6 0%,
    #8B5CF6 50%,
    #3B82F6 100%
  );
  background-size: 200% 100%;
  animation: progress-animation 1.5s linear infinite;
}

@keyframes progress-animation {
  0% { background-position: 200% 0; }
  100% { background-position: 0 0; }
}
```

### 模态框 (Modal)

```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  margin-bottom: 16px;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--gray-500);
}
```

### Toast通知

```css
.toast {
  position: fixed;
  top: 24px;
  right: 24px;
  padding: 16px 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 12px;
  animation: slideIn 0.3s ease;
  z-index: 100;
}

.toast-success {
  border-left: 4px solid var(--success-500);
}

.toast-error {
  border-left: 4px solid var(--error-500);
}

@keyframes slideIn {
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
```

---

## 🎭 动画规范

### 过渡时间

```css
--duration-fast: 0.15s;    /* 快速响应 */
--duration-normal: 0.3s;   /* 常规动画 */
--duration-slow: 0.5s;     /* 缓慢动画 */
```

### 缓动函数

```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### 常用动画

#### 淡入淡出
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}
```

#### 滑入滑出
```css
@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

#### 缩放
```css
@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
```

#### 加载动画
```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid var(--gray-200);
  border-top-color: var(--primary-500);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
```

---

## 📱 响应式设计

### 断点

```css
/* 移动端优先 */
--breakpoint-sm: 640px;   /* 手机 */
--breakpoint-md: 768px;   /* 平板 */
--breakpoint-lg: 1024px;  /* 笔记本 */
--breakpoint-xl: 1280px;  /* 桌面 */
--breakpoint-2xl: 1536px; /* 大屏 */
```

### 布局示例

```css
/* 移动端 */
.container {
  padding: 0 16px;
  max-width: 100%;
}

/* 平板 */
@media (min-width: 768px) {
  .container {
    padding: 0 32px;
  }
  
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 桌面 */
@media (min-width: 1024px) {
  .container {
    padding: 0 48px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## 🖼️ 图标系统

### 图标库
推荐使用 **Heroicons** 或 **Lucide Icons**

### 尺寸规范
```css
--icon-xs: 16px;
--icon-sm: 20px;
--icon-md: 24px;
--icon-lg: 32px;
--icon-xl: 48px;
```

### 使用示例
```jsx
// React组件
import { CheckIcon } from '@heroicons/react/24/outline'

<CheckIcon className="w-5 h-5 text-green-500" />
```

---

## 🎨 页面设计示例

### 首页 Hero区域

```jsx
<section className="hero-section">
  <div className="container">
    <div className="hero-content">
      <h1 className="hero-title">
        轻松入门
        <span className="gradient-text">机器学习</span>
      </h1>
      <p className="hero-description">
        通过可视化动画和交互式代码，让机器学习变得简单易懂
      </p>
      <div className="hero-actions">
        <button className="btn-primary btn-lg">
          开始学习
        </button>
        <button className="btn-secondary btn-lg">
          观看演示
        </button>
      </div>
    </div>
    
    <div className="hero-visualization">
      {/* 神经网络动画背景 */}
      <NeuralNetworkAnimation />
    </div>
  </div>
</section>

<style>
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 10;
  color: white;
  max-width: 600px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 24px;
}

.gradient-text {
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-description {
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 32px;
  opacity: 0.9;
}

.hero-actions {
  display: flex;
  gap: 16px;
}
</style>
```

### 课程卡片

```jsx
<div className="course-card">
  <div className="course-thumbnail">
    <img src="/course-thumbnail.jpg" alt="课程封面" />
    <div className="course-badge">初级</div>
  </div>
  
  <div className="course-content">
    <h3 className="course-title">机器学习基础</h3>
    <p className="course-description">
      从零开始学习机器学习的核心概念和基本算法
    </p>
    
    <div className="course-meta">
      <span className="course-duration">
        <ClockIcon /> 8小时
      </span>
      <span className="course-lessons">
        <BookIcon /> 24节课
      </span>
    </div>
    
    <div className="course-progress">
      <div className="progress">
        <div className="progress-bar" style={{ width: '60%' }}></div>
      </div>
      <span className="progress-text">已完成 60%</span>
    </div>
  </div>
</div>

<style>
.course-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.course-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transform: translateY(-4px);
}

.course-thumbnail {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
}

.course-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.course-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 12px;
  background: var(--success-500);
  color: white;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
}

.course-content {
  padding: 20px;
}

.course-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.course-meta {
  display: flex;
  gap: 16px;
  margin-top: 16px;
  color: var(--gray-600);
  font-size: 14px;
}

.course-meta span {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
```

---

## ♿ 可访问性设计

### 对比度要求
- 正文文字: 至少 4.5:1
- 大文字(18px+): 至少 3:1
- 图形元素: 至少 3:1

### 焦点状态
```css
*:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}
```

### 屏幕阅读器
```jsx
// 使用语义化HTML
<button aria-label="关闭对话框">
  <CloseIcon />
</button>

// 隐藏装饰性元素
<img src="decoration.svg" alt="" aria-hidden="true" />
```

### 键盘导航
- 所有交互元素可通过Tab访问
- 模态框内焦点循环
- Esc关闭模态框

---

## 📐 设计交付

### Figma设计稿
- 页面设计
- 组件库
- 设计系统
- 交互原型

### 设计资源
- SVG图标
- 插图素材
- 图片资源
- 字体文件

### 设计文档
- 设计规范文档
- 组件使用指南
- 样式变量表
- 交互说明

---

**文档维护者**: 设计团队  
**最后更新**: 2025-10-29




