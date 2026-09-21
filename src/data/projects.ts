export type Project = {
  name: string
  description: string
  tech: string[]
  url?: string
}

export type ProjectGroup = {
  title: string
  items: Project[]
}

export const projectGroups: ProjectGroup[] = [
  {
    title: '折腾 / 自建服务',
    items: [
      {
        name: 'SubscribeManager',
        description: '合租代理订阅管理平台，PHP → Flask → Django 迭代至今。',
        tech: ['Django'],
      },
      {
        name: 'l4d2-docker',
        description: 'L4D2 专用服务器 Docker 编排。',
        tech: ['Docker', 'Bash'],
        url: 'https://github.com/SummonHIM/l4d2-docker',
      },
      {
        name: 'SteamRestarter',
        description: 'Steam 一键强制重启器。',
        tech: ['Batch'],
        url: 'https://gist.github.com/SummonHIM/1cd129bcbc72e18faac2b72455967b32',
      },
      {
        name: 'auto-pingan',
        description: '自动化平安好伙伴分析器。',
        tech: ['Python', 'OCR'],
      },
      {
        name: 'better-jdcnj',
        description: '更好的机动车年检。',
        tech: ['Vue', 'TypeScript'],
      },
    ],
  },
  {
    title: '学业 / 竞赛',
    items: [
      {
        name: 'Car',
        description:
          '嵌入式期末作业 · STM32 智能小车（红外 / 超声波 / OLED 等外设）。',
        tech: ['STM32', 'C'],
      },
      {
        name: 'Campus ISS',
        description: '人工智能期中作业 · 校园智能服务系统（JWT + RBAC 权限）。',
        tech: ['C', 'MySQL'],
      },
      {
        name: 'bobac-px4',
        description: 'ROBOTAC 比赛 · 机械臂 + 无人机协同。',
        tech: ['ROS2', 'PX4'],
      },
    ],
  },
]
