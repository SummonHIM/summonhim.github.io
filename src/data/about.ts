import type { IconName } from '../icons'

export type Service = {
  name: string
  note: string
}

export type ServiceGroup = {
  title: string
  icon: IconName
  items: Service[]
}

export const aboutIntro: string[] = [
  '2019 年为了和朋友一起开黑，租下第一台阿里云服务器，也第一次接触到 Linux。此后从软路由、组网一路折腾到虚拟化和自托管。',
  '现在家里和云上各有一台机器，跑着一套覆盖网络、存储、身份与媒体的服务栈，尽量把数据和账号留在自己手里。',
]

export const serviceGroups: ServiceGroup[] = [
  {
    title: '网络',
    icon: 'globe',
    items: [
      { name: 'OPNsense', note: '主路由与防火墙' },
      { name: 'OpenWrt', note: '软路由系统' },
      { name: 'Headscale', note: '自建 Tailscale 控制面，异地组网' },
      { name: 'Caddy / Nginx', note: '反向代理与 TLS 终止' },
    ],
  },
  {
    title: '数据与文件',
    icon: 'database',
    items: [
      { name: 'Nextcloud', note: '文件、日历与通讯录，支持 WebDAV' },
      { name: 'Syncthing', note: '服务器、电脑、手机多端双向同步' },
      {
        name: '数据库',
        note: 'MySQL、MariaDB、SQLite、Redis、Neo4j',
      },
    ],
  },
  {
    title: '身份与安全',
    icon: 'shield',
    items: [
      { name: 'Authentik', note: '统一 SSO，所有自建服务的登录入口' },
      { name: 'Vaultwarden', note: '密码与两步验证，多端同步' },
      { name: 'LDAP / SSSD', note: 'Linux 侧接入统一目录与账号' },
    ],
  },
  {
    title: '媒体与通信',
    icon: 'play',
    items: [
      { name: 'Jellyfin', note: '影视库，多端播放' },
      { name: 'Stalwart', note: '邮件服务器，配置了 SPF / DMARC' },
      { name: 'Mumble', note: '低延迟开黑语音' },
      { name: 'Matrix', note: '自建聊天服务器' },
    ],
  },
  {
    title: '硬件与虚拟化',
    icon: 'server',
    items: [
      { name: 'Proxmox VE', note: '虚拟化平台，KVM 虚拟机与 LXC' },
      { name: 'Docker / Linux', note: '容器化部署与服务器运维' },
      { name: 'Grafana', note: '监控与可视化面板' },
    ],
  },
  {
    title: '开发',
    icon: 'code',
    items: [
      {
        name: '语言',
        note: 'Python、Go、TypeScript / JavaScript、C、C#、PHP、Bash',
      },
      {
        name: '后端 / 前端',
        note: 'Django / DRF、Flask、Vue 3、React / Next.js、Tailwind CSS',
      },
      {
        name: '嵌入式',
        note: 'STM32 (HAL)、STC8H (C51)、Keil',
      },
    ],
  },
]
