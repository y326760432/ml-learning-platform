# 🐳 Docker 快速部署指南

## 📋 前提条件

- Docker已安装
- 项目已构建（`out/` 目录存在）

---

## 🚀 方法一：使用提供的Dockerfile

### 1. 构建镜像

```bash
# 在项目根目录执行
docker build -f Dockerfile.nginx -t mllearning:latest .
```

### 2. 运行容器

```bash
# 运行在80端口
docker run -d -p 80:80 --name mllearning mllearning:latest

# 或运行在其他端口（如8080）
docker run -d -p 8080:80 --name mllearning mllearning:latest
```

### 3. 访问网站

```
http://localhost          # 主页
http://localhost/visualizations  # 可视化页面
```

### 4. 管理容器

```bash
# 查看日志
docker logs mllearning

# 停止容器
docker stop mllearning

# 启动容器
docker start mllearning

# 删除容器
docker rm mllearning

# 进入容器
docker exec -it mllearning sh
```

---

## 🎯 方法二：使用docker-compose

### 1. 创建docker-compose.yml

```yaml
version: '3.8'

services:
  mllearning:
    build:
      context: .
      dockerfile: Dockerfile.nginx
    image: mllearning:latest
    container_name: mllearning
    ports:
      - "80:80"
    restart: unless-stopped
    networks:
      - mllearning-network

networks:
  mllearning-network:
    driver: bridge
```

### 2. 启动服务

```bash
# 构建并启动
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

---

## 🌐 生产环境部署

### 使用Nginx反向代理 + SSL

#### 1. docker-compose.yml（完整版）

```yaml
version: '3.8'

services:
  mllearning:
    build:
      context: .
      dockerfile: Dockerfile.nginx
    image: mllearning:latest
    container_name: mllearning
    restart: unless-stopped
    networks:
      - web

  nginx-proxy:
    image: nginx:alpine
    container_name: nginx-proxy
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx-proxy.conf:/etc/nginx/conf.d/default.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - mllearning
    restart: unless-stopped
    networks:
      - web

networks:
  web:
    driver: bridge
```

#### 2. nginx-proxy.conf

```nginx
upstream mllearning {
    server mllearning:80;
}

server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;

    location / {
        proxy_pass http://mllearning;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 📤 发布到Docker Hub

### 1. 登录Docker Hub

```bash
docker login
```

### 2. 标记镜像

```bash
docker tag mllearning:latest your-username/mllearning:latest
docker tag mllearning:latest your-username/mllearning:v1.0.0
```

### 3. 推送镜像

```bash
docker push your-username/mllearning:latest
docker push your-username/mllearning:v1.0.0
```

### 4. 他人使用

```bash
# 拉取镜像
docker pull your-username/mllearning:latest

# 运行
docker run -d -p 80:80 --name mllearning your-username/mllearning:latest
```

---

## 🔧 故障排查

### 检查容器状态

```bash
# 查看运行中的容器
docker ps

# 查看所有容器（包括停止的）
docker ps -a

# 查看容器详情
docker inspect mllearning
```

### 查看日志

```bash
# 实时查看日志
docker logs -f mllearning

# 查看最近100行日志
docker logs --tail 100 mllearning
```

### 进入容器调试

```bash
# 进入容器shell
docker exec -it mllearning sh

# 在容器内检查文件
ls -la /usr/share/nginx/html/

# 检查nginx配置
nginx -t

# 查看nginx进程
ps aux | grep nginx
```

### 端口占用问题

```bash
# Windows
netstat -ano | findstr :80

# Linux/Mac
lsof -i :80
```

如果端口被占用，使用其他端口：
```bash
docker run -d -p 8080:80 --name mllearning mllearning:latest
```

---

## 🎯 一键部署脚本

### Linux/Mac: deploy.sh

```bash
#!/bin/bash

echo "🚀 开始部署MLearning平台..."

# 停止并删除旧容器
echo "📦 清理旧容器..."
docker stop mllearning 2>/dev/null || true
docker rm mllearning 2>/dev/null || true

# 构建新镜像
echo "🔨 构建Docker镜像..."
docker build -f Dockerfile.nginx -t mllearning:latest .

# 运行容器
echo "▶️ 启动容器..."
docker run -d \
  -p 80:80 \
  --name mllearning \
  --restart unless-stopped \
  mllearning:latest

# 检查状态
echo "✅ 检查容器状态..."
sleep 2
docker ps | grep mllearning

echo ""
echo "🎉 部署完成！"
echo "📍 访问地址: http://localhost"
echo "📍 可视化页面: http://localhost/visualizations"
echo ""
echo "查看日志: docker logs -f mllearning"
```

### Windows: deploy.bat

```batch
@echo off
echo 🚀 开始部署MLearning平台...

echo 📦 清理旧容器...
docker stop mllearning 2>nul
docker rm mllearning 2>nul

echo 🔨 构建Docker镜像...
docker build -f Dockerfile.nginx -t mllearning:latest .

echo ▶️ 启动容器...
docker run -d -p 80:80 --name mllearning --restart unless-stopped mllearning:latest

echo ✅ 检查容器状态...
timeout /t 2 /nobreak >nul
docker ps | findstr mllearning

echo.
echo 🎉 部署完成！
echo 📍 访问地址: http://localhost
echo 📍 可视化页面: http://localhost/visualizations
echo.
echo 查看日志: docker logs -f mllearning
```

使用方法：
```bash
# Linux/Mac
chmod +x deploy.sh
./deploy.sh

# Windows
deploy.bat
```

---

## 📊 性能监控

### 查看资源使用

```bash
# 查看容器资源使用
docker stats mllearning

# 限制容器资源
docker run -d \
  -p 80:80 \
  --name mllearning \
  --memory="512m" \
  --cpus="1.0" \
  mllearning:latest
```

---

## ✅ 部署验证清单

- [ ] Docker镜像构建成功
- [ ] 容器成功启动
- [ ] 端口映射正确
- [ ] 主页可以访问
- [ ] 可视化页面正常
- [ ] 所有7个算法工作正常
- [ ] 容器自动重启已配置
- [ ] 日志可以正常查看

---

**Docker部署完成！容器化让部署变得简单快捷！** 🎉

