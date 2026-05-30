@echo off
echo 启动小程序开发模式 (监听文件变化自动编译)...
echo 编译完成后，在微信开发者工具中导入：%~dp0miniprogram\dist
echo.
cd /d %~dp0miniprogram
npm run dev:weapp
