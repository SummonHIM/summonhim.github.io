export type TimelineItem = {
  title: string
  description: string
}

export const timeline: TimelineItem[] = [
  {
    title: 'Minecraft 服务器 → Linux',
    description:
      '为打游戏搭建 MC 服务器，第一次租阿里云、第一次接触 Linux；公网被 DDoS 后服务被取消。',
  },
  {
    title: 'Clash / 软路由 OpenWrt',
    description:
      '查资料开始学 Clash，接触软路由；用 OpenWrt 让全网关设备一起走代理。',
  },
  {
    title: 'Jellyfin / MoviePilot / Docker',
    description: '自建影视墙，用 Docker 运行 Jellyfin + MoviePilot。',
  },
  {
    title: 'PVE 虚拟化',
    description:
      'OpenWrt 更新频繁出问题，改用 PVE 同时承载 OpenWrt 与 Debian；核显直通折腾许久（内核配置乌龙）。',
  },
  {
    title: 'Mumble 语音',
    description:
      'Discord 被墙后自建 Mumble 作为队友语音，沿用至今，打开了话匣子。',
  },
  {
    title: 'Nextcloud',
    description: '自建文件 / 通讯录 / 日历，脱离谷歌；SFTP 直连 L4D2 目录。',
  },
  {
    title: 'Matrix / Telegram',
    description: '自建 Matrix，积累 docker compose 经验。',
  },
  {
    title: 'Authentik 统一账号',
    description: '统一自建服务的账号登录；Linux 用 SSSD 接入 LDAP。',
  },
  {
    title: 'Headscale 组网',
    description: '跨运营商联机掉线，从 Zerotier/Tailscale 到自建 Headscale。',
  },
  {
    title: 'Stalwart 邮件',
    description: '自建个人邮件，折腾 SPF / DMARC 记录。',
  },
  {
    title: 'one-kvm 监控',
    description: '用香橙派 P3 给服务器做 IPMI 实时监控。',
  },
  {
    title: 'OpnSense',
    description:
      '本科 AI 专业系统学习计算机网络，快速上手企业级路由防火墙平台。',
  },
]
