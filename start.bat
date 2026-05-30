@echo off
echo ======================================
echo  余姚杨梅预定系统 - 启动服务
echo ======================================
echo.

echo [1/2] 启动后端 API 服务 (端口 8000)...
start "余姚杨梅-后端" cmd /k "cd /d %~dp0backend && python -m uvicorn main:app --reload --port 8000"

timeout /t 3 /nobreak > nul

echo [2/2] 启动前端 H5 网页 (端口 5173)...
start "余姚杨梅-前端" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo ======================================
echo  服务已启动！
echo.
echo  H5 网页访问地址：
echo    本机：http://localhost:5173
echo    手机：http://[本机IP]:5173
echo.
echo  小程序使用方式：
echo    1. 打开"微信开发者工具"
echo    2. 导入项目目录：%~dp0miniprogram\dist
echo    3. AppID 填写测试号或正式号
echo ======================================
pause
