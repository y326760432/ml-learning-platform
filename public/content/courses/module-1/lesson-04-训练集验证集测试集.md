# 第4课：训练集、验证集、测试集

## 📖 课程目标

学完本课，你将能够：
- ✅ 理解为什么要划分数据集
- ✅ 掌握数据集划分的方法和比例
- ✅ 了解交叉验证的基本概念
- ✅ 避免数据泄露问题

**预计学习时间**：40-45分钟  
**难度等级**：⭐⭐ 进阶

---

## 🎯 为什么要划分数据集？

### 一个常见的错误

假设你是一名学生，考试前老师给了你100道练习题。你努力学习，最终能**100%正确**回答这100道题。

考试当天，试卷上的题目竟然**就是这100道练习题**！你轻松拿到满分。

**但是，你真的掌握了知识吗？** 🤔

### 问题的本质

这就是机器学习中的**过拟合（Overfitting）**问题：

```
📚 练习题（训练数据） → 100% 正确 ✅
📝 新题目（测试数据） → 不会做 ❌
```

**关键问题**：模型在训练数据上表现很好，但在**新数据**上表现很差！

### 机器学习的真正目标

> 机器学习的目标不是记住训练数据，而是**泛化（Generalization）**到新数据！

![训练过程](/content/images/lesson-04-训练过程.png)

因此，我们需要：
1. **训练集（Training Set）**：用来训练模型
2. **验证集（Validation Set）**：用来调整模型
3. **测试集（Test Set）**：用来评估最终性能

---

## 📊 三种数据集的作用

### 数据集划分示意图

![数据集划分示意图](/content/images/lesson-04-数据集划分示意图.png)

### 1️⃣ 训练集（Training Set）

**作用**：训练模型，学习数据中的模式。

**比喻**：学生的练习题集。

**用途**：
- 调整模型的参数（权重）
- 让模型学习特征和目标之间的关系
- 占据最大比例的数据

**示例**：
```python
# 模型在训练集上学习
model.fit(X_train, y_train)
```

### 2️⃣ 验证集（Validation Set）

**作用**：调整超参数，选择最佳模型。

**比喻**：模拟考试，帮助你发现学习中的问题并调整学习策略。

**用途**：
- 选择模型（随机森林 vs SVM）
- 调整超参数（学习率、树的深度）
- 防止过拟合
- **不用于训练模型参数**

**示例**：
```python
# 在验证集上评估不同的模型
for model in [model1, model2, model3]:
    score = model.score(X_val, y_val)
    print(f"Validation Score: {score}")

# 选择验证集上表现最好的模型
best_model = model_with_highest_score
```

### 3️⃣ 测试集（Test Set）

**作用**：评估模型的最终性能。

**比喻**：正式考试，检验真实水平。

**用途**：
- 评估模型的泛化能力
- 获得模型在真实世界的性能估计
- **只使用一次，在模型完全确定后**

**示例**：
```python
# 最后在测试集上评估
final_score = best_model.score(X_test, y_test)
print(f"Final Test Score: {final_score}")
```

### 🚫 常见错误

| ❌ 错误做法 | ✅ 正确做法 |
|-----------|-----------|
| 在测试集上调参 | 在验证集上调参 |
| 多次使用测试集 | 测试集只用一次 |
| 没有验证集 | 使用验证集选择模型 |
| 用训练集评估 | 用独立数据集评估 |

---

## 🔢 数据集划分方法

### 方法1：简单随机划分（Hold-Out）

**最常用的划分方法**，随机将数据分成训练集和测试集。

#### 基本划分（训练集 + 测试集）

```python
from sklearn.model_selection import train_test_split

# 80% 训练，20% 测试
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,      # 测试集比例
    random_state=42     # 随机种子，保证可复现
)

print(f"训练集: {X_train.shape}")
print(f"测试集: {X_test.shape}")
```

#### 三分划分（训练集 + 验证集 + 测试集）

```python
# 方法1：两次划分
# 第一步：划分出测试集（20%）
X_temp, X_test, y_temp, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 第二步：从剩余数据中划分训练集和验证集
# 验证集占总数据的20%，即占temp的25%
X_train, X_val, y_train, y_val = train_test_split(
    X_temp, y_temp, test_size=0.25, random_state=42
)

print(f"训练集: {X_train.shape[0]} ({X_train.shape[0]/len(X)*100:.1f}%)")
print(f"验证集: {X_val.shape[0]} ({X_val.shape[0]/len(X)*100:.1f}%)")
print(f"测试集: {X_test.shape[0]} ({X_test.shape[0]/len(X)*100:.1f}%)")

# 输出示例:
# 训练集: 600 (60.0%)
# 验证集: 200 (20.0%)
# 测试集: 200 (20.0%)
```

### 方法2：分层采样（Stratified Split）

**适用场景**：类别不平衡的分类问题。

**目的**：保持各数据集中类别的比例与原始数据一致。

```python
# 假设原始数据中：70%类别A，30%类别B

# 分层采样确保训练集、验证集、测试集都保持70:30的比例
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42,
    stratify=y  # 关键参数：按照y的分布分层采样
)

# 验证类别分布
print("原始数据类别分布:")
print(y.value_counts(normalize=True))

print("\n训练集类别分布:")
print(y_train.value_counts(normalize=True))

print("\n测试集类别分布:")
print(y_test.value_counts(normalize=True))
```

**为什么需要分层采样？**

```
原始数据: [A: 70%, B: 30%]

❌ 随机采样（可能出现）:
   训练集 [A: 85%, B: 15%] ← 比例失衡
   测试集 [A: 40%, B: 60%] ← 比例失衡

✅ 分层采样:
   训练集 [A: 70%, B: 30%] ← 比例保持
   测试集 [A: 70%, B: 30%] ← 比例保持
```

### 方法3：时间序列划分

**适用场景**：时间序列数据（股票、天气、销售预测）。

**原则**：用过去的数据预测未来，**不能随机打乱**！

```python
# ❌ 错误：随机划分时间序列数据
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# ✅ 正确：按时间顺序划分
split_point = int(len(X) * 0.8)

X_train = X[:split_point]      # 前80%（过去）
X_test = X[split_point:]       # 后20%（未来）

y_train = y[:split_point]
y_test = y[split_point:]
```

**时间序列划分示意图**：

```
时间线: ━━━━━━━━━━━━━━━━━━━━━━━━━━━→
数据:   ████████████████░░░░░░░░
        训练集(过去)    测试集(未来)
        ←用来学习    ←用来预测
```

### 📊 推荐的划分比例

| 数据集大小 | 训练集 | 验证集 | 测试集 | 说明 |
|----------|-------|-------|-------|------|
| < 1,000 | 60% | 20% | 20% | 小数据集 |
| 1,000 - 10,000 | 70% | 15% | 15% | 中等数据集 |
| 10,000 - 100,000 | 80% | 10% | 10% | 大数据集 |
| > 1,000,000 | 98% | 1% | 1% | 超大数据集 |

**原则**：
- 数据越多，测试集和验证集的**绝对数量**更重要
- 小数据集需要更多测试数据来获得可靠的评估
- 大数据集即使1%也有足够的样本

---

## 🔄 交叉验证（Cross-Validation）

### 什么是交叉验证？

**问题**：数据集太小，划分后训练集和测试集都不够怎么办？

**解决方案**：交叉验证 - 让每份数据都有机会作为测试集！

### K折交叉验证（K-Fold CV）

**原理**：将数据分成K份，轮流使用其中1份作为验证集，其余K-1份作为训练集。

![交叉验证](/content/images/lesson-04-交叉验证.png)

#### 代码实现

```python
from sklearn.model_selection import cross_val_score
from sklearn.ensemble import RandomForestClassifier

# 创建模型
model = RandomForestClassifier(n_estimators=100, random_state=42)

# 5折交叉验证
cv_scores = cross_val_score(
    model,
    X, y,
    cv=5,              # 5折
    scoring='accuracy' # 评估指标
)

print("每折的准确率:")
for i, score in enumerate(cv_scores, 1):
    print(f"  Fold {i}: {score:.4f}")

print(f"\n平均准确率: {cv_scores.mean():.4f}")
print(f"标准差: {cv_scores.std():.4f}")

# 输出示例:
# 每折的准确率:
#   Fold 1: 0.8500
#   Fold 2: 0.8700
#   Fold 3: 0.8400
#   Fold 4: 0.8600
#   Fold 5: 0.8550
#
# 平均准确率: 0.8550
# 标准差: 0.0112
```

### 分层K折交叉验证（Stratified K-Fold）

**适用于**：类别不平衡的分类问题。

```python
from sklearn.model_selection import StratifiedKFold, cross_val_score

# 创建分层K折划分器
skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

# 进行交叉验证
cv_scores = cross_val_score(model, X, y, cv=skf, scoring='accuracy')

print(f"分层交叉验证平均准确率: {cv_scores.mean():.4f}")
```

### 留一交叉验证（Leave-One-Out CV, LOOCV）

**极端情况**：K = 样本数量，每次只留一个样本作为验证集。

```python
from sklearn.model_selection import LeaveOneOut

loo = LeaveOneOut()
cv_scores = cross_val_score(model, X, y, cv=loo)

print(f"LOOCV平均准确率: {cv_scores.mean():.4f}")
```

**优点**：
- 充分利用数据
- 评估结果最接近真实性能

**缺点**：
- 计算成本极高（需要训练N次模型）
- 只适用于小数据集

### 时间序列交叉验证（Time Series CV）

**适用于**：时间序列数据。

```python
from sklearn.model_selection import TimeSeriesSplit

tscv = TimeSeriesSplit(n_splits=5)

for train_index, test_index in tscv.split(X):
    X_train, X_test = X[train_index], X[test_index]
    y_train, y_test = y[train_index], y[test_index]
    
    # 训练和评估
    model.fit(X_train, y_train)
    score = model.score(X_test, y_test)
    print(f"Score: {score:.4f}")
```

**时间序列CV示意图**：

```
Fold 1: [训练] [测试]
Fold 2: [训练---] [测试]
Fold 3: [训练------] [测试]
Fold 4: [训练---------] [测试]
Fold 5: [训练------------] [测试]
```

### 交叉验证 vs Hold-Out

| 特性 | Hold-Out | K-Fold CV |
|------|----------|-----------|
| **计算成本** | 低（1次训练） | 高（K次训练） |
| **数据利用** | 部分数据不用于训练 | 所有数据都用于训练 |
| **评估可靠性** | 依赖划分方式 | 更可靠（K次平均） |
| **适用场景** | 大数据集 | 小到中等数据集 |
| **推荐** | 数据 > 100k | 数据 < 100k |

---

## 🚨 数据泄露（Data Leakage）

### 什么是数据泄露？

**定义**：训练过程中使用了测试集的信息，导致模型性能被高估。

> 数据泄露是机器学习中**最严重的错误**之一！

### 常见的数据泄露场景

#### 场景1：在划分前进行特征缩放

```python
# ❌ 错误：先缩放，后划分
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)  # 使用了全部数据的均值/方差

# 划分数据
X_train, X_test = train_test_split(X_scaled, test_size=0.2)

# 问题：训练集的缩放使用了测试集的信息！
```

```python
# ✅ 正确：先划分，后缩放
# 1. 先划分
X_train, X_test = train_test_split(X, test_size=0.2)

# 2. 只在训练集上fit
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)  # 只用训练集

# 3. 在测试集上只transform
X_test_scaled = scaler.transform(X_test)  # 用训练集的参数
```

#### 场景2：在划分前填充缺失值

```python
# ❌ 错误：先填充，后划分
data['age'].fillna(data['age'].mean(), inplace=True)  # 使用了全部数据的均值
X_train, X_test = train_test_split(data)

# ✅ 正确：先划分，后填充
X_train, X_test = train_test_split(data)
mean_age = X_train['age'].mean()  # 只用训练集的均值
X_train['age'].fillna(mean_age, inplace=True)
X_test['age'].fillna(mean_age, inplace=True)  # 用训练集的均值
```

#### 场景3：使用未来信息

**时间序列问题**：用未来的数据预测过去。

```python
# ❌ 错误：创建特征时使用了未来信息
data['price_next_day'] = data['price'].shift(-1)  # 未来价格
data['will_rise'] = (data['price_next_day'] > data['price']).astype(int)

# 问题：训练时就知道了未来的信息！
```

#### 场景4：重复样本

```python
# ❌ 错误：训练集和测试集有重复数据
# 数据集中有重复行
data = pd.concat([original_data, original_data])  # 重复了

X_train, X_test = train_test_split(data, test_size=0.2)
# 测试集中可能包含训练集的数据！

# ✅ 正确：先去重
data = data.drop_duplicates()
X_train, X_test = train_test_split(data, test_size=0.2)
```

#### 场景5：使用目标变量信息

```python
# ❌ 错误：特征工程时使用了目标变量
# 用目标变量的均值编码类别特征（在划分前）
category_means = data.groupby('city')['price'].mean()
data['city_encoded'] = data['city'].map(category_means)

# 问题：编码时使用了测试集的目标变量！

# ✅ 正确：只在训练集上计算
X_train, X_test, y_train, y_test = train_test_split(X, y)
category_means = X_train.groupby('city')['price'].mean()
X_train['city_encoded'] = X_train['city'].map(category_means)
X_test['city_encoded'] = X_test['city'].map(category_means)
```

### 如何避免数据泄露？

#### ✅ 最佳实践

1. **先划分，再预处理**
   ```python
   # 顺序很重要！
   X_train, X_test = train_test_split(X, y)  # 1. 划分
   X_train = preprocess(X_train)              # 2. 预处理
   X_test = preprocess(X_test)                # 3. 用训练集的参数
   ```

2. **使用Pipeline**
   ```python
   from sklearn.pipeline import Pipeline
   from sklearn.preprocessing import StandardScaler
   from sklearn.ensemble import RandomForestClassifier

   # Pipeline自动处理数据流
   pipeline = Pipeline([
       ('scaler', StandardScaler()),    # 先缩放
       ('model', RandomForestClassifier())  # 后训练
   ])

   # 划分数据
   X_train, X_test, y_train, y_test = train_test_split(X, y)

   # 训练（只在训练集上fit scaler）
   pipeline.fit(X_train, y_train)

   # 预测（自动用训练集的scaler参数）
   y_pred = pipeline.predict(X_test)
   ```

3. **时间序列数据注意时间顺序**
   - 不要随机打乱
   - 不要用未来信息创建特征
   - 使用时间序列交叉验证

4. **交叉验证中也要注意**
   ```python
   from sklearn.model_selection import cross_val_score
   from sklearn.pipeline import Pipeline

   # ✅ 正确：在Pipeline内进行预处理
   pipeline = Pipeline([
       ('scaler', StandardScaler()),
       ('model', model)
   ])

   # 交叉验证会在每个fold内重新fit scaler
   scores = cross_val_score(pipeline, X, y, cv=5)
   ```

### 检测数据泄露的方法

1. **性能太好就要怀疑**
   - 准确率 > 99%？可能有问题
   - 测试集比训练集更好？肯定有问题

2. **查看特征重要性**
   - 不应该出现的特征重要性很高

3. **逻辑检查**
   - 特征是否应该在预测时可用？
   - 是否使用了未来信息？

---

## 💡 完整实践示例

### 示例：房价预测

```python
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_squared_error, r2_score

# ========== 1. 加载数据 ==========
data = pd.read_csv('housing_data.csv')
X = data.drop('price', axis=1)
y = data['price']

print(f"数据集大小: {len(data)}")

# ========== 2. 划分数据集（60% / 20% / 20%） ==========
# 第一步：划分出测试集
X_temp, X_test, y_temp, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 第二步：划分训练集和验证集
X_train, X_val, y_train, y_val = train_test_split(
    X_temp, y_temp, test_size=0.25, random_state=42
)

print(f"\n数据集划分:")
print(f"训练集: {len(X_train)} ({len(X_train)/len(X)*100:.1f}%)")
print(f"验证集: {len(X_val)} ({len(X_val)/len(X)*100:.1f}%)")
print(f"测试集: {len(X_test)} ({len(X_test)/len(X)*100:.1f}%)")

# ========== 3. 创建Pipeline（避免数据泄露） ==========
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('model', RandomForestRegressor(random_state=42))
])

# ========== 4. 在训练集上训练 ==========
print("\n开始训练...")
pipeline.fit(X_train, y_train)

# ========== 5. 在验证集上调参 ==========
print("\n在验证集上评估不同的超参数...")

best_score = 0
best_params = None

for n_estimators in [50, 100, 200]:
    for max_depth in [5, 10, None]:
        # 创建模型
        model = Pipeline([
            ('scaler', StandardScaler()),
            ('model', RandomForestRegressor(
                n_estimators=n_estimators,
                max_depth=max_depth,
                random_state=42
            ))
        ])
        
        # 训练
        model.fit(X_train, y_train)
        
        # 在验证集上评估
        val_score = model.score(X_val, y_val)
        
        print(f"  n_estimators={n_estimators}, max_depth={max_depth}: R²={val_score:.4f}")
        
        # 记录最佳参数
        if val_score > best_score:
            best_score = val_score
            best_params = {'n_estimators': n_estimators, 'max_depth': max_depth}
            best_model = model

print(f"\n最佳参数: {best_params}")
print(f"验证集最佳R²: {best_score:.4f}")

# ========== 6. 使用最佳模型在测试集上最终评估 ==========
print("\n在测试集上最终评估...")
test_score = best_model.score(X_test, y_test)
y_pred = best_model.predict(X_test)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))

print(f"测试集R²: {test_score:.4f}")
print(f"测试集RMSE: ${rmse:,.2f}")

# ========== 7. 交叉验证（可选，用于更可靠的评估） ==========
print("\n5折交叉验证...")
cv_scores = cross_val_score(
    best_model, 
    X_temp, y_temp,  # 使用训练集+验证集
    cv=5,
    scoring='r2'
)

print(f"交叉验证R²: {cv_scores.mean():.4f} (+/- {cv_scores.std():.4f})")

# ========== 8. 特征重要性分析 ==========
# 获取模型（Pipeline中的最后一步）
rf_model = best_model.named_steps['model']

# 特征重要性
feature_importance = pd.DataFrame({
    'feature': X.columns,
    'importance': rf_model.feature_importances_
}).sort_values('importance', ascending=False)

print("\n前5个重要特征:")
print(feature_importance.head())
```

---

## 📝 课后练习

### 选择题

#### 1. 为什么需要划分数据集？

```quiz-json
{
  "question": "为什么需要划分训练集、验证集和测试集？",
  "type": "single",
  "options": [
    {
      "id": "a",
      "text": "为了加快训练速度",
      "isCorrect": false
    },
    {
      "id": "b",
      "text": "为了评估模型的泛化能力，避免过拟合",
      "isCorrect": true
    },
    {
      "id": "c",
      "text": "为了增加数据量",
      "isCorrect": false
    },
    {
      "id": "d",
      "text": "为了简化模型",
      "isCorrect": false
    }
  ],
  "explanation": "划分数据集的主要目的是评估模型在未见过的数据上的表现（泛化能力）。如果用训练数据评估，模型可能只是记住了训练数据（过拟合），而在新数据上表现很差。"
}
```

#### 2. 验证集的主要作用是什么？

```quiz-json
{
  "question": "验证集（Validation Set）的主要作用是？",
  "type": "single",
  "options": [
    {
      "id": "a",
      "text": "训练模型参数",
      "isCorrect": false
    },
    {
      "id": "b",
      "text": "评估模型最终性能",
      "isCorrect": false
    },
    {
      "id": "c",
      "text": "选择模型和调整超参数",
      "isCorrect": true
    },
    {
      "id": "d",
      "text": "增加训练数据",
      "isCorrect": false
    }
  ],
  "explanation": "验证集用于在训练过程中选择最佳模型和调整超参数，不参与模型参数的训练。测试集才用于最终评估，且只能使用一次。"
}
```

#### 3. 以下哪种情况会导致数据泄露？

```quiz-json
{
  "question": "以下哪种做法会导致数据泄露（Data Leakage）？",
  "type": "multiple",
  "options": [
    {
      "id": "a",
      "text": "在划分数据集之前进行特征缩放",
      "isCorrect": true
    },
    {
      "id": "b",
      "text": "在训练集上fit scaler，在测试集上transform",
      "isCorrect": false
    },
    {
      "id": "c",
      "text": "使用全部数据的均值填充训练集的缺失值",
      "isCorrect": true
    },
    {
      "id": "d",
      "text": "使用Pipeline进行预处理和训练",
      "isCorrect": false
    }
  ],
  "explanation": "数据泄露发生在训练过程使用了测试集信息时。在划分前进行缩放或填充会使用测试集的统计信息（如均值、方差），导致泄露。正确做法是先划分，再只在训练集上计算统计量，然后应用到测试集。"
}
```

#### 4. K折交叉验证的优点是什么？

```quiz-json
{
  "question": "K折交叉验证（K-Fold Cross-Validation）相比简单划分的优点是？",
  "type": "multiple",
  "options": [
    {
      "id": "a",
      "text": "更充分地利用数据",
      "isCorrect": true
    },
    {
      "id": "b",
      "text": "训练速度更快",
      "isCorrect": false
    },
    {
      "id": "c",
      "text": "评估结果更可靠（减少随机性）",
      "isCorrect": true
    },
    {
      "id": "d",
      "text": "适合所有类型的数据",
      "isCorrect": false
    }
  ],
  "explanation": "K折交叉验证的优点是每份数据都有机会作为验证集，充分利用了数据，且通过K次评估的平均值，结果更加稳定可靠。缺点是需要训练K次模型，计算成本高。注意：时间序列数据不能用标准的K折交叉验证。"
}
```

#### 5. 推荐的数据集划分比例是？

```quiz-json
{
  "question": "对于一个包含10,000个样本的数据集，推荐的训练/验证/测试集划分比例是？",
  "type": "single",
  "options": [
    {
      "id": "a",
      "text": "50% / 25% / 25%",
      "isCorrect": false
    },
    {
      "id": "b",
      "text": "60% / 20% / 20%",
      "isCorrect": false
    },
    {
      "id": "c",
      "text": "70% / 15% / 15%",
      "isCorrect": true
    },
    {
      "id": "d",
      "text": "90% / 5% / 5%",
      "isCorrect": false
    }
  ],
  "explanation": "对于中等规模数据集（1,000-10,000样本），推荐70%/15%/15%的划分比例。这样既保证有足够的训练数据，又有足够的验证和测试数据来可靠评估模型。数据量越大，可以分配给训练集的比例越高。"
}
```

#### 6. 时间序列数据应该如何划分？

```quiz-json
{
  "question": "对于时间序列数据（如股票价格预测），应该如何划分数据集？",
  "type": "single",
  "options": [
    {
      "id": "a",
      "text": "随机划分训练集和测试集",
      "isCorrect": false
    },
    {
      "id": "b",
      "text": "使用K折交叉验证",
      "isCorrect": false
    },
    {
      "id": "c",
      "text": "按时间顺序划分，训练集在前，测试集在后",
      "isCorrect": true
    },
    {
      "id": "d",
      "text": "测试集在前，训练集在后",
      "isCorrect": false
    }
  ],
  "explanation": "时间序列数据必须按时间顺序划分，用过去的数据（训练集）预测未来（测试集）。随机划分会导致用未来预测过去，这是严重的数据泄露。应使用TimeSeriesSplit进行交叉验证。"
}
```

### 实践题

#### 7. 正确划分数据集

给定数据集 `housing_data.csv`，完成以下任务：

1. 将数据划分为训练集（60%）、验证集（20%）、测试集（20%）
2. 使用分层采样（如果是分类问题）
3. 打印各数据集的大小和比例
4. 验证类别分布是否平衡

#### 8. 避免数据泄露

以下代码存在数据泄露问题，请找出并修正：

```python
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

# 缩放数据
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# 划分数据
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2
)

# 训练模型
model.fit(X_train, y_train)
score = model.score(X_test, y_test)
```

#### 9. 实现交叉验证

使用5折交叉验证评估以下三个模型，选择最佳模型：
- 逻辑回归
- 决策树
- 随机森林

比较它们的平均准确率和标准差。

---

## 🎯 学习要点总结

### 核心概念

```
📚 三种数据集的作用

🟢 训练集 (Training Set)
   └─ 训练模型参数
   └─ 学习数据模式
   └─ 占比: 60-80%

🟡 验证集 (Validation Set)
   └─ 选择模型
   └─ 调整超参数
   └─ 占比: 10-20%

🔵 测试集 (Test Set)
   └─ 最终评估
   └─ 只用一次
   └─ 占比: 10-20%
```

### 关键要点

1. **为什么划分数据集？**
   - 评估泛化能力
   - 避免过拟合
   - 获得可靠的性能估计

2. **划分原则**
   - 先划分，再预处理
   - 保持类别分布平衡（分层采样）
   - 时间序列按时间顺序划分

3. **交叉验证**
   - 充分利用数据
   - 评估更可靠
   - 适合小数据集

4. **避免数据泄露**
   - 预处理在划分后
   - 使用Pipeline
   - 不用测试集信息
   - 检查特征合理性

5. **推荐比例**
   - 小数据集: 60/20/20
   - 中数据集: 70/15/15
   - 大数据集: 80/10/10

### 决策流程图

![决策流程图](/content/images/lesson-04-决策流程图.png)

---

## 📚 延伸阅读

### 推荐资源

**文章**：
- 《过拟合与欠拟合详解》
- 《交叉验证完全指南》
- 《数据泄露的常见陷阱》

**工具文档**：
- Scikit-learn: `train_test_split`
- Scikit-learn: `cross_val_score`
- Scikit-learn: `Pipeline`

**实践项目**：
- Kaggle竞赛中的数据划分策略
- 时间序列预测实战

### 深入话题

1. **高级交叉验证**
   - 嵌套交叉验证（Nested CV）
   - 时间序列前向链式CV
   - 分组交叉验证（Group K-Fold）

2. **数据增强**
   - SMOTE（处理类别不平衡）
   - 数据增强技术
   - 半监督学习

3. **模型评估**
   - 混淆矩阵
   - ROC曲线
   - 学习曲线
   - 验证曲线

---

## ✅ 下节预告

**第5课：过拟合与欠拟合**

下一课我们将详细学习：
- 什么是过拟合和欠拟合
- 如何诊断模型问题
- 正则化技术
- 偏差-方差权衡

**预习任务**：
- 思考：模型在训练集上表现很好，但测试集上很差，为什么？
- 了解：什么是模型复杂度？
- 准备：回顾本课的数据集划分方法

---

**恭喜你完成第4课！** 🎉

现在你已经掌握了数据集划分的核心知识。记住：**先划分，再预处理**，避免数据泄露！💪

下一课我们将深入探讨如何识别和解决过拟合问题，敬请期待！

