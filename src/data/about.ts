export type Service = {
  name: string
  note: string
}

export type ServiceGroup = {
  title: string
  items: Service[]
}

export const aboutIntro: string[] = [
  '2019 年为了和朋友一起开黑，租下第一台阿里云服务器，也第一次接触到 Linux。此后从软路由、组网一路折腾到虚拟化和自托管。',
  '现在家里和云上各有一台机器，跑着一套覆盖网络、存储、身份与媒体的服务栈，尽量把数据和账号留在自己手里。',
]

export const serviceGroups: ServiceGroup[] = [
  {
    title: '网络',
    items: [
      { name: 'OPNsense', note: '主路由与防火墙' },
      { name: 'Headscale', note: '自建 Tailscale 控制面' },
    ],
  },
  {
    title: '数据与文件',
    items: [
      { name: 'Nextcloud', note: '文件、日历与通讯录，支持 WebDAV' },
      { name: 'Syncthing', note: '服务器、电脑、手机三端同步' },
    ],
  },
  {
    title: '身份与安全',
    items: [
      { name: 'Authentik', note: '统一 SSO，所有自建服务的入口' },
      { name: 'Vaultwarden', note: '密码与两步验证' },
      { name: 'LDAP / SSSD', note: 'Linux 侧接入统一目录' },
    ],
  },
  {
    title: '媒体与通信',
    items: [
      { name: 'Jellyfin', note: '影视库' },
      { name: 'Stalwart', note: '邮件服务器，配置了 SPF / DMARC' },
      { name: 'Mumble', note: '低延迟开黑语音' },
    ],
  },
  {
    title: '硬件与虚拟化',
    items: [
      { name: 'Proxmox VE', note: '虚拟化平台' },
      { name: 'Wisteria', note: 'i3-9100F 应用服务器' },
      { name: 'Janus', note: '6405U 工控机，专职路由' },
      { name: 'one-kvm', note: '香橙派 P3 实现的 IPMI 远程管理' },
    ],
  },
  {
    title: '开发',
    items: [{ name: '订阅管理器', note: 'Django + DRF 写的订阅分发工具' }],
  },
]
