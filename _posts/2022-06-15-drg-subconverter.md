---
layout: post
title: 使用 SubConverter 为 Deep Rock Galactic 配置合适的 Clash 分流
tags: [随笔一记]
author: SummonHIM
---
使用 SubConverter WebUI 生成带有 mod.io 域名的 Clash 规则订阅

1. 打开已经搭建好 SubConverter WebUI 的网页

> 此处推荐使用：[https://sub-web.netlify.app](https://sub-web.netlify.app)。网页前端只负责生成，并不会收集个人订阅信息。如果实在是担心则可前去[源项目仓库](https://github.com/CareyWang/sub-web)自行构建。

1. 订阅链接填入自己机场的订阅链接，后端地址尽量使用自己搭建的后端，远程配置填入：`https://summonhim.top/sub-stuffs/Clash/Config/Deep_Rock_Galactic.ini`，更多选项中勾选：`启用 UDP`。

> ![2022-06-15-150621.png](/assets/img/2022-06-15-drg-subconverter/2022-06-15-150621.png)

3. 点击生成订阅链接，导入 Clash 即可。

经本人测试，将`🔧 mod.io`规则组调整为自动选择，将其他规则组调整为`Direct`（直连）即可有效保证游戏启动不黑屏，朋友联机不走代理。

但是后端建议自行搭建，后端日志具有记录订阅节点的功能。所以尽量不要使用不信任的后端。搭建教程如下

1. 前去 [SubConverter 项目仓库](https://github.com/tindy2013/subconverter/releases/latest)下载合适自己设备的版本。（一般家用64位电脑只需下载`win64`版本即可）
2. 将`pref.example.toml`重命名为`pref.toml`
3. 打开`pref.toml`，将`api_mode = false`更改为`api_mode = true`。将`api_access_token = "password"`中的`password`更改为你喜欢的密码
4. 双击打开`subconverter.exe`即可完成搭建。若没有在`pref.toml`修改端口，则你的后端地址为`http://127.0.0.1:25500/sub?`。