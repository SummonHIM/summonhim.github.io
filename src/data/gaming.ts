import type { IconName } from '../icons'

export type GamingChannel = {
  name: string
  icon: IconName
  description: string
  url: string
}

export const gamingIntro = '如果你想找我打游戏，就进这些群 / 组：'

export const gamingChannels: GamingChannel[] = [
  {
    name: 'QQ 群',
    icon: 'qq',
    description: '航班已结束 · 796879703',
    url: 'https://qm.qq.com/q/sRDGAh5RIs',
  },
  {
    name: 'Steam 组',
    icon: 'steam',
    description: 'SummonHIM\u2019s Server',
    url: 'https://steamcommunity.com/groups/SummonHIM',
  },
]
