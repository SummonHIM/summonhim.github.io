---
title: 超级简单的 STM32 + VSCode + clangd + Makefile/CMake 开发
date: 2024-04-09
categories: 技术杂谈
---
网上有很多使用微软官方的 C/C++（ms-vscode.cpptools）的教程，但是众所周知，cpptools 的性能十分堪忧，且配置麻烦。STM32CubeMX 在 v6.11.0 更新了 CMake 的支持。借此机会写一篇 VSCode + clangd + Makefile/CMake 的教程

## 准备工作
- [VSCode](https://code.visualstudio.com/)
- [GNU Arm 编译工具（gcc-arm-none-eabi）](https://developer.arm.com/Tools%20and%20Software/GNU%20Toolchain)
- [LLVM](https://releases.llvm.org/)
- [（推荐）Visual Studio 生成工具/使用 C++ 的桌面开发](https://visualstudio.microsoft.com/zh-hans/downloads/)
- [GNU Make](https://www.gnu.org/software/make/)
- [CMake](https://cmake.org/)
- [（可选）Ninja](https://ninja-build.org/)

> 如果只是正常学习 C/C++ 语言，LLVM 需要搭配 Visual Studio 生成工具才能正常使用。  
> CMake 依赖于 Make 或 Ninja。二选一即可。  
> 以上工具均可使用 Scoop 包管理器安装。

### VSCode 插件
- [clangd: llvm-vs-code-extensions.vscode-clangd](https://marketplace.visualstudio.com/items?itemName=llvm-vs-code-extensions.vscode-clangd)
- [Makefile Tools: ms-vscode.makefile-tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.makefile-tools)
- [CMake Tools: ms-vscode.cmake-tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cmake-tools)

> 格式：<名称>: <插件 ID>  
> 安装 CMake Tools 时会自动安装 [twxs.Cmake](https://marketplace.visualstudio.com/items?itemName=twxs.cmake)。

## 设置调整
clangd 需要通过 compile_commands.json 来定位头文件，定义等内容，所以我们需要将 `Cmake: Copy Compile Commands`（`cmake.copyCompileCommands`）和 `Makefile: Compile Commands Path`（`makefile.compileCommandsPath`）设置为 `${workspaceFolder}/compile_commands.json` 即可正常读取头文件。

如果需要使用标准库，则需要为 clangd 添加一个参数，即为 `Clangd: Arguments`（`clangd.arguments`）添加 `--query-driver=X:/路径/到/你的/arm-none-eabi-gcc.exe` 即可正常读取标准库头文件。

## 完成
至此整个配置就已经完成了。如果想要使用 Makefile 编译，则前去左侧边栏进入 Makefike 选项卡，在选项卡顶部点击生成文件即可。如果想要使用 CMake 编译，则直接在底部状态栏或窗口右上角点击编译文件即可。

## 关于刷写
目前最方便的刷写方案为使用 [ST-LINK Utility](https://www.st.com.cn/zh/development-tools/stsw-link004.html) 刷写。首先，File（文件）/Open file（打开文件）打开编译好的文件。然后单击电插头图标的 Connect to the target 按钮连接设备（某些设备需要按住重置按钮才能连接）。最后单击纸笔图标的 Program verify 即可将文件刷入进设备中。断开设备前不要忘记单击软件中的 Disconnect from the target 弹出设备。

编者暂时未能在 [Cortex-Debug: marus25.cortex-debug](https://marketplace.visualstudio.com/items?itemName=marus25.cortex-debug) 中找到最方便的刷写方案。欢迎自行研究。

## 一些可用到的文章或信息
- [CSDN: stm32CudeMx printf重定向串口输出（使用Makefile方式）](https://blog.csdn.net/weixin_46253402/article/details/136288512)
- printf 等无法打印浮点数：Makefile 中添加这一行：`LDFLAGS += -u _printf_float`
