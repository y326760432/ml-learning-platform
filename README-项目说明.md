# MLearning - 机器学习可视化教学平台

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-14.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)

## 📖 项目简介

MLearning是一个面向零基础学习者的机器学习教学平台，通过可视化动画、交互式代码实验室和渐进式学习路径，帮助用户以最直观和有趣的方式理解机器学习。

## ✨ 主要特性

- 🎨 **可视化学习** - 精美的算法动画演示
- 💻 **在线实验室** - 内置代码编辑器和运行环境
- 📚 **系统化课程** - 从零基础到进阶的完整学习路径
- 🎯 **项目实战** - 真实案例和端到端项目
- 👥 **社区互动** - 活跃的学习者社区

## 🚀 快速开始

### 环境要求

- Node.js 18.x 或更高版本
- npm 或 yarn 或 pnpm

### 安装步骤

1. **安装依赖**
```bash
npm install
# 或
yarn install
# 或
pnpm install
```

2. **启动开发服务器**
```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

3. **打开浏览器访问**
```
http://localhost:3000
```

### 构建生产版本

```bash
npm run build
npm run start
```

## 📁 项目结构

```
mllearning-platform/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css        # 全局样式
│   │   ├── layout.tsx         # 根布局
│   │   └── page.tsx           # 首页
│   │
│   └── components/            # React组件
│       ├── ui/               # 基础UI组件
│       │   ├── Button.tsx
│       │   └── Card.tsx
│       │
│       ├── animations/       # 动画组件
│       │   └── NeuralNetworkBackground.tsx
│       │
│       ├── Navbar.tsx        # 导航栏
│       ├── Hero.tsx          # Hero区域
│       ├── Features.tsx      # 特色功能
│       ├── LearningPath.tsx  # 学习路径
│       ├── PopularCourses.tsx # 热门课程
│       └── Footer.tsx        # 页脚
│
├── public/                   # 静态资源
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🎨 技术栈

### 前端
- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **图标**: Lucide React

### 后端（计划中）
- **API服务**: Node.js + Express
- **数据库**: PostgreSQL
- **缓存**: Redis
- **代码执行**: Docker + Python

## 🎯 开发路线图

### ✅ 已完成
- [x] 项目初始化和配置
- [x] 基础UI组件库
- [x] 首页设计和实现
- [x] 导航栏和响应式布局
- [x] 神经网络背景动画

### 🚧 进行中
- [ ] 用户认证系统
- [ ] 课程内容管理
- [ ] 代码编辑器集成

### 📅 计划中
- [ ] 算法可视化动画（线性回归、K-Means等）
- [ ] 在线代码执行环境
- [ ] 练习题库系统
- [ ] 项目实战模块
- [ ] 社区功能

## 🤝 贡献指南

欢迎贡献代码、报告问题或提出建议！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📝 代码规范

- 使用 ESLint 进行代码检查
- 使用 Prettier 进行代码格式化
- 遵循 Conventional Commits 规范

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 👥 团队

- 产品设计: AI团队
- 技术开发: AI团队
- 内容创作: AI团队

## 📧 联系我们

- 邮箱: support@mlearning.com
- 官网: https://mlearning.com
- GitHub: https://github.com/mlearning/platform

---

**让机器学习触手可及！** 🚀

