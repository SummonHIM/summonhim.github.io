# SummonHIM 个人网站设计文档

日期：2026-09-21
状态：待实现

## 1. 概述

为 SummonHIM 搭建一个个人主页，部署到 `summonhim.top`（Cloudflare Pages），静态输出，中文内容，明暗主题自动切换。

## 2. 技术架构

- **框架**：Astro（默认静态输出，零多余 JS，构建产物为纯 HTML/CSS/JS）
- **主题**：明暗自动切换，`prefers-color-scheme` 跟随系统，并提供手动切换按钮；主色 `#ffb900`
- **部署**：Cloudflare Pages，`astro build` 产出 `dist/`，纯静态托管
- **图标**：复用 `C:\Users\SummonHIM\Standard\Projects\SummonHIM\Icon` 下的 `SummonHIM.svg`（黄圆白 S）；favicon 使用 `SummonHIM.ico` / `SummonHIM.png`
- **内容组织**：简介、项目、链接等数据写入独立数据文件，修改内容不触碰组件代码

## 3. 页面结构（单页，锚点导航）

1. **顶部导航**：图标 + "SummonHIM" + 明暗切换按钮 + 锚点（关于 / 项目 / 链接）
2. **Hero 区**：大图标、昵称、一句话简介、个人名句 + 一排社交链接图标
3. **关于我**：成长线（见 §5）+ 技术标签云
4. **项目 / 作品集**：8 个项目，分组卡片（见 §6）
5. **链接 / 联系**：整理后的联系方式与跳转按钮（见 §7）
6. **页脚**：版权 + 彩蛋

## 4. 个人名句

> 中国有句古话叫："闷声发大财"。我一句话也不说，这是坠吼的。

置于 Hero 简介下方。

## 5. 关于我（成长线）

从「为了打游戏」一路折腾到「能自建基础设施」的成长叙事，精炼呈现，按时间/主题组织：

1. **Minecraft 服务器 → Linux**：为打游戏搭建 MC 服务器，第一次租阿里云，第一次接触 Linux；因公网被 DDoS 服务被取消。
2. **Clash / 软路由 OpenWrt**：查资料开始学代理工具 Clash，接触软路由；用 OpenWrt 带动全网关设备走代理。
3. **Jellyfin / MoviePilot / Docker**：刷软路由内容被推荐影视墙，自建 Jellyfin + MoviePilot，开始用 Docker。
4. **PVE 虚拟化**：OpenWrt 更新频繁出问题，用 PVE 同时承载 OpenWrt 与 Debian；为 Jellyfin 核显直通折腾许久（内核配置乌龙）。
5. **Mumble 语音**：Discord 被墙后自建 Mumble 作为队友语音，沿用至今，打开话匣子。
6. **Nextcloud**：L4D2 三方地图上传需求，从 filebrowser/filestash 最终选定 Nextcloud（文件 + 通讯录 + 日历，脱离谷歌），支持 SFTP 直连 L4D2 目录。
7. **Matrix / Telegram**：自建 Matrix，积累 docker compose 经验。
8. **Authentik 统一账号**：搭建统一账号平台，把自建服务统一登录；Linux 通过 SSSD 接入 Authentik LDAP。
9. **Headscale 组网**：跨运营商联机掉线，从 Zerotier/Tailscale 到自建 Headscale。
10. **Stalwart 邮件系统**：自建个人邮件，折腾 SPF/DMARC 记录。
11. **one-kvm 监控**：用香橙派 P3 给服务器做 IPMI 监控。
12. **OpnSense**：本科人工智能专业，系统学习计算机网络，快速上手企业级路由防火墙平台。

### 技术标签

Linux、Docker / Compose、PVE、OpenWrt、OpnSense、Clash、Nextcloud、Jellyfin、Mumble、Matrix、Headscale、Stalwart、Authentik、SSSD、LDAP、SSO、KVM、网络（IPv4/IPv6、SPF/DMARC）、Django

## 6. 项目 / 作品集（8 个，分组）

### 折腾 / 自建服务
| 项目 | 一句话 | 技术 |
|---|---|---|
| SubscribeManager (SubMan) | 合租代理订阅管理平台，PHP → Flask → Django 迭代至今 | Django |
| l4d2-docker | L4D2 专用服务器 Docker 编排 | Docker / Bash |
| SteamRestarter | Steam 一键强制重启器 | Batch |
| auto-pingan | 自动化平安好伙伴分析器 | Python + OCR |
| better-jdcnj | 更好的机动车年检 | Vue 3 + TS |

### 学业 / 竞赛
| 项目 | 一句话 | 技术 |
|---|---|---|
| Car | 嵌入式期末作业 · STM32 智能小车（红外/超声波/OLED 等外设） | STM32 / C |
| Campus ISS | 人工智能期中作业 · 校园智能服务系统（JWT + RBAC 权限） | C + MySQL |
| bobac-px4 | ROBOTAC 比赛 · 机械臂 + 无人机协同 | ROS2 / PX4 |

每个项目卡片包含：名称、一句话描述、技术标签、外链（GitHub 等，如可用）。

## 7. 链接 / 联系

- 邮箱：`summonhim@summonhim.top`
- Matrix：`@summonhim:matrix.summonhim.top`
- QQ：SummonHIM（`https://qm.qq.com/q/lYZ8auKT72`）
- Telegram：SummonHIM
- GitHub：SummonHIM
- Steam：SummonHIM
- BiliBili：SummonHIM（`https://space.bilibili.com/21899295`）
- Authentik 统一登录入口（跳转按钮）：`https://auth.summonhim.top:2053/`

## 8. 页脚彩蛋

> SummonHIM 的名字，来自 Minecraft 的 HIM。
