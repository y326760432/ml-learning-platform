# 📖 Cloudflare Pages 部署指南

## 🎯 快速部署

### 方法一：使用部署脚本（推荐）

```bash
# 双击运行
deploy-cloudflare.bat
```

### 方法二：手动部署

```bash
# 1. 安装依赖
npm install

# 2. 构建项目
npm run build

# 3. 部署到 Cloudflare Pages
npx wrangler pages deploy out --project-name=ml-learning-platform
```

## 🌐 通过 Cloudflare Dashboard 部署

### 1. 推送代码到 Git 仓库
确保您的代码已推送到 GitHub、GitLab 或 Bitbucket。

### 2. 在 Cloudflare 创建 Pages 项目

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 选择 **Pages** > **Create a project**
3. 连接您的 Git 仓库
4. 配置构建设置：
   - **Framework preset**: Next.js (Static HTML Export)
   - **Build command**: `npm run build`
   - **Build output directory**: `out`

### 3. 部署配置

**构建命令**: 
```
npm run build
```

**输出目录**: 
```
out
```

**环境变量**（如需要）:
```
NODE_VERSION=18
```

## 📝 配置文件说明

### `wrangler.toml`
```toml
name = "ml-learning-platform"
compatibility_date = "2024-01-01"

pages_build_output_dir = "out"

[site]
bucket = "out"
```

### `package.json` 构建脚本
确保您的 `package.json` 包含：
```json
{
  "scripts": {
    "build": "next build"
  }
}
```

### `next.config.js` 静态导出配置
确保配置了静态导出：
```javascript
module.exports = {
  output: 'export',
  images: {
    unoptimized: true
  }
}
```

## ⚙️ 首次部署步骤

### 使用 Wrangler CLI

```bash
# 1. 登录 Cloudflare
npx wrangler login

# 2. 构建项目
npm run build

# 3. 部署
npx wrangler pages deploy out --project-name=ml-learning-platform

# 4. 后续更新只需运行
deploy-cloudflare.bat
```

## 🔧 常见问题

### 1. 构建失败
**问题**: `npm run build` 失败
**解决**: 
```bash
# 清理缓存并重新安装
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 2. 部署权限问题
**问题**: 没有部署权限
**解决**: 
```bash
# 重新登录
npx wrangler logout
npx wrangler login
```

### 3. 项目名称已存在
**问题**: 项目名称冲突
**解决**: 修改 `wrangler.toml` 中的 `name` 和部署命令中的 `--project-name`

### 4. 图片或资源 404
**问题**: 部署后图片无法显示
**解决**: 
- 确保 `next.config.js` 设置了 `images.unoptimized: true`
- 检查 `public/` 目录下的资源是否正确

## 🚀 自动部署（CI/CD）

Cloudflare Pages 支持自动部署：

1. 在 Dashboard 中连接 Git 仓库
2. 每次推送到主分支时自动触发部署
3. 预览每个 Pull Request

## 📊 部署后验证

部署成功后，访问：
```
https://ml-learning-platform.pages.dev
```

或您自定义的域名。

## 🎯 自定义域名

1. 在 Cloudflare Pages Dashboard 中
2. 进入您的项目
3. 点击 **Custom domains**
4. 添加您的域名

## 💡 优化建议

### 1. 启用缓存
Cloudflare 会自动缓存静态资源。

### 2. 配置重定向
在 `public/_redirects` 文件中配置：
```
/*    /index.html   200
```

### 3. 设置 Headers
在 `public/_headers` 文件中配置：
```
/*
  Cache-Control: public, max-age=3600
  X-Content-Type-Options: nosniff
```

## 📞 获取帮助

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Next.js 静态导出文档](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Wrangler CLI 文档](https://developers.cloudflare.com/workers/wrangler/)

---

**祝部署顺利！** 🎉

