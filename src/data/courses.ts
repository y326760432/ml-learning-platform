// 课程数据
export interface Course {
  id: string
  number: number
  title: string
  description: string
  duration: string
  difficulty: '入门' | '进阶' | '中级' | '高级'
  objectives: string[]
  exercises: number
  status: 'completed' | 'in-progress' | 'coming-soon'
  fileUrl: string
}

export const module1Courses: Course[] = [
  {
    id: 'lesson-01',
    number: 1,
    title: '什么是机器学习',
    description: '从零开始理解机器学习的基本概念，了解其与传统编程的区别，以及在现实生活中的应用场景。学习AI、ML、DL的关系。',
    duration: '30-40分钟',
    difficulty: '入门',
    objectives: [
      '理解机器学习的基本概念和核心思想',
      '了解机器学习的实际应用场景',
      '区分人工智能、机器学习和深度学习的关系',
      '认识机器学习与传统编程的本质区别'
    ],
    exercises: 7,
    status: 'completed',
    fileUrl: '/content/courses/module-1/lesson-01-什么是机器学习.md'
  },
  {
    id: 'lesson-02',
    number: 2,
    title: '机器学习的分类',
    description: '深入学习监督学习、无监督学习和强化学习三大类型。掌握分类问题和回归问题的区别，了解各类算法的应用场景。',
    duration: '40-50分钟',
    difficulty: '进阶',
    objectives: [
      '理解监督学习、无监督学习、强化学习的区别',
      '掌握分类问题和回归问题的特点',
      '了解各类学习方法的典型算法',
      '能够判断实际问题属于哪种学习类型'
    ],
    exercises: 15,
    status: 'completed',
    fileUrl: '/content/courses/module-1/lesson-02-机器学习的分类.md'
  },
  {
    id: 'lesson-03',
    number: 3,
    title: '机器学习工作流程',
    description: '了解从问题定义到模型部署的完整流程。掌握数据收集、预处理、模型训练、评估和部署的关键步骤。',
    duration: '45-50分钟',
    difficulty: '进阶',
    objectives: [
      '了解完整的机器学习项目流程',
      '理解数据在整个流程中的重要性',
      '掌握数据预处理的基本方法',
      '了解模型评估和部署的要点'
    ],
    exercises: 5,
    status: 'completed',
    fileUrl: '/content/courses/module-1/lesson-03-机器学习工作流程.md'
  },
  {
    id: 'lesson-04',
    number: 4,
    title: '训练集、验证集、测试集',
    description: '学习如何正确划分数据集，理解为什么需要三种不同的数据集，掌握常用的划分方法和比例。',
    duration: '40-45分钟',
    difficulty: '进阶',
    objectives: [
      '理解为什么要划分数据集',
      '掌握数据集划分的方法和比例',
      '了解交叉验证的基本概念',
      '避免数据泄露问题'
    ],
    exercises: 6,
    status: 'completed',
    fileUrl: '/content/courses/module-1/lesson-04-训练集验证集测试集.md'
  },
  {
    id: 'lesson-05',
    number: 5,
    title: '过拟合与欠拟合',
    description: '深入理解机器学习中最重要的概念之一。学习如何识别和解决过拟合、欠拟合问题，掌握正则化等技术。',
    duration: '45分钟',
    difficulty: '中级',
    objectives: [
      '理解过拟合和欠拟合的概念',
      '识别和解决这两个问题',
      '掌握正则化等解决方法',
      '理解偏差-方差权衡'
    ],
    exercises: 0,
    status: 'coming-soon',
    fileUrl: ''
  },
  {
    id: 'lesson-06',
    number: 6,
    title: '模型评估指标（分类问题）',
    description: '学习分类问题的各种评估指标，包括准确率、精确率、召回率、F1分数、ROC曲线等。',
    duration: '50分钟',
    difficulty: '中级',
    objectives: [
      '掌握准确率、精确率、召回率',
      '理解F1分数的意义',
      '学习混淆矩阵',
      '了解ROC曲线和AUC'
    ],
    exercises: 0,
    status: 'coming-soon',
    fileUrl: ''
  },
  {
    id: 'lesson-07',
    number: 7,
    title: '模型评估指标（回归问题）',
    description: '学习回归问题的评估指标，包括MAE、MSE、RMSE、R²等，理解各指标的适用场景。',
    duration: '40分钟',
    difficulty: '进阶',
    objectives: [
      '掌握MSE、RMSE、MAE',
      '理解R²分数',
      '学习残差分析',
      '选择合适的评估指标'
    ],
    exercises: 0,
    status: 'coming-soon',
    fileUrl: ''
  },
  {
    id: 'lesson-08',
    number: 8,
    title: '交叉验证',
    description: '深入学习交叉验证技术，包括K折交叉验证、分层K折、留一法等，提高模型评估的可靠性。',
    duration: '45分钟',
    difficulty: '中级',
    objectives: [
      '理解交叉验证的必要性',
      '掌握K折交叉验证',
      '了解分层K折',
      '应用于时间序列数据'
    ],
    exercises: 0,
    status: 'coming-soon',
    fileUrl: ''
  },
  {
    id: 'lesson-09',
    number: 9,
    title: 'Python环境搭建',
    description: '手把手教你搭建机器学习开发环境，安装Anaconda、配置Jupyter Notebook、安装常用库。',
    duration: '50分钟',
    difficulty: '入门',
    objectives: [
      '安装Anaconda',
      '使用Jupyter Notebook',
      '安装常用机器学习库',
      '编写第一个Python程序'
    ],
    exercises: 0,
    status: 'coming-soon',
    fileUrl: ''
  },
  {
    id: 'lesson-10',
    number: 10,
    title: 'NumPy和Pandas快速入门',
    description: '学习机器学习必备的数据处理工具，掌握NumPy数组操作和Pandas数据分析基础。',
    duration: '60分钟',
    difficulty: '进阶',
    objectives: [
      '掌握NumPy数组操作',
      '学习Pandas DataFrame',
      '数据读取和保存',
      '基础数据分析'
    ],
    exercises: 0,
    status: 'coming-soon',
    fileUrl: ''
  }
]

// 模块信息
export const moduleInfo = {
  id: 'module-1',
  name: '模块一：机器学习入门',
  description: '从零开始学习机器学习的基础知识，建立完整的知识体系',
  totalCourses: 10,
  completedCourses: 2,
  totalDuration: '约10小时',
  difficulty: '入门',
  prerequisites: '无（零基础可学）'
}


