---
layout: post
title: 使用 SubConverter 为 Deep Rock Galactic 配置合适的 Clash 分流
tags: [随笔一记]
author: SummonHIM
---
## 用机场订阅生成 Clash 分流规则
使用 SubConverter WebUI 生成带有 mod.io 域名的 Clash 规则订阅

1. 打开已经搭建好 SubConverter WebUI 的网页
   
   此处推荐使用：[acl4ssr-sub](https://acl4ssr-sub.github.io/)。
   网页前端只负责生成，并不会收集个人订阅信息。如果实在是担心则可前去[源项目仓库](https://github.com/CareyWang/sub-web)自行构建。

2. 订阅链接填入自己机场的订阅链接，后端地址尽量使用自己搭建的后端（本机搭建则填入：`http://127.0.0.1:25500/sub?`，[项目地址/搭建教程](https://github.com/tindy2013/subconverter)）,远程配置填入：`https://summonhim.top/sub-stuffs/Clash/Config/Deep_Rock_Galactic.ini`，更多选项中勾选：`启用 UDP`
3. 点击生成订阅链接，导入 Clash 即可。