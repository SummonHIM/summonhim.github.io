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
        tech: ['Django', 'Python'],
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
        name: 'GoSteamRestarter',
        description: 'SteamRestarter 的 Go 语言实现。',
        tech: ['Go'],
        url: 'https://github.com/SummonHIM/GoSteamRestarter',
      },
      {
        name: 'best-jdcnj',
        description: '更好的机动车年检平台。',
        tech: ['Vue', 'TypeScript', 'Python'],
      },
      {
        name: 'gzgspg',
        description: '广州工商学院校园网登录器。',
        tech: ['Go', 'PowerShell'],
        url: 'https://github.com/SummonHIM/gzgspg',
      },
      {
        name: 'gzgspd',
        description: '广州工商学院校园网登录守护进程。',
        tech: ['Go', 'Shell'],
        url: 'https://github.com/SummonHIM/gzgspd',
      },
      {
        name: 'AntiSubscribeProtect',
        description: '反订阅保护。',
        tech: ['Python', 'Docker'],
        url: 'https://github.com/SummonHIM/AntiSubscribeProtect',
      },
      {
        name: 'WQPDFExtractor',
        description: '网页 PDF 提取器。',
        tech: ['Python'],
        url: 'https://github.com/SummonHIM/WQPDFExtractor',
      },
      {
        name: 'EZ-RSKiller',
        description: '一键关闭红蜘蛛软件。',
        tech: ['Batch'],
        url: 'https://github.com/SummonHIM/EZ-RSKiller',
      },
      {
        name: 'Bestdori-Music-Downloader',
        description: '自动下载 Bestdori 音乐并填充曲目信息。',
        tech: ['PowerShell'],
        url: 'https://github.com/SummonHIM/Bestdori-Music-Downloader',
      },
      {
        name: 'my-config.nvim',
        description: '个人 Neovim 配置。',
        tech: ['Lua'],
        url: 'https://github.com/SummonHIM/my-config.nvim',
      },
      {
        name: 'auto-pingan',
        description: '自动化平安好伙伴分析器。',
        tech: ['Python', 'OCR'],
      },
    ],
  },
  {
    title: '学业 / 竞赛',
    items: [
      {
        name: 'STM32-Car',
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
  {
    title: '插件 / 汉化',
    items: [
      {
        name: 'koishi-plugin-bili-parser',
        description: 'Koishi 插件 · 解析 bilibili 链接。',
        tech: ['TypeScript'],
        url: 'https://github.com/SummonHIM/koishi-plugin-bili-parser',
      },
      {
        name: 'koishi-plugin-dice-roller',
        description: 'Koishi 插件 · 掷骰子。',
        tech: ['TypeScript'],
        url: 'https://github.com/SummonHIM/koishi-plugin-dice-roller',
      },
      {
        name: 'MHR-SB-CHS-CT',
        description: '怪物猎人崛起 / 曙光修改器汉化。',
        tech: ['Shell'],
        url: 'https://github.com/SummonHIM/MHR-SB-CHS-CT',
      },
      {
        name: 'Crack_Life_CMR_CHS',
        description: 'Crack-Life 战役模式重制版非官方中文支持。',
        tech: ['ReScript'],
        url: 'https://github.com/SummonHIM/Crack_Life_CMR_CHS',
      },
    ],
  },
]
