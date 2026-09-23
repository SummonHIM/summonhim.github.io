export type TimelineItem = {
  title: string
  description: string
  unhide_description?: string
  date: string
  hidden?: boolean
}

export const timeline: TimelineItem[] = [
  {
    title: 'BandwagonHost',
    description:
      '为满足隐私需求，在搬瓦工购入一台洛杉矶服务器跑 VLESS 代理，也因此第一次接触到 Linux。后来机器被墙，便告一段落。',
    date: '2018',
    hidden: true,
  },
  {
    title: 'Minecraft 服务器',
    description:
      '为了和朋友一起玩，租了台阿里云最低配的服务器，第一次自己动手搭起了游戏服务器。可惜性能严重不足，人一多就卡。',
    date: '2019',
  },
  {
    title: 'L4D2 服务器',
    description:
      '迷上了 L4D2，为了玩玩家自制地图，又在阿里云上架起 L4D2 服务器，没想到随后遭到攻击。',
    date: '2019',
  },
  {
    title: 'PixelExperience',
    description:
      '对隐私的要求越来越高，索性买了台小米手机刷入 PixelExperience。',
    unhide_description:
      '对隐私的要求越来越高，索性买了台小米手机刷入 PixelExperience，想入手 Pixel 的念头也悄悄发了芽。',
    date: '2020',
  },
  {
    title: 'OpenWrt',
    description:
      '购入 NanoPi R2S，自学 OpenWrt，由此踏上了学习计算机网络的路。',
    unhide_description:
      '为了更便捷的翻墙体验购入 NanoPi R2S，自学 OpenWrt，由此踏上了学习计算机网络的路。',
    date: '2020',
  },
  {
    title: 'Janus',
    description:
      'R2S 性能渐渐吃紧，于是在 ZERO 购入奔腾金牌 6405U 工控机，兼任路由与应用服务器。',
    date: '2021',
  },
  {
    title: 'Jellyfin',
    description: '为了追求极致的视听体验，决定自建影视库。',
    unhide_description:
      '不想再为 B 站大会员买单，索性自建影视库，把观影自由握在自己手里。',
    date: '2021',
  },
  {
    title: 'Proxmox VE',
    description:
      'OpenWrt 一更新就出问题，干脆改用 Proxmox VE，把 OpenWrt 和 Ubuntu 一起装进虚拟化，大部分服务也随之迁到 Ubuntu 上，就此深入虚拟化的世界。',
    date: '2021',
  },
  {
    title: '***',
    description: '？？？ 😭😭😭 🤮🤮🤮 🤢🤢🤢 😞😞😞 😐😐😐',
    date: '2021',
    hidden: true,
  },
  {
    title: 'TeamSpeak 3',
    description:
      'QQ 语音又卡又糊，急需一个低延迟高音质的开黑平台，于是搭起了 TeamSpeak 3。',
    date: '2021',
  },
  {
    title: 'Syncthing',
    description:
      '不想把文件交给没隐私可言的网盘，便在服务器、电脑、手机三端之间用 Syncthing 自行同步文件。',
    unhide_description:
      '不想把文件交给没隐私可言的网盘，便在服务器、电脑、手机三端之间用 Syncthing 自行同步文件。后来误把一个带 .stfolder 的空文件夹加了进去，导致所有设备被同步成了空目录，几乎毁掉了全部文件，心痛了很久。',
    date: '2021',
  },
  {
    title: 'ZeroTier',
    description:
      '网络环境日渐变差，萌生了用组网软件优化 P2P 游戏的念头，没想到反而对去中心化产生了浓厚兴趣。',
    unhide_description:
      '疫情期间，三大运营商为节省开支开始限制跨运营商连接的延迟，我们的 P2P 游戏体验大受影响。于是想到用组网软件优化 P2P 游戏，结果反而对去中心化产生了浓厚兴趣。',
    date: '2021',
  },
  {
    title: 'SoftEther VPN',
    description:
      'ZeroTier 在国内的体验也每况愈下，最后换用 SoftEther VPN 作为稳定联机的方案。',
    date: '2021',
  },
  {
    title: 'FileBrowser',
    description:
      '想要一个能通过网页访问服务器文件的方案，也为了更方便地管理 L4D2 服务器，FileBrowser 便成了当时的最优解。',
    date: '2021',
  },
  {
    title: 'Vultr',
    description:
      'GitHub 访问越来越慢，便想用境外服务器反向代理 GitHub，最终在 Vultr 购入一台服务器。',
    date: '2022',
    hidden: true,
  },
  {
    title: 'Matrix',
    description: '对去中心化的兴趣终于落地，自建 Matrix 作为集大成的实践。',
    date: '2022',
  },
  {
    title: 'Mumble',
    description:
      'TS3 毛病不少，降噪差还不支持多平台，于是转投 Mumble，作为新的开黑语音服务器。',
    date: '2023',
  },
  {
    title: '订阅管理器',
    description:
      '为了方便给合租机场的朋友分配订阅链接，动手写了一个订阅管理器。最初用 PHP 起步，中途试过 Flask，最后用 Django + DRF 重写才稳定下来。',
    date: '2023',
  },
  {
    title: 'CloudCone',
    description:
      'Vultr 的机器在大陆访问性能变差，于是把服务商换成了 CloudCone。',
    date: '2024',
    hidden: true,
  },
  {
    title: 'Vaultwarden',
    description:
      '谷歌弄丢了我所有的两步验证码，一怒之下搭起 Vaultwarden，把所有密码都迁了过来。',
    date: '2024',
  },
  {
    title: 'Authentik',
    description:
      '用 Authentik 把上面所有自建服务统一成一套 SSO 登录，终于有了大一统的感觉。Linux 侧则通过 SSSD 接入 LDAP，为此去啃目录树之类的概念，折腾了好久。',
    date: '2025',
  },
  {
    title: 'Wisteria',
    description:
      'Janus 的负载越来越高，索性购入低功耗又高性能的 i3-9100F 当应用服务器。它比之前所有机器都强，便起名「紫藤」，绝大部分应用都迁了过来，Janus 专心做路由。',
    date: '2025',
  },
  {
    title: 'one-kvm',
    description:
      '用香橙派 P3 给 Wisteria 加装 IPMI，实现远程监控，就算断网出故障也能远程操作。',
    date: '2025',
  },
  {
    title: 'RackNerd',
    description:
      'CloudCone 的机器在大陆访问性能又变差了，于是把服务商换成 RackNerd。',
    date: '2025',
    hidden: true,
  },
  {
    title: 'Nextcloud',
    description:
      '用 Nextcloud 取代 FileBrowser——它支持 SFTP、能接入 Authentik，还顺手摆脱了谷歌日历和通讯录，加上 WebDAV 加持，比 FileBrowser 好用太多。',
    date: '2025',
  },
  {
    title: 'Stalwart',
    description:
      '为了学习邮件服务器而自建 Stalwart。初期发出去的邮件全被归为垃圾邮件，为此折腾了 SPF / DMARC 记录，费了好大劲才搞定。',
    date: '2025',
  },
  {
    title: 'Headscale',
    description:
      'SoftEther VPN 太老、速度也赶不上 Tailscale，于是换成 Headscale，完成了一次组网升级。',
    date: '2025',
  },
  {
    title: '***',
    description: '🥰🥰🥰 😨😨😨 🤢🤮🤢 😞😞😞',
    date: '2025',
    hidden: true,
  },
  {
    title: 'OPNsense',
    description:
      '本科期间系统学了一遍计算机网络，得以快速上手 OPNsense 这个企业级路由防火墙平台。',
    date: '2026',
  },
]
