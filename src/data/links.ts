import type { IconName } from '../icons'

export type Availability = '经常' | '偶尔' | '不经常'

export type Link = {
  label: string
  icon: IconName
  value: string
  href?: string
  /** 有值时渲染为按钮，点击打开对应 id 的对话框 */
  dialog?: string
  /** 在线频率，用于排序与悬停提示 */
  availability: Availability
}

export const availabilityNote: Record<Availability, string> = {
  经常: '经常在线',
  偶尔: '偶尔在线',
  不经常: '不经常在线',
}

const availabilityRank: Record<Availability, number> = {
  经常: 0,
  偶尔: 1,
  不经常: 2,
}

/** 信号格数，用于悬停提示的强度条 */
export const availabilityLevel: Record<Availability, number> = {
  经常: 3,
  偶尔: 2,
  不经常: 1,
}

const rawLinks: Link[] = [
  {
    label: '邮箱',
    icon: 'mail',
    value: 'summonhim@summonhim.top',
    href: 'mailto:summonhim@summonhim.top',
    availability: '经常',
  },
  {
    label: 'QQ',
    icon: 'qq',
    value: '2239760702',
    href: 'https://qm.qq.com/q/lYZ8auKT72',
    dialog: 'qq-dialog',
    availability: '经常',
  },
  {
    label: 'Steam',
    icon: 'steam',
    value: 'SummonHIM',
    href: 'https://steamcommunity.com/id/SummonHIM',
    availability: '经常',
  },
  {
    label: '微信',
    icon: 'wechat',
    value: 'SummonHIM',
    dialog: 'wechat-dialog',
    availability: '偶尔',
  },
  {
    label: 'Telegram',
    icon: 'telegram',
    value: 'SummonHIM',
    href: 'https://t.me/SummonHIM',
    availability: '偶尔',
  },
  {
    label: 'BiliBili',
    icon: 'bilibili',
    value: 'SummonHIM',
    href: 'https://space.bilibili.com/21899295',
    availability: '偶尔',
  },
  {
    label: 'GitHub',
    icon: 'github',
    value: 'SummonHIM',
    href: 'https://github.com/SummonHIM',
    availability: '不经常',
  },
  {
    label: 'Bluesky',
    icon: 'bluesky',
    value: 'summonhim.bsky.summonhim.top',
    href: 'https://bsky.app/profile/summonhim.bsky.summonhim.top',
    availability: '不经常',
  },
  {
    label: 'Matrix',
    icon: 'matrix',
    value: '@summonhim:matrix.summonhim.top',
    href: 'https://matrix.to/#/@summonhim:matrix.summonhim.top',
    availability: '不经常',
  },
]

/** 按在线频率从高到低排列，同频率保持声明顺序 */
export const links: Link[] = [...rawLinks].sort(
  (a, b) => availabilityRank[a.availability] - availabilityRank[b.availability],
)

export const authentikUrl = 'https://auth.summonhim.top:2053/'
