@echo off
chcp 65001 >nul
echo ================================
echo   Cloudflare Pages 部署脚本
echo ================================
echo.

echo [1/3] 安装依赖...
call npm install
if %errorlevel% neq 0 (
    echo ❌ 依赖安装失败
    pause
    exit /b 1
)

echo.
echo [2/3] 构建项目...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ 构建失败
    pause
    exit /b 1
)

echo.
echo [3/3] 部署到 Cloudflare Pages...
echo.
echo 正在部署 out 目录到 Cloudflare Pages...
npx wrangler pages deploy out --project-name=ml-learning-platform
if %errorlevel% neq 0 (
    echo ❌ 部署失败
    pause
    exit /b 1
)

echo.
echo ✅ 部署成功！
echo.
pause

