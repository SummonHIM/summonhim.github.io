@echo off
cd %~dp0
echo --- %date% %time% ---

echo 正在获取远程仓库数据...
git fetch origin gh-pages
echo 正在检查 gh-pages 分支是否有更新...
for /f "delims=" %%i in ('git log gh-pages..origin/gh-pages --oneline') do set fetchStatus=%%i
echo fetchStatus: %fetchStatus%

if "%1" == "force" (
	echo 启用强制编译...
	goto build
)

if "%fetchStatus%" == "" (
	echo 未检测到更新...
	goto exit
) else (
	echo 检测到更改！正在合并最新拉取的更改并尝试编译...
	goto build
)

:build
echo 正在清空之前的更改...
git restore .
git merge origin/gh-pages
echo 正在编译 Jekyll 站点...
xcopy /H /Y ..\portfolio.yml _data\portfolio.yml
jekyll build && autosync.bat copy
goto exit

:exit