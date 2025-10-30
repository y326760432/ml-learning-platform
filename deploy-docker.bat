@echo off
chcp 65001 >nul
echo.
echo ═══════════════════════════════════════════════════════════
echo.
echo            🚀 MLearning 平台 Docker 部署脚本
echo.
echo ═══════════════════════════════════════════════════════════
echo.

REM 检查Docker是否安装
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 错误: Docker未安装或未启动
    echo.
    echo 请先安装Docker Desktop: https://www.docker.com/products/docker-desktop
    echo.
    pause
    exit /b 1
)

echo ✅ Docker已就绪
echo.

REM 检查out目录是否存在
if not exist "out\" (
    echo ❌ 错误: out目录不存在
    echo.
    echo 请先运行: npm run build
    echo.
    pause
    exit /b 1
)

echo ✅ 构建产物已就绪
echo.

echo ══════════════════════════════════════════════════════════
echo  步骤1: 清理旧容器
echo ══════════════════════════════════════════════════════════
echo.

docker stop mllearning >nul 2>&1
docker rm mllearning >nul 2>&1

echo ✅ 清理完成
echo.

echo ══════════════════════════════════════════════════════════
echo  步骤2: 构建Docker镜像
echo ══════════════════════════════════════════════════════════
echo.

docker build -f Dockerfile.nginx -t mllearning:latest .

if %errorlevel% neq 0 (
    echo.
    echo ❌ 镜像构建失败
    pause
    exit /b 1
)

echo.
echo ✅ 镜像构建成功
echo.

echo ══════════════════════════════════════════════════════════
echo  步骤3: 启动容器
echo ══════════════════════════════════════════════════════════
echo.

docker run -d -p 80:80 --name mllearning --restart unless-stopped mllearning:latest

if %errorlevel% neq 0 (
    echo.
    echo ❌ 容器启动失败
    echo.
    echo 可能是端口80已被占用，尝试使用8080端口...
    docker run -d -p 8080:80 --name mllearning --restart unless-stopped mllearning:latest
    
    if %errorlevel% neq 0 (
        echo ❌ 容器启动仍然失败
        pause
        exit /b 1
    ) else (
        set PORT=8080
        goto :success
    )
) else (
    set PORT=80
)

:success
echo.
echo ✅ 容器启动成功
echo.

timeout /t 2 /nobreak >nul

echo ══════════════════════════════════════════════════════════
echo  步骤4: 检查运行状态
echo ══════════════════════════════════════════════════════════
echo.

docker ps | findstr mllearning

echo.
echo ══════════════════════════════════════════════════════════
echo.
echo            🎉 部署完成！
echo.
echo ══════════════════════════════════════════════════════════
echo.
echo 📍 访问地址:
echo.
if "%PORT%"=="80" (
    echo    主页:       http://localhost
    echo    可视化:     http://localhost/visualizations
) else (
    echo    主页:       http://localhost:%PORT%
    echo    可视化:     http://localhost:%PORT%/visualizations
)
echo.
echo ══════════════════════════════════════════════════════════
echo.
echo 💡 常用命令:
echo.
echo    查看日志:   docker logs -f mllearning
echo    停止容器:   docker stop mllearning
echo    启动容器:   docker start mllearning
echo    删除容器:   docker rm -f mllearning
echo    进入容器:   docker exec -it mllearning sh
echo.
echo ══════════════════════════════════════════════════════════
echo.

REM 询问是否打开浏览器
echo 是否在浏览器中打开网站？(Y/N)
set /p OPEN_BROWSER=

if /i "%OPEN_BROWSER%"=="Y" (
    if "%PORT%"=="80" (
        start http://localhost
    ) else (
        start http://localhost:%PORT%
    )
)

echo.
echo 按任意键退出...
pause >nul

