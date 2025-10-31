# 第5课：过拟合与欠拟合

## 📖 课程目标

学完本课，你将能够：
- ✅ 理解过拟合和欠拟合的概念
- ✅ 识别模型是否过拟合或欠拟合
- ✅ 掌握防止过拟合的常用方法
- ✅ 了解偏差-方差权衡原理

**预计学习时间**：50-55分钟  
**难度等级**：⭐⭐⭐ 进阶

---

## 🎯 什么是过拟合和欠拟合？

### 一个生动的比喻

想象你在准备考试：

#### 📚 死记硬背的学生（过拟合）

**学习方式**：
- 把所有练习题的答案都背下来
- 完全记住每道题的解法
- 练习题测试：100分 ✅

**考试结果**：
- 遇到新题型：不会做 ❌
- 题目稍微变化：完全懵了 ❌
- 最终成绩：不及格 😱

**问题**：只会做见过的题，不理解知识原理！

---

#### 😴 敷衍学习的学生（欠拟合）

**学习方式**：
- 只看了课本前几页
- 基本概念都没搞懂
- 练习题测试：40分 ❌

**考试结果**：
- 基础题：不太会做 ❌
- 稍难的题：完全不会 ❌
- 最终成绩：不及格 😢

**问题**：学习不够，基本知识都没掌握！

---

#### 🎓 理解原理的学生（刚刚好）

**学习方式**：
- 理解基本概念和原理
- 通过练习题巩固知识
- 练习题测试：85分 ✅

**考试结果**：
- 基础题：做得很好 ✅
- 新题型：能举一反三 ✅
- 最终成绩：优秀 🎉

**关键**：既掌握知识，又能灵活应用！

---

## 🔍 机器学习中的过拟合与欠拟合

### 核心概念

![过拟合与欠拟合概念图](/content/images/lesson-05-过拟合欠拟合概念.png)

### 定义

**欠拟合（Underfitting）**：
- 模型太简单，连训练数据都学不好
- 训练集表现差，测试集表现也差
- 模型没有充分学习数据的模式

**过拟合（Overfitting）**：
- 模型太复杂，记住了训练数据的细节（包括噪声）
- 训练集表现很好，测试集表现差
- 模型失去了泛化能力

**刚刚好（Good Fit）**：
- 模型复杂度适中
- 训练集表现好，测试集表现也好
- 模型具有良好的泛化能力

---

## 📊 可视化理解

### 例子：拟合曲线

假设我们要拟合以下数据点：

```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.pipeline import Pipeline

# 生成示例数据
np.random.seed(42)
X = np.linspace(0, 10, 20).reshape(-1, 1)
y = 3*X.ravel() + 5 + np.random.randn(20) * 3

# 绘制数据点
plt.figure(figsize=(15, 4))

# 1. 欠拟合 - 一次多项式（直线）
plt.subplot(131)
model_underfit = LinearRegression()
model_underfit.fit(X, y)
X_test = np.linspace(0, 10, 100).reshape(-1, 1)
y_pred = model_underfit.predict(X_test)

plt.scatter(X, y, color='blue', alpha=0.6, label='训练数据')
plt.plot(X_test, y_pred, 'r-', linewidth=2, label='模型预测')
plt.title('欠拟合（太简单）', fontsize=14, fontweight='bold')
plt.xlabel('X')
plt.ylabel('y')
plt.legend()
plt.grid(True, alpha=0.3)

# 2. 刚刚好 - 三次多项式
plt.subplot(132)
model_good = Pipeline([
    ('poly', PolynomialFeatures(degree=2)),
    ('linear', LinearRegression())
])
model_good.fit(X, y)
y_pred = model_good.predict(X_test)

plt.scatter(X, y, color='blue', alpha=0.6, label='训练数据')
plt.plot(X_test, y_pred, 'g-', linewidth=2, label='模型预测')
plt.title('刚刚好（合适）', fontsize=14, fontweight='bold')
plt.xlabel('X')
plt.ylabel('y')
plt.legend()
plt.grid(True, alpha=0.3)

# 3. 过拟合 - 十五次多项式
plt.subplot(133)
model_overfit = Pipeline([
    ('poly', PolynomialFeatures(degree=15)),
    ('linear', LinearRegression())
])
model_overfit.fit(X, y)
y_pred = model_overfit.predict(X_test)

plt.scatter(X, y, color='blue', alpha=0.6, label='训练数据')
plt.plot(X_test, y_pred, 'orange', linewidth=2, label='模型预测')
plt.title('过拟合（太复杂）', fontsize=14, fontweight='bold')
plt.xlabel('X')
plt.ylabel('y')
plt.legend()
plt.grid(True, alpha=0.3)
plt.ylim(-10, 50)

plt.tight_layout()
plt.show()

# 计算训练误差和测试误差
from sklearn.metrics import mean_squared_error

print("欠拟合模型:")
print(f"训练MSE: {mean_squared_error(y, model_underfit.predict(X)):.2f}")

print("\n刚刚好模型:")
print(f"训练MSE: {mean_squared_error(y, model_good.predict(X)):.2f}")

print("\n过拟合模型:")
print(f"训练MSE: {mean_squared_error(y, model_overfit.predict(X)):.2f}")
```

**输出分析**：

| 模型 | 训练误差 | 测试误差 | 诊断 |
|------|---------|---------|------|
| 欠拟合 | 高 | 高 | 模型太简单 |
| 刚刚好 | 中 | 中 | 平衡良好 |
| 过拟合 | 很低 | 很高 | 模型太复杂 |

---

## 🔍 如何诊断过拟合和欠拟合？

### 方法一：观察学习曲线

学习曲线展示了模型在不同训练样本数量下的性能：

```python
from sklearn.model_selection import learning_curve
import matplotlib.pyplot as plt

def plot_learning_curves(estimator, X, y, title):
    """
    绘制学习曲线
    """
    train_sizes, train_scores, val_scores = learning_curve(
        estimator, X, y, 
        train_sizes=np.linspace(0.1, 1.0, 10),
        cv=5, 
        scoring='neg_mean_squared_error',
        n_jobs=-1
    )
    
    # 计算均值和标准差
    train_mean = -train_scores.mean(axis=1)
    train_std = train_scores.std(axis=1)
    val_mean = -val_scores.mean(axis=1)
    val_std = val_scores.std(axis=1)
    
    # 绘图
    plt.figure(figsize=(10, 6))
    plt.plot(train_sizes, train_mean, 'o-', color='r', label='训练集误差')
    plt.plot(train_sizes, val_mean, 'o-', color='g', label='验证集误差')
    
    plt.fill_between(train_sizes, train_mean - train_std, 
                     train_mean + train_std, alpha=0.1, color='r')
    plt.fill_between(train_sizes, val_mean - val_std, 
                     val_mean + val_std, alpha=0.1, color='g')
    
    plt.xlabel('训练样本数量', fontsize=12)
    plt.ylabel('均方误差', fontsize=12)
    plt.title(title, fontsize=14, fontweight='bold')
    plt.legend(loc='best', fontsize=11)
    plt.grid(True, alpha=0.3)
    plt.show()

# 使用示例
from sklearn.tree import DecisionTreeRegressor

# 欠拟合模型（max_depth=1）
plot_learning_curves(
    DecisionTreeRegressor(max_depth=1, random_state=42),
    X, y, 
    '欠拟合模型的学习曲线'
)

# 刚刚好模型（max_depth=3）
plot_learning_curves(
    DecisionTreeRegressor(max_depth=3, random_state=42),
    X, y, 
    '良好拟合模型的学习曲线'
)

# 过拟合模型（max_depth=20）
plot_learning_curves(
    DecisionTreeRegressor(max_depth=20, random_state=42),
    X, y, 
    '过拟合模型的学习曲线'
)
```

**学习曲线分析**：

```
📈 欠拟合的学习曲线
┌─────────────────────────────┐
│ 训练误差 ─────── (高，平稳) │
│ 验证误差 ─────── (高，平稳) │
│ 两条线距离近，都在高位     │
└─────────────────────────────┘
特征：增加数据也无法改善

📊 良好拟合的学习曲线
┌─────────────────────────────┐
│ 训练误差 ─────── (低，上升) │
│ 验证误差 ─────── (中，下降) │
│ 两条线逐渐接近，收敛到合理值│
└─────────────────────────────┘
特征：训练和验证误差都较低

📉 过拟合的学习曲线
┌─────────────────────────────┐
│ 训练误差 ─────── (很低)     │
│ 验证误差 ─────── (高)       │
│ 两条线之间有很大的gap       │
└─────────────────────────────┘
特征：训练误差很低但验证误差高
```

---

### 方法二：交叉验证对比

```python
from sklearn.model_selection import cross_val_score

def evaluate_model(model, X, y, model_name):
    """
    使用交叉验证评估模型
    """
    # 训练集得分
    train_score = model.fit(X, y).score(X, y)
    
    # 交叉验证得分
    cv_scores = cross_val_score(model, X, y, cv=5, 
                                scoring='r2')
    cv_mean = cv_scores.mean()
    cv_std = cv_scores.std()
    
    print(f"\n{model_name}:")
    print(f"  训练集 R² 分数: {train_score:.4f}")
    print(f"  交叉验证 R² 分数: {cv_mean:.4f} (+/- {cv_std:.4f})")
    print(f"  过拟合程度: {train_score - cv_mean:.4f}")
    
    # 诊断
    if train_score - cv_mean > 0.1:
        print(f"  ⚠️  诊断: 过拟合")
    elif train_score < 0.7 and cv_mean < 0.7:
        print(f"  ⚠️  诊断: 欠拟合")
    else:
        print(f"  ✅ 诊断: 拟合良好")
    
    return train_score, cv_mean

# 测试不同复杂度的模型
from sklearn.tree import DecisionTreeRegressor

models = [
    (DecisionTreeRegressor(max_depth=1, random_state=42), "欠拟合模型"),
    (DecisionTreeRegressor(max_depth=5, random_state=42), "良好模型"),
    (DecisionTreeRegressor(max_depth=20, random_state=42), "过拟合模型")
]

for model, name in models:
    evaluate_model(model, X, y, name)
```

---

## 🛡️ 防止过拟合的方法

### 1. 增加训练数据

**原理**：更多数据 → 更难记住所有细节 → 被迫学习通用规律

```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.tree import DecisionTreeClassifier
from sklearn.datasets import make_moons
from sklearn.model_selection import train_test_split

# 生成数据
def compare_data_sizes():
    """
    对比不同数据量对过拟合的影响
    """
    fig, axes = plt.subplots(1, 3, figsize=(15, 4))
    data_sizes = [50, 200, 1000]
    
    for ax, n_samples in zip(axes, data_sizes):
        # 生成数据
        X, y = make_moons(n_samples=n_samples, noise=0.3, random_state=42)
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.3, random_state=42
        )
        
        # 训练模型
        model = DecisionTreeClassifier(max_depth=10, random_state=42)
        model.fit(X_train, y_train)
        
        # 评估
        train_score = model.score(X_train, y_train)
        test_score = model.score(X_test, y_test)
        
        # 绘制决策边界
        from matplotlib.colors import ListedColormap
        cmap_light = ListedColormap(['#FFAAAA', '#AAAAFF'])
        cmap_bold = ListedColormap(['#FF0000', '#0000FF'])
        
        h = 0.02
        x_min, x_max = X[:, 0].min() - 0.5, X[:, 0].max() + 0.5
        y_min, y_max = X[:, 1].min() - 0.5, X[:, 1].max() + 0.5
        xx, yy = np.meshgrid(np.arange(x_min, x_max, h),
                             np.arange(y_min, y_max, h))
        Z = model.predict(np.c_[xx.ravel(), yy.ravel()])
        Z = Z.reshape(xx.shape)
        
        ax.contourf(xx, yy, Z, cmap=cmap_light, alpha=0.4)
        ax.scatter(X_train[:, 0], X_train[:, 1], c=y_train, 
                  cmap=cmap_bold, edgecolor='k', s=20, alpha=0.6)
        ax.set_title(f'数据量: {n_samples}\n训练: {train_score:.2f}, 测试: {test_score:.2f}')
        ax.set_xlabel('特征 1')
        ax.set_ylabel('特征 2')
    
    plt.tight_layout()
    plt.show()

compare_data_sizes()
```

**建议**：
- ✅ 收集更多训练数据
- ✅ 数据增强（图像旋转、翻转等）
- ✅ 合成数据（SMOTE等技术）

---

### 2. 降低模型复杂度

**原理**：简单模型 → 不容易记住细节 → 只能学通用规律

```python
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import cross_val_score

# 对比不同复杂度的决策树
depths = range(1, 20)
train_scores = []
cv_scores = []

X, y = make_moons(n_samples=200, noise=0.3, random_state=42)

for depth in depths:
    model = DecisionTreeClassifier(max_depth=depth, random_state=42)
    
    # 训练分数
    model.fit(X, y)
    train_scores.append(model.score(X, y))
    
    # 交叉验证分数
    cv_score = cross_val_score(model, X, y, cv=5).mean()
    cv_scores.append(cv_score)

# 绘图
plt.figure(figsize=(10, 6))
plt.plot(depths, train_scores, 'o-', label='训练集准确率', color='blue')
plt.plot(depths, cv_scores, 'o-', label='交叉验证准确率', color='red')
plt.xlabel('树的深度（模型复杂度）', fontsize=12)
plt.ylabel('准确率', fontsize=12)
plt.title('模型复杂度 vs 性能', fontsize=14, fontweight='bold')
plt.legend(fontsize=11)
plt.grid(True, alpha=0.3)
plt.axvline(x=depths[np.argmax(cv_scores)], 
            color='green', linestyle='--', 
            label=f'最佳深度: {depths[np.argmax(cv_scores)]}')
plt.legend()
plt.show()

print(f"最佳树深度: {depths[np.argmax(cv_scores)]}")
print(f"最佳交叉验证分数: {max(cv_scores):.4f}")
```

**常用方法**：
- 🔹 减少特征数量
- 🔹 降低多项式阶数
- 🔹 限制决策树深度
- 🔹 减少神经网络层数/节点数

---

### 3. 正则化（Regularization）

**原理**：给模型复杂度加"罚款" → 迫使模型保持简单

#### L1正则化（Lasso）

```python
from sklearn.linear_model import Lasso, Ridge, LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import Pipeline
import numpy as np

# 生成数据
np.random.seed(42)
X = np.linspace(0, 10, 30).reshape(-1, 1)
y = 3*X.ravel() + 5 + np.random.randn(30) * 5

# 创建高阶特征（容易过拟合）
poly = PolynomialFeatures(degree=10)
X_poly = poly.fit_transform(X)

# 对比不同正则化
fig, axes = plt.subplots(1, 3, figsize=(15, 4))
X_test = np.linspace(0, 10, 100).reshape(-1, 1)
X_test_poly = poly.transform(X_test)

models = [
    ('无正则化', LinearRegression()),
    ('L1正则化 (Lasso)', Lasso(alpha=1.0)),
    ('L2正则化 (Ridge)', Ridge(alpha=1.0))
]

for ax, (name, model) in zip(axes, models):
    model.fit(X_poly, y)
    y_pred = model.predict(X_test_poly)
    
    ax.scatter(X, y, alpha=0.6, label='训练数据')
    ax.plot(X_test, y_pred, 'r-', linewidth=2, label='模型预测')
    ax.set_title(name, fontsize=13, fontweight='bold')
    ax.set_xlabel('X')
    ax.set_ylabel('y')
    ax.legend()
    ax.grid(True, alpha=0.3)
    ax.set_ylim(-10, 50)

plt.tight_layout()
plt.show()

# 打印系数
print("\n模型系数对比:")
for name, model in models:
    model.fit(X_poly, y)
    non_zero = np.sum(np.abs(model.coef_) > 0.01)
    print(f"{name}: {non_zero} 个非零系数")
```

**正则化类型**：

| 类型 | 公式 | 特点 | 适用场景 |
|------|------|------|----------|
| **L1 (Lasso)** | 损失 + α∑\|w\| | 产生稀疏解<br/>特征选择 | 特征很多，需要自动筛选 |
| **L2 (Ridge)** | 损失 + α∑w² | 权重衰减<br/>保留所有特征 | 特征相关性高 |
| **Elastic Net** | L1 + L2组合 | 结合两者优点 | 特征多且相关 |

---

### 4. 早停（Early Stopping）

**原理**：在验证集性能开始下降时停止训练

```python
from sklearn.neural_network import MLPRegressor
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt

# 生成数据
X, y = make_moons(n_samples=500, noise=0.3, random_state=42)
X_train, X_val, y_train, y_val = train_test_split(
    X, y, test_size=0.3, random_state=42
)

# 训练模型并记录历史
model = MLPRegressor(
    hidden_layer_sizes=(100, 50),
    max_iter=1000,
    early_stopping=True,
    validation_fraction=0.2,
    random_state=42,
    verbose=False
)

model.fit(X_train, y_train)

# 绘制训练曲线
plt.figure(figsize=(10, 6))
plt.plot(model.loss_curve_, label='训练损失', linewidth=2)
plt.xlabel('迭代次数', fontsize=12)
plt.ylabel('损失', fontsize=12)
plt.title('早停法示例', fontsize=14, fontweight='bold')
plt.axvline(x=model.n_iter_, color='red', linestyle='--', 
            label=f'早停点 (迭代{model.n_iter_}次)')
plt.legend(fontsize=11)
plt.grid(True, alpha=0.3)
plt.show()

print(f"早停在第 {model.n_iter_} 次迭代")
```

**早停策略**：

![早停策略流程图](/content/images/lesson-05-早停策略.png)

---

### 5. Dropout（神经网络专用）

**原理**：训练时随机"关闭"一些神经元 → 防止过度依赖某些特征

```python
from tensorflow import keras
from tensorflow.keras import layers

# 不使用Dropout
model_no_dropout = keras.Sequential([
    layers.Dense(128, activation='relu', input_shape=(10,)),
    layers.Dense(64, activation='relu'),
    layers.Dense(1)
])

# 使用Dropout
model_with_dropout = keras.Sequential([
    layers.Dense(128, activation='relu', input_shape=(10,)),
    layers.Dropout(0.5),  # 随机关闭50%的神经元
    layers.Dense(64, activation='relu'),
    layers.Dropout(0.3),  # 随机关闭30%的神经元
    layers.Dense(1)
])

print("模型结构:")
model_with_dropout.summary()
```

**Dropout比喻**：
```
想象一个团队项目：

❌ 没有Dropout:
   每次都是同样的人做同样的工作
   → 形成固定套路
   → 缺乏灵活性

✅ 有Dropout:
   每次随机有些人不参与
   → 其他人必须学会他们的工作
   → 整个团队更加灵活robust
```

---

### 6. 数据增强（Data Augmentation）

**原理**：通过变换增加训练数据的多样性

```python
# 图像数据增强示例
from tensorflow.keras.preprocessing.image import ImageDataGenerator

datagen = ImageDataGenerator(
    rotation_range=20,      # 随机旋转20度
    width_shift_range=0.2,  # 水平平移
    height_shift_range=0.2, # 垂直平移
    horizontal_flip=True,   # 水平翻转
    zoom_range=0.2,         # 随机缩放
    fill_mode='nearest'     # 填充模式
)

# 文本数据增强示例
def augment_text(text):
    """
    文本数据增强
    """
    augmented = []
    
    # 1. 同义词替换
    # 2. 随机插入
    # 3. 随机删除
    # 4. 随机交换
    
    return augmented

# 表格数据增强示例
def augment_tabular(X):
    """
    表格数据增强
    """
    # 1. 添加噪声
    noise = np.random.normal(0, 0.01, X.shape)
    X_augmented = X + noise
    
    # 2. SMOTE（针对不平衡数据）
    from imblearn.over_sampling import SMOTE
    smote = SMOTE(random_state=42)
    X_resampled, y_resampled = smote.fit_resample(X, y)
    
    return X_augmented
```

---

## 🎯 解决欠拟合的方法

### 1. 增加模型复杂度

```python
# 从简单到复杂
models = [
    ('线性回归', LinearRegression()),
    ('2阶多项式', Pipeline([
        ('poly', PolynomialFeatures(2)),
        ('linear', LinearRegression())
    ])),
    ('5阶多项式', Pipeline([
        ('poly', PolynomialFeatures(5)),
        ('linear', LinearRegression())
    ])),
    ('决策树', DecisionTreeRegressor(max_depth=5))
]

for name, model in models:
    model.fit(X_train, y_train)
    train_score = model.score(X_train, y_train)
    test_score = model.score(X_test, y_test)
    print(f"{name:15s}: 训练={train_score:.3f}, 测试={test_score:.3f}")
```

### 2. 增加特征

```python
from sklearn.preprocessing import PolynomialFeatures

# 原始特征
print(f"原始特征数: {X.shape[1]}")

# 添加多项式特征
poly = PolynomialFeatures(degree=2, include_bias=False)
X_poly = poly.fit_transform(X)
print(f"扩展后特征数: {X_poly.shape[1]}")

# 添加交互特征
from sklearn.preprocessing import PolynomialFeatures
poly_interaction = PolynomialFeatures(
    degree=2, 
    interaction_only=True,
    include_bias=False
)
X_interaction = poly_interaction.fit_transform(X)
print(f"交互特征数: {X_interaction.shape[1]}")
```

### 3. 减少正则化强度

```python
# 对比不同正则化强度
alphas = [100, 10, 1, 0.1, 0.01]

for alpha in alphas:
    model = Ridge(alpha=alpha)
    model.fit(X_train, y_train)
    train_score = model.score(X_train, y_train)
    test_score = model.score(X_test, y_test)
    print(f"Alpha={alpha:6.2f}: 训练={train_score:.3f}, 测试={test_score:.3f}")
```

### 4. 训练更长时间

```python
from sklearn.neural_network import MLPRegressor

# 短时间训练（可能欠拟合）
model_short = MLPRegressor(max_iter=10, random_state=42)
model_short.fit(X_train, y_train)

# 长时间训练
model_long = MLPRegressor(max_iter=1000, random_state=42)
model_long.fit(X_train, y_train)

print(f"短训练 - 训练分数: {model_short.score(X_train, y_train):.3f}")
print(f"长训练 - 训练分数: {model_long.score(X_train, y_train):.3f}")
```

---

## ⚖️ 偏差-方差权衡

### 核心概念

![偏差-方差权衡图](/content/images/lesson-05-偏差-方差权衡.png)

### 定义

**偏差（Bias）**：
- 模型预测的期望值与真实值的差距
- 高偏差 = 模型太简单 = 欠拟合
- 反映模型的拟合能力

**方差（Variance）**：
- 模型在不同训练集上预测的变化程度
- 高方差 = 模型太复杂 = 过拟合
- 反映模型的稳定性

**不可约误差（Irreducible Error）**：
- 数据本身的噪声
- 无法通过模型改进消除

### 数学表达

```
总误差 = 偏差² + 方差 + 不可约误差

E[(y - ŷ)²] = Bias[ŷ]² + Var[ŷ] + σ²
```

### 可视化理解

```
🎯 射击目标比喻：

低偏差，低方差（理想）        高偏差，低方差（欠拟合）
    ●●●                           ○ ○
     ●●                          ○   ○
    ●●●                           ○ ○
   （都在靶心）                  （偏离靶心但集中）

低偏差，高方差（过拟合）      高偏差，高方差（最差）
  ●     ●                        ○       ○
      ●                                ○
 ●       ●                       ○         ○
（接近靶心但分散）              （偏离且分散）
```

### 权衡策略

```python
def bias_variance_decomposition(model, X, y, n_iterations=100):
    """
    偏差-方差分解
    """
    from sklearn.model_selection import train_test_split
    
    predictions = []
    
    for i in range(n_iterations):
        # 随机采样
        X_sample, _, y_sample, _ = train_test_split(
            X, y, test_size=0.3, random_state=i
        )
        
        # 训练模型
        model.fit(X_sample, y_sample)
        
        # 预测
        y_pred = model.predict(X)
        predictions.append(y_pred)
    
    predictions = np.array(predictions)
    
    # 计算偏差和方差
    bias = np.mean((predictions.mean(axis=0) - y) ** 2)
    variance = np.mean(np.var(predictions, axis=0))
    
    print(f"偏差²: {bias:.4f}")
    print(f"方差:  {variance:.4f}")
    print(f"总和:  {bias + variance:.4f}")
    
    return bias, variance

# 测试不同复杂度的模型
from sklearn.tree import DecisionTreeRegressor

print("简单模型（欠拟合）:")
bias_variance_decomposition(
    DecisionTreeRegressor(max_depth=1, random_state=42),
    X, y
)

print("\n适中模型:")
bias_variance_decomposition(
    DecisionTreeRegressor(max_depth=5, random_state=42),
    X, y
)

print("\n复杂模型（过拟合）:")
bias_variance_decomposition(
    DecisionTreeRegressor(max_depth=20, random_state=42),
    X, y
)
```

---

## 📋 实战决策流程

![实战决策流程图](/content/images/lesson-05-实战决策流程.png)

---

## 🎓 实战案例：房价预测

```python
from sklearn.datasets import fetch_california_housing
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Ridge
from sklearn.ensemble import RandomForestRegressor
import numpy as np

# 1. 加载数据
housing = fetch_california_housing()
X, y = housing.data, housing.target

# 2. 划分数据
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 3. 标准化
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 4. 测试不同模型
models = {
    '线性回归（可能欠拟合）': Ridge(alpha=100),
    'Ridge回归（平衡）': Ridge(alpha=1.0),
    '随机森林（可能过拟合）': RandomForestRegressor(
        n_estimators=100, 
        max_depth=None,  # 无限制
        random_state=42
    ),
    '随机森林（正则化）': RandomForestRegressor(
        n_estimators=100, 
        max_depth=10,  # 限制深度
        min_samples_split=20,  # 最小分裂样本数
        random_state=42
    )
}

print("模型性能对比:\n")
print(f"{'模型':<25s} {'训练R²':<12s} {'测试R²':<12s} {'过拟合程度':<12s}")
print("-" * 60)

for name, model in models.items():
    # 训练
    model.fit(X_train_scaled, y_train)
    
    # 评估
    train_score = model.score(X_train_scaled, y_train)
    test_score = model.score(X_test_scaled, y_test)
    overfit = train_score - test_score
    
    # 输出
    status = "✅" if overfit < 0.05 else "⚠️"
    print(f"{name:<25s} {train_score:<12.4f} {test_score:<12.4f} {overfit:<12.4f} {status}")

# 5. 使用交叉验证找最佳参数
print("\n\n正在搜索最佳参数...")

from sklearn.model_selection import GridSearchCV

param_grid = {
    'max_depth': [5, 10, 15, 20],
    'min_samples_split': [2, 10, 20],
    'min_samples_leaf': [1, 5, 10]
}

grid_search = GridSearchCV(
    RandomForestRegressor(n_estimators=100, random_state=42),
    param_grid,
    cv=5,
    scoring='r2',
    n_jobs=-1
)

grid_search.fit(X_train_scaled, y_train)

print(f"\n最佳参数: {grid_search.best_params_}")
print(f"最佳交叉验证分数: {grid_search.best_score_:.4f}")

# 最终模型评估
best_model = grid_search.best_estimator_
train_score = best_model.score(X_train_scaled, y_train)
test_score = best_model.score(X_test_scaled, y_test)

print(f"\n最终模型性能:")
print(f"训练集 R²: {train_score:.4f}")
print(f"测试集 R²: {test_score:.4f}")
print(f"过拟合程度: {train_score - test_score:.4f}")

if train_score - test_score < 0.03:
    print("✅ 模型拟合良好！")
elif train_score - test_score > 0.1:
    print("⚠️ 模型存在过拟合")
else:
    print("⚡ 模型可以接受，但还有改进空间")
```

---

## 🎯 学习要点总结

### 核心概念对比

| 维度 | 欠拟合 | 刚刚好 | 过拟合 |
|------|--------|--------|--------|
| **训练集表现** | 差 | 好 | 很好 |
| **测试集表现** | 差 | 好 | 差 |
| **模型复杂度** | 太低 | 适中 | 太高 |
| **偏差** | 高 | 中 | 低 |
| **方差** | 低 | 中 | 高 |
| **泛化能力** | 差 | 好 | 差 |

### 诊断方法

```
✅ 如何诊断？

1. 学习曲线
   - 观察训练和验证误差的gap
   
2. 交叉验证
   - 对比训练分数和CV分数
   
3. 可视化
   - 绘制模型预测曲线
   
4. 指标对比
   - 训练集 vs 测试集性能
```

### 解决方案速查

```
🔧 解决欠拟合：
✓ 增加模型复杂度
✓ 增加特征
✓ 减少正则化
✓ 训练更长时间

🔧 解决过拟合：
✓ 增加训练数据
✓ 降低模型复杂度
✓ 正则化（L1/L2）
✓ Dropout
✓ 早停
✓ 数据增强
✓ 集成方法
```

---

## 💡 最佳实践建议

### 1. 从简单开始

```python
# ✅ 推荐流程
# 第一步：简单模型（基线）
baseline = LinearRegression()

# 第二步：适度复杂模型
moderate = RandomForestRegressor(max_depth=5)

# 第三步：复杂模型（如需要）
complex = RandomForestRegressor(max_depth=None)

# 对比性能，选择最佳
```

### 2. 使用交叉验证

```python
from sklearn.model_selection import cross_val_score

# ✅ 总是使用交叉验证
scores = cross_val_score(model, X, y, cv=5)
print(f"CV均值: {scores.mean():.3f} (+/- {scores.std():.3f})")
```

### 3. 监控训练过程

```python
from sklearn.model_selection import learning_curve

# ✅ 绘制学习曲线
train_sizes, train_scores, val_scores = learning_curve(
    model, X, y, cv=5, n_jobs=-1,
    train_sizes=np.linspace(0.1, 1.0, 10)
)
# 绘图观察...
```

### 4. 保存最佳模型

```python
import joblib

# ✅ 保存模型
joblib.dump(best_model, 'best_model.pkl')

# 加载模型
loaded_model = joblib.load('best_model.pkl')
```

---

## 📚 延伸阅读

### 推荐资源

**理论基础**：
- 《统计学习方法》- 李航
- 《机器学习》- 周志华（西瓜书）
- "Understanding the Bias-Variance Tradeoff" - Scott Fortmann-Roe

**实践技巧**：
- Scikit-learn: Model Evaluation
- Kaggle: Overfitting and How to Prevent It
- Andrew Ng: Machine Learning Course (Coursera)

**高级话题**：
- 正则化理论
- 集成学习
- 深度学习中的正则化技术

### 深入话题

1. **正则化进阶**
   - Elastic Net
   - Group Lasso
   - Dropout变种

2. **模型选择**
   - AIC/BIC准则
   - MDL原理
   - 结构风险最小化

3. **集成方法**
   - Bagging (减少方差)
   - Boosting (减少偏差)
   - Stacking

---

## ✅ 下节预告

**第6课：模型评估指标（分类）**

下一课我们将学习：
- 准确率、精确率、召回率
- F1分数和混淆矩阵
- ROC曲线和AUC
- 如何选择合适的评估指标

**预习任务**：
- 思考：准确率为什么不够用？
- 了解：什么是混淆矩阵？
- 准备：一个分类问题案例

---

**恭喜你完成第5课！** 🎉

现在你已经掌握了过拟合和欠拟合的核心知识。记住：
- 🎯 **从简单模型开始**
- 📊 **监控训练和验证性能**
- ⚖️ **平衡偏差和方差**
- 🔧 **选择合适的正则化方法**

继续加油！下一课见！💪

